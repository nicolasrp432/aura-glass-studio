import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, Sparkles, Maximize2, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/lib/supabase";

const initialGallery = [
    { id: 1, url: "/gallery/IMG_4762.jpg", title: "Nail Art Floral", category: "Manicura" },
    { id: 2, url: "/gallery/IMG_4764.jpg", title: "Pedicura Spa Luxe", category: "Pedicura" },
    { id: 3, url: "/gallery/IMG_4767.jpg", title: "Diseño Elegante", category: "Manicura" },
    { id: 4, url: "/gallery/IMG_4768.jpg", title: "Fortalecimiento Natural", category: "Tratamientos" },
    { id: 5, url: "/gallery/IMG_4770.jpg", title: "Estilo Moderno", category: "Manicura" },
    { id: 6, url: "/gallery/IMG_4771.jpg", title: "Colores Vibrantes", category: "Manicura" },
    { id: 7, url: "/gallery/IMG_4772.jpg", title: "Acabado Perfecto", category: "Pedicura" },
    { id: 8, url: "/gallery/IMG_4773.jpg", title: "Arte en Uñas", category: "Manicura" },
];

const Galeria = () => {
    const [items, setItems] = useState(initialGallery);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchGallery = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('gallery')
                    .select('*')
                    .order('id', { ascending: false });

                if (!error && data && data.length > 0) {
                    // Deduplicate by URL to avoid repeated images
                    const seen = new Set<string>();
                    const unique = data.filter((item) => {
                        if (seen.has(item.url)) return false;
                        seen.add(item.url);
                        return true;
                    });
                    setItems(unique);
                } else {
                    console.warn("Using local fallback data for gallery due to empty data or error:", error);
                }
            } catch (err) {
                console.error("Error fetching gallery:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGallery();

        // Realtime subscription
        const channel = supabase
            .channel('public:gallery')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery' }, (payload) => {
                console.log('Change received!', payload);
                fetchGallery();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <Layout>
            {/* Gallery Hero */}
            <section className="pt-40 pb-20 relative overflow-hidden text-center">
                <div className="orb orb-rose top-[-10%] left-[-10%] w-[40%] h-[40%]" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="flex items-center justify-center gap-2 text-accent font-bold mb-4 tracking-[0.3em] uppercase text-xs">
                            <Sparkles size={14} /> Inspiración <Sparkles size={14} />
                        </span>
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8">
                            Galería de <span className="text-secondary italic">Trabajos</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                            Explora nuestra colección de resultados reales. La perfección en cada detalle,
                            diseñada para realzar tu belleza natural.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="pb-32 relative z-10">
                <div className="container mx-auto px-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative group cursor-pointer break-inside-avoid rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                                    onClick={() => setSelectedImage(item.url)}
                                >
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                        <span className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{item.category}</span>
                                        <h3 className="text-white font-display text-2xl font-bold">{item.title}</h3>
                                        <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300">
                                            <Maximize2 size={20} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors p-4"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage}
                            alt="Lightbox"
                            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    );
};

export default Galeria;
