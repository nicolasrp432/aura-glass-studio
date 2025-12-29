import { useState } from "react";
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
  AtSign
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "@/hooks/use-toast";

const TREATWELL_LINK = "https://www.treatwell.es/establecimiento/mani-pedi-1/";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Reserva",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulación de envío de formulario
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus("success");
      toast({
        title: "¡Mensaje enviado!",
        description: "Nos pondremos en contacto contigo lo antes posible.",
      });
      setFormData({ name: "", email: "", subject: "Reserva", message: "" });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error al enviar",
        description: "Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const contactInfo = [
    { icon: Phone, label: "Teléfono", value: "+34 944 123 456", href: "tel:+34944123456", sub: "Llámanos directamente" },
    { icon: Mail, label: "Email", value: "info@manipedi.es", href: "mailto:info@manipedi.es", sub: "Consultas generales" },
    { icon: MapPin, label: "Ubicación", value: "Urkijo Kalea, 15, Getxo", sub: "A 3 min del metro Areeta" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="orb orb-gold top-[-10%] right-[-10%] w-[40%] h-[40%]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="flex items-center justify-center gap-2 text-gold font-bold mb-4 tracking-[0.3em] uppercase text-xs">
              <MessageCircle size={14} /> Contacto & Reservas <MessageCircle size={14} />
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8">
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

      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">

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
                    className="glass-card p-8 rounded-[2rem] flex gap-6 items-center group hover:bg-white/90 transition-all"
                  >
                    <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                      <item.icon size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-xl font-bold text-foreground hover:text-gold transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-xl font-bold text-foreground">{item.value}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1 font-medium">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-[2.5rem] overflow-hidden h-72 relative group shadow-2xl border-white/50"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.936666611586!2d-3.0076246234327575!3d43.32604677913419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4e5bb090b8e663%3A0xc3f6089cc5938833!2sCalle%20Urquijo%2C%2015%2C%2048930%20Getxo%2C%20Bizkaia!5e0!3m2!1ses!2ses!4v1715456789012!5m2!1ses!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) contrast(1.2)' }}
                  allowFullScreen
                  loading="lazy"
                  title="Ubicación"
                />
                <div className="absolute inset-0 bg-gold/10 pointer-events-none mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl text-xs font-bold shadow-xl flex items-center gap-2 hover:bg-white transition-all"
                >
                  <MapPin size={14} className="text-gold" /> CÓMO LLEGAR
                </a>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-white/40 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] shadow-2xl border border-white/60 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                <Send size={200} />
              </div>

              <div className="mb-12 relative z-10">
                <h2 className="font-display text-4xl font-bold mb-4">Envíanos un <span className="text-gold">Mensaje</span></h2>
                <p className="text-muted-foreground font-medium">¿Tienes dudas? Responderemos en menos de 24h laborables.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-foreground/70 uppercase tracking-widest flex items-center gap-2">
                      <User size={14} className="text-gold" /> Tu Nombre
                    </label>
                    <input
                      type="text"
                      required
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
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Escribe aquí tu duda o petición especial..."
                    className="w-full bg-white/50 border-b-2 border-border focus:border-gold outline-none py-4 px-1 transition-all font-medium resize-none placeholder:text-muted-foreground/30"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto btn-primary py-5 px-12 text-sm flex items-center justify-center gap-3 relative overflow-hidden group shadow-xl shadow-primary/20"
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
                    className="w-full sm:w-auto bg-transparent border-2 border-gold text-gold px-10 py-5 rounded-[1.5rem] font-bold text-sm hover:bg-gold hover:text-white transition-all flex items-center justify-center gap-2"
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
      <section className="pb-32 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center p-12 glass-content rounded-[3rem] border-white/40"
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
