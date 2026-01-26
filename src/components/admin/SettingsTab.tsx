import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Save, Building2, Mail, Phone, MapPin, Instagram, Facebook, Globe, Shield, User } from "lucide-react";

const SettingsTab = () => {
  const [settings, setSettings] = useState<any>({
    business_name: "",
    contact_email: "",
    phone: "",
    address: "",
    socials: { instagram: "", facebook: "" }
  });
  const [adminProfile, setAdminProfile] = useState<any>({
    email: "",
    full_name: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
    fetchAdminProfile();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'site_config')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (data) setSettings(data.value);
    } catch (error: any) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAdminProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setAdminProfile({
        email: user.email,
        full_name: user.user_metadata?.full_name || "Administrador"
      });
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ key: 'site_config', value: settings });

      if (error) throw error;
      toast({ title: "Configuración guardada con éxito" });
    } catch (error: any) {
      toast({
        title: "Error al guardar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-32 space-y-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* General Settings */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8"
      >
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-border">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl">
              <Building2 size={24} />
            </div>
            <h3 className="font-display text-2xl font-bold">Información del Negocio</h3>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Nombre Comercial</label>
              <input
                type="text"
                value={settings.business_name}
                onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
                className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Email de Contacto</label>
                <input
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Teléfono</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Dirección</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
              />
            </div>

            <div className="pt-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-4 ml-1">Redes Sociales</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="relative">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    placeholder="Instagram URL"
                    value={settings.socials.instagram}
                    onChange={(e) => setSettings({ ...settings, socials: { ...settings.socials, instagram: e.target.value } })}
                    className="w-full pl-12 pr-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
                <div className="relative">
                  <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    placeholder="Facebook URL"
                    value={settings.socials.facebook}
                    onChange={(e) => setSettings({ ...settings, socials: { ...settings.socials, facebook: e.target.value } })}
                    className="w-full pl-12 pr-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full btn-primary py-4 text-white rounded-2xl font-black tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 mt-8"
            >
              <Save size={20} /> GUARDAR CONFIGURACIÓN
            </button>
          </form>
        </div>
      </motion.div>

      {/* Admin Profile & Security */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8"
      >
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-border">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-accent/10 text-accent rounded-2xl">
              <User size={24} />
            </div>
            <h3 className="font-display text-2xl font-bold">Perfil de Administrador</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 bg-muted/30 rounded-3xl border border-border">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-primary/20">
                {adminProfile.full_name.charAt(0)}
              </div>
              <div>
                <p className="text-xl font-bold">{adminProfile.full_name}</p>
                <p className="text-sm text-muted-foreground">{adminProfile.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-full tracking-widest">Super Admin</span>
              </div>
            </div>

            <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 space-y-3">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                <Shield size={16} /> Seguridad
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                Para cambiar tu contraseña o actualizar tu correo electrónico, utiliza las opciones de seguridad de Supabase Auth o contacta con soporte técnico.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-border">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gold/10 text-gold rounded-2xl">
              <Globe size={24} />
            </div>
            <h3 className="font-display text-2xl font-bold">Estado de la Web</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
              <span className="font-bold text-foreground/70">Dominio Principal</span>
              <span className="text-xs font-black uppercase tracking-widest text-primary">manipedigetxo.com</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
              <span className="font-bold text-foreground/70">SSL / Seguridad</span>
              <span className="text-xs font-black uppercase tracking-widest text-green-500">Activado</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

import { motion } from "framer-motion";
export default SettingsTab;
