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
    <section className="section-padding relative z-10 overflow-hidden bg-background">
      {/* Decorative Background - Refined and deeper */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.08),transparent_50%),radial-gradient(circle_at_bottom_left,hsl(var(--accent)/0.08),transparent_50%)]" />

      <div className="container mx-auto px-6 relative">
        {/* Header with improved hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <span className="inline-block text-primary font-bold mb-4 tracking-[0.3em] uppercase text-xs">
            Testimonios
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Voces de <span className="text-gradient">nuestras clientas</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            La confianza de miles de clientas es nuestro mayor orgullo.
            Descubre por qué somos el referente de belleza en Las Arenas.
          </p>
        </motion.div>

        {/* Testimonials Grid with refined cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-[2.5rem] p-10 relative border border-white/20 hover:border-primary/20 shadow-xl group"
            >
              <Quote
                size={48}
                className="absolute top-8 right-10 text-primary/10 group-hover:text-primary/20 transition-colors"
              />

              {/* Stars - More elegant */}
              <div className="flex gap-1.5 mb-8">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-primary text-primary shadow-sm"
                  />
                ))}
              </div>

              <p className="text-foreground/90 mb-10 leading-relaxed italic text-lg font-medium">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-5 pt-8 border-t border-border/50">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-display text-xl font-bold shadow-lg shadow-primary/10 transition-transform group-hover:scale-105">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-foreground leading-tight">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs uppercase tracking-widest font-bold text-primary mt-1">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Global Stats/Badges - More Premium UI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 pt-16 border-t border-border/50"
        >
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24">
            {[
              { value: "4.9", label: "Google Reviews", count: "1K+" },
              { value: "5.0", label: "Treatwell", count: "2K+" },
              { value: "4.8", label: "Instagram", count: "15K" },
            ].map((badge) => (
              <div key={badge.label} className="text-center group">
                <div className="flex items-center gap-3 justify-center mb-2">
                  <Star size={24} className="fill-primary text-primary animate-pulse" />
                  <span className="font-display text-4xl font-black text-foreground">{badge.value}</span>
                </div>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground mb-1 group-hover:text-primary transition-colors">{badge.label}</p>
                <p className="text-[10px] font-medium text-primary/60">{badge.count} seguidores</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
