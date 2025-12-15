import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingOrbs from "./FloatingOrbs";
import CartDrawer from "../cart/CartDrawer";

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
    </div>
  );
};

export default Layout;
