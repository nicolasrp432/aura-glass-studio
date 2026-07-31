/**
 * Política de seguridad de contenidos (CSP) y cabeceras asociadas.
 *
 * Se define en un único sitio y se usa en dos lugares:
 *  - vite.config.ts la inyecta como <meta http-equiv> en la build de producción,
 *    para que aplique en cualquier proveedor de hosting.
 *  - public/_headers la publica como cabecera HTTP real en Netlify/Cloudflare
 *    Pages, donde además puede aplicarse `frame-ancestors`.
 *
 * Al añadir un servicio externo nuevo (analítica, chat, vídeo…) hay que
 * incluir su dominio aquí o el navegador lo bloqueará.
 */
export const CSP_DIRECTIVES: Record<string, string[]> = {
  "default-src": ["'self'"],
  // Stripe se mantiene permitido para cuando se reactive la tienda.
  "script-src": ["'self'", "https://js.stripe.com"],
  // Tailwind y framer-motion aplican estilos en línea; Google Fonts sirve la hoja de estilos.
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
  // Las imágenes pueden venir del almacenamiento de Supabase o de URLs externas del catálogo.
  "img-src": ["'self'", "data:", "blob:", "https:"],
  "media-src": ["'self'"],
  "connect-src": [
    "'self'",
    "https://*.supabase.co",
    "wss://*.supabase.co",
    "https://api.stripe.com",
  ],
  // Mapa de Google (solo tras consentimiento) y pasarela de Stripe.
  "frame-src": ["https://www.google.com", "https://js.stripe.com", "https://hooks.stripe.com"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
};

export const buildCspValue = (extra: Record<string, string[]> = {}) =>
  Object.entries({ ...CSP_DIRECTIVES, ...extra })
    .map(([directive, values]) => `${directive} ${values.join(" ")}`)
    .join("; ");
