import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import servicesData from "@/data/services.json";

const ServicesPreview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [featuredServices, setFeaturedServices] = useState<any[]>(
    servicesData.services.filter(s => s.popular)
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFeaturedServices = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('popular', true)
          .order('id', { ascending: true });

        if (!error && data && data.length > 0) {
          setFeaturedServices(data);
        }
      } catch (err) {
        console.error("Error fetching featured services:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedServices();
  }, []);

  useEffect(() => {
    if (featuredServices.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredServices.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredServices.length]);

  return (
    <section className="section-padding relative z-10 overflow-hidden bg-background">
      {/* Background Orbs */}
      <div className="orb orb-turquoise top-[-10%] right-[-10%] w-[30%] h-[30%] opacity-20" />
      <div className="orb orb-rose bottom-[-10%] left-[-10%] w-[30%] h-[30%] opacity-20" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: Static Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/5"
          >
            <span className="flex items-center gap-2 text-primary font-bold mb-6 tracking-[0.3em] uppercase text-xs">
              <Sparkles size={14} /> Selecciones Exclusivas
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-8 leading-tight">
              Servicios <br />
              <span className="text-primary italic">Mas Destacados</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-md">
              Descubre nuestros tratamientos favoritos, amados por nuestras clientas y
              actualizados constantemente para ofrecerte lo mejor de la temporada.
            </p>

            <Link
              to="/servicios"
              className="btn-primary group inline-flex items-center gap-3"
            >
              Explorar todo el menú
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" />
            </Link>

            {/* Pagination Indicators for Mobile/Desktop */}
            <div className="flex gap-3 mt-12">
              {featuredServices.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-500 ${activeIndex === idx ? "w-12 bg-primary" : "w-2 bg-primary/20 hover:bg-primary/40"
                    }`}
                  aria-label={`Ir al servicio ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Side: Dynamic Spotlight Slider */}
          <div className="w-full lg:w-3/5 perspective-1000">
            <div className="relative h-[500px] md:h-[600px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredServices[activeIndex].id}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -10, x: 50 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: 10, x: -50 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <div className="glass-card rounded-[3rem] overflow-hidden h-full flex flex-col md:flex-row group border-white/30 shadow-2xl">
                    {/* Image Area */}
                    <div className="w-full md:w-1/2 relative h-1/2 md:h-full overflow-hidden">
                      <img
                        src={featuredServices[activeIndex].image_url}
                        alt={featuredServices[activeIndex].name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute top-6 left-6 bg-accent/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                        Destacado
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left bg-white/5">
                      <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={14} className="fill-primary text-primary" />
                        ))}
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {featuredServices[activeIndex].name}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 flex-grow">
                        {featuredServices[activeIndex].short_description}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-white/10">
                        <div className="flex flex-col">
                          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Inversión</span>
                          <span className="text-3xl font-black text-primary">{featuredServices[activeIndex].price}€</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Duración</span>
                          <span className="flex items-center gap-2 font-bold text-foreground">
                            <Clock size={16} className="text-primary" /> {featuredServices[activeIndex].duration}
                          </span>
                        </div>
                      </div>

                      <Link
                        to="/servicios"
                        className="mt-8 text-primary font-bold text-sm uppercase tracking-widest flex items-center gap-2 group/link"
                      >
                        Más información <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
