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
        <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[120px] rounded-full animate-pulse decoration-delay-2000" />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[450px] relative z-10"
            >
                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] shadow-2xl border-white/50 backdrop-blur-3xl">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20 ring-4 ring-white/20">
                            <Lock className="text-white" size={32} />
                        </div>
                        <h1 className="font-display text-4xl font-bold mb-3 tracking-tight">Portal Admin</h1>
                        <p className="text-muted-foreground text-sm flex items-center justify-center gap-2 font-medium">
                            <Sparkles size={14} className="text-primary" /> Mani Pedi Getxo <Sparkles size={14} className="text-primary" />
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50 ml-1">Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-white/40 border border-white/40 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium backdrop-blur-sm"
                                    placeholder="admin@manipedigexto.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50 ml-1">Contraseña</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-12 py-4 bg-white/40 border border-white/40 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium backdrop-blur-sm"
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
                            className="w-full btn-primary py-5 text-sm font-black tracking-widest flex items-center justify-center gap-3 mt-4 shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    INICIAR SESIÓN
                                    <Sparkles size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-white/20">
                        <p className="text-center text-[10px] text-muted-foreground leading-relaxed uppercase tracking-[0.1em] font-black">
                            Acceso restringido para personal autorizado.<br />
                            Mani Pedi Getxo © {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
