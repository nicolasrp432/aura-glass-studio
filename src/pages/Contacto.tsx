import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Train, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";

const TREATWELL_LINK = "https://www.treatwell.es/establecimiento/mani-pedi-1/";

const Contacto = () => {
  return (
    <Layout>
      <section className="pt-32 pb-16 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-primary font-medium mb-4 tracking-widest uppercase text-sm">Contacto</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">Reserva tu cita</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Reserva fácilmente a través de Treatwell o visítanos en nuestro salón</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="font-display text-2xl font-bold mb-8">Información de contacto</h2>
              <div className="space-y-6 mb-10">
                {[
                  { icon: Phone, label: "Teléfono", value: "+34 944 123 456", href: "tel:+34944123456" },
                  { icon: Mail, label: "Email", value: "info@manipedi.es", href: "mailto:info@manipedi.es" },
                  { icon: MapPin, label: "Dirección", value: "Urkijo Kalea, 15\n48930 Getxo, Bizkaia" },
                  { icon: Train, label: "Transporte", value: "A 3 min a pie del metro Areeta" },
                  { icon: Clock, label: "Horario", value: "Lun - Vie: 10:00 - 20:00\nSábado: 10:00 - 14:00\nDomingo: Cerrado" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-primary" />
                    </span>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-medium hover:text-primary transition-colors whitespace-pre-line">{item.value}</a>
                      ) : (
                        <p className="font-medium whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass-content rounded-2xl overflow-hidden h-64">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.1234567890!2d-3.0123!3d43.3456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDIwJzQ0LjIiTiAzwrAwMCc0NC4zIlc!5e0!3m2!1sen!2ses!4v1234567890" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Ubicación Mani Pedi Getxo" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="glass-content rounded-2xl p-8 text-center">
                <h2 className="font-display text-2xl font-bold mb-4">Reserva Online</h2>
                <p className="text-muted-foreground mb-8">La forma más fácil de reservar tu cita es a través de Treatwell. Elige el servicio, la profesional y el horario que prefieras.</p>
                <a href={TREATWELL_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2 text-lg">
                  Reservar en Treatwell
                  <ExternalLink size={18} />
                </a>
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">¿Prefieres llamar?</p>
                  <a href="tel:+34944123456" className="btn-secondary inline-flex items-center gap-2">
                    <Phone size={18} />
                    +34 944 123 456
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
