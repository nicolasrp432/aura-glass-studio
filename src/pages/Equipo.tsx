import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import Layout from "@/components/layout/Layout";

const team = [
  {
    id: 1,
    name: "Ana María López",
    role: "Fundadora & Nail Artist",
    specialty: "Nail Art & Diseños Exclusivos",
    bio: "Con más de 15 años de experiencia, Ana fundó Mani Pedi Las Arenas con la visión de crear un espacio donde cada clienta se sienta especial. Especializada en técnicas avanzadas de nail art.",
    instagram: "anamaria_nails",
    color: "from-primary to-accent",
  },
  {
    id: 2,
    name: "Laura Pérez",
    role: "Especialista en Pedicura Spa",
    specialty: "Tratamientos Podológicos",
    bio: "Laura combina técnicas de spa con conocimientos podológicos para ofrecer tratamientos de pedicura que van más allá de la estética, cuidando la salud de tus pies.",
    instagram: "laura_pedispa",
    color: "from-accent to-rose",
  },
  {
    id: 3,
    name: "Carmen Ruiz",
    role: "Manicurista Senior",
    specialty: "Manicura Gel & Extensiones",
    bio: "Experta en técnicas de gel y extensiones de uñas. Carmen se mantiene siempre actualizada con las últimas tendencias y técnicas internacionales.",
    instagram: "carmen_gelexpert",
    color: "from-primary/80 to-gold",
  },
  {
    id: 4,
    name: "Sofia García",
    role: "Nail Artist",
    specialty: "Diseños Creativos & Tendencias",
    bio: "La más joven del equipo pero con un talento innato para los diseños creativos. Sofia trae frescura y las últimas tendencias de redes sociales al salón.",
    instagram: "sofia_nailart",
    color: "from-gold to-accent",
  },
];

const Equipo = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

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
              Nuestro Equipo
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Conoce a las artistas
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un equipo apasionado y profesional dedicado a hacer realidad 
              tus sueños de belleza
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding pt-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
                onMouseEnter={() => setActiveCard(member.id)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => setActiveCard(activeCard === member.id ? null : member.id)}
              >
                {/* Avatar */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-80`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl font-display font-bold text-white/90">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  
                  {/* Bio Overlay */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: activeCard === member.id ? 1 : 0,
                      y: activeCard === member.id ? 0 : 20,
                    }}
                    className="absolute inset-0 bg-foreground/90 p-6 flex flex-col justify-end"
                  >
                    <p className="text-white/90 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-xs mb-4">
                    {member.specialty}
                  </p>

                  <a
                    href={`https://instagram.com/${member.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Instagram size={16} />
                    @{member.instagram}
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-content rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
              Nuestros Valores
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Excelencia",
                  description: "Buscamos la perfección en cada detalle",
                },
                {
                  title: "Pasión",
                  description: "Amamos lo que hacemos y se nota en el resultado",
                },
                {
                  title: "Cuidado",
                  description: "Tu bienestar y satisfacción son nuestra prioridad",
                },
              ].map((value) => (
                <div key={value.title}>
                  <h3 className="font-display text-xl font-semibold text-primary mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Equipo;
