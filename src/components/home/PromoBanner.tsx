import { motion, Variants } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PromoBanner = () => {
  // Animación para los orbes de luz del fondo
  // Animación para los orbes de luz del fondo
  const glowVariants: Variants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-[#001021]">
      {/* Capa de Fondo: Gradiente cobalto profundo y partículas animadas */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000d1a] via-[#002f5e] to-[#101923]" />

        {/* Orbes de luz dinámicos */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            variants={glowVariants}
            animate="animate"
            className="absolute rounded-full bg-blue-500/10 blur-[100px]"
            style={{
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="relative max-w-6xl mx-auto">

          {/* Contenedor Principal con Glassmorphism - Más rectangular */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/10 p-8 md:p-16 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] overflow-visible text-center md:text-left flex flex-col md:flex-row items-center gap-10"
          >
            {/* Imagen Dramática Superpuesta (Manicura) - Ajustada */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-20 -right-10 md:-right-20 w-48 md:w-[380px] pointer-events-none z-30 hidden lg:block"
            >
              <img
                src="/logo.png"
                alt="Manicura de Lujo"
                className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] filter brightness-110 mix-blend-screen"
              />
            </motion.div>

            {/* Contenido de Texto - Distribuido horizontalmente */}
            <div className="flex-1 space-y-6 relative z-40">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-blue-100 text-[10px] font-bold tracking-[0.2em] backdrop-blur-md uppercase w-fit"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Oferta Especial</span>
              </motion.div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-bold text-white font-display leading-tight tracking-tight">
                  ¡Primera visita con <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200">
                    20% de descuento!
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-blue-100/80 font-body leading-relaxed max-w-2xl">
                  Reserva tu cita hoy y disfruta de un descuento exclusivo en todos nuestros servicios de manicura y pedicura.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  to="/contacto"
                  className="group relative inline-flex items-center gap-3 bg-white text-[#001021] hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-bold uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10">Reservar Ahora</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
                </Link>
              </div>
            </div>

            {/* Acento Visual Derecho para mobile/tablet */}
            <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-white/20 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-white/20 rounded-br-2xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
