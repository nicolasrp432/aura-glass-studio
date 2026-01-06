import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Train } from "lucide-react";

const TREATWELL_LINK = "https://www.treatwell.es/establecimiento/mani-pedi-1/";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-[#1A1A1A] text-white/90 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      {/* CTA Section */}
      <div className="relative border-b border-white/5">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
                ¿Lista para lucir unas <span className="text-primary italic">uñas perfectas</span>?
              </h2>
              <p className="text-white/60 max-w-xl">
                Reserva tu cita hoy en nuestro salón de Getxo y disfruta de una experiencia única de belleza y bienestar.
              </p>
            </div>
            <a
              href={TREATWELL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-semibold transition-all hover:shadow-[0_10px_30px_-10px_hsl(var(--primary))] hover:-translate-y-1 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">RESERVAR CITA AHORA</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-8 transition-transform hover:scale-105">
              <img src="/logo.png" alt="Mani Pedi Logo" className="h-16 w-auto" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
              Tu oasis de belleza y bienestar en Getxo. Especialistas en manicura, pedicura y cuidado personal con un enfoque moderno y elegante.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://www.instagram.com/manipedilasarenas/", label: "Instagram" },
                { icon: Facebook, href: "https://www.facebook.com/manipedilarenas", label: "Facebook" }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="text-white/70 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-base font-bold text-white uppercase tracking-widest mb-8">Enlaces</h4>
            <ul className="space-y-4">
              {[
                { name: "Inicio", href: "/" },
                { name: "Servicios", href: "/servicios" },
                { name: "Tienda Online", href: "/tienda" },
                { name: "Nuestro Equipo", href: "/equipo" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/50 hover:text-primary transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-primary group-hover:w-4 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-base font-bold text-white uppercase tracking-widest mb-8">Contacto</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-tighter mb-1">Llámanos</p>
                  <a href="tel:+34944123456" className="text-sm font-medium hover:text-primary transition-colors">+34 944 123 456</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-tighter mb-1">Visítanos</p>
                  <p className="text-sm font-medium leading-relaxed">
                    Urkijo Kalea, 15<br />
                    48930 Getxo, Bizkaia
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-accent font-semibold bg-accent/10 px-2 py-1 rounded w-fit">
                    <Train size={10} />
                    <span>3 MIN DEL METRO AREETA</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Schedule */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-base font-bold text-white uppercase tracking-widest mb-8">Horario</h4>
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
              {[
                { day: "Lun - Vie", time: "10:00 - 20:00" },
                { day: "Sábado", time: "10:00 - 14:00" },
                { day: "Domingo", time: "Cerrado", highlight: true },
              ].map((item) => (
                <div key={item.day} className="flex justify-between items-center text-sm">
                  <span className="text-white/40">{item.day}</span>
                  <span className={item.highlight ? "text-accent" : "text-white font-medium"}>{item.time}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[10px] text-white/30 uppercase tracking-[0.2em] leading-relaxed">
              Trabajamos con <span className="text-white/60">OPI · SEMILAC · KINETICS · PEGGY SAGE</span>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Mani Pedi Las Arenas. Todos los derechos reservados.
          </p>
          <div className="flex gap-8">
            <Link to="/privacidad" className="text-xs text-white/30 hover:text-white transition-colors">Privacidad</Link>
            <Link to="/legal" className="text-xs text-white/30 hover:text-white transition-colors">Aviso Legal</Link>
            <Link to="/cookies" className="text-xs text-white/30 hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
