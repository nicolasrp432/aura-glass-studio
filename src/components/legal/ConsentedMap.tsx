import { MapPin, ExternalLink } from "lucide-react";
import { openCookiePreferences, useConsent } from "@/lib/consent";
import { siteConfig, fullAddress } from "@/config/site";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.936666611586!2d-3.0076246234327575!3d43.32604677913419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4e5bb090b8e663%3A0xc3f6089cc5938833!2sCalle%20Urquijo%2C%2015%2C%2048930%20Getxo%2C%20Bizkaia!5e0!3m2!1ses!2ses!4v1715456789012!5m2!1ses!2ses";

/**
 * Mapa de Google que solo se carga si la persona ha dado su consentimiento.
 * Mientras tanto muestra un marcador de posición con la dirección y un enlace
 * para abrir el mapa en una ventana nueva, de modo que la información sigue
 * siendo accesible sin ceder datos a un tercero.
 */
const ConsentedMap = ({ className = "" }: { className?: string }) => {
  const consent = useConsent();

  if (consent?.externalMedia) {
    return (
      <div className={`relative h-full w-full ${className}`}>
        <iframe
          src={MAP_EMBED_SRC}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(1) contrast(1.2)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Ubicación de ${siteConfig.name}`}
        />
        <a
          href={siteConfig.contact.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 right-6 flex items-center gap-2 rounded-2xl bg-white/90 px-6 py-3 text-xs font-bold shadow-xl backdrop-blur-md transition-all hover:bg-white"
        >
          <MapPin size={14} className="text-gold" /> CÓMO LLEGAR
        </a>
      </div>
    );
  }

  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-muted to-secondary/60 p-6 text-center ${className}`}>
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold">
        <MapPin size={26} />
      </span>
      <div>
        <p className="font-display text-lg font-bold text-foreground">{fullAddress}</p>
        <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
          El mapa de Google no se carga hasta que aceptas el contenido externo, porque al mostrarlo
          Google recibiría tu dirección IP.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={openCookiePreferences}
          className="rounded-full bg-foreground px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-background transition-transform hover:-translate-y-0.5"
        >
          Cargar el mapa
        </button>
        <a
          href={siteConfig.contact.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-foreground transition-colors hover:border-foreground/40"
        >
          Abrir en Google Maps <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
};

export default ConsentedMap;
