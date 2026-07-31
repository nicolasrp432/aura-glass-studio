# Auditoría de seguridad y protección de datos

**Proyecto:** web de Mani Pedi Las Arenas (React + Vite + Supabase)
**Fecha:** 31 de julio de 2026
**Alcance:** código del repositorio, configuración de la base de datos y de la Edge Function,
cumplimiento del RGPD/LOPDGDD y de la LSSI-CE en la parte pública del sitio.

> Este documento describe el estado del proyecto y las acciones aplicadas en el repositorio.
> Las tareas de la sección «Pendiente» requieren acceso a paneles externos (Supabase, Stripe,
> hosting) y no pueden resolverse desde el código.

---

## 1. Resumen ejecutivo

| Área | Antes | Después |
| --- | --- | --- |
| Acceso a datos personales en base de datos | ❌ Reservas y configuración accesibles y modificables por cualquiera | ✅ Restringido a cuentas de administración |
| Información y consentimiento en el formulario | ❌ Sin cláusula informativa ni consentimiento | ✅ Consentimiento expreso + información básica en capas |
| Páginas legales | ❌ Los tres enlaces del pie daban 404 | ✅ Privacidad, aviso legal y cookies publicados |
| Contenido de terceros (Google Maps) | ❌ Se cargaba sin consentimiento | ✅ Bloqueado hasta aceptación, con alternativa accesible |
| Cabeceras de seguridad / CSP | ❌ Ninguna | ✅ CSP + HSTS + anti-clickjacking + Permissions-Policy |
| Relé de correo (Edge Function) | ❌ Abierto y con inyección HTML | ✅ Validado, escapado, con secreto y límite de peticiones |
| Retención de datos | ❌ Indefinida | ✅ Purga automática a 12 meses, coherente con lo publicado |
| Secretos | ❌ Clave *live* de Stripe en el historial de git | ⚠️ Requiere rotación manual (ver §5) |

---

## 2. Fortalezas encontradas

- **Arquitectura moderna y sin exceso de terceros.** No hay Google Analytics, ni píxel de Meta, ni
  gestores de etiquetas: la superficie de recogida de datos es mínima, lo que simplifica mucho el
  cumplimiento.
- **Separación correcta de claves publicables y secretas en el frontend.** El cliente solo usa la
  URL del proyecto y la clave publicable de Supabase mediante variables `VITE_`.
- **RLS activado en todas las tablas** desde la migración inicial (el problema estaba en las
  políticas, no en la falta de RLS).
- **Autenticación real para el panel de administración** mediante Supabase Auth, con comprobación
  de rol y cierre de sesión, en lugar de una contraseña incrustada en el código.
- **Datos de negocio con respaldo local** (`src/data/services.json`): si la base de datos falla, la
  web sigue mostrando el catálogo.
- **Enlaces externos con `rel="noopener noreferrer"`** de forma sistemática.
- **Sin uso de `dangerouslySetInnerHTML`** en el código de la aplicación: no hay vectores de XSS por
  inyección de HTML en el frontend.

---

## 3. Debilidades detectadas y corregidas en este repositorio

### 3.1 Crítico — Datos personales de la clientela accesibles públicamente

`supabase/migrations/20260126_admin_features.sql` definía:

```sql
CREATE POLICY "Allow authenticated admins to manage bookings" ON bookings
    FOR ALL USING (true);
```

y `scripts/fix_rls_policies.sql` concedía además `INSERT`/`UPDATE` al rol anónimo sobre el catálogo
y la configuración. Como la clave anon viaja en el bundle público de la web, **cualquier persona
podía leer, modificar o borrar todas las reservas** —nombre, email, teléfono y notas— y alterar el
contenido del sitio. Es una brecha de datos personales notificable en el sentido del art. 33 RGPD.

**Corregido en** `supabase/migrations/20260731_data_protection_hardening.sql`:

- función `public.is_admin()` basada en el rol del JWT;
- catálogo (`services`, `team`, `testimonials`, `products`, `gallery`): lectura pública, escritura
  solo administración;
- `bookings`: alta pública limitada (solo estado `pending`, fechas no pasadas, longitudes acotadas),
  lectura y gestión solo administración;
- `messages`: alta pública validada, lectura y borrado solo administración;
- `settings`: lectura pública, escritura solo administración;
- restricciones `CHECK` de longitud como defensa en profundidad;
- `scripts/fix_rls_policies.sql` queda anulado para que nadie lo vuelva a ejecutar.

### 3.2 Alto — La Edge Function era un relé de correo abierto

`verify_jwt = false`, `Access-Control-Allow-Origin: *` y sin validación: cualquiera que conociera la
URL podía enviar correos ilimitados al centro, con contenido y `reply_to` controlados por quien
atacase. Además, `${name}` y `${message}` se interpolaban sin escapar en el HTML del email
(inyección de HTML/enlaces de phishing en la bandeja del centro) y se registraban nombre y email en
los logs.

**Corregido en** `supabase/functions/send-contact-email/index.ts`: escapado de HTML, validación de
formato y longitud, lista blanca de orígenes, secreto compartido opcional
(`CONTACT_WEBHOOK_SECRET`), límite de 5 peticiones por minuto e IP, y logs sin datos personales.
El trigger de base de datos se actualiza en `20260731_contact_trigger_secret.sql` para enviar el
secreto y para **no perder el mensaje de la clienta si falla el envío del email** (antes, un error
de red hacía fallar el `INSERT`).

### 3.3 Alto — Incumplimiento del deber de información y consentimiento

El formulario de contacto recogía nombre, email y texto libre sin cláusula informativa, sin
consentimiento y sin enlace a una política de privacidad (arts. 6, 7 y 13 RGPD). Los tres enlaces
legales del pie (`/privacidad`, `/legal`, `/cookies`) devolvían un 404.

**Corregido:** nuevas páginas `/privacidad`, `/aviso-legal` y `/cookies`, casilla de consentimiento
obligatoria con información básica en el propio formulario, y aviso para no incluir datos de salud
en el mensaje (evita tratar datos del art. 9 RGPD sin base jurídica reforzada).

### 3.4 Medio — Google Maps se cargaba sin consentimiento

El iframe de Google Maps se cargaba en cuanto se abría `/contacto`, comunicando la IP de la
visitante a Google y permitiendo cookies de terceros antes de cualquier consentimiento.

**Corregido:** banner de consentimiento (`CookieConsent`) y carga diferida del mapa
(`ConsentedMap`), con rechazo tan accesible como la aceptación, decisión almacenada con fecha y
versión, y caducidad a 12 meses. Mientras no se acepta, se muestra la dirección y un enlace para
abrir el mapa en una ventana nueva.

### 3.5 Medio — Ausencia total de cabeceras de seguridad

No había CSP, ni HSTS, ni protección anti-clickjacking.

**Corregido:** `src/config/security.ts` como fuente única, inyección de la CSP en la build de
producción (`vite.config.ts`), y cabeceras HTTP en `public/_headers` (Netlify/Cloudflare Pages) y
`vercel.json` (Vercel). Se ha verificado en la build de producción que no se bloquea ningún recurso
legítimo.

### 3.6 Medio — Superficie de abuso del formulario

Sin límite de longitud, sin antispam y sin control de bots.

**Corregido:** límites de longitud en cliente, base de datos y Edge Function; campo trampa
(honeypot); descarte de envíos en menos de 2,5 s; y límite de peticiones en la función.

### 3.7 Bajo — Otros hallazgos

| Hallazgo | Acción |
| --- | --- |
| `.env.example` contenía la URL y la clave publicable reales del proyecto | Sustituidas por marcadores |
| Scripts de seeding escribiendo con la clave anon (dependían del agujero de RLS) | Ahora exigen `SUPABASE_SERVICE_ROLE_KEY` |
| `robots.txt` permitía indexar `/admin` | `Disallow: /admin` + `X-Robots-Tag: noindex` y `sitemap.xml` |
| Teléfono del pie: el texto decía `+34 846 66 54 92` y el enlace llamaba a `+34 944 123 456` | Corregido y centralizado en `src/config/site.ts` |
| Datos de contacto duplicados por todo el código | Centralizados en `src/config/site.ts` |
| Sin plazo de conservación | Función `purge_old_contact_messages()` programada mensualmente |
| `react-router-dom` con vulnerabilidades conocidas | Actualizado a 6.30.4 |

---

## 4. Verificación realizada

- **Migraciones ejecutadas sobre una base PostgreSQL 16 de prueba**, simulando los roles `anon`,
  `authenticated` y una cuenta con rol `admin`. Resultado:

  | Prueba | Resultado |
  | --- | --- |
  | `anon` intenta leer reservas / mensajes | 0 filas |
  | `anon` intenta borrar reservas o modificar catálogo y configuración | 0 filas afectadas |
  | `anon` lee el catálogo público | correcto |
  | `anon` envía un mensaje válido / solicita cita | correcto |
  | `anon` envía email inválido, mensaje de 5.000 caracteres o reserva ya «confirmada» | rechazado por RLS |
  | Cuenta con rol `admin` lee reservas y mensajes y edita el catálogo | correcto |
  | Cuenta autenticada **sin** rol admin | 0 filas, 0 modificaciones |
  | `purge_old_contact_messages(12)` sobre un mensaje de hace 18 meses | 1 mensaje eliminado |

  > Detalle a tener en cuenta: como `anon` no tiene política de lectura, las altas deben hacerse sin
  > devolver la fila (`insert` sin `.select()`, que es lo que hace la web).

- `npm run build` correcto con la CSP activa.
- Recorrido en navegador de la build de producción: **sin violaciones de CSP** ni errores de
  JavaScript.
- Flujo de consentimiento comprobado: el banner aparece, «Rechazar» impide la carga del iframe de
  Google (0 iframes), «Aceptar» lo carga (1 iframe) y la decisión persiste entre páginas.
- Las tres páginas legales renderizan y son accesibles desde el pie.
- Formulario de contacto: no se envía sin marcar el consentimiento.

---

## 5. Pendiente — acciones que deben hacerse fuera del repositorio

Ordenadas por urgencia.

1. **🔴 Rotar la clave secreta de Stripe.** El historial de git contiene un archivo `.env` con una
   clave restringida **en vivo** (`rk_live_…`) y una clave anon antigua de Supabase. Aunque el
   archivo se eliminó del árbol de trabajo, **sigue siendo recuperable en el historial**. Hay que
   revocar esa clave en el panel de Stripe y emitir una nueva. Conviene revisar también si el
   repositorio es público y, si procede, reescribir el historial.
2. **🔴 Aplicar las migraciones nuevas en Supabase.** Mientras no se ejecuten
   `20260731_data_protection_hardening.sql` y `20260731_contact_trigger_secret.sql`, las reservas
   siguen expuestas. Ejecutar en el SQL Editor del proyecto, en ese orden.
3. **🔴 Asignar el rol de administración** a las cuentas del personal:
   `supabase.auth.admin.updateUserById(<id>, { app_metadata: { role: 'admin' } })`, con la
   service_role key. Después puede eliminarse el email de respaldo de `public.is_admin()`.
4. **🟠 Completar los datos legales** marcados como `[COMPLETAR]` en `src/config/site.ts`:
   denominación social o nombre del titular, NIF y domicilio. Sin ellos, el aviso legal no cumple el
   art. 10 LSSI-CE.
5. **🟠 Configurar los secretos de la Edge Function**: `CONTACT_WEBHOOK_SECRET` (y el mismo valor en
   `alter database postgres set app.contact_webhook_secret = '…'`) y `ALLOWED_ORIGINS` con el
   dominio real.
6. **🟠 Comprobar el registro público en Supabase Auth.** Si está abierto, cualquiera podría crearse
   una cuenta; con las políticas nuevas no accedería a datos personales, pero conviene desactivarlo
   si no se usa. Activar además la protección contra contraseñas filtradas y MFA para el personal.
7. **🟡 Documentación obligatoria de cumplimiento**: registro de actividades de tratamiento (art. 30
   RGPD) y contratos de encargo firmados con Supabase, Resend, Google y Treatwell.
8. **🟡 Consentimiento de imagen** de las fotografías de la galería y del equipo en las que aparecen
   personas identificables.
9. **🟡 Verificar el número de WhatsApp**: el widget apunta a `wa.me/34944123456`, que no coincide
   con el teléfono publicado. No se ha modificado porque se desconoce cuál es el correcto.
10. **🟡 Actualizaciones diferidas**: `vite` y `esbuild` tienen avisos que solo afectan al servidor de
    desarrollo y su corrección exige un salto de versión mayor; `react-router` mantiene un aviso de
    *open redirect* cuya solución definitiva es migrar a la versión 7. Ninguno afecta al sitio
    publicado, pero conviene planificarlos.
11. **🟢 Mejora opcional**: servir las tipografías desde el propio dominio en lugar de Google Fonts,
    para evitar por completo la comunicación de la IP a Google.

---

## 6. Archivos relevantes

```
src/config/site.ts                                      Datos del responsable y plazos de conservación
src/config/security.ts                                  Fuente única de la CSP
src/lib/consent.ts                                      Registro y caducidad del consentimiento
src/components/legal/CookieConsent.tsx                  Banner de consentimiento
src/components/legal/ConsentedMap.tsx                   Mapa bajo consentimiento previo
src/pages/legal/{Privacidad,AvisoLegal,Cookies}.tsx     Documentos legales
supabase/migrations/20260731_data_protection_hardening.sql   Políticas RLS y retención
supabase/migrations/20260731_contact_trigger_secret.sql      Trigger autenticado y tolerante a fallos
supabase/functions/send-contact-email/index.ts          Edge Function endurecida
public/_headers · vercel.json                           Cabeceras de seguridad
```
