import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MessageCircle, ExternalLink, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import servicesData from "@/data/services.json";


const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<any[]>(servicesData.testimonials);
  const [isLoading, setIsLoading] = useState(false);
  const reviewUrl = "https://g.page/r/CWkuFLIEmbrfEAE/review";

  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('id', { ascending: true });

        if (!error && data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="section-padding relative overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8">
              <Star size={14} className="fill-primary" />
              Testimonios Reales
            </span>

            <h2 className="font-display text-5xl md:text-7xl font-bold mb-10 leading-[1.1]">
              Lo que dicen <br />
              <span className="text-gradient">nuestras clientas</span>
            </h2>

            {/* Integrated Rating - Elegant & Minimalist */}
            <div className="flex flex-col items-center gap-3 mb-10 p-6 glass-deco rounded-3xl border-primary/10 shadow-xl shadow-primary/5">
              <div className="flex items-center gap-5">
                <span className="text-5xl md:text-6xl font-black text-foreground tabular-nums">4.5</span>
                <div className="flex flex-col items-start gap-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={22} className={s <= 4 ? "fill-[#FBBC04] text-[#FBBC04]" : "fill-[#FBBC04]/20 text-[#FBBC04]/20"} />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Reseñas en Google</span>
                </div>
              </div>
            </div>

            <p className="text-xl text-muted-foreground max-w-2xl mb-12 font-medium leading-relaxed">
              Nuestra mayor garantía es la satisfacción de quienes confían en nosotros día a día.
              Opiniones reales extraídas de nuestro perfil de Google.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <a
                href={reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-3 px-10 py-5 text-sm font-bold group shadow-lg shadow-primary/20"
              >
                <MessageCircle size={20} />
                Escribir una reseña
                <ExternalLink size={16} className="opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href={reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold text-sm tracking-wider uppercase hover:underline decoration-2 underline-offset-8 flex items-center gap-2"
              >
                Ver todas en Google
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Grid/Carousel */}
        <div className="flex overflow-x-auto pb-12 -mx-6 px-6 snap-x snap-mandatory lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-8 no-scrollbar">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="min-w-[320px] md:min-w-[380px] lg:min-w-0 snap-center glass-card p-10 rounded-[3rem] flex flex-col justify-between hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group border-white/20 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold overflow-hidden border border-white/50 shadow-inner">
                      {testimonial.avatar ? (
                        <span className="text-primary text-xl font-display">{testimonial.avatar}</span>
                      ) : (
                        <span className="text-primary text-xl font-display">
                          {testimonial.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-display font-black text-foreground flex items-center gap-2">
                        {testimonial.name}
                        {testimonial.isLocalGuide && (
                          <div className="group/guide relative">
                            <ShieldCheck size={16} className="text-orange-500" />
                          </div>
                        )}
                      </h4>
                      <p className="text-[10px] uppercase font-black tracking-widest text-primary/60">{testimonial.date}</p>
                    </div>
                  </div>
                  <img
                    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                    alt="G"
                    className="h-3 grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100"
                  />
                </div>

                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? "fill-[#FBBC04] text-[#FBBC04]" : "text-muted-foreground/20"}
                    />
                  ))}
                </div>

                <p className="text-foreground/90 leading-relaxed italic text-lg group-hover:text-foreground transition-colors duration-300 font-medium">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-border/50 flex items-center justify-between">
                <span className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground/50 group-hover:text-primary transition-colors">
                  Google Verified
                </span>
                <a
                  href={reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20"
                >
                  <ExternalLink size={18} className="text-primary opacity-30 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

