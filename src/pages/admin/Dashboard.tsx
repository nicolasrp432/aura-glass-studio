import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Settings,
    Users,
    ShoppingBag,
    Scissors,
    LogOut,
    ExternalLink,
    Plus,
    Search,
    ChevronRight,
    TrendingUp,
    Image as ImageIcon
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [isAuthChecking, setIsAuthChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                navigate("/admin");
                return;
            }

            const role = user.app_metadata?.role || user.user_metadata?.role;
            const isAdmin = role === "admin" || user.email === "admin@manipedigexto.com";

            if (!isAdmin) {
                await supabase.auth.signOut();
                toast({
                    title: "Acceso denegado",
                    description: "No tienes permisos de administrador.",
                    variant: "destructive",
                });
                navigate("/admin");
            }

            setIsAuthChecking(false);
        };
        checkUser();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/admin");
    };

    if (isAuthChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    const sidebarLinks = [
        { id: "overview", label: "Resumen", icon: LayoutDashboard },
        { id: "services", label: "Servicios", icon: Scissors },
        { id: "products", label: "Tienda", icon: ShoppingBag },
        { id: "team", label: "Equipo", icon: Users },
        { id: "gallery", label: "Galería", icon: ImageIcon },
        { id: "settings", label: "Configuración", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-border p-8 flex flex-col fixed h-screen z-20 shadow-sm">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-display font-bold">M</div>
                    <span className="font-display text-xl font-bold tracking-tight">Admin Portal</span>
                </div>

                <nav className="space-y-2 flex-grow">
                    {sidebarLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => setActiveTab(link.id)}
                            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === link.id
                                ? "bg-primary/10 text-primary shadow-sm shadow-primary/5"
                                : "text-foreground/60 hover:bg-muted/50 hover:text-foreground"
                                }`}
                        >
                            <link.icon size={20} />
                            {link.label}
                        </button>
                    ))}
                </nav>

                <div className="pt-8 border-t border-border mt-auto">
                    <Link
                        to="/"
                        className="flex items-center gap-4 px-5 py-4 text-foreground/60 hover:text-primary transition-colors font-bold text-sm mb-2"
                    >
                        <ExternalLink size={20} />
                        Ver Web Pública
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-5 py-4 text-destructive hover:bg-destructive/5 transition-all font-bold text-sm rounded-2xl"
                    >
                        <LogOut size={20} />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow ml-72 p-12 min-h-screen">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-2">Administración</h2>
                        <h1 className="font-display text-4xl font-bold text-foreground">
                            {sidebarLinks.find(l => l.id === activeTab)?.label}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="pl-12 pr-6 py-3 bg-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm w-64"
                            />
                        </div>
                        <button className="btn-primary py-3 px-6 text-xs flex items-center gap-2 shadow-lg shadow-primary/20">
                            <Plus size={16} /> NUEVO ITEM
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {activeTab === "overview" && (
                        <>
                            {/* Stats Cards */}
                            {[
                                { label: "Ventas Mes", value: "1,240€", trend: "+12%", color: "text-primary" },
                                { label: "Citas Hoy", value: "15", trend: "+3", color: "text-accent" },
                                { label: "Nuevos Clientes", value: "28", trend: "+5%", color: "text-gold" }
                            ].map((stat, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i}
                                    className="bg-white p-8 rounded-[2rem] shadow-sm border border-border"
                                >
                                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">{stat.label}</p>
                                    <div className="flex items-end justify-between">
                                        <span className={`text-4xl font-bold ${stat.color}`}>{stat.value}</span>
                                        <span className="flex items-center gap-1 text-[10px] font-black bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-100 uppercase">
                                            <TrendingUp size={12} /> {stat.trend}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Activity area Placeholder */}
                            <div className="lg:col-span-2 bg-white p-10 rounded-[2rem] shadow-sm border border-border">
                                <h3 className="font-display text-2xl font-bold mb-8">Actividad Reciente</h3>
                                <div className="space-y-6">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div key={item} className="flex items-center justify-between p-6 hover:bg-muted/30 rounded-3xl transition-colors group cursor-pointer border border-transparent hover:border-border">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 bg-muted/50 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                    <Plus size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground">Nueva cita registrada</p>
                                                    <p className="text-sm text-muted-foreground">Manicura Gel Premium - Hace 15 min</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="text-muted-foreground" size={20} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-border h-fit">
                                <h3 className="font-display text-2xl font-bold mb-8">Estado Sistema</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-foreground/70">Database</span>
                                        <span className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-foreground/70">Stripe API</span>
                                        <span className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-foreground/70">Auth Service</span>
                                        <span className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab !== "overview" && (
                        <div className="lg:col-span-3 bg-white p-12 rounded-[2.5rem] shadow-sm border border-border min-h-[600px] flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 bg-muted/30 rounded-[2rem] flex items-center justify-center text-muted-foreground mb-8">
                                {sidebarLinks.find(l => l.id === activeTab)?.icon({ size: 48 })}
                            </div>
                            <h3 className="font-display text-3xl font-bold mb-4">Gestión de {sidebarLinks.find(l => l.id === activeTab)?.label}</h3>
                            <p className="text-muted-foreground max-w-md mx-auto mb-10 text-lg">
                                Aquí podrás editar, añadir o eliminar contenido relacionado con {sidebarLinks.find(l => l.id === activeTab)?.label.toLowerCase()} que se muestra en la web pública.
                            </p>
                            <button className="btn-primary py-4 px-10 text-sm flex items-center gap-3">
                                <Plus size={20} /> COMENZAR GESTIÓN
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
