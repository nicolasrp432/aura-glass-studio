import { Edit2, Trash2, Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableProps {
  items: any[];
  activeTab: string;
  onEdit: (item: any) => void;
  onDelete: (id: string | number) => void;
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddNew: () => void;
}

const DataTable = ({
  items,
  activeTab,
  onEdit,
  onDelete,
  isLoading,
  searchQuery,
  onSearchChange,
  onAddNew
}: DataTableProps) => {
  const filteredItems = items.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm w-64 shadow-sm"
            />
          </div>
          <button
            onClick={onAddNew}
            className="btn-primary py-3 px-6 text-xs font-black tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <Plus size={16} /> NUEVO ITEM
          </button>
        </div>
      </header>

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
                  {activeTab === "promotions" && <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Programación / Estado</th>}
                  {activeTab === "service_promotions" && <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Descuento / Vigencia</th>}
                  {activeTab === "product_promotions" && <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Descuento / Objetivo</th>}
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
                    {activeTab === "promotions" && (
                      <td className="px-8 py-6 text-sm">
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground/70">
                            {item.start_date ? new Date(item.start_date).toLocaleDateString() : 'Sin inicio'} - 
                            {item.end_date ? new Date(item.end_date).toLocaleDateString() : 'Sin fin'}
                          </span>
                          <span className={cn(
                            "font-black uppercase text-[10px] px-2 py-0.5 rounded-full w-fit mt-1",
                            item.is_active !== false ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          )}>
                            {item.is_active !== false ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                      </td>
                    )}
                    {activeTab === "service_promotions" && (
                      <td className="px-8 py-6 text-sm">
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground/70">
                            {item.discount_percent ? `${item.discount_percent}%` : "0%"} · {item.category || item.service_id || "General"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.start_date ? new Date(item.start_date).toLocaleDateString() : 'Sin inicio'} - 
                            {item.end_date ? new Date(item.end_date).toLocaleDateString() : 'Sin fin'}
                          </span>
                        </div>
                      </td>
                    )}
                    {activeTab === "product_promotions" && (
                      <td className="px-8 py-6 text-sm">
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground/70">
                            {item.discount_percent ? `${item.discount_percent}%` : "0%"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.product_id || item.category || "Sin objetivo"}
                          </span>
                        </div>
                      </td>
                    )}
                    {activeTab === "team" && (
                      <td className="px-8 py-6 text-sm">
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground/70">{item.role}</span>
                          <span className="text-gold font-black uppercase text-xs">{item.specialty}</span>
                        </div>
                      </td>
                    )}
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(item)}
                          className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(item.id)}
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
    </div>
  );
};

export default DataTable;
