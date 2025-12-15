import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nombre requerido").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().optional(),
  service: z.string().min(1, "Selecciona un servicio"),
  message: z.string().trim().min(10, "Mínimo 10 caracteres").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const services = [
  "Manicura Clásica",
  "Manicura Gel",
  "Pedicura Spa",
  "Nail Art",
  "Tratamientos",
  "Otro",
];

const Contacto = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactForm] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "¡Mensaje enviado!",
      description: "Te contactaremos pronto para confirmar tu cita.",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary font-medium mb-4 tracking-widest uppercase text-sm">
              Contacto
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Reserva tu cita
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Contáctanos para reservar tu próxima experiencia de belleza
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding pt-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl font-bold mb-8">
                Información de contacto
              </h2>

              <div className="space-y-6 mb-10">
                {[
                  {
                    icon: Phone,
                    label: "Teléfono",
                    value: "+34 928 123 456",
                    href: "tel:+34928123456",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "info@manipedi.es",
                    href: "mailto:info@manipedi.es",
                  },
                  {
                    icon: MapPin,
                    label: "Dirección",
                    value: "C/ Las Arenas, 15\n35010 Las Palmas de GC",
                  },
                  {
                    icon: Clock,
                    label: "Horario",
                    value: "Lun - Sáb: 10:00 - 20:00\nDomingo: Cerrado",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-primary" />
                    </span>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-medium hover:text-primary transition-colors whitespace-pre-line"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="glass-content rounded-2xl overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3519.943234567890!2d-15.4130!3d28.1235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDA3JzI0LjYiTiAxNcKwMjQnNDYuOCJX!5e0!3m2!1sen!2ses!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Mani Pedi Las Arenas"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass-content rounded-2xl p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Check size={40} className="text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-4">
                      ¡Gracias por contactarnos!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Hemos recibido tu solicitud. Te contactaremos pronto para 
                      confirmar tu cita.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          service: "",
                          message: "",
                        });
                      }}
                      className="text-primary font-medium hover:underline"
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-display text-2xl font-bold mb-6">
                      Solicita tu cita
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-2"
                          >
                            Nombre *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                              errors.name
                                ? "border-destructive bg-destructive/5"
                                : "border-border bg-white/50 focus:border-primary"
                            } outline-none`}
                            placeholder="Tu nombre"
                          />
                          {errors.name && (
                            <p className="text-destructive text-sm mt-1">{errors.name}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2"
                          >
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                              errors.email
                                ? "border-destructive bg-destructive/5"
                                : "border-border bg-white/50 focus:border-primary"
                            } outline-none`}
                            placeholder="tu@email.com"
                          />
                          {errors.email && (
                            <p className="text-destructive text-sm mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium mb-2"
                          >
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-white/50 focus:border-primary outline-none transition-colors"
                            placeholder="+34 600 000 000"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="service"
                            className="block text-sm font-medium mb-2"
                          >
                            Servicio *
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                              errors.service
                                ? "border-destructive bg-destructive/5"
                                : "border-border bg-white/50 focus:border-primary"
                            } outline-none`}
                          >
                            <option value="">Selecciona servicio</option>
                            {services.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          {errors.service && (
                            <p className="text-destructive text-sm mt-1">
                              {errors.service}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-2"
                        >
                          Mensaje *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className={`w-full px-4 py-3 rounded-xl border transition-colors resize-none ${
                            errors.message
                              ? "border-destructive bg-destructive/5"
                              : "border-border bg-white/50 focus:border-primary"
                          } outline-none`}
                          placeholder="Cuéntanos qué necesitas..."
                        />
                        {errors.message && (
                          <p className="text-destructive text-sm mt-1">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Enviar Solicitud
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
