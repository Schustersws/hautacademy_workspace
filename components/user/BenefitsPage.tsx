import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserBenefit } from '../../types';
import { getUserBenefits } from '../../services/api';
import { Home, User as UserIcon, Calendar, Wrench, GraduationCap, Settings, LogOut, Award, Clapperboard, Store, Gift } from 'lucide-react';
import BenefitCardUser from './BenefitCardUser';

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

const BenefitsPage: React.FC = () => {
  const [userBenefits, setUserBenefits] = useState<UserBenefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('available');

  useEffect(() => {
    getUserBenefits().then(data => {
      setUserBenefits(data);
      setLoading(false);
    });
  }, []);
  
  const getFilteredBenefits = () => {
      return userBenefits.filter(b => b.status === activeTab);
  }

  const stats = {
      available: userBenefits.filter(b => b.status === 'available').length,
      redeemed: userBenefits.filter(b => b.status === 'redeemed').length,
      expired: userBenefits.filter(b => b.status === 'expired').length
  };

  return (
    <div className="min-h-screen bg-haut-dark text-white flex">
      <UserSidebar />
      <main className="flex-1">
        <header className="bg-haut-surface border-b border-haut-border px-6 py-8">
          <h1 className="text-3xl font-bold text-white mb-2">Meus Benefícios</h1>
          <p className="text-haut-muted">Cupons, descontos e vantagens exclusivas para você.</p>
        </header>

        <div className="p-6">
            <div className="flex gap-2 mb-6 bg-haut-surface p-2 rounded-lg border border-haut-border">
                <TabButton label="Disponíveis" count={stats.available} isActive={activeTab === 'available'} onClick={() => setActiveTab('available')} />
                <TabButton label="Usados" count={stats.redeemed} isActive={activeTab === 'redeemed'} onClick={() => setActiveTab('redeemed')} />
                <TabButton label="Expirados" count={stats.expired} isActive={activeTab === 'expired'} onClick={() => setActiveTab('expired')} />
            </div>
            {loading ? <p>Carregando...</p> : (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredBenefits().map(ub => <BenefitCardUser key={ub.id} userBenefit={ub} />)}
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

const TabButton: React.FC<{label:string, count: number, isActive:boolean, onClick:()=>void}> = ({ label, count, isActive, onClick}) => (
    <button onClick={onClick} className={`flex-1 px-4 py-2 rounded-md font-semibold transition flex items-center justify-center gap-2 ${isActive ? 'bg-haut-accent text-haut-dark' : 'text-haut-muted hover:bg-haut-border'}`}>
        {label} <span className={`px-2 rounded-full text-xs ${isActive ? 'bg-black/20' : 'bg-haut-border'}`}>{count}</span>
    </button>
);


export default BenefitsPage;