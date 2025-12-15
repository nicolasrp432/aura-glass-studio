import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import manicureImg from "@/assets/services-manicure.jpg";
import pedicureImg from "@/assets/services-pedicure.jpg";
import nailartImg from "@/assets/services-nailart.jpg";

const categories = [
  { id: "all", name: "Todos" },
  { id: "manicura", name: "Manicura" },
  { id: "pedicura", name: "Pedicura" },
  { id: "nailart", name: "Nail Art" },
  { id: "tratamientos", name: "Tratamientos" },
];

const allServices = [
  {
    id: 1,
    title: "Manicura Clásica",
    description: "Limado, cuidado de cutículas y esmaltado tradicional",
    price: 18,
    duration: "30 min",
    category: "manicura",
    image: manicureImg,
  },
  {
    id: 2,
    title: "Manicura Gel",
    description: "Esmaltado semipermanente de larga duración con acabado brillante",
    price: 25,
    duration: "45 min",
    category: "manicura",
    image: manicureImg,
    popular: true,
  },
  {
    id: 3,
    title: "Manicura Spa Premium",
    description: "Tratamiento completo con exfoliación, mascarilla y masaje",
    price: 35,
    duration: "60 min",
    category: "manicura",
    image: manicureImg,
  },
  {
    id: 4,
    title: "Pedicura Express",
    description: "Tratamiento rápido para pies perfectos",
    price: 22,
    duration: "30 min",
    category: "pedicura",
    image: pedicureImg,
  },
  {
    id: 5,
    title: "Pedicura Spa",
    description: "Baño de pies con sales, exfoliación, masaje y esmaltado",
    price: 35,
    duration: "60 min",
    category: "pedicura",
    image: pedicureImg,
    popular: true,
  },
  {
    id: 6,
    title: "Pedicura Luxury",
    description: "Experiencia completa con parafina y tratamiento intensivo",
    price: 50,
    duration: "90 min",
    category: "pedicura",
    image: pedicureImg,
  },
  {
    id: 7,
    title: "Nail Art Simple",
    description: "Diseños básicos: líneas, puntos, french o detalles",
    price: 15,
    duration: "20 min",
    category: "nailart",
    image: nailartImg,
  },
  {
    id: 8,
    title: "Nail Art Premium",
    description: "Diseños elaborados con piedras, foils y técnicas avanzadas",
    price: 40,
    duration: "75 min",
    category: "nailart",
    image: nailartImg,
    popular: true,
  },
  {
    id: 9,
    title: "Tratamiento Hidratante",
    description: "Mascarilla nutritiva para manos o pies resecos",
    price: 12,
    duration: "20 min",
    category: "tratamientos",
    image: manicureImg,
  },
  {
    id: 10,
    title: "Tratamiento Parafina",
    description: "Hidratación profunda con cera de parafina tibia",
    price: 18,
    duration: "25 min",
    category: "tratamientos",
    image: pedicureImg,
  },
];

const Servicios = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices =
    activeCategory === "all"
      ? allServices
      : allServices.filter((s) => s.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary font-medium mb-4 tracking-widest uppercase text-sm">
              Nuestros Servicios
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Tratamientos de belleza premium
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestra amplia gama de servicios diseñados para mimarte 
              y realzar tu belleza natural
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-24 z-30 pb-6">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-content rounded-full p-2 inline-flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "hover:bg-white/50 text-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding pt-8 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map((service, index) => (
              <motion.article
                key={service.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
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
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-xl font-semibold">
                      {service.title}
                    </h3>
                    <span className="text-primary font-bold text-xl">
                      {service.price}€
                    </span>
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
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Servicios;
