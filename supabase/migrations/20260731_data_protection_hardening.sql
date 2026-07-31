-- ============================================================================
-- Refuerzo de protección de datos y seguridad a nivel de fila (RLS).
--
-- Problema que corrige:
--   Las políticas anteriores (20260126_admin_features.sql y
--   scripts/fix_rls_policies.sql) usaban `USING (true)` / `WITH CHECK (true)`
--   sin comprobar la identidad. Como la clave anon de Supabase viaja en el
--   bundle público de la web, cualquier persona podía:
--     · leer, modificar y borrar TODAS las reservas (nombre, email, teléfono
--       y notas de las clientas) -> brecha de datos personales;
--     · alterar el catálogo de servicios, productos, equipo y galería;
--     · sobrescribir la configuración del sitio.
--
--   Esta migración sustituye esas políticas por otras basadas en la identidad
--   real de quien hace la petición y añade minimización y retención de datos.
--
-- Tras aplicarla, los scripts de seeding (scripts/seed.js, scripts/migrate.ts)
-- deben ejecutarse con SUPABASE_SERVICE_ROLE_KEY, no con la clave anon.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Función auxiliar: ¿quien hace la petición es administrador?
-- ---------------------------------------------------------------------------
-- Se considera administrador a quien tenga el rol 'admin' en app_metadata del
-- JWT. Se mantiene además el email histórico del panel para no dejar al centro
-- sin acceso durante la migración: cuando todas las cuentas tengan el rol
-- asignado, basta con borrar la segunda condición.
--
-- Para asignar el rol (con la service_role key):
--   supabase.auth.admin.updateUserById(<id>, { app_metadata: { role: 'admin' } })

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  ) or coalesce(auth.jwt() ->> 'email', '') = 'admin@manipedigexto.com';
$$;

comment on function public.is_admin() is
  'Devuelve true si el JWT actual pertenece a una cuenta de administración.';

revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, anon;

-- ---------------------------------------------------------------------------
-- 2. Catálogo público: lectura para todo el mundo, escritura solo admin
-- ---------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array['services', 'team', 'testimonials', 'products', 'gallery']
  loop
    -- Políticas permisivas heredadas que hay que eliminar.
    execute format('drop policy if exists "Allow public insert for %1$s" on public.%1$I', t);
    execute format('drop policy if exists "Allow public update for %1$s" on public.%1$I', t);
    execute format('drop policy if exists "Allow admin write for %1$s" on public.%1$I', t);
    execute format('drop policy if exists "Allow public read access for %1$s" on public.%1$I', t);

    execute format('alter table public.%I enable row level security', t);

    execute format(
      'create policy "Allow public read access for %1$s" on public.%1$I for select using (true)',
      t
    );
    execute format(
      'create policy "Allow admin write for %1$s" on public.%1$I for all to authenticated using (public.is_admin()) with check (public.is_admin())',
      t
    );
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- 3. Mensajes del formulario de contacto (datos personales)
-- ---------------------------------------------------------------------------
alter table public.messages enable row level security;

drop policy if exists "Allow public insert for messages" on public.messages;
drop policy if exists "Allow public read for messages" on public.messages;
drop policy if exists "Allow admin read for messages" on public.messages;
drop policy if exists "Allow admin manage messages" on public.messages;

-- Cualquiera puede enviar un mensaje...
-- Nota: al no existir política de SELECT para `anon`, el alta debe hacerse sin
-- devolver la fila. `supabase.from('messages').insert(...)` sin `.select()` es
-- exactamente eso; añadir `.select()` haría fallar el envío.
create policy "Allow public insert for messages" on public.messages
  for insert to anon, authenticated
  with check (
    char_length(coalesce(name, '')) between 1 and 80
    and char_length(email) between 5 and 120
    and email like '%_@_%.__%'
    and char_length(coalesce(subject, '')) <= 120
    and char_length(message) between 1 and 2000
  );

-- ...pero solo el personal autorizado puede leerlos o gestionarlos.
create policy "Allow admin read for messages" on public.messages
  for select to authenticated using (public.is_admin());

create policy "Allow admin manage messages" on public.messages
  for delete to authenticated using (public.is_admin());

-- Defensa en profundidad: los límites también como restricción de tabla.
-- NOT VALID aplica solo a las filas nuevas, para que la migración no falle si
-- algún mensaje antiguo excede los límites. Puede validarse más adelante con
-- `alter table public.messages validate constraint messages_length_limits;`.
alter table public.messages drop constraint if exists messages_length_limits;
alter table public.messages add constraint messages_length_limits check (
  char_length(coalesce(name, '')) <= 80
  and char_length(email) <= 120
  and char_length(coalesce(subject, '')) <= 120
  and char_length(message) <= 2000
) not valid;

-- ---------------------------------------------------------------------------
-- 4. Reservas (datos personales: nombre, email, teléfono, notas)
-- ---------------------------------------------------------------------------
alter table public.bookings enable row level security;

-- Política heredada que permitía a cualquiera leer y borrar todas las reservas.
drop policy if exists "Allow authenticated admins to manage bookings" on public.bookings;
drop policy if exists "Allow public insert for bookings" on public.bookings;
drop policy if exists "Allow admin manage bookings" on public.bookings;

-- Alta de solicitud de cita desde la web, sin poder leer las de nadie más
-- (igual que en `messages`: el alta no debe devolver la fila insertada).
create policy "Allow public insert for bookings" on public.bookings
  for insert to anon, authenticated
  with check (
    char_length(coalesce(client_name, '')) between 1 and 80
    and char_length(coalesce(client_email, '')) <= 120
    and char_length(coalesce(client_phone, '')) <= 20
    and char_length(coalesce(notes, '')) <= 1000
    and booking_date >= current_date - interval '1 day'
    and status = 'pending'
  );

create policy "Allow admin manage bookings" on public.bookings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- NOT VALID: solo se exige a las reservas nuevas (ver nota en `messages`).
alter table public.bookings drop constraint if exists bookings_length_limits;
alter table public.bookings add constraint bookings_length_limits check (
  char_length(coalesce(client_name, '')) <= 80
  and char_length(coalesce(client_email, '')) <= 120
  and char_length(coalesce(client_phone, '')) <= 20
  and char_length(coalesce(notes, '')) <= 1000
) not valid;

-- ---------------------------------------------------------------------------
-- 5. Configuración del sitio
-- ---------------------------------------------------------------------------
alter table public.settings enable row level security;

drop policy if exists "Allow public read access for settings" on public.settings;
drop policy if exists "Allow authenticated admins to update settings" on public.settings;
drop policy if exists "Allow public insert for settings" on public.settings;
drop policy if exists "Allow admin write for settings" on public.settings;

-- La web necesita leer la configuración pública (horarios, contacto...).
create policy "Allow public read access for settings" on public.settings
  for select using (true);

create policy "Allow admin write for settings" on public.settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- 6. Limitación del plazo de conservación (art. 5.1.e RGPD)
-- ---------------------------------------------------------------------------
-- Los mensajes de contacto se conservan 12 meses, en coherencia con lo que se
-- declara en la política de privacidad de la web.

create or replace function public.purge_old_contact_messages(retention_months integer default 12)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted_count integer;
begin
  delete from public.messages
  where created_at < now() - make_interval(months => retention_months);

  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

comment on function public.purge_old_contact_messages(integer) is
  'Elimina los mensajes de contacto anteriores al plazo de conservación declarado (12 meses por defecto).';

revoke execute on function public.purge_old_contact_messages(integer) from public, anon;
grant execute on function public.purge_old_contact_messages(integer) to service_role;

-- Programación automática si la extensión pg_cron está disponible en el proyecto.
-- (En caso contrario, ejecutar la función mensualmente desde el panel de Supabase.)
do $$
begin
  if exists (select 1 from pg_available_extensions where name = 'pg_cron') then
    create extension if not exists pg_cron;

    if exists (select 1 from cron.job where jobname = 'purge_old_contact_messages') then
      perform cron.unschedule('purge_old_contact_messages');
    end if;

    perform cron.schedule(
      'purge_old_contact_messages',
      '0 4 1 * *', -- el día 1 de cada mes a las 04:00 UTC
      $cron$select public.purge_old_contact_messages(12);$cron$
    );
  else
    raise notice 'pg_cron no disponible: programa purge_old_contact_messages() manualmente.';
  end if;
exception
  -- La programación es opcional: si falla, no debe impedir que se apliquen las
  -- políticas de seguridad de esta migración.
  when others then
    raise notice 'No se pudo programar la purga automática (%). Prográmala desde el panel de Supabase.', sqlerrm;
end;
$$;

-- ---------------------------------------------------------------------------
-- 7. Índices de apoyo para las consultas del panel y la purga
-- ---------------------------------------------------------------------------
create index if not exists messages_created_at_idx on public.messages (created_at desc);
create index if not exists bookings_booking_date_idx on public.bookings (booking_date desc);
