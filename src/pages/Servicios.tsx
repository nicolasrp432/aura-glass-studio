import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, CheckCircle2, Sparkles, Plus } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/lib/supabase";
import servicesData from "@/data/services.json";
import DetailModal from "@/components/ui/DetailModal";
import PromoBanner from "@/components/home/PromoBanner";
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

type ServiceItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  duration?: string;
  short_description?: string;
  description?: string;
  image_url?: string;
  treatwell_link?: string;
  popular?: boolean;
  image?: string;
};



const getImage = (category: string) => {
  if (category.includes("Pedicura")) return pedicureImg;
  if (category.includes("Pestañas")) return nailartImg;
  return manicureImg;
};

const Servicios = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [services, setServices] = useState<ServiceItem[]>(servicesData.services as ServiceItem[]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('id', { ascending: true });

        if (!error && data && data.length > 0) {
          setServices(data as ServiceItem[]);
        } else {
          console.warn("Using local fallback data for services due to empty data or error:", error);
          setServices(servicesData.services as ServiceItem[]);
        }
      } catch (err) {
        console.error("Error fetching services, falling back to local data:", err);
        setServices(servicesData.services as ServiceItem[]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();

    // Realtime subscription
    const channel = supabase
      .channel('public:services')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, (payload) => {
        console.log('Change received!', payload);
        fetchServices();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);



  const handleOpenDetail = (service: ServiceItem) => {
    setSelectedService({
      ...service,
      image: service.image_url || getImage(service.category)
    });
    setIsModalOpen(true);
  };

  const filteredServices = activeCategory === "all"
    ? services
    : services.filter((s) => s.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="orb orb-turquoise top-[-10%] left-[-10%] w-[40%] h-[40%]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="flex items-center justify-center gap-2 text-primary font-bold mb-4 tracking-[0.3em] uppercase text-xs">
              <Sparkles size={14} /> Nuestros Servicios <Sparkles size={14} />
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
              Tratamientos de <br />
              <span className="text-primary italic">Belleza Premium</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Descubre una experiencia de cuidado personalizada con marcas de élite:
              OPI, Semilac, Kinetics y Masglo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Promo Banner */}
      <PromoBanner />

      {/* Categories Filter */}
      <section className="sticky top-24 z-30 mb-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-content rounded-3xl p-2 flex flex-wrap justify-center gap-2 shadow-xl border-white/50"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "hover:bg-primary/5 text-foreground/70 hover:text-primary"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, index) => (
                  <motion.article
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="relative bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2.5rem] overflow-hidden group flex flex-col h-full cursor-pointer hover:shadow-[0_20px_50px_-15px_rgba(20,184,166,0.2)] hover:-translate-y-2 hover:border-primary/40 transition-all duration-500"
                    onClick={() => handleOpenDetail(service)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={service.image_url || getImage(service.category)}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-md p-4 rounded-full text-primary scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                          <Plus size={32} />
                        </div>
                      </div>
                      {service.popular && (
                        <span className="absolute top-6 right-6 bg-accent text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                          Popular
                        </span>
                      )}
                    </div>

                    <div className="p-8 flex flex-col flex-grow relative">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="font-display text-xl md:text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
                          {service.name}
                        </h3>
                        <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-xl font-black text-xl whitespace-nowrap border border-primary/20 shadow-sm group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          {service.price ? `${Number(service.price).toFixed(2)}€` : 'N/A'}
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-grow">
                        {service.short_description}
                      </p>

                      <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3 text-sm text-foreground/80 font-medium group-hover:text-foreground transition-colors">
                          <CheckCircle2 size={16} className="text-primary" />
                          <span>Resultados profesionales</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-foreground/80 font-medium group-hover:text-foreground transition-colors">
                          <CheckCircle2 size={16} className="text-primary" />
                          <span>Productos de alta gama</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-border group-hover:border-primary/20 transition-colors">
                        <span className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">
                          <Clock size={16} className="text-primary" /> {service.duration}
                        </span>
                        <div className="flex items-center gap-2 text-primary font-bold text-sm group/link tracking-wider">
                          VER DETALLES <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <DetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedService}
        type="service"
      />
    </Layout>
  );
};

export default Servicios;
