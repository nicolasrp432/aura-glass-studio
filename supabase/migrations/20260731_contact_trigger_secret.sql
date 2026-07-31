-- ============================================================================
-- Notificación del formulario de contacto: autenticación y tolerancia a fallos.
--
-- Cambios respecto a 20260520_contact_email_trigger.sql:
--   1. La llamada a la Edge Function incluye la cabecera `x-webhook-secret`
--      cuando el secreto está configurado, de forma que la función deja de ser
--      un relé de correo abierto a cualquiera que conozca su URL.
--   2. La URL de la función deja de estar codificada y se puede configurar.
--   3. Si la notificación falla, el mensaje se guarda igualmente: antes un
--      error de red hacía fallar el INSERT y la consulta de la clienta se
--      perdía.
--
-- Configuración (una sola vez, como propietario de la base de datos):
--   alter database postgres set app.contact_webhook_secret = '<mismo valor que
--     la variable CONTACT_WEBHOOK_SECRET de la Edge Function>';
--   alter database postgres set app.contact_function_url =
--     'https://<project-ref>.supabase.co/functions/v1/send-contact-email';
-- ============================================================================

create extension if not exists pg_net;

create or replace function public.notify_contact_message()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  function_url text := coalesce(
    nullif(current_setting('app.contact_function_url', true), ''),
    'https://rentavxwwgfvfupnfrdl.supabase.co/functions/v1/send-contact-email'
  );
  webhook_secret text := nullif(current_setting('app.contact_webhook_secret', true), '');
  request_headers jsonb := jsonb_build_object('Content-Type', 'application/json');
begin
  if webhook_secret is not null then
    request_headers := request_headers || jsonb_build_object('x-webhook-secret', webhook_secret);
  end if;

  begin
    perform net.http_post(
      url := function_url,
      headers := request_headers,
      body := jsonb_build_object(
        'type', 'INSERT',
        'record', jsonb_build_object(
          'name', new.name,
          'email', new.email,
          'subject', coalesce(new.subject, 'Reserva'),
          'message', new.message
        )
      )
    );
  exception
    when others then
      -- La consulta de la clienta no debe perderse porque falle el email.
      raise warning 'notify_contact_message: no se pudo encolar la notificación (%).', sqlstate;
  end;

  return new;
end;
$$;

drop trigger if exists trg_notify_contact_message on public.messages;

create trigger trg_notify_contact_message
after insert on public.messages
for each row
execute function public.notify_contact_message();
