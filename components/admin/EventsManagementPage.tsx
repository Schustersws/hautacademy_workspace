import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminEvents } from '../../services/api';
import { Event } from '../../types';
import { LayoutDashboard, Users, Calendar, Award, Building, GraduationCap, Gift, Wrench, Store, Clapperboard, Mail, MessageSquare, Settings, LogOut, PlusCircle, List, LayoutGrid, CalendarDays, BarChart, Users2, Clock, CheckCircle } from 'lucide-react';
import EventModal from './EventModal';
import EventsGrid from './EventsGrid';

const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <Users size={20} />, label: 'Usuários', path: '/admin/users' },
    { icon: <Calendar size={20} />, label: 'Eventos', path: '/admin/events' },
    { icon: <Award size={20} />, label: 'Títulos', path: '/admin/titles' },
    { icon: <Building size={20} />, label: 'Subsidiárias', path: '/admin/subsidiaries' },
    { icon: <GraduationCap size={20} />, label: 'Cursos', path: '/admin/courses' },
    { icon: <Gift size={20} />, label: 'Benefícios', path: '/admin/benefits' },
    { icon: <Wrench size={20} />, label: 'Ferramentas', path: '/admin/tools' },
    { icon: <Store size={20} />, label: 'Loja Parceiros', path: '/admin/store' },
    { icon: <Clapperboard size={20} />, label: 'Live Academy', path: '/admin/live' },
    { icon: <Mail size={20} />, label: 'E-mails', path: '/admin/emails' },
    { icon: <MessageSquare size={20} />, label: 'Mensagens', path: '/admin/messages' },
    { icon: <Settings size={20} />, label: 'Configurações', path: '/admin/settings' }
];

const AdminSidebar: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => { localStorage.clear(); navigate('/login'); };

    return (
        <aside className="w-64 bg-haut-surface border-r border-haut-border flex-col hidden lg:flex">
            <div className="p-6">
                <h2 className="text-xl font-bold text-haut-accent">Admin Panel</h2>
                <p className="text-haut-muted text-sm">Haut Academy Workspace</p>
            </div>
            <nav className="flex-1 px-4 overflow-y-auto">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-colors ${window.location.hash.includes(item.path) ? 'bg-haut-accent/10 text-haut-accent' : 'text-haut-muted hover:bg-haut-border hover:text-white'}`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-haut-border">
                 <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-haut-muted hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors">
                    <LogOut size={20} />
                    <span>Sair</span>
                </button>
            </div>
        </aside>
    );
};


const EventsManagementPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid'); // grid, list, calendar
  const [filters, setFilters] = useState({ search: '', status: 'all', type: 'all' });
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    getAdminEvents().then(data => {
      setEvents(data);
      setLoading(false);
    });
  }, []);
  
  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  }

  const handleCreateNew = () => {
    setSelectedEvent(null);
    setShowEventModal(true);
  }

  const filteredEvents = events.filter(event => {
    return (
      (event.title.toLowerCase().includes(filters.search.toLowerCase()) || event.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.status === 'all' || event.status === filters.status) &&
      (filters.type === 'all' || event.event_type === filters.type)
    );
  });
  
  const stats = {
      total: events.length,
      upcoming: events.filter(e => e.status === 'published' && new Date(e.start_date) > new Date()).length,
      inProgress: 0, // Mock
      registrations: 1847, // Mock
      occupancy: '78%', // Mock
      confirmed: 892 // Mock
  }

  return (
    <div className="min-h-screen bg-haut-dark text-white flex">
      <AdminSidebar />
      <main className="flex-1 flex flex-col">
        <header className="bg-haut-surface border-b border-haut-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Gestão de Eventos</h1>
            <button onClick={handleCreateNew} className="px-5 py-2.5 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 flex items-center gap-2 transition-all">
              <PlusCircle size={18} /> Novo Evento
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard icon={<BarChart size={24}/>} label="Total" value={stats.total} color="text-white"/>
            <StatCard icon={<CalendarDays size={24}/>} label="Próximos" value={stats.upcoming} color="text-blue-400"/>
            <StatCard icon={<Clock size={24}/>} label="Em Andamento" value={stats.inProgress} color="text-green-400"/>
            <StatCard icon={<Users2 size={24}/>} label="Inscrições" value={stats.registrations} color="text-purple-400"/>
            <StatCard icon={<CheckCircle size={24}/>} label="Confirmados" value={stats.confirmed} color="text-teal-400"/>
            <StatCard icon={<BarChart size={24}/>} label="Ocupação" value={stats.occupancy} color="text-yellow-400"/>
          </div>
        </header>

        <div className="bg-haut-surface px-6 py-4 border-b border-haut-border">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-3 flex-1">
              <input type="text" placeholder="Buscar evento..." value={filters.search} onChange={(e) => setFilters({...filters, search: e.target.value})} className="px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white flex-1 max-w-sm"/>
              <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} className="px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white appearance-none"><option value="all">Todos Status</option><option value="draft">Rascunho</option><option value="published">Publicado</option><option value="cancelled">Cancelado</option><option value="completed">Concluído</option></select>
              <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})} className="px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white appearance-none"><option value="all">Todos Tipos</option><option value="online">Online</option><option value="presencial">Presencial</option><option value="hybrid">Híbrido</option></select>
            </div>
            <div className="flex gap-1 bg-haut-dark p-1 rounded-lg border border-haut-border">
              <ViewToggleIcon icon={<LayoutGrid size={18}/>} active={view === 'grid'} onClick={() => setView('grid')} />
              <ViewToggleIcon icon={<List size={18}/>} active={view === 'list'} onClick={() => setView('list')} />
              <ViewToggleIcon icon={<Calendar size={18}/>} active={view === 'calendar'} onClick={() => setView('calendar')} />
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-haut-dark">
          {loading ? (
             <p className="text-center text-haut-muted">Carregando eventos...</p>
          ) : view === 'grid' ? (
            <EventsGrid events={filteredEvents} onEdit={handleEditEvent} />
          ) : (
            <p className="text-center text-haut-muted">{view.charAt(0).toUpperCase() + view.slice(1)} view em construção.</p>
          )}
        </div>

        {showEventModal && (
            <EventModal event={selectedEvent} onClose={() => setShowEventModal(false)} />
        )}
      </main>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string | number, color: string }> = ({ icon, label, value, color }) => (
    <div className="bg-haut-dark border border-haut-border p-4 rounded-lg">
        <div className={`flex items-center justify-between mb-2 ${color}`}>{icon}</div>
        <p className="text-haut-muted text-sm">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
);

const ViewToggleIcon: React.FC<{icon: React.ReactNode, active: boolean, onClick: ()=>void}> = ({icon, active, onClick}) => (
    <button onClick={onClick} className={`p-1.5 rounded-md ${active ? 'bg-haut-accent text-haut-dark' : 'text-haut-muted hover:bg-haut-border'}`}>
        {icon}
    </button>
);

export default EventsManagementPage;