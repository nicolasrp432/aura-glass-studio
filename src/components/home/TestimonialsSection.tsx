import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "María García",
    role: "Clienta habitual",
    content:
      "El mejor salón de uñas de Las Palmas. La atención es exquisita y los resultados siempre superan mis expectativas.",
    rating: 5,
    avatar: "MG",
  },
  {
    id: 2,
    name: "Laura Rodríguez",
    role: "Clienta desde 2020",
    content:
      "Descubrí Mani Pedi hace años y desde entonces no voy a ningún otro sitio. Las chicas son profesionales y muy amables.",
    rating: 5,
    avatar: "LR",
  },
  {
    id: 3,
    name: "Carmen Hernández",
    role: "Primera visita",
    content:
      "Mi primera experiencia fue increíble. El ambiente es muy relajante y el resultado de la manicura gel es espectacular.",
    rating: 5,
    avatar: "CH",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding relative z-10 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-turquoise-light/30 via-transparent to-rose-light/30" />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-primary font-medium mb-4 tracking-widest uppercase text-sm">
            Testimonios
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Lo que dicen nuestras clientas
          </h2>
          <p className="text-muted-foreground">
            Más de 5.000 clientas satisfechas confían en nosotras
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-content rounded-2xl p-8 relative"
            >
              <Quote
                size={32}
                className="absolute top-6 right-6 text-primary/20"
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-gold text-gold"
                  />
                ))}
              </div>

              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 lg:gap-16"
        >
          {[
            { value: "4.9", label: "Google Reviews" },
            { value: "5.0", label: "Treatwell" },
            { value: "4.8", label: "Instagram" },
          ].map((badge) => (
            <div key={badge.label} className="text-center">
              <div className="flex items-center gap-2 justify-center mb-1">
                <Star size={18} className="fill-gold text-gold" />
                <span className="font-display text-2xl font-bold">{badge.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{badge.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
