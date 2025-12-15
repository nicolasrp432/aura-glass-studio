import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Train } from "lucide-react";

const TREATWELL_LINK = "https://www.treatwell.es/establecimiento/mani-pedi-1/";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-foreground text-white/90">
      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative container mx-auto px-6 py-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
            ¿Lista para lucir unas uñas perfectas?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Reserva tu cita hoy y déjate mimar por nuestras expertas
          </p>
          <a
            href={TREATWELL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-primary px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Reservar Ahora
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-display text-xl font-bold">M</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold">Mani Pedi</h3>
                <p className="text-xs text-white/60 tracking-widest uppercase">Getxo</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Tu oasis de belleza y bienestar en Getxo. Especialistas en uñas 
              con ambiente moderno y elegante.
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Train size={14} />
              <span>A 3 min del metro Areeta</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Enlaces</h4>
            <ul className="space-y-3">
              {[
                { name: "Servicios", href: "/servicios" },
                { name: "Tienda Online", href: "/tienda" },
                { name: "Nuestro Equipo", href: "/equipo" },
                { name: "Contacto", href: "/contacto" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Horario</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex justify-between"><span>Lunes - Viernes</span><span>10:00 - 20:00</span></li>
              <li className="flex justify-between"><span>Sábado</span><span>10:00 - 14:00</span></li>
              <li className="flex justify-between"><span>Domingo</span><span>Cerrado</span></li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-white/50 mb-2">Marcas que utilizamos:</p>
              <p className="text-xs text-white/70">OPI, Semilac, Kinetics, Masglo, Peggy Sage</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+34944123456"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
                >
                  <Phone size={16} />
                  <span>+34 944 123 456</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@manipedi.es"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
                >
                  <Mail size={16} />
                  <span>info@manipedi.es</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-white/70 text-sm">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                  <span>Urkijo Kalea, 15<br />48930 Getxo, Bizkaia</span>
                </span>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Mani Pedi Getxo. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white/80 transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-white/80 transition-colors">
              Aviso Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
