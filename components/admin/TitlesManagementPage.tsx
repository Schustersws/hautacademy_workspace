import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Title } from '../../types';
import { getAdminTitles } from '../../services/api';
import { LayoutDashboard, Users, Calendar, Award, Building, GraduationCap, Gift, Wrench, Store, Clapperboard, Mail, MessageSquare, Settings, LogOut, PlusCircle, Search } from 'lucide-react';
import TitleCard from './TitleCard';
import TitleFormModal from './TitleFormModal';

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
            <div className="p-6"><h2 className="text-xl font-bold text-haut-accent">Admin Panel</h2><p className="text-haut-muted text-sm">Haut Academy Workspace</p></div>
            <nav className="flex-1 px-4 overflow-y-auto">{menuItems.map((item) => (<Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-colors ${window.location.hash.includes(item.path) ? 'bg-haut-accent/10 text-haut-accent' : 'text-haut-muted hover:bg-haut-border hover:text-white'}`}>{item.icon}<span>{item.label}</span></Link>))}</nav>
            <div className="p-4 border-t border-haut-border"><button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-haut-muted hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"><LogOut size={20} /><span>Sair</span></button></div>
        </aside>
    );
};

const TitlesManagementPage: React.FC = () => {
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', category: 'all', status: 'active' });
  const [showModal, setShowModal] = useState(false);
  const [editingTitle, setEditingTitle] = useState<Title | null>(null);

  const fetchTitles = useCallback(async () => {
    setLoading(true);
    const data = await getAdminTitles(filters);
    setTitles(data);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchTitles();
  }, [fetchTitles]);

  const handleEdit = (title: Title) => {
    setEditingTitle(title);
    setShowModal(true);
  };

  const handleCreateNew = () => {
    setEditingTitle(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTitle(null);
    fetchTitles(); // Refresh list after modal closes
  };

  return (
    <div className="min-h-screen bg-haut-dark text-white flex">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-y-auto">
            <header className="bg-haut-surface rounded-lg p-6 mb-6 border border-haut-border">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Gestão de Títulos e Insígnias</h1>
                        <p className="text-haut-muted mt-1">Gerencie reconhecimentos, níveis de parceria e certificações</p>
                    </div>
                    <button onClick={handleCreateNew} className="px-5 py-2.5 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 flex items-center gap-2"><PlusCircle size={18}/> Novo Título</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-haut-muted" size={20} /><input type="text" placeholder="Buscar título..." value={filters.search} onChange={(e) => setFilters({...filters, search: e.target.value})} className="w-full pl-10 pr-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent" /></div>
                    <select value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})} className="px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white appearance-none"><option value="all">Todas Categorias</option><option value="partnership">Parceria</option><option value="achievement">Conquista</option><option value="certification">Certificação</option><option value="special">Especial</option></select>
                    <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} className="px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white appearance-none"><option value="active">Ativos</option><option value="inactive">Inativos</option><option value="all">Todos</option></select>
                </div>
            </header>

            {loading ? <p className="text-center text-haut-muted">Carregando títulos...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {titles.map(title => <TitleCard key={title.id} title={title} onEdit={handleEdit} />)}
                </div>
            )}

            {showModal && <TitleFormModal title={editingTitle} onClose={handleCloseModal} />}
        </main>
    </div>
  );
};

export default TitlesManagementPage;