import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingOrbs from "./FloatingOrbs";
import CartDrawer from "../cart/CartDrawer";
import WhatsAppWidget from "./WhatsAppWidget";

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
      <CartDrawer />
      <WhatsAppWidget />
    </div>
  );
};

export default Layout;
