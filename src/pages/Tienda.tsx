import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/stores/cartStore";
import { toast } from "@/hooks/use-toast";

const products = [
  {
    id: "p1",
    name: "Esmalte Gel Premium",
    description: "Colección exclusiva de colores vibrantes y duraderos",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1585128792020-803d29415281?w=400&h=400&fit=crop",
  },
  {
    id: "p2",
    name: "Aceite de Cutículas",
    description: "Fórmula nutritiva con vitamina E y aceite de almendras",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
  },
  {
    id: "p3",
    name: "Crema de Manos Luxury",
    description: "Hidratación intensa con manteca de karité orgánica",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop",
  },
  {
    id: "p4",
    name: "Kit Manicura Casa",
    description: "Todo lo necesario para mantener tus uñas perfectas",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop",
  },
  {
    id: "p5",
    name: "Base Fortalecedora",
    description: "Tratamiento base que fortalece las uñas débiles",
    price: 16.50,
    image: "https://images.unsplash.com/photo-1600612253971-422e7f5c5904?w=400&h=400&fit=crop",
  },
  {
    id: "p6",
    name: "Top Coat Brillante",
    description: "Acabado espejo ultra brillante y protector",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1631214540553-5f97c91a8e61?w=400&h=400&fit=crop",
  },
];

const Tienda = () => {
  const { addItem, setCartOpen } = useCart();

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast({
      title: "¡Añadido al carrito!",
      description: product.name,
    });
    setCartOpen(true);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary font-medium mb-4 tracking-widest uppercase text-sm">
              Tienda Online
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Productos profesionales
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Lleva la experiencia del salón a casa con nuestra selección de 
              productos premium
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding pt-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-xl">
                      {product.price.toFixed(2)}€
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                      <ShoppingBag size={16} />
                      Añadir
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tienda;
