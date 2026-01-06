import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, User, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useCart } from "@/stores/cartStore";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const CartDrawer = () => {
  const { items, isOpen, setCartOpen, updateQuantity, removeItem, total, clearCart } = useCart();
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [isProcessing, setIsProcessing] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: ""
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false
  });

  const validateForm = () => {
    const newErrors = {
      name: customerInfo.name.length < 3,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Datos incompletos",
        description: "Por favor, completa correctamente tus datos para continuar.",
      });
      return;
    }

    if (items.length === 0) return;

    setIsProcessing(true);

    try {
      // Validate that all items have price IDs
      const missingPriceId = items.find(item => !item.stripe_price_id);
      if (missingPriceId) {
        throw new Error(`El producto "${missingPriceId.name}" no está configurado para pagos. Por favor, elimínalo o inténtalo más tarde.`);
      }

      // Create Checkout Session via Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          items: items.map(item => ({
            stripe_price_id: item.stripe_price_id,
            quantity: item.quantity
          })),
          customer_email: customerInfo.email,
          customer_name: customerInfo.name
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("No se pudo generar la sesión de pago.");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast({
        variant: "destructive",
        title: "Error en el pago",
        description: err.message || "Hubo un problema al conectar con la pasarela de pagos.",
      });
      setIsProcessing(false);
    }
  };

  const currentTotal = total();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (step !== 'success') setCartOpen(false);
            }}
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
                  {step === 'success' ? <CheckCircle2 size={22} /> : <ShoppingBag size={22} />}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold">
                    {step === 'cart' && "Tu Selección"}
                    {step === 'checkout' && "Tus Datos"}
                    {step === 'success' && "¡Pedido Confirmado!"}
                  </h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                    {step === 'success' ? 'Gracias por tu confianza' : `${items.length} ${items.length === 1 ? 'Producto' : 'Productos'}`}
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

            {/* Items / Form */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <AnimatePresence mode="wait">
                {step === 'cart' && (
                  <motion.div
                    key="cart-view"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-6">
                        <div className="w-24 h-24 bg-muted/30 rounded-[2rem] flex items-center justify-center text-muted-foreground/30">
                          <ShoppingBag size={48} />
                        </div>
                        <div>
                          <p className="text-xl font-display font-bold text-foreground">Tu carrito está vacío</p>
                          <button
                            onClick={() => setCartOpen(false)}
                            className="btn-secondary mt-6 py-3 px-8 text-sm"
                          >
                            DESCUBRIR PRODUCTOS
                          </button>
                        </div>
                      </div>
                    ) : (
                      <ul className="space-y-6">
                        {items.map((item) => (
                          <motion.li
                            key={item.id}
                            layout
                            className="group relative flex gap-5 p-5 glass-content rounded-[2rem] border-white/50 hover:bg-white/90 transition-all duration-300 shadow-sm"
                          >
                            <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-2xl shadow-md">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-foreground truncate pr-6">{item.name}</h4>
                                <button onClick={() => removeItem(item.id)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"><Trash2 size={16} /></button>
                              </div>
                              <p className="text-primary font-black text-lg mb-3">{item.price.toFixed(2)}€</p>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center bg-muted/40 backdrop-blur-sm rounded-xl p-1 border border-border/50">
                                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-white/80 rounded-lg transition-all" disabled={item.quantity <= 1}><Minus size={12} className={item.quantity <= 1 ? "opacity-30" : ""} /></button>
                                  <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-white/80 rounded-lg transition-all"><Plus size={12} /></button>
                                </div>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}

                {step === 'checkout' && (
                  <motion.div
                    key="checkout-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                      <p className="text-sm text-primary font-medium flex items-center gap-2 mb-2">
                        <ShieldCheck size={18} /> Compra Segura
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tus datos están protegidos y solo se utilizarán para la gestión de este pedido.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground ml-4">Nombre Completo</label>
                        <div className={`flex items-center gap-3 p-5 glass-content rounded-2xl border ${errors.name ? 'border-destructive/50' : 'border-white/50'} focus-within:border-primary/50 transition-all shadow-sm`}>
                          <User size={18} className="text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Ej. María García"
                            className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder:text-muted-foreground/50"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                          />
                        </div>
                        {errors.name && <p className="text-[10px] text-destructive ml-4 font-bold">Por favor, introduce tu nombre completo</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground ml-4">Email de Contacto</label>
                        <div className={`flex items-center gap-3 p-5 glass-content rounded-2xl border ${errors.email ? 'border-destructive/50' : 'border-white/50'} focus-within:border-primary/50 transition-all shadow-sm`}>
                          <Mail size={18} className="text-muted-foreground" />
                          <input
                            type="email"
                            placeholder="maria@ejemplo.com"
                            className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder:text-muted-foreground/50"
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                          />
                        </div>
                        {errors.email && <p className="text-[10px] text-destructive ml-4 font-bold">Introduce un email válido</p>}
                      </div>
                    </div>

                    <button
                      onClick={() => setStep('cart')}
                      className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <ArrowRight size={14} className="rotate-180" /> Volver al Carrito
                    </button>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="success-view"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-[60vh] text-center space-y-8"
                  >
                    <div className="w-32 h-32 bg-primary/10 rounded-[3rem] flex items-center justify-center text-primary relative">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                      >
                        <CheckCircle2 size={64} />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 rounded-[3rem] border-4 border-primary"
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </div>
                    <div>
                      <h4 className="text-3xl font-display font-black text-foreground mb-4">¡Muchas Gracias!</h4>
                      <p className="text-muted-foreground text-lg">Hemos recibido tu pedido.</p>
                      <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                        Te hemos enviado un correo de confirmación a <br />
                        <span className="font-bold text-foreground">{customerInfo.email}</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && step !== 'success' && (
              <div className="p-8 border-t border-border/50 bg-white/40 backdrop-blur-md">
                <div className="flex justify-between items-end mb-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Total a pagar</span>
                    <span className="text-4xl font-display font-black text-foreground">
                      {currentTotal.toFixed(2)}€
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1 opacity-50">Pagos Seguros</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-muted/50 rounded-md text-[8px] font-black opacity-50">VISA</span>
                      <span className="px-2 py-1 bg-muted/50 rounded-md text-[8px] font-black opacity-50">STRIPE</span>
                    </div>
                  </div>
                </div>

                {step === 'cart' ? (
                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full btn-primary py-5 rounded-[1.5rem] flex items-center justify-center gap-3 text-sm tracking-widest transition-all active:scale-[0.98] shadow-xl shadow-primary/20"
                  >
                    CONTINUAR <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full btn-primary py-5 rounded-[1.5rem] flex items-center justify-center gap-3 text-sm tracking-widest transition-all active:scale-[0.98] shadow-xl shadow-primary/20"
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>PAGAR AHORA <ShieldCheck size={18} /></>
                    )}
                  </button>
                )}

                <p className="text-center text-[10px] text-muted-foreground mt-6 uppercase tracking-widest font-bold opacity-40 leading-none">
                  Finaliza tu compra de forma segura <br />
                  <span className="text-[8px] tracking-[0.3em]">OPI · SEMILAC · MASGLO</span>
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
