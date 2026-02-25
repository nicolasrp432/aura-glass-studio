import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PromoBanner = () => {
  return (
    <section className="py-12 bg-primary/5 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/50 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mx-auto md:mx-0">
              <Sparkles className="w-4 h-4" />
              <span>Oferta Especial</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-display">
              ¡Primera visita con 20% de descuento!
            </h2>
            <p className="text-gray-600 font-body">
              Reserva tu cita hoy y disfruta de un descuento exclusivo en todos nuestros servicios de manicura y pedicura.
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <Link 
              to="/contacto" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Reservar Cita
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
