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
    <section className="section-padding relative z-10">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-primary font-medium mb-4 tracking-widest uppercase text-sm">
            Nuestros Servicios
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tratamientos diseñados para ti
          </h2>
          <p className="text-muted-foreground">
            Cada servicio es una experiencia única creada para realzar tu belleza natural
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {service.popular && (
                  <span className="absolute top-4 right-4 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-xl font-semibold">{service.title}</h3>
                  <span className="text-primary font-bold text-lg">{service.price}</span>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock size={14} />
                    {service.duration}
                  </span>
                  <Link
                    to="/contacto"
                    className="text-primary font-medium text-sm flex items-center gap-1 group/link"
                  >
                    Reservar
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover/link:translate-x-1"
                    />
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
