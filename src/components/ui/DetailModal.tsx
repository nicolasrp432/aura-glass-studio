import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, ShoppingBag, ArrowRight, Star, Sparkles, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface DetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: {
        id: string;
        name: string;
        description?: string;
        short_description?: string;
        price: number;
        image?: string;
        duration?: string;
        category?: string;
        popular?: boolean;
        treatwell_link?: string;
    } | null;
    onAction?: () => void;
    type: 'service' | 'product';
}

const DetailModal = ({ isOpen, onClose, item, onAction, type }: DetailModalProps) => {
    if (!item) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-transparent shadow-none sm:rounded-[2.5rem]">
                <DialogTitle className="sr-only">{item.name}</DialogTitle>
                <DialogDescription className="sr-only">
                    Detalles sobre {item.name}: {item.short_description || item.description}
                </DialogDescription>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative bg-white/90 backdrop-blur-2xl w-full h-full sm:h-auto overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/50"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 p-3 bg-white/50 backdrop-blur-md rounded-full text-foreground/70 hover:text-primary hover:bg-white transition-all shadow-lg active:scale-90"
                        aria-label="Cerrar"
                    >
                        <X size={20} />
                    </button>

                    {/* Image Section */}
                    <div className="md:w-1/2 relative h-[300px] md:h-auto overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r" />

                        {item.popular && (
                            <div className="absolute top-6 left-6 px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-xl flex items-center gap-2">
                                <Star size={12} fill="currentColor" /> POPULAR
                            </div>
                        )}

                        <div className="absolute bottom-6 left-6 md:hidden">
                            <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-primary tracking-widest uppercase shadow-lg">
                                {item.category}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                        <div>
                            <div className="hidden md:block mb-6">
                                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                    {item.category}
                                </span>
                            </div>

                            <h2 className="font-display text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight">
                                {item.name}
                            </h2>

                            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/50">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Precio</span>
                                    <span className="text-3xl font-black text-primary">{item.price.toFixed(2)}€</span>
                                </div>
                                {item.duration && (
                                    <div className="flex flex-col border-l border-border/50 pl-6">
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Duración</span>
                                        <span className="text-xl font-bold text-foreground flex items-center gap-2">
                                            <Clock size={16} className="text-primary" /> {item.duration}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6 mb-10">
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.description || item.short_description}
                                </p>

                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                                        <CheckCircle2 size={16} className="text-primary" />
                                        <span>Productos de alta gama (OPI, Semilac)</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                                        <CheckCircle2 size={16} className="text-primary" />
                                        <span>Protocolos de higiene certificados</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                                        <CheckCircle2 size={16} className="text-primary" />
                                        <span>Garantía de satisfacción Mani Pedi</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto">
                            {type === 'service' ? (
                                <a
                                    href={item.treatwell_link || "https://www.treatwell.es/establecimiento/mani-pedi-1/"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 text-sm tracking-widest group shadow-xl shadow-primary/20"
                                >
                                    RESERVAR AHORA <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </a>
                            ) : (
                                <button
                                    onClick={onAction}
                                    className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 text-sm tracking-widest group shadow-xl shadow-primary/20"
                                >
                                    AÑADIR AL CARRITO <ShoppingBag size={18} className="transition-transform group-hover:scale-110" />
                                </button>
                            )}

                            <p className="text-center text-[10px] text-muted-foreground mt-6 uppercase tracking-widest opacity-60">
                                {type === 'service' ? 'Pago seguro en el salón o vía Treatwell' : 'Envio gratuito en pedidos superiores a 50€'}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};

export default DetailModal;
