import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingOrbs from "./FloatingOrbs";
import CartDrawer from "../cart/CartDrawer";
import WhatsAppWidget from "./WhatsAppWidget";
import CookieConsent from "../legal/CookieConsent";
import { features } from "@/config/site";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen relative">
      <FloatingOrbs />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
      {/* La tienda está en desarrollo: sin ella, el carrito no se monta ni
          guarda nada en el navegador. */}
      {features.shop && <CartDrawer />}
      <WhatsAppWidget />
      <CookieConsent />
    </div>
  );
};

export default Layout;
