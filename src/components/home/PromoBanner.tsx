import { motion, Variants } from "framer-motion";
import { ArrowRight, Sun, ShieldCheck, Droplets, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const promo = {
  season: "promoción de agosto",
  title: "Ritual Solar",
  subtitle: "protege, hidrata y cuida tu piel este verano",
  description:
    "El sol de agosto es el que más marca la piel. Preparamos tu rostro y tus manos con un ritual de hidratación profunda y te llevas a casa la protección diaria que necesitas.",
  price: "69€",
  compareAt: "95€",
  discount: "-27%",
  validity: "válido del 1 al 31 de agosto",
};

const perks = [
  {
    icon: Sun,
    title: "SPF 50+ de regalo",
    text: "Protector facial de alta protección incluido en el ritual.",
  },
  {
    icon: Droplets,
    title: "Limpieza e hidratación",
    text: "Facial profunda que repara la piel castigada por el sol y la sal.",
  },
  {
    icon: ShieldCheck,
    title: "Manos y uñas protegidas",
    text: "Top coat con filtro UV para que el color no se apague en la playa.",
  },
];

const PromoBanner = () => {
  const glowVariants: Variants = {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [0.35, 0.6, 0.35],
      transition: {
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#08131c] py-16 md:py-24">
      {/* Ambiente: atardecer sobre el mar */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#08131c] via-[#0f2733] to-[#1b1410]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(247,178,103,0.30),transparent_46%),radial-gradient(circle_at_12%_10%,rgba(79,195,199,0.16),transparent_40%),radial-gradient(circle_at_50%_115%,rgba(255,217,160,0.14),transparent_52%)]" />

        {/* Rayos de sol */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -right-[18%] -top-[42%] h-[820px] w-[820px] opacity-[0.14] [mask-image:radial-gradient(circle,black,transparent_68%)]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg 10deg, rgba(255,214,160,0.9) 10deg 12deg, transparent 12deg 26deg, rgba(255,214,160,0.7) 26deg 27deg, transparent 27deg 44deg, rgba(255,214,160,0.85) 44deg 46deg, transparent 46deg 62deg, rgba(255,214,160,0.6) 62deg 63deg, transparent 63deg 80deg)",
          }}
        />

        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            variants={glowVariants}
            animate="animate"
            className="absolute rounded-full blur-[130px]"
            style={{
              width: [420, 300, 260][i],
              height: [420, 300, 260][i],
              top: ["-12%", "58%", "70%"][i],
              left: ["66%", "-8%", "46%"][i],
              background: [
                "rgba(247,178,103,0.42)",
                "rgba(79,195,199,0.22)",
                "rgba(236,168,194,0.18)",
              ][i],
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border border-white/12 bg-white/[0.06] p-6 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.65)] backdrop-blur-2xl md:rounded-[2.75rem] md:p-10 lg:p-12"
        >
          {/* Filo luminoso superior */}
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#ffd9a0]/70 to-transparent" />

          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
            {/* Contenido principal */}
            <div className="space-y-7 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 rounded-full border border-[#ffd9a0]/30 bg-[#ffd9a0]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffe4bd]"
              >
                <Sun className="h-4 w-4" />
                {promo.season}
              </motion.div>

              <div className="space-y-4">
                <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-white text-balance md:text-7xl">
                  {promo.title}
                  <span className="mt-2 block bg-gradient-to-r from-[#ffd9a0] via-[#f7b267] to-[#ffd9a0] bg-clip-text text-2xl font-semibold italic text-transparent md:text-4xl">
                    {promo.subtitle}
                  </span>
                </h2>
                <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/75 lg:mx-0 md:text-lg">
                  {promo.description}
                </p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-3">
                {perks.map((perk, index) => (
                  <motion.li
                    key={perk.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-[1.4rem] border border-white/10 bg-black/15 p-5 text-left backdrop-blur-md transition-colors duration-300 hover:border-[#ffd9a0]/30 hover:bg-black/25"
                  >
                    <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffd9a0]/12 text-[#ffd9a0]">
                      <perk.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {perk.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                      {perk.text}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Panel de precio */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#ffd9a0]/25 via-transparent to-[#4fc3c7]/15 blur-2xl" />

              <div className="relative overflow-hidden rounded-[1.9rem] border border-white/14 bg-[#0b1a24]/75 p-7 text-center backdrop-blur-xl md:p-8">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#f7b267]/25 blur-3xl" />

                <div className="relative space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-white/75">
                    <Sparkles className="h-3.5 w-3.5 text-[#ffd9a0]" />
                    pack completo
                  </div>

                  <div>
                    <div className="flex items-end justify-center gap-3">
                      <span className="font-display text-6xl font-black leading-none text-white md:text-7xl">
                        {promo.price}
                      </span>
                      <span className="pb-2 text-lg font-medium text-white/45 line-through">
                        {promo.compareAt}
                      </span>
                    </div>
                    <span className="mt-4 inline-block rounded-full bg-gradient-to-r from-[#ffd9a0] to-[#f7b267] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#3a2410]">
                      {promo.discount} este mes
                    </span>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  <div className="space-y-3">
                    <Link
                      to="/contacto"
                      className="group flex w-full items-center justify-center gap-3 whitespace-nowrap rounded-full bg-white px-5 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-[#08131c] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fff5e6] active:scale-[0.98] sm:px-6 sm:text-sm sm:tracking-[0.18em]"
                    >
                      reservar mi ritual
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                    </Link>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/50">
                      {promo.validity} · plazas limitadas
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;
