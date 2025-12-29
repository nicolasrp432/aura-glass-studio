import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Sparkles, Star, Package } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/stores/cartStore";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const initialProducts = [
  {
    id: "p1",
    name: "Esmalte Gel Premium",
    description: "Colección exclusiva de colores vibrantes y duraderos con acabado espejo profesional",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1585128792020-803d29415281?w=400&h=400&fit=crop",
    category: "Esmaltes"
  },
  {
    id: "p2",
    name: "Aceite de Cutículas",
    description: "Fórmula nutritiva con vitamina E y aceite de almendras dulces para una hidratación profunda",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
    category: "Cuidado"
  },
  {
    id: "p3",
    name: "Crema de Manos Luxury",
    description: "Hidratación intensa con manteca de karité orgánica y esencia de jazmín",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop",
    category: "Cuidado"
  },
  {
    id: "p4",
    name: "Kit Manicura Casa",
    description: "Todo lo necesario para mantener tus uñas perfectas entre visitas al salón",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop",
    category: "Kits"
  },
  {
    id: "p5",
    name: "Base Fortalecedora",
    description: "Tratamiento intensivo que restaura y fortalece las uñas débiles o quebradizas",
    price: 16.50,
    image: "https://images.unsplash.com/photo-1600612253971-422e7f5c5904?w=400&h=400&fit=crop",
    category: "Esmaltes"
  },
  {
    id: "p6",
    name: "Top Coat Brillante",
    description: "Capa protectora ultra brillante que prolonga la duración de tu manicura",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1631214540553-5f97c91a8e61?w=400&h=400&fit=crop",
    category: "Esmaltes"
  },
];

const Tienda = () => {
  const { addItem, setCartOpen } = useCart();
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data && data.length > 0) {
        setProducts(data);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast({
      title: "¡Añadido con éxito!",
      description: `${product.name} ya está en tu carrito.`,
    });
    setCartOpen(true);
  };

  return (
    <Layout>
      {/* Shop Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="orb orb-gold top-[-10%] right-[-10%] w-[40%] h-[40%]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="flex items-center justify-center gap-2 text-gold font-bold mb-4 tracking-[0.3em] uppercase text-xs">
              <Package size={14} /> Boutique Exclusiva <Package size={14} />
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
              Productos <br />
              <span className="text-gold italic">Profesionales</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Lleva la experiencia del salón a tu hogar con nuestra cuidada selección
              de productos premium para el cuidado de manos y pies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence>
                {products.map((product, index) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-card rounded-[2.5rem] overflow-hidden group flex flex-col h-full"
                  >
                    <div className="relative h-72 overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="absolute top-6 left-6 flex flex-col gap-2">
                        {index === 0 && (
                          <span className="bg-gold text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
                            <Star size={10} fill="currentColor" /> Best Seller
                          </span>
                        )}
                        <span className="bg-white/90 backdrop-blur-md text-foreground text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-md">
                          {product.category || 'Belleza'}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-gold transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-8 leading-relaxed line-clamp-2 flex-grow">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Precio</span>
                          <span className="text-gold font-black text-3xl">
                            {product.price.toFixed(2)}€
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex items-center gap-3 bg-gold text-white px-8 py-4 rounded-2xl text-sm font-bold hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-1 transition-all active:scale-95"
                        >
                          <ShoppingBag size={18} />
                          COMPRAR
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Tienda;
