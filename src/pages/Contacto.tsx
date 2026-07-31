import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Train,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MessageCircle,
  User,
  AtSign,
  Instagram,
  Facebook
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import ConsentedMap from "@/components/legal/ConsentedMap";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { siteConfig } from "@/config/site";

const TREATWELL_LINK = siteConfig.booking.treatwell;

/** Límites alineados con las restricciones CHECK de la tabla `messages`. */
const FIELD_LIMITS = { name: 80, email: 120, subject: 120, message: 2000 };

/** Tiempo mínimo de cumplimentación por debajo del cual se asume envío automatizado. */
const MIN_FILL_TIME_MS = 2500;

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Reserva",
    message: ""
  });
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  /** Campo trampa invisible: solo los bots lo rellenan. */
  const [honeypot, setHoneypot] = useState("");
  const mountedAt = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedPrivacy) {
      toast({
        title: "Falta tu consentimiento",
        description: "Necesitamos que aceptes la política de privacidad para poder responderte.",
        variant: "destructive"
      });
      return;
    }

    // Antispam: descartamos en silencio los envíos automatizados.
    if (honeypot || Date.now() - mountedAt.current < MIN_FILL_TIME_MS) {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    setStatus("loading");

    try {
      // Guardamos el mensaje en la base de datos; un trigger notifica al centro por email.
      const { error: dbError } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name.trim().slice(0, FIELD_LIMITS.name),
            email: formData.email.trim().slice(0, FIELD_LIMITS.email),
            subject: formData.subject.trim().slice(0, FIELD_LIMITS.subject),
            message: formData.message.trim().slice(0, FIELD_LIMITS.message),
            created_at: new Date().toISOString()
          }
        ]);

      if (dbError) throw dbError;

      setStatus("success");
      toast({
        title: "¡Mensaje enviado!",
        description: "Nos pondremos en contacto contigo lo antes posible.",
      });
      setFormData({ name: "", email: "", subject: "Reserva", message: "" });
      setAcceptedPrivacy(false);
      mountedAt.current = Date.now();
    } catch (error: any) {
      // No registramos el contenido del mensaje ni los datos de la persona.
      console.error("Error sending message:", error?.code ?? "unknown_error");
      setStatus("error");
      toast({
        title: "Error al enviar",
        description: "No hemos podido enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const contactInfo = [
    { icon: Phone, label: "Teléfono", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phoneHref}`, sub: "Llámanos directamente" },
    { icon: Mail, label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}`, sub: "Consultas generales" },
    { icon: MapPin, label: "Ubicación", value: `${siteConfig.contact.address}, ${siteConfig.contact.city}`, href: siteConfig.contact.mapsUrl, sub: "A 3 min del metro Areeta" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-28 md:pt-40 pb-12 md:pb-20 relative overflow-hidden">
        <div className="absolute pointer-events-none -z-10 bg-gold/10 blur-3xl rounded-full top-[-10%] right-[-10%] w-64 md:w-[40%] h-64 md:h-[40%]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="flex items-center justify-center gap-2 text-gold font-bold mb-4 tracking-[0.3em] uppercase text-xs">
              <MessageCircle size={14} /> Contacto & Reservas <MessageCircle size={14} />
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 md:mb-8">
              Tu Momento <br />
              <span className="text-gold italic">Empieza Aquí</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Estamos aquí para cuidarte. Reserva tu cita online, visítanos o envíanos
              un mensaje para cualquier consulta sobre nuestros servicios.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 md:pb-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">

            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="grid gap-6">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] flex gap-4 md:gap-6 items-center group hover:bg-white/90 transition-all"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-gold/10 rounded-xl md:rounded-2xl flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                      <item.icon size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{item.label}</p>
                      {item.href ? (
                        <a 
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-xl font-bold text-foreground hover:text-gold transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-xl font-bold text-foreground">{item.value}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1 font-medium">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border-white/40"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="font-display text-2xl font-bold mb-1">Síguenos</h3>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">En nuestras redes sociales</p>
                  </div>
                  <div className="flex gap-4">
                    {[
                      { icon: Instagram, href: "https://www.instagram.com/manipedilasarenas/", label: "Instagram" },
                      { icon: Facebook, href: "https://www.facebook.com/manipedilarenas", label: "Facebook" }
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all shadow-sm group"
                        aria-label={social.label}
                      >
                        <social.icon size={24} className="group-hover:scale-110 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden h-64 md:h-72 relative group shadow-2xl border-white/50"
              >
                <ConsentedMap />
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-white/40 backdrop-blur-2xl p-6 md:p-10 lg:p-16 rounded-[1.5rem] md:rounded-[3rem] shadow-2xl border border-white/60 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                <Send size={200} />
              </div>

              <div className="mb-12 relative z-10">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Envíanos un <span className="text-gold">Mensaje</span></h2>
                <p className="text-muted-foreground font-medium">¿Tienes dudas? Responderemos en menos de 24h laborables.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-foreground/70 uppercase tracking-widest flex items-center gap-2">
                      <User size={14} className="text-gold" /> Tu Nombre
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={FIELD_LIMITS.name}
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Laura García"
                      className="w-full bg-white/50 border-b-2 border-border focus:border-gold outline-none py-4 px-1 transition-all font-medium placeholder:text-muted-foreground/30"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-foreground/70 uppercase tracking-widest flex items-center gap-2">
                      <AtSign size={14} className="text-gold" /> Email de Contacto
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={FIELD_LIMITS.email}
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="laura@ejemplo.com"
                      className="w-full bg-white/50 border-b-2 border-border focus:border-gold outline-none py-4 px-1 transition-all font-medium placeholder:text-muted-foreground/30"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-foreground/70 uppercase tracking-widest flex items-center gap-2">
                    <MessageCircle size={14} className="text-gold" /> Tu Consulta
                  </label>
                  <textarea
                    required
                    rows={4}
                    maxLength={FIELD_LIMITS.message}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Escribe aquí tu duda o petición especial..."
                    className="w-full bg-white/50 border-b-2 border-border focus:border-gold outline-none py-4 px-1 transition-all font-medium resize-none placeholder:text-muted-foreground/30"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    No incluyas datos de salud ni información sensible: si es relevante para tu
                    tratamiento, lo valoramos en cabina.
                  </p>
                </div>

                {/* Campo trampa antispam: invisible y fuera del foco para las personas usuarias */}
                <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
                  <label htmlFor="company-website">No rellenar</label>
                  <input
                    id="company-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Consentimiento informado (art. 6.1.a y 13 RGPD) */}
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border/60 bg-white/40 p-4">
                  <input
                    type="checkbox"
                    required
                    checked={acceptedPrivacy}
                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                    className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[hsl(var(--primary))]"
                  />
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    He leído y acepto la{" "}
                    <Link to="/privacidad" className="font-bold text-gold underline-offset-4 hover:underline">
                      Política de Privacidad
                    </Link>
                    . Tus datos los trata {siteConfig.name} con la única finalidad de responder a tu
                    consulta, se conservan un máximo de {siteConfig.retention.contactMessagesMonths}{" "}
                    meses y no se ceden a terceros con fines comerciales. Puedes ejercer tus derechos
                    de acceso, rectificación y supresión escribiendo a{" "}
                    <a
                      href={`mailto:${siteConfig.contact.privacyEmail}`}
                      className="font-semibold underline-offset-4 hover:underline"
                    >
                      {siteConfig.contact.privacyEmail}
                    </a>
                    .
                  </span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 pt-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto btn-primary py-4 md:py-5 px-8 md:px-12 text-sm flex items-center justify-center gap-3 relative overflow-hidden group shadow-xl shadow-primary/20"
                  >
                    <AnimatePresence mode="wait">
                      {status === "loading" ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"
                        />
                      ) : status === "success" ? (
                        <motion.div
                          key="success"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 size={20} /> ENVIADO
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          className="flex items-center gap-3"
                        >
                          ENVIAR MENSAJE <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-bold">
                    <span className="w-10 h-[1px] bg-border" />
                    O TAMBIÉN
                    <span className="w-10 h-[1px] bg-border" />
                  </div>

                  <a
                    href={TREATWELL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-transparent border-2 border-gold text-gold px-6 md:px-10 py-4 md:py-5 rounded-[1rem] md:rounded-[1.5rem] font-bold text-sm hover:bg-gold hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    RESERVAR AHORA <ExternalLink size={16} />
                  </a>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="pb-20 md:pb-32 container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center p-8 md:p-12 glass-content rounded-[2rem] md:rounded-[3rem] border-white/40"
        >
          <Sparkles className="mx-auto text-gold mb-6" size={32} />
          <p className="font-display text-2xl italic text-foreground max-w-2xl mx-auto">
            "La belleza es una actitud, pero un buen cuidado es la base. Estamos
            aquí para que te sientas segura en cada paso."
          </p>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Contacto;
