import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles, Instagram, Facebook, MessageCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import servicesData from "@/data/services.json";
import { supabase } from "@/lib/supabase";
import { siteConfig } from "@/config/site";

const team = servicesData.team;
const colors = ["from-primary to-accent", "from-accent to-rose", "from-primary/80 to-gold", "from-gold to-accent", "from-rose to-primary", "from-accent to-primary"];

const Equipo = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [team, setTeam] = useState<any[]>(servicesData.team);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('team')
          .select('*')
          .order('id', { ascending: true });

        if (!error && data && data.length > 0) {
          // Fusionar con los datos locales para asegurar que las imágenes carguen
          // si en Supabase la columna image_url está vacía o es nula.
          const mergedData = data.map(dbMember => {
            const localMember = servicesData.team.find(
              local => local.name.toLowerCase() === dbMember.name.toLowerCase()
            );
            return {
              ...dbMember,
              image_url: localMember?.image_url || dbMember.image_url
            };
          });
          setTeam(mergedData);
        } else {
          console.warn("Using local fallback data for team:", error);
          setTeam(servicesData.team);
        }
      } catch (err) {
        console.error("Error fetching team:", err);
        setTeam(servicesData.team);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeam();

    // Realtime subscription
    const channel = supabase
      .channel('public:team')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team' }, (payload) => {
        console.log('Change received!', payload);
        fetchTeam();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
              <Sparkles size={14} /> El Alma del Salón <Sparkles size={14} />
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
              Conoce a <br />
              <span className="text-primary italic">Nuestras Artistas</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Un equipo de profesionales apasionadas dedicadas a realzar tu belleza natural
              en un oasis de relajación y bienestar en el corazón de Getxo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-[180px] pt-[150px] pb-16">
              {team.map((member, index) => (
                <motion.article
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setActiveCard(member.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  className="relative group cursor-pointer h-full flex flex-col"
                >
                  {/* Imagen Pop-out (Completamente fuera del overflow de la tarjeta) */}
                  <div className="absolute top-[-160px] left-0 w-full h-[300px] flex justify-center pointer-events-none z-30">
                    <img
                      src={member.image_url || member.image}
                      alt={member.name}
                      className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] transition-transform duration-700 group-hover:scale-[1.08] group-hover:-translate-y-3 origin-bottom max-w-[120%]"
                    />
                  </div>

                  {/* Insignia de Rating (Fuera del overflow) */}
                  <div className="absolute top-[-20px] right-6 bg-white px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-black/5 z-40 transition-opacity duration-300 group-hover:opacity-0 delay-100">
                    <Star size={16} className="text-gold fill-gold" />
                    <span className="text-sm font-bold text-gray-900">{member.rating}</span>
                  </div>

                  {/* Fondo y Estructura de la Tarjeta */}
                  <div className="bg-card rounded-[2.5rem] shadow-xl pt-[140px] pb-10 px-6 flex flex-col flex-grow relative overflow-hidden group-hover:shadow-2xl transition-shadow duration-500">

                    {/* Contenido de Texto Principal */}
                    <div className="flex flex-col items-center justify-start flex-grow text-center relative z-10 transition-opacity duration-300 group-hover:opacity-0 delay-75">
                      <span className="text-[11px] text-primary font-bold uppercase tracking-[0.25em] mb-2">
                        {member.role || "ESTETICISTA"}
                      </span>

                      <h3 className="font-display text-4xl font-bold text-foreground mb-4">
                        {member.name}
                      </h3>

                      <div className="w-10 h-[3px] bg-primary mx-auto mb-5 rounded-full" />

                      <p className="text-muted-foreground text-[15px] leading-relaxed mb-6 flex-grow max-w-[220px] mx-auto">
                        Especialista en {member.specialty?.toLowerCase() || (member.role?.toLowerCase())}
                      </p>

                      <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground/80 font-bold uppercase tracking-widest mt-auto">
                        <Sparkles size={12} className="text-primary/60" />
                        {member.reviews || 0} RESEÑAS VERIFICADAS
                      </div>
                    </div>

                    {/* Bio Hover Overlay (Sustituye al texto base) */}
                    <div className="absolute inset-0 bg-primary/95 backdrop-blur-md pt-[140px] pb-10 px-8 flex flex-col justify-between text-center transition-all duration-500 z-20 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="flex flex-col items-center flex-grow justify-center">
                        <Sparkles size={24} className="text-white/50 mb-4" />
                        <p className="text-white text-[15px] leading-relaxed italic font-medium">
                          "{member.bio}"
                        </p>
                      </div>

                      {/* Redes Sociales - Flotando abajo */}
                      <div className="flex items-center justify-center gap-4 mt-6">
                        <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white text-white hover:text-primary p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg">
                          <Instagram size={18} />
                        </a>
                        <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white text-white hover:text-primary p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg">
                          <Facebook size={18} />
                        </a>
                        <a href={`https://wa.me/${siteConfig.contact.whatsappHref}`} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white text-white hover:text-primary p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg">
                          <MessageCircle size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Equipo;
