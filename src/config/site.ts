/**
 * Datos identificativos del negocio y de tratamiento de datos.
 *
 * IMPORTANTE (RGPD / LSSI-CE): los campos marcados como PENDIENTE deben
 * completarse con los datos reales antes de publicar. La ley exige que el
 * aviso legal y la política de privacidad identifiquen al responsable con
 * su denominación social, NIF y domicilio.
 */

export const PENDIENTE = "[COMPLETAR]";

export const siteConfig = {
  /** Nombre comercial visible en la web */
  name: "Mani Pedi Las Arenas",
  url: "https://manipedilasarenas.com",

  /** Identificación del responsable del tratamiento */
  legal: {
    /** Denominación social o nombre y apellidos del titular */
    companyName: PENDIENTE,
    /** NIF / CIF del titular */
    taxId: PENDIENTE,
    /** Domicilio social o fiscal completo */
    registeredAddress: PENDIENTE,
    /** Datos registrales, si el titular es una sociedad mercantil */
    registryInfo: PENDIENTE,
  },

  contact: {
    address: "Urkijo Kalea, 15",
    postalCode: "48930",
    city: "Getxo (Las Arenas)",
    province: "Bizkaia",
    country: "España",
    phone: "+34 846 66 54 92",
    /** Mismo número en formato E.164, para enlaces tel: */
    phoneHref: "+34846665492",
    /** Mismo número sin signos, para enlaces wa.me */
    whatsappHref: "34846665492",
    email: "manipedilasarenas18@gmail.com",
    /** Dirección para el ejercicio de derechos RGPD */
    privacyEmail: "manipedilasarenas18@gmail.com",
    mapsUrl: "https://maps.app.goo.gl/vafawG18eUhB3EJb8",
  },

  social: {
    instagram: "https://www.instagram.com/manipedilasarenas/",
    facebook: "https://www.facebook.com/manipedilarenas",
  },

  booking: {
    treatwell: "https://www.treatwell.es/establecimiento/mani-pedi-1/",
  },

  /**
   * Plazos de conservación declarados en la política de privacidad.
   * Deben coincidir con la limpieza real de datos (ver
   * supabase/migrations/*_data_protection_hardening.sql).
   */
  retention: {
    contactMessagesMonths: 12,
    bookingsYears: 5,
  },

  /** Encargados de tratamiento y terceros con acceso a datos */
  processors: [
    {
      name: "Supabase Inc.",
      purpose: "Alojamiento de la base de datos y autenticación",
      location: "UE / EE. UU. (Cláusulas Contractuales Tipo)",
      url: "https://supabase.com/privacy",
    },
    {
      name: "Resend (Plus Five Five, Inc.)",
      purpose: "Envío de las notificaciones de email del formulario",
      location: "EE. UU. (Cláusulas Contractuales Tipo)",
      url: "https://resend.com/legal/privacy-policy",
    },
    {
      name: "Google Ireland Ltd.",
      purpose: "Mapa de localización incrustado y tipografías web",
      location: "UE / EE. UU. (Marco de Privacidad de Datos UE-EE. UU.)",
      url: "https://policies.google.com/privacy",
    },
    {
      name: "Treatwell (Wahanda Ltd.)",
      purpose: "Plataforma externa de reserva de citas",
      location: "UE / Reino Unido",
      url: "https://www.treatwell.es/privacidad/",
    },
  ],
} as const;

export const fullAddress = `${siteConfig.contact.address}, ${siteConfig.contact.postalCode} ${siteConfig.contact.city}, ${siteConfig.contact.province}`;

/**
 * Funcionalidades que no forman parte de la web pública.
 *
 * Mantenerlas desactivadas reduce la superficie expuesta: lo que no está
 * terminado no debe ser accesible desde internet, y así el sitio publicado
 * solo trata los datos que realmente necesita (art. 5.1.c y 25 RGPD).
 */
export const features = {
  /** Tienda online: en desarrollo. Con `false` no se monta el carrito. */
  shop: false,
  /**
   * Panel de administración: sin terminar. Solo se registran sus rutas si la
   * build define VITE_ENABLE_ADMIN=true; en producción permanece inaccesible.
   */
  admin: import.meta.env.VITE_ENABLE_ADMIN === "true",
} as const;
