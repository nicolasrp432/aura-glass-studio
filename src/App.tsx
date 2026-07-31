import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Servicios from "./pages/Servicios";
import TratamientosCabina from "./pages/TratamientosCabina";
// import Tienda from "./pages/Tienda"; // Temporalmente oculto - Tienda aún en desarrollo
import Equipo from "./pages/Equipo";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

import Galeria from "./pages/Galeria";
import Privacidad from "./pages/legal/Privacidad";
import AvisoLegal from "./pages/legal/AvisoLegal";
import Cookies from "./pages/legal/Cookies";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ScrollToTop from "./components/ScrollToTop";
import { features } from "@/config/site";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/tratamientos-cabina" element={<TratamientosCabina />} />
          <Route path="/galeria" element={<Galeria />} />
          {/* <Route path="/tienda" element={<Tienda />} /> */}{/* Temporalmente oculto - Tienda aún en desarrollo */}
          <Route path="/equipo" element={<Equipo />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Legal Routes */}
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/legal" element={<AvisoLegal />} />
          <Route path="/cookies" element={<Cookies />} />

          {/*
            Admin Routes — el panel está sin terminar y no forma parte de la web
            pública, así que sus rutas solo se registran si la build lo habilita
            expresamente (VITE_ENABLE_ADMIN=true). En producción no son
            alcanzables: cualquier acceso a /admin cae en la página 404.
          */}
          {features.admin && (
            <>
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </>
          )}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
