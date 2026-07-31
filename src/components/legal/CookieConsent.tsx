import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";
import { onPreferencesRequested, readConsent, saveConsent } from "@/lib/consent";

/**
 * Banner de consentimiento. Solo pide permiso para el contenido incrustado de
 * terceros (mapa de Google), única tecnología del sitio que puede instalar
 * cookies o comunicar la IP a un tercero. Nada de terceros se carga hasta que
 * la persona decide, y rechazar es tan sencillo como aceptar.
 */
const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!readConsent()) setIsVisible(true);
    return onPreferencesRequested(() => {
      setShowDetails(true);
      setIsVisible(true);
    });
  }, []);

  const decide = (externalMedia: boolean) => {
    saveConsent(externalMedia);
    setIsVisible(false);
    setShowDetails(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          role="dialog"
          aria-modal="false"
          aria-label="Preferencias de privacidad"
          /* z-[110] mantiene el banner por encima del widget flotante de WhatsApp (z-[100]) */
          className="fixed inset-x-3 bottom-3 z-[110] mx-auto max-w-3xl rounded-[1.5rem] border border-white/60 bg-white/90 p-5 shadow-2xl backdrop-blur-2xl md:inset-x-6 md:bottom-6 md:rounded-[2rem] md:p-7"
        >
          <div className="flex items-start gap-4">
            <span className="hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold sm:flex">
              <Cookie size={22} />
            </span>

            <div className="min-w-0 flex-1">
              <h2 className="font-display text-lg font-bold text-foreground md:text-xl">
                Tu privacidad, en tus manos
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Esta web no usa cookies de publicidad ni de analítica. Solo necesitamos tu permiso
                para mostrar el mapa de Google con nuestra ubicación, ya que al cargarlo se conecta
                con un tercero. Puedes cambiar tu decisión cuando quieras desde la{" "}
                <Link to="/cookies" className="font-semibold text-gold underline-offset-4 hover:underline">
                  Política de Cookies
                </Link>
                .
              </p>

              <AnimatePresence>
                {showDetails && (
                  <motion.dl
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-3 overflow-hidden text-sm"
                  >
                    <div className="rounded-2xl border border-border/60 bg-white/60 p-4">
                      <dt className="font-bold text-foreground">
                        Técnicas y necesarias · siempre activas
                      </dt>
                      <dd className="mt-1 text-muted-foreground">
                        Almacenamiento local para recordar tu decisión sobre privacidad y el
                        contenido del carrito. No se comparten con terceros y están exentas de
                        consentimiento.
                      </dd>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-white/60 p-4">
                      <dt className="font-bold text-foreground">
                        Contenido externo · requiere tu permiso
                      </dt>
                      <dd className="mt-1 text-muted-foreground">
                        Mapa de Google Maps con la ubicación del centro. Al activarlo, Google puede
                        instalar cookies y recibir tu dirección IP. Si lo rechazas, seguirás viendo
                        la dirección y el enlace para abrir el mapa en una ventana nueva.
                      </dd>
                    </div>
                  </motion.dl>
                )}
              </AnimatePresence>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => decide(true)}
                  className="btn-primary whitespace-nowrap px-8 py-3 text-xs font-black uppercase tracking-[0.15em]"
                >
                  Aceptar
                </button>
                <button
                  type="button"
                  onClick={() => decide(false)}
                  className="whitespace-nowrap rounded-[1rem] border-2 border-foreground/15 px-8 py-3 text-xs font-black uppercase tracking-[0.15em] text-foreground transition-colors hover:border-foreground/40"
                >
                  Rechazar
                </button>
                <button
                  type="button"
                  onClick={() => setShowDetails((value) => !value)}
                  className="px-2 py-3 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showDetails ? "Ocultar detalles" : "Configurar"}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => decide(false)}
              aria-label="Cerrar y aceptar solo lo necesario"
              className="flex-shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
