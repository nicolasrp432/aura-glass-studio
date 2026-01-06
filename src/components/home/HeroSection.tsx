import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-manicure.jpg";

const heroVideos = [
  "/hersection.mp4",
  // El usuario añadirá más videos aquí
];

const HeroSection = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    if (heroVideos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % heroVideos.length);
    }, 8000); // Cambio cada 8 segundos

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Video Background Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroVideos[currentVideo]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <video
              src={heroVideos[currentVideo]}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </motion.div>
        </AnimatePresence>

        {/* Modern multi-layer overlay for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/95" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 mt-auto mb-auto lg:mt-0">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 glass-deco rounded-full px-5 py-2 mb-8 border-primary/20"
          >
            <Sparkles size={16} className="text-primary animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-foreground/90">Salón Premium en Las Arenas, Getxo</span>
          </motion.div>

          {/* Headline with advanced typography */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl lg:text-9xl font-bold text-foreground leading-[1] tracking-tight"
            >
              Tus manos merecen <br className="hidden sm:block" />
              <span className="text-gradient italic">el mejor cuidado</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-base sm:text-xl text-foreground/80 leading-relaxed mb-10 max-w-2xl mx-auto font-medium"
          >
            Descubre una experiencia única de manicura y pedicura en un ambiente
            de lujo en Getxo. Nuestras expertas transformarán tus uñas en obras de arte.
          </motion.p>

          {/* CTA Buttons with enhanced styles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 lg:mb-24"
          >
            <Link
              to="/contacto"
              className="btn-primary flex items-center justify-center gap-3 group px-10 py-5 w-full sm:w-auto"
            >
              RESERVAR CITA
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1.5"
              />
            </Link>
            <Link
              to="/servicios"
              className="btn-secondary flex items-center justify-center px-10 py-5 w-full sm:w-auto"
            >
              VER SERVICIOS
            </Link>
          </motion.div>

          {/* Stats Section Optimized for Mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {[
              { icon: Award, value: "10+", label: "Años Experiencia", mobile: true },
              { icon: Sparkles, value: "5K+", label: "Clientas Felices", mobile: true },
              { icon: Clock, value: "100%", label: "Premium", mobile: false },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                className={`${!stat.mobile ? 'hidden lg:flex' : 'flex'} glass-card p-5 sm:p-8 rounded-3xl flex-col items-center justify-center text-center group transition-all duration-500 hover:bg-white/10`}
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <stat.icon
                    size={24}
                    className="text-primary sm:w-7 sm:h-7"
                  />
                </div>
                <p className="font-display text-2xl sm:text-4xl font-bold text-foreground mb-1 leading-none">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator with refinement - Hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground font-black">Scroll</span>
          <div className="w-5 h-9 rounded-full border border-primary/20 flex items-start justify-center p-1.5 backdrop-blur-sm">
            <motion.div
              animate={{ height: [4, 10, 4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
