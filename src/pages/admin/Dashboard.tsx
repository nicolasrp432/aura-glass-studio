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
    Info,
    Calendar
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

// Modular Components
import OverviewTab from "@/components/admin/OverviewTab";
import DataTable from "@/components/admin/DataTable";
import EditModal from "@/components/admin/EditModal";
import BookingsTab from "@/components/admin/BookingsTab";
import SettingsTab from "@/components/admin/SettingsTab";

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
        if (!["overview", "settings", "bookings"].includes(activeTab)) {
            fetchData();
        }
    }, [activeTab]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from(activeTab)
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
        { id: "bookings", label: "Reservas", icon: Calendar },
        { id: "services", label: "Servicios", icon: Scissors },
        { id: "products", label: "Tienda", icon: ShoppingBag },
        { id: "team", label: "Equipo", icon: Users },
        { id: "gallery", label: "Galería", icon: ImageIcon },
        { id: "messages", label: "Mensajes", icon: Mail },
        { id: "settings", label: "Configuración", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-border p-8 flex flex-col fixed h-screen z-20 shadow-xl">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-display font-bold shadow-lg shadow-primary/20">M</div>
                    <span className="font-display text-xl font-bold tracking-tight">Admin Portal</span>
                </div>

                <nav className="space-y-2 flex-grow overflow-y-auto">
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
                </header>

                {/* Content Area */}
                <div className="space-y-8">
                    {activeTab === "overview" && <OverviewTab />}
                    
                    {activeTab === "bookings" && <BookingsTab />}
                    
                    {activeTab === "settings" && <SettingsTab />}
                    
                    {!["overview", "settings", "bookings"].includes(activeTab) && (
                        <DataTable 
                            items={items}
                            activeTab={activeTab}
                            isLoading={isLoading}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            onEdit={(item) => setIsEditing(item)}
                            onDelete={handleDelete}
                            onAddNew={() => setIsEditing({})}
                        />
                    )}
                </div>
            </main>

            {/* Global Edit Modal */}
            <EditModal 
                isOpen={!!isEditing}
                onClose={() => setIsEditing(null)}
                item={isEditing}
                activeTab={activeTab}
                onSave={fetchData}
            />
        </div>
    );
};

export default AdminDashboard;
