import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Search, Calendar, Clock, User, Phone, Mail, MoreHorizontal, CheckCircle, XCircle, Clock4, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const BookingsTab = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          services (name)
        `)
        .order('booking_date', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error al cargar reservas",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      toast({ title: `Reserva ${newStatus}` });
      fetchBookings();
    } catch (error: any) {
      toast({
        title: "Error al actualizar estado",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.client_email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50 border-green-100';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-100';
      case 'completed': return 'text-blue-600 bg-blue-50 border-blue-100';
      default: return 'text-amber-600 bg-amber-50 border-amber-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'cancelled': return XCircle;
      case 'completed': return CheckCircle2;
      default: return Clock4;
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm w-64 shadow-sm"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-6 py-3 bg-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm shadow-sm"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="confirmed">Confirmadas</option>
            <option value="completed">Completadas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>
      </header>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-32 space-y-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Cargando reservas...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-32 text-center">
            <div className="w-20 h-20 bg-muted/50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-muted-foreground">
              <Calendar size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">No hay reservas</h3>
            <p className="text-muted-foreground">No se encontraron reservas que coincidan con los filtros.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Cliente</th>
                  <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Servicio / Fecha</th>
                  <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Estado</th>
                  <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => {
                  const StatusIcon = getStatusIcon(booking.status);
                  return (
                    <tr key={booking.id} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{booking.client_name}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center gap-1"><Phone size={12} /> {booking.client_phone || 'N/A'}</span>
                              <span className="flex items-center gap-1"><Mail size={12} /> {booking.client_email || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <p className="font-bold text-foreground/80">{booking.services?.name || 'Servicio Desconocido'}</p>
                          <div className="flex items-center gap-3 text-xs font-bold text-primary uppercase">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {format(new Date(booking.booking_date), "d MMM, yyyy", { locale: es })}</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {booking.booking_time}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border tracking-widest ${getStatusColor(booking.status)}`}>
                          <StatusIcon size={12} />
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {booking.status === 'pending' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'confirmed')}
                              className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition-all"
                              title="Confirmar"
                            >
                              <CheckCircle size={18} />
                            </button>
                          )}
                          {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'completed')}
                              className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                              title="Completar"
                            >
                              <CheckCircle2 size={18} />
                            </button>
                          )}
                          {booking.status !== 'cancelled' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'cancelled')}
                              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                              title="Cancelar"
                            >
                              <XCircle size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsTab;
