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
    <section className="section-padding relative z-10 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image Side - Refined Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="aspect-[4/5] glass-content p-4">
                <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604654894610-df490c8121aa?q=80&w=1000')] bg-cover bg-center mix-blend-overlay opacity-30 group-hover:scale-110 transition-transform duration-1000" />

                  <div className="text-center p-8 relative z-10">
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="font-display text-9xl font-extrabold text-gradient block mb-2"
                    >
                      10+
                    </motion.span>
                    <p className="text-2xl font-display font-medium text-foreground tracking-tight">años de excelencia</p>
                    <div className="w-16 h-1 bg-primary mx-auto mt-6 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge - Elevated */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-8 -right-8 glass-deco rounded-[2rem] p-8 shadow-glass-lg border-white/50 z-20"
            >
              <p className="font-display text-4xl font-black text-primary mb-1">5K+</p>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground">Clientas Satisfechas</p>
            </motion.div>
          </motion.div>

          {/* Content Side - Refined Typography */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-primary font-bold mb-6 tracking-[0.3em] uppercase text-xs">
              Esencia Mani Pedi
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
              Pasión por la belleza, <br />
              <span className="text-gradient">dedicación al detalle</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
              En Mani Pedi Las Arenas, entendemos que tu bienestar comienza por los detalles.
              Nuestro santuario de belleza combina técnicas de vanguardia mundial con un trato
              personalizado y cálido que te hará sentir única en cada visita.
            </p>

            {/* Features with enhanced icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm shadow-primary/5">
                    <Check size={18} className="text-current" />
                  </div>
                  <span className="text-foreground font-semibold text-sm tracking-tight">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Link
              to="/equipo"
              className="btn-primary group inline-flex items-center gap-3"
            >
              Conoce nuestro equipo
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1.5"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
