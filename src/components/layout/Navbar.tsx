import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/stores/cartStore";

const TREATWELL_LINK = "https://www.treatwell.es/establecimiento/mani-pedi-1/";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicios" },
  { name: "Galería", href: "/galeria" },
  { name: "Tienda", href: "/tienda" },
  { name: "Equipo", href: "/equipo" },
  { name: "Contacto", href: "/contacto" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const cartItems = useCart((state) => state.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "py-3 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-glass"
          : "py-6 bg-transparent"
          }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group transition-transform duration-500 active:scale-95"
              aria-label="Ir al inicio"
            >
              <div className="relative h-12 w-auto overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Mani Pedi Logo"
                  className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-2 px-1 group ${location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                    }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/tienda"
                className="relative p-3 hover:bg-white/40 rounded-full transition-all duration-300 active:scale-90"
                aria-label="Ver carrito"
              >
                <ShoppingBag size={22} className="text-foreground" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-5 h-5 bg-accent text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-lg shadow-accent/20"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              <a
                href={TREATWELL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex btn-primary text-xs py-3.5 px-8 shadow-sm"
              >
                RESERVAR CITA
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-3 hover:bg-white/40 rounded-full transition-all active:scale-90"
                aria-label="Abrir menú"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-md z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white/95 backdrop-blur-2xl z-[70] p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-display font-bold">M</div>
                  <span className="font-display text-xl font-bold">Menú</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 bg-muted/30 hover:bg-muted rounded-full transition-all active:scale-90"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className={`block py-4 px-6 rounded-2xl font-semibold text-lg transition-all ${location.pathname === link.href
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "hover:bg-primary/5 text-foreground"
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <a
                    href={TREATWELL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full btn-primary py-5 text-sm"
                  >
                    RESERVAR CITA
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-8 border-t border-border flex flex-col gap-4"
                >
                  <a
                    href="tel:+34944123456"
                    className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center"><Phone size={18} /></div>
                    <span>+34 944 123 456</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
