import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/stores/cartStore";
import { toast } from "@/hooks/use-toast";

const CartDrawer = () => {
  const { items, isOpen, setCartOpen, updateQuantity, removeItem, total } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Note: Actual Stripe session creation requires a backend.
    // We'll prepare the structure here.
    toast({
      title: "Iniciando pago",
      description: "Redirigiendo a la pasarela segura de Stripe...",
    });

    // Simulate API call
    setTimeout(() => {
      setIsCheckingOut(false);
      setCartOpen(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white/80 backdrop-blur-2xl shadow-2xl z-[70] flex flex-col border-l border-white/40"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <ShoppingBag size={22} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold">Tu Selección</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                    {items.length} {items.length === 1 ? 'Producto' : 'Productos'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-3 hover:bg-muted/50 rounded-full transition-all active:scale-90"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  <div className="w-24 h-24 bg-muted/30 rounded-[2rem] flex items-center justify-center text-muted-foreground/30">
                    <ShoppingBag size={48} />
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold text-foreground">Tu carrito está vacío</p>
                    <p className="text-sm text-muted-foreground mt-2">Parece que aún no has añadido nada.</p>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="btn-secondary py-3 px-8 text-sm"
                  >
                    DESCUBRIR PRODUCTOS
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="group relative flex gap-5 p-5 glass-content rounded-[2rem] border-white/50 hover:bg-white/90 transition-all duration-300"
                    >
                      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-2xl shadow-md">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-foreground truncate pr-6">{item.name}</h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                            aria-label="Eliminar item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-primary font-black text-lg mb-3">
                          {item.price.toFixed(2)}€
                        </p>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-muted/40 backdrop-blur-sm rounded-xl p-1 border border-border/50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-white/80 rounded-lg transition-all active:scale-90"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={12} className={item.quantity <= 1 ? "opacity-30" : ""} />
                            </button>
                            <span className="w-10 text-center text-sm font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-white/80 rounded-lg transition-all active:scale-90"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-border/50 bg-white/40 backdrop-blur-md">
                <div className="flex justify-between items-end mb-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Total estimado</span>
                    <span className="text-3xl font-display font-black text-foreground">
                      {total().toFixed(2)}€
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Pagos Seguros</p>
                    <div className="flex gap-2">
                      <div className="w-8 h-5 bg-muted/50 rounded flex items-center justify-center text-[8px] font-bold opacity-50">VISA</div>
                      <div className="w-8 h-5 bg-muted/50 rounded flex items-center justify-center text-[8px] font-bold opacity-50">MC</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full btn-primary py-5 rounded-[1.5rem] flex items-center justify-center gap-3 text-sm tracking-widest"
                >
                  {isCheckingOut ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>FINALIZAR COMPRA <ArrowRight size={18} /></>
                  )}
                </button>

                <p className="text-center text-[10px] text-muted-foreground mt-4 uppercase tracking-tighter">
                  Procesado de forma segura por Stripe. <br />
                  Devoluciones gratuitas hasta 14 días.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
