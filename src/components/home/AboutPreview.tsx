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
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
                <div className="aspect-[4/5] relative overflow-hidden group">
                  <img
                    src="/servicesimg/equipo2.jpg"
                    alt="Equipo Mani Pedi"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Experience Badge - Moved outside overflow container to prevent clipping */}
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="absolute -top-6 -left-6 z-30"
              >
                <div className="glass-deco px-7 py-5 rounded-[2.5rem] border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-2xl bg-primary/20 ring-1 ring-white/50">
                  <span className="font-display text-4xl sm:text-5xl font-black text-primary block leading-none mb-1">10+</span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-foreground">Años de Maestría</span>
                </div>
              </motion.div>

              {/* Floating Badge - Client Count */}
              <motion.div
                initial={{ scale: 0, rotate: 15 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute -bottom-8 -right-8 glass-deco rounded-[2.5rem] p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-white/50 z-30 backdrop-blur-2xl bg-white/10 ring-1 ring-white/50"
              >
                <p className="font-display text-3xl sm:text-4xl font-black text-primary mb-1">5K+</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground">Clientas Satisfechas</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side - Refined Typography */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <span className="inline-block text-primary font-bold mb-6 tracking-[0.3em] uppercase text-xs">
              Esencia Mani Pedi
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
              Pasión por la belleza, <br />
              <span className="text-gradient">dedicación al detalle</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              En Mani Pedi Las Arenas, entendemos que tu bienestar comienza por los detalles.
              Nuestro santuario de belleza combina técnicas de vanguardia mundial con un trato
              personalizado y cálido que te hará sentir única en cada visita.
            </p>

            {/* Features with enhanced icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-lg mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-4 group justify-center lg:justify-start"
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
