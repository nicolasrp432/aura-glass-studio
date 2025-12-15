import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-manicure.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Manicura profesional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-deco rounded-full px-4 py-2 mb-6"
            >
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm font-medium">Salón Premium en Las Palmas</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Tus manos merecen{" "}
              <span className="text-gradient">el mejor cuidado</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Descubre una experiencia única de manicura y pedicura en un ambiente 
              de lujo. Nuestras expertas transformarán tus uñas en obras de arte.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/contacto" className="btn-gold flex items-center gap-2 group">
                Reservar Cita
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link to="/servicios" className="btn-secondary">
                Ver Servicios
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: Award, value: "10+", label: "Años Experiencia" },
                { icon: Sparkles, value: "5K+", label: "Clientas Felices" },
                { icon: Clock, value: "100%", label: "Productos Premium" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon
                    size={24}
                    className="mx-auto mb-2 text-primary"
                  />
                  <p className="font-display text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Decorative elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Floating glass cards */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 glass-content rounded-2xl p-6 shadow-glass"
              >
                <p className="font-display text-lg font-semibold mb-1">Manicura Gel</p>
                <p className="text-muted-foreground text-sm">desde 25€</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 right-20 glass-content rounded-2xl p-6 shadow-glass"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">+500</span>
                </div>
                <p className="text-xs text-muted-foreground">Reseñas 5 estrellas</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
