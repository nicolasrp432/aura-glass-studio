-- ============================================================================
-- ⚠️  SCRIPT OBSOLETO — NO EJECUTAR
--
-- Este script otorgaba permisos de INSERT y UPDATE al rol anónimo sobre las
-- tablas del catálogo, la configuración y las reservas (`WITH CHECK (true)`).
-- Como la clave anon es pública (viaja en el bundle de la web), cualquiera
-- podía modificar el contenido del sitio y acceder a datos personales de la
-- clientela.
--
-- Se ha sustituido por:
--   supabase/migrations/20260731_data_protection_hardening.sql
--
-- Para cargar datos iniciales, ejecuta los scripts de seeding con la
-- SUPABASE_SERVICE_ROLE_KEY (ver scripts/seed.js), que ignora las políticas RLS
-- y nunca debe exponerse en el frontend.
-- ============================================================================

do $$
begin
  raise exception
    'Script obsoleto: abría el acceso público de escritura. Usa supabase/migrations/20260731_data_protection_hardening.sql';
end;
$$;
