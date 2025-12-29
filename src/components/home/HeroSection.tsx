import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-manicure.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Video Background with Enhanced Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="https://cdn.pixabay.com/video/2016/08/17/4493-178619623_tiny.mp4"
          poster={heroImage}
          className="w-full h-full object-cover scale-105"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Modern multi-layer overlay for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/90" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass-deco rounded-full px-5 py-2 mb-8 border-primary/20"
          >
            <Sparkles size={16} className="text-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">Salón Premium en Las Arenas, Getxo</span>
          </motion.div>

          {/* Headline with advanced typography */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-foreground leading-[1.1] mb-8 tracking-tight"
          >
            Tus manos merecen{" "}
            <span className="text-gradient decoration-primary/30 underline-offset-8">
              el mejor cuidado
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-foreground/80 leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
          >
            Descubre una experiencia única de manicura y pedicura en un ambiente
            de lujo. Nuestras expertas transformarán tus uñas en obras de arte.
          </motion.p>

          {/* CTA Buttons with enhanced styles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5 justify-center mb-20"
          >
            <Link
              to="/contacto"
              className="btn-primary flex items-center justify-center gap-3 group px-10 py-5"
            >
              Reservar Cita
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1.5"
              />
            </Link>
            <Link
              to="/servicios"
              className="btn-secondary flex items-center justify-center px-10 py-5 hover:bg-white/60"
            >
              Ver Servicios
            </Link>
          </motion.div>

          {/* Stats with modern cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
            {[
              { icon: Award, value: "10+", label: "Años Experiencia" },
              { icon: Sparkles, value: "5K+", label: "Clientas Felices" },
              { icon: Clock, value: "100%", label: "Productos Premium" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center group hover:scale-105 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon
                    size={24}
                    className="text-primary"
                  />
                </div>
                <p className="font-display text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator with refinement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ height: [4, 12, 4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
