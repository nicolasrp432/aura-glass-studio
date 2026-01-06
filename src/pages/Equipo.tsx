import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import servicesData from "@/data/services.json";
import { supabase } from "@/lib/supabase";

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
          setTeam(data);
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {team.map((member, index) => (
                <motion.article
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setActiveCard(member.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  className="glass-card rounded-[2.5rem] overflow-hidden group cursor-pointer h-full flex flex-col"
                >
                  <div className="relative h-96 overflow-hidden bg-muted">
                    {/* Team Member Photo */}
                    <img
                      src={member.image_url || member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Decorative Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500`} />

                    {/* Bio Overlay on Hover */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: activeCard === member.id ? 1 : 0,
                      }}
                      className="absolute inset-0 bg-primary/90 backdrop-blur-md p-8 flex flex-col justify-center text-center pointer-events-none transition-all duration-500"
                    >
                      <div className="space-y-4">
                        <Sparkles size={24} className="text-white/50 mx-auto" />
                        <p className="text-white text-base leading-relaxed italic font-medium">
                          "{member.bio}"
                        </p>
                      </div>
                    </motion.div>

                    {/* Rating Badge */}
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                      <Star size={14} className="text-gold fill-gold" />
                      <span className="text-xs font-bold">{member.rating}</span>
                    </div>
                  </div>

                  <div className="p-10 flex flex-col flex-grow text-center">
                    <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-3 block">
                      {member.role}
                    </span>
                    <h3 className="font-display text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <div className="w-12 h-1 bg-gold/30 mx-auto mb-6 rounded-full group-hover:w-20 transition-all duration-300" />
                    <p className="text-muted-foreground text-sm font-medium mb-6 flex-grow">
                      Especialista en {member.specialty?.toLowerCase() || (member.role?.toLowerCase())}
                    </p>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60 font-bold uppercase tracking-tighter">
                      <Sparkles size={12} className="text-gold" />
                      {member.reviews || 0} Reseñas Verificadas
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
