import { useEffect, useState, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Droplets,
  Zap,
  Radio,
  Sun,
  Wind,
  Activity,
  Layers,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Star,
  X,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const TREATWELL_LINK = "https://www.treatwell.es/establecimiento/mani-pedi-1/";

const categories = [
  { id: "all", label: "Todos" },
  { id: "facial", label: "Faciales" },
  { id: "corporal", label: "Corporales" },
  { id: "bienestar", label: "Bienestar" },
];

type TreatmentCategory = "facial" | "corporal" | "bienestar";

type Treatment = {
  id: number;
  numero: string;
  nombre: string;
  categoria: TreatmentCategory;
  descripcion: string;
  beneficios: string[];
  badge: string | null;
  badgeColor: "primary" | "gold" | "accent" | null;
  icon: string;
  esencial: boolean;
  advertencia: string | null;
  image: string;
};

type IconProps = {
  size?: number;
  className?: string;
};

const tratamientos: Treatment[] = [
  {
    id: 1,
    numero: "01",
    nombre: "Limpieza Facial + Tratamiento",
    categoria: "facial",
    descripcion:
      "El primer y más importante paso. Sirve para eliminar impurezas, preparar la piel y permitir que los tratamientos activos se absorban con mayor eficacia. Se combina con principios activos específicos según las necesidades del cliente.",
    beneficios: [
      "Elimina impurezas y prepara la piel para tratamientos",
      "Potencia la absorción de principios activos",
      "Indicada para: Acné, Manchas, Rosácea, Deshidratación, Pieles maduras",
    ],
    badge: "Paso Esencial",
    badgeColor: "primary",
    icon: "Droplets",
    esencial: true,
    advertencia: null,
    image: "/tratamientos/limpia.jpg",
  },
  {
    id: 2,
    numero: "02",
    nombre: "Dermapen",
    categoria: "facial",
    descripcion:
      "Mejora la textura de la piel, reduce cicatrices y aporta luminosidad. Se combina con Vitamina C y Ácido Hialurónico para potenciar los resultados, dejando una piel suave con vitalidad, firme y rejuvenecida.",
    beneficios: [
      "Mejora la textura y reduce cicatrices",
      "Aporta luminosidad y vitalidad",
      "Piel firme, suave y rejuvenecida",
      "Combinado con Vitamina C + Ácido Hialurónico",
    ],
    badge: null,
    badgeColor: null,
    icon: "Zap",
    esencial: false,
    advertencia: null,
    image: "/tratamientos/renueva.jpg",
  },
  {
    id: 3,
    numero: "03",
    nombre: "Radiofrecuencia",
    categoria: "facial",
    descripcion:
      "Reafirma y mejora la firmeza de la piel. También se usan Vitamina C, Ácido Hialurónico y péptidos para un efecto antioxidante y de hidratación profunda que estimula el colágeno natural.",
    beneficios: [
      "Reafirma y mejora la firmeza de la piel",
      "Efecto antioxidante con Vitamina C",
      "Hidratación profunda con Ácido Hialurónico",
      "Péptidos regeneradores",
    ],
    badge: null,
    badgeColor: null,
    icon: "Radio",
    esencial: false,
    advertencia: "No apto para embarazadas",
    image: "/tratamientos/colageno.jpg",
  },
  {
    id: 4,
    numero: "04",
    nombre: "Dermapen con Exosomas",
    categoria: "facial",
    descripcion:
      "Los exosomas son partículas que regeneran la piel a nivel celular. Sirve para acelerar la reparación, mejora la luminosidad y reduce arrugas, dejando una piel más joven y revitalizada.",
    beneficios: [
      "Regeneración celular profunda",
      "Acelera la reparación de la piel",
      "Reduce arrugas y mejora luminosidad",
      "Piel más joven y revitalizada",
    ],
    badge: "Premium",
    badgeColor: "gold",
    icon: "Sparkles",
    esencial: false,
    advertencia: null,
    image: "/tratamientos/piel.jpg",
  },
  {
    id: 5,
    numero: "05",
    nombre: "Tratamiento de Manchas",
    categoria: "facial",
    descripcion:
      "Ayuda progresivamente a atenuar la hiperpigmentación cutánea, previniendo su aparición futura. Potencia un tono más uniforme, aportando claridad al rostro y mejorando el aspecto de las manchas.",
    beneficios: [
      "Atenúa la hiperpigmentación cutánea",
      "Previene la aparición futura de manchas",
      "Tono de piel más uniforme",
      "Claridad y luminosidad al rostro",
    ],
    badge: null,
    badgeColor: null,
    icon: "Sun",
    esencial: false,
    advertencia: null,
    image: "/tratamientos/macnhas.jpg",
  },
  {
    id: 6,
    numero: "06",
    nombre: "Starvac Facial",
    categoria: "facial",
    descripcion:
      "Ayuda a desinflamar y mejorar el contorno facial. Mejora las líneas de expresión, redefine la papada y activa la circulación para una piel más tonificada.",
    beneficios: [
      "Desinflamar y mejora el contorno facial",
      "Mejora las líneas de expresión",
      "Redefine la papada",
      "Activa la circulación",
    ],
    badge: null,
    badgeColor: null,
    icon: "Wind",
    esencial: false,
    advertencia: null,
    image: "/tratamientos/masajefacial.jpg",
  },
  {
    id: 7,
    numero: "07",
    nombre: "Starvac Corporal",
    categoria: "corporal",
    descripcion:
      "Tratamiento de succión corporal que mejora la circulación, reduce la celulitis y drena líquidos acumulados. Tonifica y reafirma el cuerpo de manera progresiva y efectiva.",
    beneficios: [
      "Mejora la circulación sanguínea",
      "Reduce la celulitis visiblemente",
      "Drena líquidos acumulados",
      "Tonifica y reafirma el cuerpo",
    ],
    badge: null,
    badgeColor: null,
    icon: "Activity",
    esencial: false,
    advertencia: null,
    image: "/tratamientos/masjecuero.jpg",
  },
  {
    id: 8,
    numero: "08",
    nombre: "Maderoterapia Facial y Corporal",
    categoria: "corporal",
    descripcion:
      "Consiste en tonificar el cuerpo con instrumentos de madera. Ayuda a eliminar retención de líquidos, trata la grasa localizada, reduce medidas y activa la circulación. Ofrece resultados y sensaciones únicas.",
    beneficios: [
      "Elimina la retención de líquidos",
      "Trata la grasa localizada",
      "Reduce medidas",
      "Activa la circulación",
    ],
    badge: "Facial y Corporal",
    badgeColor: "accent",
    icon: "Layers",
    esencial: false,
    advertencia: null,
    image: "/tratamientos/madero.jpg",
  },
  {
    id: 9,
    numero: "09",
    nombre: "Duo Linfa — Desintoxicación Iónica",
    categoria: "bienestar",
    descripcion:
      "Proceso de desintoxicación iónica — un gran método de limpieza que desintoxica el cuerpo entero colocando los pies en agua con iones positivos y negativos. Aporta una recuperación natural del cuerpo.",
    beneficios: [
      "Eliminación de toxinas acumuladas",
      "Luminosidad en la piel",
      "Rejuvenece órganos internos",
      "Elimina metales pesados",
      "Desinflamar el cuerpo",
      "Recuperación natural profunda",
    ],
    badge: "Detox",
    badgeColor: "primary",
    icon: "Droplets",
    esencial: false,
    advertencia: null,
    image: "/tratamientos/cosmetica.jpg",
  },
];

const sliderImages = tratamientos.map((treatment) => ({
  src: treatment.image,
  alt: treatment.nombre,
  label: treatment.categoria,
}));

const sliderRail = [...sliderImages, ...sliderImages];

const iconMap: Record<string, ComponentType<IconProps>> = {
  Droplets,
  Zap,
  Radio,
  Sun,
  Wind,
  Activity,
  Layers,
  Sparkles,
};

const headerClassMap: Record<NonNullable<Treatment["badgeColor"]>, string> = {
  primary: "bg-primary/10",
  gold: "bg-gradient-to-br from-gold/10 via-white/70 to-white/30",
  accent: "bg-accent/10",
};

const iconCircleClassMap: Record<NonNullable<Treatment["badgeColor"]>, string> = {
  primary: "bg-primary/20 text-primary",
  gold: "bg-gold/20 text-gold",
  accent: "bg-accent/20 text-accent",
};

const getHeaderClass = (badgeColor: Treatment["badgeColor"]) => {
  if (!badgeColor) return "bg-muted/50";
  return headerClassMap[badgeColor];
};

const getIconCircleClass = (badgeColor: Treatment["badgeColor"]) => {
  if (!badgeColor) return "bg-primary/20 text-primary";
  return iconCircleClassMap[badgeColor];
};

interface TreatmentDetailModalProps {
  treatment: Treatment | null;
  onClose: () => void;
}

const TreatmentDetailModal = ({ treatment, onClose }: TreatmentDetailModalProps) => {
  if (!treatment) return null;

  const IconComponent = iconMap[treatment.icon] || Sparkles;

  return (
    <Dialog open={Boolean(treatment)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-transparent shadow-none sm:rounded-[2.5rem]">
        <DialogTitle className="sr-only">{treatment.nombre}</DialogTitle>
        <DialogDescription className="sr-only">
          {treatment.descripcion}
        </DialogDescription>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 18 }}
          className="relative bg-white/90 backdrop-blur-2xl w-full h-full sm:h-auto overflow-hidden shadow-2xl border border-white/50 rounded-[2.5rem]"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 bg-white/70 backdrop-blur-md rounded-full text-foreground/70 hover:text-primary hover:bg-white transition-all shadow-lg active:scale-90"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>

          <div className={`relative overflow-hidden ${getHeaderClass(treatment.badgeColor)} p-8 md:p-12`}>
            <div className="absolute top-4 right-6 font-display text-8xl md:text-9xl font-bold opacity-10 select-none leading-none">
              {treatment.numero}
            </div>

            <div className="flex items-start justify-between gap-4 mb-8">
              <div className="space-y-3 max-w-3xl">
                <span className="inline-flex items-center gap-2 text-primary font-bold tracking-[0.3em] uppercase text-xs">
                  <Sparkles size={14} /> Tratamiento en Cabina <Sparkles size={14} />
                </span>
                <h3 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
                  {treatment.nombre}
                </h3>
              </div>

              <div className={`hidden md:flex h-20 w-20 shrink-0 items-center justify-center rounded-full ${getIconCircleClass(treatment.badgeColor)}`}>
                <IconComponent size={40} />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-white/80 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/60 shadow-sm">
                {treatment.categoria}
              </span>

              {treatment.badge && (
                <span
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border ${
                    treatment.badgeColor === "primary"
                      ? "bg-primary/15 text-primary border-primary/20"
                      : treatment.badgeColor === "gold"
                        ? "bg-gold/15 text-gold border-gold/20"
                        : "bg-accent/15 text-accent border-accent/20"
                  }`}
                >
                  {treatment.badgeColor === "gold" ? <Star size={12} fill="currentColor" /> : <Sparkles size={12} />}
                  {treatment.badge}
                </span>
              )}

              {treatment.esencial && (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border bg-primary/15 text-primary border-primary/20">
                  <Sparkles size={12} /> Paso Esencial
                </span>
              )}

              {treatment.advertencia && (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border bg-destructive/10 text-destructive border-destructive/20">
                  <AlertTriangle size={12} /> {treatment.advertencia}
                </span>
              )}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-10">
              <div>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8">
                  {treatment.descripcion}
                </p>

                <div className="space-y-4">
                  {treatment.beneficios.map((beneficio) => (
                    <div key={beneficio} className="flex items-start gap-3 text-sm text-foreground/80 font-medium">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                      <span>{beneficio}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-content rounded-[2rem] p-6 md:p-8 border-white/50 relative overflow-hidden">
                <div className="orb orb-turquoise absolute top-[-20%] right-[-18%] w-[55%] h-[55%] opacity-20" />

                <div className="relative z-10 space-y-5">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-2">
                      Asesoría personalizada
                    </span>
                    <h4 className="font-display text-2xl font-bold text-foreground leading-tight">
                      Te ayudamos a elegir el protocolo correcto
                    </h4>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Cada tratamiento se adapta a tu piel, objetivos y momento de cuidado.
                    Nuestras profesionales te orientan con criterio y precisión.
                  </p>

                  <a
                    href={TREATWELL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex w-full items-center justify-center gap-3 group"
                  >
                    RESERVAR AHORA
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </a>

                  <button
                    onClick={onClose}
                    className="btn-secondary inline-flex w-full items-center justify-center gap-3"
                  >
                    CERRAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

const TratamientosCabina = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (selectedTreatment) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedTreatment]);

  const filteredTreatments =
    activeCategory === "all"
      ? tratamientos
      : tratamientos.filter((treatment) => treatment.categoria === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="orb orb-turquoise top-[-10%] left-[-10%] w-[40%] h-[40%]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="flex items-center justify-center gap-2 text-primary font-bold mb-4 tracking-[0.3em] uppercase text-xs">
              <Sparkles size={14} /> Tratamientos Profesionales <Sparkles size={14} />
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
              Tratamientos <br />
              <span className="text-primary italic">en Cabina</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Protocolos personalizados para cada tipo de piel. Tecnología avanzada combinada con
              principios activos de alta eficacia para resultados visibles y duraderos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stock Slider */}
      <section className="pb-16 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden"
          >
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex w-max gap-6"
            >
              {sliderRail.map((image, index) => (
                <div
                  key={`${image.label}-${index}`}
                  className="glass-card rounded-[2rem] overflow-hidden group relative min-h-[18rem] w-[18rem] sm:w-[22rem] md:w-[24rem] shrink-0"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary shadow-lg">
                      <Sparkles size={12} /> {image.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="sticky top-24 z-30 mb-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-content rounded-3xl p-2 flex flex-wrap justify-center gap-2 shadow-xl border-white/50"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "hover:bg-primary/5 text-foreground/70"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredTreatments.map((treatment, index) => {
                const IconComponent = iconMap[treatment.icon] || Sparkles;

                return (
                  <motion.article
                    key={treatment.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 16 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card rounded-[2.5rem] overflow-hidden group flex flex-col h-full"
                  >
                    <div className={`relative overflow-hidden ${getHeaderClass(treatment.badgeColor)} p-8 min-h-[18rem]`}>
                      <img
                        src={treatment.image}
                        alt={treatment.nombre}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />

                      <div className="absolute top-4 right-6 font-display text-8xl font-bold opacity-10 select-none leading-none">
                        {treatment.numero}
                      </div>

                      <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
                        {treatment.badge && (
                          <span
                            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border ${
                              treatment.badgeColor === "primary"
                                ? "bg-primary/15 text-primary border-primary/20"
                                : treatment.badgeColor === "gold"
                                  ? "bg-gold/15 text-gold border-gold/20"
                                  : "bg-accent/15 text-accent border-accent/20"
                            }`}
                          >
                            {treatment.badgeColor === "gold" ? <Star size={12} fill="currentColor" /> : <Sparkles size={12} />}
                            {treatment.badge}
                          </span>
                        )}

                        {treatment.advertencia && (
                          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border bg-destructive/10 text-destructive border-destructive/20">
                            <AlertTriangle size={12} /> {treatment.advertencia}
                          </span>
                        )}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`flex h-20 w-20 items-center justify-center rounded-full ${getIconCircleClass(treatment.badgeColor)} shadow-lg backdrop-blur-sm`}>
                          <IconComponent size={40} />
                        </div>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1 relative">
                      <h3 className="font-display text-2xl font-bold group-hover:text-primary transition-colors leading-tight mb-4">
                        {treatment.nombre}
                      </h3>

                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-1">
                        {treatment.descripcion}
                      </p>

                      <div className="space-y-3 mb-8">
                        {treatment.beneficios.map((beneficio) => (
                          <div
                            key={beneficio}
                            className="flex items-start gap-3 text-sm text-foreground/80 font-medium group-hover:text-foreground transition-colors"
                          >
                            <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                            <span>{beneficio}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto pt-6 border-t border-border group-hover:border-primary/20 transition-colors">
                        <button
                          onClick={() => setSelectedTreatment(treatment)}
                          className="btn-secondary w-full inline-flex items-center justify-center gap-3 group"
                        >
                          CONSULTAR
                          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            id="cta-tratamientos"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 glass-content rounded-[3rem] p-12 md:p-16 text-center border-white/40 relative overflow-hidden"
          >
            <div className="orb orb-turquoise absolute top-[-30%] right-[-10%] w-[40%] h-[40%] -z-10 opacity-30" />

            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs flex items-center justify-center gap-2 mb-4">
              <Sparkles size={14} /> ¿No sabes cuál tratamiento necesitas? <Sparkles size={14} />
            </span>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Te asesoramos <span className="text-primary italic">sin compromiso</span>
            </h2>

            <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed mb-10">
              Cada tratamiento se personaliza según tu tipo de piel, necesidades y objetivos.
              Nuestras profesionales te guiarán hacia el protocolo ideal para ti.
            </p>

            <a
              href={TREATWELL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3 group"
            >
              RESERVAR CONSULTA
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" />
            </a>
          </motion.div>
        </div>
      </section>

      <TreatmentDetailModal
        treatment={selectedTreatment}
        onClose={() => setSelectedTreatment(null)}
      />
    </Layout>
  );
};

export default TratamientosCabina;
