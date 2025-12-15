import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import servicesData from "@/data/services.json";
import manicureImg from "@/assets/services-manicure.jpg";
import pedicureImg from "@/assets/services-pedicure.jpg";
import nailartImg from "@/assets/services-nailart.jpg";

const TREATWELL_LINK = "https://www.treatwell.es/establecimiento/mani-pedi-1/";

const categories = [
  { id: "all", name: "Todos" },
  { id: "Manicura y Uñas", name: "Manicura" },
  { id: "Pedicura y Pies", name: "Pedicura" },
  { id: "Pestañas y Cejas", name: "Pestañas y Cejas" },
  { id: "Tratamientos Corporales", name: "Corporales" },
  { id: "Tratamientos Faciales", name: "Faciales" },
];

const getImage = (category: string) => {
  if (category.includes("Pedicura")) return pedicureImg;
  if (category.includes("Pestañas")) return nailartImg;
  return manicureImg;
};

const Servicios = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const services = servicesData.services;

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter((s) => s.category === activeCategory);

  return (
    <Layout>
      <section className="pt-32 pb-16 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-primary font-medium mb-4 tracking-widest uppercase text-sm">Nuestros Servicios</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">Tratamientos de belleza premium</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Utilizamos marcas premium: OPI, Semilac, Kinetics, Masglo, Peggy Sage y Ainhoa Cosmetics</p>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-24 z-30 pb-6">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-content rounded-full p-2 inline-flex flex-wrap gap-2">
            {categories.map((category) => (
              <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${activeCategory === category.id ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-white/50 text-foreground"}`}>
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-8 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => (
                <motion.article key={service.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, delay: index * 0.05 }} className="glass-card rounded-2xl overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={getImage(service.category)} alt={service.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    {service.popular && <span className="absolute top-4 right-4 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">Popular</span>}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-display text-xl font-semibold">{service.name}</h3>
                      <span className="text-primary font-black text-xl">{service.price}€</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{service.short_description}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock size={14} />{service.duration}</span>
                      <a href={TREATWELL_LINK} target="_blank" rel="noopener noreferrer" className="text-primary font-medium text-sm flex items-center gap-1 group/link">
                        Reservar<ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Servicios;
