import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, User as UserIcon, Calendar, Wrench, GraduationCap, Settings, LogOut, Award, Clapperboard, Store, Gift } from 'lucide-react';
import { HardHat } from 'lucide-react';

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

const LiveAcademyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-haut-dark text-white flex">
      <UserSidebar />
       <main className="flex-1 p-6">
        <div className="flex flex-col items-center justify-center text-center h-full bg-haut-surface rounded-lg border border-haut-border">
            <HardHat className="text-haut-accent w-24 h-24 mb-6" />
            <h1 className="text-3xl font-bold text-white mb-2">Live Academy</h1>
            <p className="text-lg text-haut-muted">Esta funcionalidade está em construção.</p>
        </div>
      </main>
    </div>
  );
};

export default LiveAcademyPage;