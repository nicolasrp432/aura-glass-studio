import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import manicureImg from "@/assets/services-manicure.jpg";
import pedicureImg from "@/assets/services-pedicure.jpg";
import nailartImg from "@/assets/services-nailart.jpg";

const services = [
  {
    id: 1,
    title: "Manicura Premium",
    description: "Tratamiento completo con esmaltado duradero y cuidado de cutículas",
    price: "25€",
    duration: "45 min",
    image: manicureImg,
    popular: true,
  },
  {
    id: 2,
    title: "Pedicura Spa",
    description: "Experiencia relajante con baño de pies, exfoliación y masaje",
    price: "35€",
    duration: "60 min",
    image: pedicureImg,
    popular: false,
  },
  {
    id: 3,
    title: "Nail Art Exclusivo",
    description: "Diseños personalizados con las últimas tendencias",
    price: "40€",
    duration: "75 min",
    image: nailartImg,
    popular: true,
  },
];

const ServicesPreview = () => {
  return (
    <section className="section-padding relative z-10 bg-background/50">
      <div className="container mx-auto px-6">
        {/* Header with better spacing and animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block text-primary font-bold mb-4 tracking-[0.3em] uppercase text-xs">
            Nuestros Servicios
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Tratamientos diseñados <br className="hidden md:block" />
            <span className="text-gradient">para tu bienestar</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada servicio es una experiencia única creada para realzar tu belleza natural
            utilizando productos de la más alta calidad y técnicas de vanguardia.
          </p>
        </motion.div>

        {/* Services Grid with refined cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-[2rem] overflow-hidden group border border-white/20 shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {service.popular && (
                  <div className="absolute top-5 left-5 bg-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md uppercase tracking-wider">
                    Más Vendido
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <span className="text-xl">{service.price}</span>
                      <span className="text-muted-foreground text-xs font-normal">/ sesión</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <ArrowRight size={18} />
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-border/50">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Clock size={16} className="text-primary/60" />
                    <span>{service.duration} aprox.</span>
                  </div>
                  <Link
                    to="/contacto"
                    className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 group/link relative"
                  >
                    <span>Reservar</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover/link:w-full" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/servicios"
            className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors group"
          >
            Ver todos los servicios
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
