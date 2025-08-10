import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Event, EventRegistration, EventFilters } from '../../types';
import { getUserEvents, getMyRegisteredEvents } from '../../services/api';
import EventCard from './EventCard';
import EventDetailsModal from './EventDetailsModal';
import { Home, User, Calendar, Wrench, GraduationCap, Settings, LogOut, Search, Award, Clapperboard, Store, Gift } from 'lucide-react';

const menuItems = [
    { icon: <Home size={20} />, label: 'Início', path: '/dashboard' },
    { icon: <User size={20} />, label: 'Meu Perfil', path: '/profile' },
    { icon: <Calendar size={20} />, label: 'Eventos', path: '/events' },
    { icon: <Award size={20} />, label: 'Meus Títulos', path: '/titles' },
    { icon: <Wrench size={20} />, label: 'Ferramentas', path: '/tools' },
    { icon: <GraduationCap size={20} />, label: 'Academia', path: '/academy' },
    { icon: <Clapperboard size={20} />, label: 'Live Academy', path: '/live' },
    { icon: <Store size={20} />, label: 'Loja Parceiros', path: '/store' },
    { icon: <Gift size={20} />, label: 'Benefícios', path: '/benefits' },
    { icon: <Settings size={20} />, label: 'Configurações', path: '/settings' }
];

const UserSidebar: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => { localStorage.clear(); navigate('/login'); };
    return (
        <aside className="w-64 bg-haut-surface border-r border-haut-border flex-col hidden lg:flex">
            <div className="p-6"><h2 className="text-xl font-bold text-haut-accent">Haut Academy</h2><p className="text-haut-muted text-sm">Workspace</p></div>
            <nav className="flex-1 px-4 overflow-y-auto">{menuItems.map((item) => (<Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-colors ${window.location.hash.includes(item.path) ? 'bg-haut-accent/10 text-haut-accent' : 'text-haut-muted hover:bg-haut-border hover:text-white'}`}>{item.icon}<span>{item.label}</span></Link>))}</nav>
            <div className="p-4 border-t border-haut-border"><button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-haut-muted hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"><LogOut size={20} /><span>Sair</span></button></div>
        </aside>
    );
};

const EventsPage: React.FC = () => {
  const [availableEvents, setAvailableEvents] = useState<Event[]>([]);
  const [myEvents, setMyEvents] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('available'); // available, registered
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filters, setFilters] = useState<Partial<EventFilters>>({ search: '', type: 'all', date: 'all' });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [availEventsData, myEventsData] = await Promise.all([
        getUserEvents(),
        getMyRegisteredEvents()
      ]);
      setAvailableEvents(availEventsData);
      setMyEvents(myEventsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
  };
  
  const filteredEvents = availableEvents.filter(event => 
    (event.title.toLowerCase().includes(filters.search!.toLowerCase())) &&
    (filters.type === 'all' || event.event_type === filters.type)
  );

  return (
    <div className="min-h-screen bg-haut-dark text-white flex">
      <UserSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Eventos</h1>
            <p className="text-haut-muted">Participe dos eventos exclusivos do ecossistema Haut.</p>
          </div>

          <div className="bg-haut-surface rounded-lg border border-haut-border">
              <div className="px-6 border-b border-haut-border">
                  <div className="flex gap-6">
                      <TabButton label="Eventos Disponíveis" isActive={activeTab === 'available'} onClick={() => setActiveTab('available')} />
                      <TabButton label="Meus Eventos" isActive={activeTab === 'registered'} onClick={() => setActiveTab('registered')} count={myEvents.length}/>
                  </div>
              </div>
               <div className="p-4 flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-haut-muted" size={20} />
                    <input type="text" placeholder="Buscar eventos..." value={filters.search} onChange={(e) => setFilters({...filters, search: e.target.value})} className="w-full pl-10 pr-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white"/>
                  </div>
                  <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value as any})} className="px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white appearance-none"><option value="all">Todos Tipos</option><option value="online">Online</option><option value="presencial">Presencial</option><option value="hybrid">Híbrido</option></select>
               </div>
          </div>
          
          <div className="py-6">
             {loading ? <p>Carregando...</p> : (
                activeTab === 'available' ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                        {filteredEvents.map(event => <EventCard key={event.id} event={event} onViewDetails={handleViewDetails} />)}
                     </div>
                ) : (
                    <div className="space-y-4 animate-fadeIn">
                        {myEvents.map(reg => (
                            <div key={reg.id} className="bg-haut-surface p-4 rounded-lg flex items-center gap-4 border border-haut-border">
                                <img src={reg.event?.image_url} className="w-24 h-24 rounded-md object-cover bg-haut-dark"/>
                                <div>
                                    <h3 className="font-bold text-white">{reg.event?.title}</h3>
                                    <p className="text-sm text-haut-muted">Inscrito em: {new Date(reg.created_at).toLocaleDateString()}</p>
                                    <span className={`mt-2 inline-block px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-400`}>Status: {reg.status}</span>
                                </div>
                                <button onClick={() => handleViewDetails(reg.event!)} className="ml-auto px-4 py-2 bg-haut-border text-white rounded-lg hover:bg-haut-border/70">Ver Detalhes</button>
                            </div>
                        ))}
                    </div>
                )
             )}
          </div>

          {selectedEvent && <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </div>
      </main>
    </div>
  );
};

const TabButton: React.FC<{ label: string, isActive: boolean, onClick: () => void, count?: number }> = ({ label, isActive, onClick, count }) => (
    <button onClick={onClick} className={`py-3 px-1 border-b-2 font-medium transition relative ${isActive ? 'border-haut-accent text-haut-accent' : 'border-transparent text-haut-muted hover:text-white'}`}>
        {label}
        {count !== undefined && count > 0 && (
            <span className="absolute top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{count}</span>
        )}
    </button>
);

export default EventsPage;