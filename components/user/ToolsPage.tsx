import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tool, ToolCategory } from '../../types';
import { getUserTools, getToolCategories } from '../../services/api';
import { Home, User as UserIcon, Calendar, Wrench, GraduationCap, Settings, LogOut, Award, Search, Clapperboard, Store, Gift } from 'lucide-react';
import ToolCardUser from './ToolCardUser';
import ToolDetailsModal from './ToolDetailsModal';

const menuItems = [
    { icon: <Home size={20} />, label: 'Início', path: '/dashboard' },
    { icon: <UserIcon size={20} />, label: 'Meu Perfil', path: '/profile' },
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

const ToolsPage: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<ToolCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', category: 'all' });
  const [sortBy, setSortBy] = useState('recent');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const [toolsData, categoriesData] = await Promise.all([getUserTools(), getToolCategories()]);
        setTools(toolsData);
        setCategories(categoriesData);
        setLoading(false);
    };
    fetchData();
  }, []);

  const filteredAndSortedTools = useMemo(() => {
    return tools
      .filter(tool =>
        (tool.name.toLowerCase().includes(filters.search.toLowerCase()) || tool.short_description.toLowerCase().includes(filters.search.toLowerCase())) &&
        (filters.category === 'all' || tool.category_id === filters.category)
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'recent':
          default:
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
      });
  }, [tools, filters, sortBy]);

  return (
    <div className="min-h-screen bg-haut-dark text-white flex">
      <UserSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-white">Ferramentas</h1>
          <p className="text-haut-muted mt-1">Acesse os recursos, templates e automações disponíveis para seu perfil.</p>
        </header>

        <div className="bg-haut-surface rounded-lg p-4 mb-6 border border-haut-border flex flex-wrap items-center gap-4">
            <div className="relative flex-grow min-w-[200px]"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-haut-muted" size={20}/><input type="text" placeholder="Buscar..." value={filters.search} onChange={e=>setFilters({...filters, search: e.target.value})} className="w-full pl-10 pr-4 py-2 bg-haut-dark border border-haut-border rounded-lg"/></div>
            <select value={filters.category} onChange={e=>setFilters({...filters, category: e.target.value})} className="px-4 py-2 bg-haut-dark border border-haut-border rounded-lg appearance-none"><option value="all">Todas Categorias</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-4 py-2 bg-haut-dark border border-haut-border rounded-lg appearance-none"><option value="recent">Mais Recentes</option><option value="name">Nome (A-Z)</option></select>
        </div>

        {loading ? (
            <div className="text-center py-10 text-haut-muted">Carregando ferramentas...</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedTools.map(tool => (
                    <ToolCardUser key={tool.id} tool={tool} onSelect={() => setSelectedTool(tool)} />
                ))}
            </div>
        )}

        {selectedTool && <ToolDetailsModal tool={selectedTool} onClose={() => setSelectedTool(null)} />}
      </main>
    </div>
  );
};

export default ToolsPage;
