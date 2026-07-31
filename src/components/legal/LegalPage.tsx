import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Layout from "@/components/layout/Layout";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt: string;
  children: ReactNode;
}

/** Envoltorio común de las páginas legales, con el estilo premium del sitio. */
const LegalPage = ({ eyebrow, title, intro, updatedAt, children }: LegalPageProps) => (
  <Layout>
    <section className="relative overflow-hidden pb-8 pt-28 md:pt-40">
      <div className="pointer-events-none absolute right-[-10%] top-[-10%] -z-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl md:h-[40%] md:w-[40%]" />
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-gold">
            <ShieldCheck size={14} /> {eyebrow}
          </span>
          <h1 className="font-display text-4xl font-bold text-foreground md:text-6xl">{title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">
            Última actualización: {updatedAt}
          </p>
        </motion.div>
      </div>
    </section>

    <section className="pb-20 md:pb-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="legal-prose mx-auto max-w-3xl rounded-[1.5rem] border border-white/60 bg-white/50 p-6 shadow-xl backdrop-blur-2xl md:rounded-[2.5rem] md:p-12"
        >
          {children}
        </motion.article>
      </div>
    </section>
  </Layout>
);

/** Sección numerada dentro de un documento legal. */
export const LegalSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mt-10 first:mt-0">
    <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
    <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-foreground/80">{children}</div>
  </section>
);

export default LegalPage;
