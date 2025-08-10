import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyTitles, getAvailableTitles } from '../../services/api';
import { UserTitle, Title } from '../../types';
import { Home, User as UserIcon, Calendar, Wrench, GraduationCap, Settings, LogOut, Award, Lock, CheckCircle, BarChart2, Clapperboard, Store, Gift } from 'lucide-react';
import { TitleIcon } from '../helpers/TitleIcon';


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

const MyTitlesPage: React.FC = () => {
  const [myTitles, setMyTitles] = useState<UserTitle[]>([]);
  const [availableTitles, setAvailableTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [my, available] = await Promise.all([getMyTitles(), getAvailableTitles()]);
      setMyTitles(my);
      setAvailableTitles(available);
      setLoading(false);
    };
    fetchData();
  }, []);
  
  const active = myTitles.filter(t => t.status === 'active');
  const expired = myTitles.filter(t => t.status === 'expired');

  return (
     <div className="min-h-screen bg-haut-dark text-white flex">
        <UserSidebar />
        <main className="flex-1 p-6 overflow-y-auto">
             <header className="bg-haut-surface rounded-lg p-6 mb-6 border border-haut-border">
                <h1 className="text-2xl font-bold text-white mb-2">Meus Títulos e Insígnias</h1>
                <p className="text-haut-muted">Seus reconhecimentos e conquistas no ecossistema Haut</p>
            </header>
            
            <div className="flex gap-2 mb-6">
                <TabButton label="Ativos" count={active.length} isActive={activeTab === 'active'} onClick={() => setActiveTab('active')} />
                <TabButton label="Expirados" count={expired.length} isActive={activeTab === 'expired'} onClick={() => setActiveTab('expired')} />
                <TabButton label="Disponíveis" count={availableTitles.length} isActive={activeTab === 'available'} onClick={() => setActiveTab('available')} />
            </div>

            {loading ? <p>Carregando...</p> : (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeTab === 'active' && active.map(ut => <ActiveTitleCard key={ut.id} userTitle={ut} />)}
                    {activeTab === 'expired' && expired.map(ut => <ActiveTitleCard key={ut.id} userTitle={ut} />)}
                    {activeTab === 'available' && availableTitles.map(t => <AvailableTitleCard key={t.id} title={t} />)}
                 </div>
            )}
        </main>
    </div>
  );
};

const TabButton: React.FC<{label: string, count: number, isActive: boolean, onClick: ()=>void}> = ({ label, count, isActive, onClick}) => (
    <button onClick={onClick} className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${isActive ? 'bg-haut-accent text-haut-dark' : 'bg-haut-surface text-haut-muted hover:text-white'}`}>
        {label} <span className={`px-2 rounded-full text-xs ${isActive ? 'bg-black/20' : 'bg-haut-border'}`}>{count}</span>
    </button>
);

const ActiveTitleCard: React.FC<{userTitle: UserTitle}> = ({ userTitle }) => (
     <div className="bg-haut-surface rounded-lg p-6 relative overflow-hidden border border-haut-border">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl" style={{backgroundColor: userTitle.title.color + '15'}}></div>
        <div className="relative">
            <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg" style={{ backgroundColor: userTitle.title.color + '20', color: userTitle.title.color, border: `2px solid ${userTitle.title.color}`}}>
                    <TitleIcon iconKey={userTitle.title.icon_key} size={32} />
                </div>
                <span className={`px-3 py-1 text-xs rounded-full font-semibold ${userTitle.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{userTitle.status === 'active' ? 'Ativo' : 'Expirado'}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{userTitle.title.name}</h3>
            <p className="text-haut-muted text-sm mb-4 h-10 line-clamp-2">{userTitle.title.description}</p>
            <div className="space-y-2 text-sm border-t border-haut-border pt-4">
                <div className="flex justify-between"><span className="text-haut-muted/70">Concedido em:</span><span className="text-white">{new Date(userTitle.granted_at).toLocaleDateString()}</span></div>
                <div className="flex justify-between"><span className="text-haut-muted/70">Válido até:</span><span className="text-white font-semibold">{userTitle.expires_at ? new Date(userTitle.expires_at).toLocaleDateString() : 'Permanente'}</span></div>
            </div>
        </div>
    </div>
);

const AvailableTitleCard: React.FC<{title: Title}> = ({ title }) => (
    <div className="bg-haut-surface rounded-lg p-6 relative overflow-hidden opacity-80 border-2 border-dashed border-haut-border">
         <div className="relative">
            <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 border-dashed" style={{ borderColor: title.color, color: title.color }}>
                    <Lock size={32} />
                </div>
                <span className="px-3 py-1 bg-haut-border text-haut-muted text-xs rounded-full">Bloqueado</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title.name}</h3>
            <p className="text-haut-muted text-sm mb-4 h-10 line-clamp-2">{title.description}</p>
            <div className="mt-4 border-t border-haut-border pt-4">
                <div className="flex justify-between text-sm mb-1"><span className="text-haut-muted/70">Progresso</span><span className="text-white">33%</span></div>
                <div className="w-full bg-haut-dark rounded-full h-2"><div className="bg-haut-accent h-2 rounded-full" style={{ width: '33%' }}></div></div>
                <button className="mt-4 w-full px-4 py-2 bg-haut-border text-white rounded hover:bg-haut-border/70 transition text-sm font-semibold">Ver Requisitos</button>
            </div>
        </div>
    </div>
);

export default MyTitlesPage;