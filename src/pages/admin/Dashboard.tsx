import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    Image as ImageIcon,
    Mail,
    Trash2,
    Edit2,
    Save,
    X,
    CheckCircle2,
    AlertCircle,
    Info
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [isAuthChecking, setIsAuthChecking] = useState(true);
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
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

    useEffect(() => {
        if (activeTab !== "overview" && activeTab !== "settings") {
            fetchData();
        }
    }, [activeTab]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            let table = activeTab;
            if (activeTab === "products") table = "products";
            if (activeTab === "services") table = "services";
            if (activeTab === "team") table = "team";
            if (activeTab === "gallery") table = "gallery";
            if (activeTab === "messages") table = "messages";

            const { data, error } = await supabase
                .from(table)
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setItems(data || []);
        } catch (error: any) {
            console.error("Error fetching data:", error);
            toast({
                title: "Error al cargar datos",
                description: error.message,
                variant: "destructive",
            });
            setItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string | number) => {
        if (!confirm("¿Estás seguro de que quieres eliminar este elemento?")) return;

        try {
            const { error } = await supabase
                .from(activeTab)
                .delete()
                .eq("id", id);

            if (error) throw error;

            toast({ title: "Eliminado con éxito" });
            fetchData();
        } catch (error: any) {
            toast({
                title: "Error al eliminar",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data, error } = isEditing.id
                ? await supabase.from(activeTab).update(isEditing).eq("id", isEditing.id)
                : await supabase.from(activeTab).insert([isEditing]);

            if (error) throw error;

            toast({ title: isEditing.id ? "Actualizado con éxito" : "Creado con éxito" });
            setIsEditing(null);
            fetchData();
        } catch (error: any) {
            toast({
                title: "Error al guardar",
                description: error.message,
                variant: "destructive",
            });
        }
    };

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
        { id: "messages", label: "Mensajes", icon: Mail },
        { id: "settings", label: "Configuración", icon: Settings },
    ];

    const filteredItems = items.filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-border p-8 flex flex-col fixed h-screen z-20 shadow-xl">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-display font-bold shadow-lg shadow-primary/20">M</div>
                    <span className="font-display text-xl font-bold tracking-tight">Admin Portal</span>
                </div>

                <nav className="space-y-2 flex-grow">
                    {sidebarLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => {
                                setActiveTab(link.id);
                                setIsEditing(null);
                            }}
                            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === link.id
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
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
                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-2">Mani Pedi Getxo</h2>
                        <h1 className="font-display text-4xl font-bold text-foreground">
                            {sidebarLinks.find(l => l.id === activeTab)?.label}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {activeTab !== "overview" && activeTab !== "settings" && activeTab !== "messages" && (
                            <div className="relative hidden md:block">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 pr-6 py-3 bg-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm w-64 shadow-sm"
                                />
                            </div>
                        )}
                        {activeTab !== "overview" && activeTab !== "settings" && activeTab !== "messages" && (
                            <button
                                onClick={() => setIsEditing({})}
                                className="btn-primary py-3 px-6 text-xs font-black tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20"
                            >
                                <Plus size={16} /> NUEVO ITEM
                            </button>
                        )}
                    </div>
                </header>

                {/* Content Area */}
                <div className="space-y-8">
                    {activeTab === "overview" && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Stats Cards */}
                            {[
                                { label: "Ventas Mes", value: "1,240€", trend: "+12%", color: "text-primary", icon: ShoppingBag },
                                { label: "Citas Hoy", value: "15", trend: "+3", color: "text-accent", icon: Scissors },
                                { label: "Mensajes Pendientes", value: "5", trend: "+2", color: "text-gold", icon: Mail }
                            ].map((stat, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i}
                                    className="bg-white p-8 rounded-[2rem] shadow-sm border border-border group hover:shadow-xl transition-all"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                                        <div className={`p-3 rounded-2xl bg-muted/50 group-hover:scale-110 transition-transform ${stat.color}`}>
                                            <stat.icon size={20} />
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <span className={`text-4xl font-bold ${stat.color}`}>{stat.value}</span>
                                        <span className="flex items-center gap-1 text-[10px] font-black bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-100 uppercase">
                                            <TrendingUp size={12} /> {stat.trend}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm border border-border">
                                <h3 className="font-display text-2xl font-bold mb-8">Estado del Sistema</h3>
                                <div className="space-y-6">
                                    {[
                                        { label: "Base de Datos", status: "Online", icon: CheckCircle2, color: "text-green-500" },
                                        { label: "Servidor de Imágenes", status: "Operativo", icon: CheckCircle2, color: "text-green-500" },
                                        { label: "Autenticación", status: "Seguro", icon: CheckCircle2, color: "text-green-500" }
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-lg bg-white ${s.color}`}>
                                                    <s.icon size={18} />
                                                </div>
                                                <span className="font-bold text-foreground/80">{s.label}</span>
                                            </div>
                                            <span className={`text-xs font-black uppercase tracking-widest ${s.color}`}>{s.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-border h-fit">
                                <h3 className="font-display text-2xl font-bold mb-8">Ayuda Rápida</h3>
                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Bienvenido al panel de administración de Mani Pedi Getxo. Aquí puedes gestionar todo el contenido de tu web.
                                    </p>
                                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                        <p className="text-xs font-bold text-primary flex items-center gap-2">
                                            <Info size={14} /> Tip del día
                                        </p>
                                        <p className="text-xs text-primary/70 mt-2">
                                            Recuerda optimizar las imágenes antes de subirlas a la galería para mantener la web rápida.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab !== "overview" && activeTab !== "settings" && (
                        <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-border overflow-hidden">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center p-32 space-y-4">
                                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Cargando datos...</p>
                                </div>
                            ) : filteredItems.length === 0 ? (
                                <div className="p-32 text-center">
                                    <div className="w-20 h-20 bg-muted/50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                                        <Search size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">No se encontraron resultados</h3>
                                    <p className="text-muted-foreground">Intenta con otra búsqueda o añade un nuevo item.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-border">
                                                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Info Principal</th>
                                                {activeTab === "services" && <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Categoría / Precio</th>}
                                                {activeTab === "products" && <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Stock / Categoría</th>}
                                                {activeTab === "team" && <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Especialidad</th>}
                                                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredItems.map((item) => (
                                                <tr key={item.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            {(item.image_url || item.image || item.url) && (
                                                                <img
                                                                    src={item.image_url || item.image || item.url}
                                                                    className="w-12 h-12 rounded-xl object-cover shadow-sm"
                                                                    alt=""
                                                                />
                                                            )}
                                                            <div>
                                                                <p className="font-bold text-foreground">{item.name || item.title || item.subject}</p>
                                                                <p className="text-xs text-muted-foreground line-clamp-1">{item.short_description || item.email || item.category}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {activeTab === "services" && (
                                                        <td className="px-8 py-6 text-sm">
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-foreground/70">{item.category}</span>
                                                                <span className="text-primary font-black uppercase text-xs">{item.price}€ / {item.duration}</span>
                                                            </div>
                                                        </td>
                                                    )}
                                                    {activeTab === "products" && (
                                                        <td className="px-8 py-6 text-sm">
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-foreground/70">{item.category}</span>
                                                                <span className="text-accent font-black uppercase text-xs">{item.price}€</span>
                                                            </div>
                                                        </td>
                                                    )}
                                                    <td className="px-8 py-6 text-right">
                                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => setIsEditing(item)}
                                                                className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(item.id)}
                                                                className="p-2.5 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all shadow-sm"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* Modal de edición/creación */}
            <AnimatePresence>
                {isEditing && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-end">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-md"
                            onClick={() => setIsEditing(null)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative w-full max-w-2xl h-screen bg-white shadow-2xl overflow-y-auto p-12 border-l border-border"
                        >
                            <header className="flex justify-between items-center mb-12">
                                <div>
                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">{isEditing.id ? "Editando" : "Creando Nuevo"}</p>
                                    <h2 className="font-display text-3xl font-bold">Detalles del Item</h2>
                                </div>
                                <button
                                    onClick={() => setIsEditing(null)}
                                    className="w-12 h-12 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </header>

                            <form onSubmit={handleSave} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Url Imagen</label>
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        value={isEditing.image_url || isEditing.image || isEditing.url || ""}
                                        onChange={(e) => setIsEditing({ ...isEditing, image_url: e.target.value, image: e.target.value, url: e.target.value })}
                                        className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium"
                                    />
                                    {(isEditing.image_url || isEditing.image || isEditing.url) && (
                                        <div className="mt-4 aspect-video rounded-3xl overflow-hidden border border-border shadow-inner">
                                            <img
                                                src={isEditing.image_url || isEditing.image || isEditing.url}
                                                className="w-full h-full object-cover"
                                                alt="Preview"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2 col-span-2 md:col-span-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Nombre / Título</label>
                                        <input
                                            type="text"
                                            required
                                            value={isEditing.name || isEditing.title || ""}
                                            onChange={(e) => setIsEditing({ ...isEditing, name: e.target.value, title: e.target.value })}
                                            className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-2 md:col-span-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Precio</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={isEditing.price || ""}
                                            onChange={(e) => setIsEditing({ ...isEditing, price: parseFloat(e.target.value) })}
                                            className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Descripción</label>
                                    <textarea
                                        rows={4}
                                        value={isEditing.description || isEditing.message || ""}
                                        onChange={(e) => setIsEditing({ ...isEditing, description: e.target.value, message: e.target.value })}
                                        className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium resize-none"
                                    />
                                </div>

                                {activeTab === "services" && (
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Duración</label>
                                            <input
                                                type="text"
                                                placeholder="Ej: 45 min"
                                                value={isEditing.duration || ""}
                                                onChange={(e) => setIsEditing({ ...isEditing, duration: e.target.value })}
                                                className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Categoría</label>
                                            <select
                                                value={isEditing.category || ""}
                                                onChange={(e) => setIsEditing({ ...isEditing, category: e.target.value })}
                                                className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium"
                                            >
                                                <option value="">Seleccionar...</option>
                                                <option value="Manicura y Uñas">Manicura</option>
                                                <option value="Pedicura y Pies">Pedicura</option>
                                                <option value="Pestañas y Cejas">Pestañas</option>
                                                <option value="Tratamientos Corporales">Corporales</option>
                                                <option value="Tratamientos Faciales">Faciales</option>
                                            </select>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-8 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(null)}
                                        className="flex-1 py-4 border-2 border-border text-foreground/60 rounded-2xl font-bold hover:bg-muted transition-all"
                                    >
                                        CANCELAR
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 btn-primary py-4 text-white rounded-2xl font-black tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                    >
                                        <Save size={20} /> GUARDAR CAMBIOS
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
