import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Upload, Trash2, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  activeTab: string;
  onSave: () => void;
}

const EditModal = ({ isOpen, onClose, item, activeTab, onSave }: EditModalProps) => {
  const [formData, setFormData] = useState<any>(item || {});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setFormData(item || {});
  }, [item]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${activeTab}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setFormData({ 
        ...formData, 
        image_url: publicUrl, 
        image: publicUrl, 
        url: publicUrl 
      });
      
      toast({ title: "Imagen subida correctamente" });
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error al subir imagen",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Prepare data (remove UI-only fields or handle differences)
      const dataToSave = { ...formData };
      delete dataToSave.created_at;

      const { error } = formData.id
        ? await supabase.from(activeTab).update(dataToSave).eq("id", formData.id)
        : await supabase.from(activeTab).insert([dataToSave]);

      if (error) throw error;

      toast({ title: formData.id ? "Actualizado con éxito" : "Creado con éxito" });
      onSave();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error al guardar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={onClose}
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
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">
                  {formData.id ? "Editando" : "Creando Nuevo"}
                </p>
                <h2 className="font-display text-3xl font-bold">Detalles del Item</h2>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
              >
                <X size={24} />
              </button>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Section */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">
                  Imagen
                </label>
                
                <div className="flex gap-4 items-start">
                  <div className="flex-grow space-y-2">
                    <input
                      type="text"
                      placeholder="https://..."
                      value={formData.image_url || formData.image || formData.url || ""}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value, image: e.target.value, url: e.target.value })}
                      className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                      <label
                        htmlFor="file-upload"
                        className={`flex items-center justify-center gap-2 px-6 py-4 bg-primary/5 border-2 border-dashed border-primary/20 rounded-2xl cursor-pointer hover:bg-primary/10 transition-all ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        <Upload size={18} className="text-primary" />
                        <span className="text-sm font-bold text-primary">
                          {isUploading ? 'Subiendo...' : 'Subir Imagen'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {(formData.image_url || formData.image || formData.url) && (
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border border-border shadow-sm flex-shrink-0">
                      <img
                        src={formData.image_url || formData.image || formData.url}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Main Info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">
                    Nombre / Título
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value, title: e.target.value })}
                    className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium"
                  />
                </div>
                
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">
                    Precio (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price || ""}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">
                  Descripción Corta
                </label>
                <input
                  type="text"
                  value={formData.short_description || ""}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">
                  Descripción Larga
                </label>
                <textarea
                  rows={6}
                  value={formData.description || formData.message || formData.bio || ""}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    description: e.target.value,
                    message: e.target.value,
                    bio: e.target.value
                  })}
                  className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium resize-none"
                />
              </div>

              {/* Extra Fields based on Tab */}
              {activeTab === "services" && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Duración</label>
                    <input
                      type="text"
                      placeholder="Ej: 45 min"
                      value={formData.duration || ""}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Categoría</label>
                    <select
                      value={formData.category || ""}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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

              {activeTab === "team" && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Rol / Puesto</label>
                    <input
                      type="text"
                      value={formData.role || ""}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Especialidad</label>
                    <input
                      type="text"
                      value={formData.specialty || ""}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full px-6 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              <div className="pt-8 flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 border-2 border-border text-foreground/60 rounded-2xl font-bold hover:bg-muted transition-all"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 btn-primary py-4 text-white rounded-2xl font-black tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save size={20} /> GUARDAR CAMBIOS
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditModal;
