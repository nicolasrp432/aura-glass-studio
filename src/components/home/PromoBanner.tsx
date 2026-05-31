import { motion, Variants } from "framer-motion";
import { ArrowRight, Sparkles, Eye, Feather, BadgePercent } from "lucide-react";
import { Link } from "react-router-dom";

const PromoBanner = () => {
  const glowVariants: Variants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const perks = [
    {
      icon: Eye,
      title: "lifting coreano",
      text: "Pestañas curvadas, elevadas y con efecto natural sin extensiones.",
    },
    {
      icon: Feather,
      title: "cejas con henna",
      text: "Definición, simetría y color duradero durante varias semanas.",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-[#0b1320]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1320] via-[#15253d] to-[#0f1726]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_75%_25%,rgba(79,195,247,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(236,168,194,0.10),transparent_28%)]" />

        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            variants={glowVariants}
            animate="animate"
            className="absolute rounded-full bg-white/10 blur-[120px]"
            style={{
              width: [280, 360, 240][i],
              height: [280, 360, 240][i],
              top: ["8%", "52%", "72%"][i],
              left: ["-6%", "58%", "82%"][i],
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full overflow-hidden rounded-[2rem] border border-white/12 bg-white/6 p-6 md:p-8 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-center">
              <div className="relative z-10 space-y-6 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-white/80"
                >
                  <Sparkles className="h-4 w-4 text-[#f4d9a7]" />
                  promoción de junio
                </motion.div>

                <div className="space-y-4">
                  <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1] tracking-tight text-white text-balance">
                    Pack Mirada WOW
                  </h2>
                  <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-white/78 lg:mx-0">
                    Tu mirada es lo primero que se nota. Este mes, llévate unas pestañas
                    elevadas y curvadas de forma natural junto con unas cejas definidas,
                    simétricas y con color duradero.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {perks.map((perk, index) => (
                    <motion.article
                      key={perk.title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="rounded-[1.5rem] border border-white/10 bg-black/10 p-5 text-left backdrop-blur-md"
                    >
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#f4d9a7]">
                        <perk.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-xl font-semibold capitalize text-white">
                        {perk.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/68">
                        {perk.text}
                      </p>
                    </motion.article>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2 lg:justify-start">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[#0b1320] shadow-[0_16px_40px_-18px_rgba(0,0,0,0.7)]">
                    <BadgePercent className="h-4 w-4 text-[#c08d2c]" />
                    <span className="text-sm font-semibold uppercase tracking-[0.18em]">80€ pack</span>
                  </div>
                  <span className="text-sm text-white/65">
                    valor real 110€
                  </span>
                </div>

                <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center lg:justify-start">
                  <Link
                    to="/contacto"
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#0b1320] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f7f2e8] active:scale-[0.98]"
                  >
                    reservar por dm o link en bio
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                  </Link>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/55">
                    plazas limitadas
                  </p>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative mx-auto w-full max-w-[420px]"
              >
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-white/15 via-transparent to-[#f4d9a7]/15 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 p-3 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.75)]">
                  <div className="relative overflow-hidden rounded-[1.5rem]">
                    <img
                      src="/promo-nail-art.png"
                      alt="Pack Mirada WOW para junio"
                      className="h-[360px] w-full object-cover md:h-[420px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1320]/90 via-[#0b1320]/15 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-white backdrop-blur-md">
                      junio 2026
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 rounded-[1.25rem] border border-white/12 bg-[#0b1320]/70 p-4 backdrop-blur-md">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-white/55">
                            pack especial
                          </p>
                          <p className="mt-1 font-display text-2xl font-bold text-white">
                            Mirada WOW
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-white/55">
                            precio pack
                          </p>
                          <p className="mt-1 text-3xl font-black text-white">80€</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
