import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data: { user }, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // Simple role check based on metadata or email for demo purposes
            // In production, this would be a check against a specific profiles table or app_metadata
            const role = user?.app_metadata?.role || user?.user_metadata?.role;
            const isAdmin = role === "admin" || email === "admin@manipedigexto.com";

            if (!isAdmin) {
                await supabase.auth.signOut();
                throw new Error("No tienes permisos de administrador.");
            }

            toast({
                title: "¡Bienvenido!",
                description: "Acceso concedido al panel de administración.",
            });
            navigate("/admin/dashboard");
        } catch (error: any) {
            toast({
                title: "Error de acceso",
                description: error.message || "Credenciales inválidas.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            <div className="orb orb-turquoise top-[-20%] left-[-20%] w-[60%] h-[60%]" />
            <div className="orb orb-gold bottom-[-20%] right-[-20%] w-[60%] h-[60%]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card max-w-md w-full p-10 rounded-[3rem] relative z-10 shadow-2xl border-white/50"
            >
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
                        <Lock className="text-white" size={32} />
                    </div>
                    <h1 className="font-display text-3xl font-bold mb-2">Portal Admin</h1>
                    <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
                        <Sparkles size={14} className="text-primary" /> Mani Pedi Getxo <Sparkles size={14} className="text-primary" />
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-1">Email</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                <User size={18} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                placeholder="admin@manipedigexto.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-1">Contraseña</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-12 pr-12 py-4 bg-white/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-primary transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-primary py-5 text-sm flex items-center justify-center gap-2 mt-4"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : "INICIAR SESIÓN"}
                    </button>
                </form>

                <p className="mt-8 text-center text-xs text-muted-foreground leading-relaxed uppercase tracking-tighter">
                    Acceso restringido para personal autorizado.<br />
                    Mani Pedi Getxo © {new Date().getFullYear()}
                </p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
