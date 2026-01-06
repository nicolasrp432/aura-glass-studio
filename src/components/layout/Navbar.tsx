import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/stores/cartStore";

const TREATWELL_LINK = "https://www.treatwell.es/establecimiento/mani-pedi-1/";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicios" },
  { name: "Tienda", href: "/tienda" },
  { name: "Galería", href: "/galeria" },
  { name: "Equipo", href: "/equipo" },
  { name: "Contacto", href: "/contacto" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { items: cartItems, setCartOpen } = useCart();
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
        className={`fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center ${isScrolled ? "top-4 px-4" : "top-0 px-0"
          }`}
      >
        <div
          className={`w-full transition-all duration-500 overflow-hidden ${isScrolled
            ? "max-w-6xl bg-white/80 backdrop-blur-xl rounded-2xl border border-white/40 shadow-glass py-2 px-6"
            : "bg-transparent py-6 px-6"
            }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group transition-transform duration-500 active:scale-95"
              aria-label="Ir al inicio"
            >
              <div className={`relative transition-all duration-500 overflow-hidden ${isScrolled ? "h-12" : "h-20"}`}>
                <img
                  src="/logo.png"
                  alt="Mani Pedi Logo"
                  className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-2 px-2 group ${location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                    }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-primary rounded-full transition-all duration-300 ${location.pathname === link.href ? "w-1" : "w-0 group-hover:w-1"
                      }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCartOpen(true)}
                className={`relative p-2.5 rounded-full transition-all duration-300 active:scale-90 ${isScrolled ? "hover:bg-primary/5" : "hover:bg-white/20"
                  }`}
                aria-label="Ver carrito"
              >
                <ShoppingBag size={20} className="text-foreground" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-lg shadow-accent/20"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              <a
                href={TREATWELL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden md:flex btn-primary shadow-sm transition-all duration-300 ${isScrolled ? "text-[11px] py-2.5 px-6" : "text-xs py-3.5 px-8"
                  }`}
              >
                RESERVAR
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`lg:hidden p-2.5 rounded-full transition-all active:scale-90 ${isScrolled ? "hover:bg-primary/5" : "hover:bg-white/20"
                  }`}
                aria-label="Abrir menú"
              >
                <Menu size={22} />
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
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-gray-100">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-all active:scale-90"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.href}
                        className={`group flex items-center justify-between py-4 px-4 rounded-xl transition-all ${location.pathname === link.href
                          ? "bg-primary/5 text-primary"
                          : "hover:bg-primary/5 text-foreground/80"
                          }`}
                      >
                        <span className="text-xl font-medium">{link.name}</span>
                        <div className={`w-1.5 h-1.5 rounded-full bg-primary transition-all duration-300 ${location.pathname === link.href ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                          }`} />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="space-y-4">
                  <a
                    href={TREATWELL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full btn-primary py-4 text-sm font-bold tracking-widest"
                  >
                    RESERVAR CITA
                  </a>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="tel:+34944123456"
                      className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-xs font-medium text-foreground/70 hover:border-primary/30 hover:text-primary transition-all"
                    >
                      <Phone size={14} />
                      <span>Llamar</span>
                    </a>
                    <Link
                      to="/contacto"
                      className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-xs font-medium text-foreground/70 hover:border-primary/30 hover:text-primary transition-all"
                    >
                      <MapPin size={14} />
                      <span>Ubicación</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
