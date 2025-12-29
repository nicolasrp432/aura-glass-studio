import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import servicesData from "@/data/services.json";

const team = servicesData.team;
const colors = ["from-primary to-accent", "from-accent to-rose", "from-primary/80 to-gold", "from-gold to-accent", "from-rose to-primary", "from-accent to-primary"];

const Equipo = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

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
                <div className="relative h-80 overflow-hidden bg-muted">
                  {/* Decorative Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length]} opacity-20`} />

                  {/* Placeholder/Avatar Area */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-xl group-hover:scale-110 transition-transform duration-500">
                      <span className="text-5xl font-display font-bold text-primary/80">{member.name[0]}</span>
                    </div>
                  </div>

                  {/* Bio Overlay on Hover */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: activeCard === member.id ? 1 : 0,
                      backdropFilter: activeCard === member.id ? "blur(8px)" : "blur(0px)"
                    }}
                    className="absolute inset-0 bg-primary/90 p-8 flex flex-col justify-center text-center pointer-events-none"
                  >
                    <p className="text-white text-sm leading-relaxed italic">
                      "{member.bio}"
                    </p>
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
                    Especialista en {member.specialty.toLowerCase()}
                  </p>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60 font-bold uppercase tracking-tighter">
                    <Sparkles size={12} className="text-gold" />
                    {member.reviews} Reseñas Verificadas
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Equipo;
