import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Calendar, Phone, X } from "lucide-react";
import { Link } from "react-router-dom";

const WhatsAppIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={`fill-current ${className}`}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const WhatsAppWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const whatsappUrl = "https://wa.me/34944123456";
    const treatwellUrl = "https://www.treatwell.es/establecimiento/mani-pedi-1/";

    const menuItems = [
        {
            icon: <WhatsAppIcon className="w-5 h-5" />,
            label: "WhatsApp",
            href: whatsappUrl,
            isExternal: true,
            color: "bg-[#25D366]",
        },
        {
            icon: <Calendar size={18} />,
            label: "Reservar Cita",
            href: treatwellUrl,
            isExternal: true,
            color: "bg-[#005a87]", // Treatwell blue-ish
        },
        {
            icon: <Phone size={18} />,
            label: "Contacto",
            href: "/contacto",
            isExternal: false,
            color: "bg-primary",
        },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="flex flex-col gap-3 mb-2"
                    >
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group flex items-center gap-3"
                            >
                                <span className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-foreground shadow-lg border border-white/50 whitespace-nowrap lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                    {item.label}
                                </span>
                                {item.isExternal ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-12 h-12 ${item.color} text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer`}
                                        aria-label={item.label}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.icon}
                                    </a>
                                ) : (
                                    <Link
                                        to={item.href}
                                        className={`w-12 h-12 ${item.color} text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer`}
                                        aria-label={item.label}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.icon}
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={toggleMenu}
                className="relative group focus:outline-none"
                aria-label={isOpen ? "Cerrar menú" : "Abrir opciones de contacto"}
                tabIndex={0}
            >
                <motion.div
                    animate={isOpen ? { rotate: 90, scale: 0.9 } : { scale: [1, 1.05, 1] }}
                    transition={isOpen ? { duration: 0.2 } : { duration: 3, repeat: Infinity }}
                    className={`w-16 h-16 ${isOpen ? 'bg-foreground text-background' : 'bg-[#25D366] text-white'} rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 cursor-pointer relative z-10 transition-colors duration-300`}
                >
                    {isOpen ? (
                        <X size={32} />
                    ) : (
                        <WhatsAppIcon className="w-10 h-10" />
                    )}
                </motion.div>

                {/* Pulse effect */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
                )}
            </button>
        </div>
    );
};

export default WhatsAppWidget;
