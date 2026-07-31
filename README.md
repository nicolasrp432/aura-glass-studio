# ✨ Mani Pedi Getxo - Web Oficial

Documentación profesional del sistema de gestión y portal web para el salón de belleza **Mani Pedi Getxo**.

---

## 📖 Descripción del Proyecto

**Mani Pedi Getxo** es una plataforma web integral diseñada para un centro de estética de alta gama especializado en el cuidado de manos y pies, así como en tratamientos de belleza avanzados. El proyecto no solo sirve como una vitrina digital elegante y moderna para atraer nuevos clientes, sino que también funciona como una herramienta de gestión interna y ventas.

### Propósito y Objetivos
- **Presencia Digital Premium:** Ofrecer una experiencia de usuario fluida y visualmente atractiva que refleje la calidad y el lujo de los servicios presenciales.
- **Gestión Centralizada:** Permitir a los administradores gestionar el catálogo de servicios, visualizar métricas y administrar la tienda desde un solo lugar.
- **Venta de Productos:** Facilitar la compra de productos de belleza especializados a través de una tienda integrada con pagos seguros.
- **Conexión Directa:** Optimizar la comunicación con el cliente mediante integraciones de WhatsApp y formularios de contacto.

---

## 🚀 Qué puedes hacer

Como usuario o administrador de la plataforma, dispones de las siguientes capacidades:

- **Explorar el Menú de Servicios:** Navegar por un catálogo detallado de tratamientos que incluye manicura, pedicura, lifting de pestañas, limpieza facial y maderoterapia.
- **Galería de Trabajos:** Visualizar una galería fotográfica de alta resolución con los resultados de los tratamientos realizados.
- **Conocer al Equipo:** Consultar los perfiles de las profesionales encargadas de los servicios.
- **Contacto Rápido:** Formulario de contacto, teléfono y acceso directo a reservas vía WhatsApp y Treatwell.
- **Información legal:** Política de privacidad, aviso legal y política de cookies, con gestión del consentimiento.

### Módulos en desarrollo (no publicados)

- **Tienda Online:** carrito y pasarela de pago (Stripe). Desactivada mediante `features.shop` en `src/config/site.ts`.
- **Panel de Administración (Dashboard):** gestión de catálogo, reservas y configuración. Sin terminar.

---

## 🔐 Acceso Administrativo

> [!IMPORTANT]
> El panel de administración **está sin terminar y no se publica**. Sus rutas solo se registran si
> la build define `VITE_ENABLE_ADMIN=true`; en producción, `/admin` devuelve la página 404.
> Mientras tanto, los mensajes del formulario de contacto llegan por email y los datos se consultan
> desde el panel de Supabase, con acceso limitado al personal autorizado.

Para trabajar en el panel en local, arranca el proyecto con la variable habilitada:

```bash
VITE_ENABLE_ADMIN=true npm run dev
```

Las credenciales son confidenciales y no deben figurar en este repositorio. La documentación de
protección de datos del proyecto está en [`docs/AUDITORIA-PROTECCION-DATOS.md`](docs/AUDITORIA-PROTECCION-DATOS.md).

---

## 🛠️ Tecnologías Utilizadas

Este proyecto utiliza un stack tecnológico moderno enfocado en el rendimiento y la escalabilidad:

- **Frontend:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Backend & Auth:** [Supabase](https://supabase.com/)
- **Gestión de Estado:** [Zustand](https://docs.pmnd.rs/zustand/) & [React Query](https://tanstack.com/query/latest)
- **Pagos:** [Stripe API](https://stripe.com/)
- **Iconos:** [Lucide React](https://lucide.dev/)

---

## 💻 Configuración para Desarrolladores

### Requisitos Previos
- Node.js (v18 o superior)
- npm o bun

### Instalación
1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar las variables de entorno en un archivo `.env` (basarse en `.env.example`).
4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### Formulario de contacto
- El formulario guarda el mensaje en la tabla `messages`.
- Un trigger en Supabase llama a la Edge Function `send-contact-email`.
- La Edge Function usa Resend para enviar el correo.

### Variables de correo
- `RESEND_API_KEY` en Supabase Edge Functions.
- `RESEND_FROM` opcional, por defecto `ManiPedi Web <info@manipedibellezaintegral.es>`.
- `CONTACT_NOTIFICATION_EMAIL` opcional.

### Prueba local
1. Ejecuta `npm run dev`.
2. Abre `/contacto`.
3. Envía un mensaje de prueba.
4. Verifica en Supabase que la fila aparece en `messages`.
5. Verifica en Supabase Logs que la función `send-contact-email` se ejecutó.
6. Si no llega el correo, revisa que el `from` esté verificado en Resend.
7. Prueba directa por terminal:
   ```bash
   node scripts/test-contact-email.js
   ```
8. Prueba del trigger:
   ```bash
   node scripts/test-contact-email.js insert
   ```

---

## 🚢 Despliegue

El proyecto está preparado para ser desplegado en plataformas como Vercel o Netlify. Asegúrate de configurar correctamente las variables de entorno de Supabase y Stripe en el panel de control de tu proveedor de hosting.

---

## 📄 Licencia

Este proyecto es de propiedad privada para **Mani Pedi Getxo**. Todos los derechos reservados.
