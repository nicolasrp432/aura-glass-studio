import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  "Productos de alta calidad",
  "Técnicas innovadoras",
  "Ambiente relajante y exclusivo",
  "Higiene certificada",
];

const AboutPreview = () => {
  return (
    <section className="section-padding relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <div className="aspect-[4/5] glass-content rounded-2xl p-3">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/10 via-accent/10 to-gold-light/30 flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="font-display text-8xl font-bold text-gradient">10+</span>
                    <p className="text-xl text-muted-foreground mt-4">años de experiencia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-6 glass-content rounded-2xl p-6 shadow-glass-lg"
            >
              <p className="font-display text-3xl font-bold text-foreground">5K+</p>
              <p className="text-sm text-muted-foreground">Clientas satisfechas</p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary font-medium mb-4 tracking-widest uppercase text-sm">
              Sobre Nosotras
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Pasión por la belleza, dedicación al detalle
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              En Mani Pedi Las Arenas, creemos que cada clienta merece un tratamiento 
              excepcional. Nuestro equipo de profesionales combina técnicas innovadoras 
              con productos premium para crear experiencias únicas de belleza.
            </p>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check size={14} className="text-primary" />
                  </span>
                  <span className="text-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <Link
              to="/equipo"
              className="inline-flex items-center gap-2 btn-primary group"
            >
              Conoce al equipo
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
