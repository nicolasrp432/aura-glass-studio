import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Layout from "@/components/layout/Layout";
import servicesData from "@/data/services.json";

const team = servicesData.team;
const colors = ["from-primary to-accent", "from-accent to-rose", "from-primary/80 to-gold", "from-gold to-accent", "from-rose to-primary", "from-accent to-primary"];

const Equipo = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <Layout>
      <section className="pt-32 pb-16 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-primary font-medium mb-4 tracking-widest uppercase text-sm">Nuestro Equipo</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">Conoce a las artistas</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Un equipo apasionado que te hará sentir en un auténtico oasis de la belleza y del bienestar</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.article key={member.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="glass-card rounded-2xl overflow-hidden group cursor-pointer" onMouseEnter={() => setActiveCard(member.id)} onMouseLeave={() => setActiveCard(null)}>
                <div className="relative h-56 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length]} opacity-80`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-display font-bold text-white/90">{member.name[0]}</span>
                  </div>
                  <motion.div initial={false} animate={{ opacity: activeCard === member.id ? 1 : 0 }} className="absolute inset-0 bg-foreground/90 p-6 flex flex-col justify-end">
                    <p className="text-white/90 text-sm leading-relaxed">{member.bio}</p>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-xs mb-3">{member.specialty}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Star size={14} className="text-gold fill-gold" />
                    <span className="font-semibold">{member.rating}</span>
                    <span className="text-muted-foreground">({member.reviews} opiniones)</span>
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
