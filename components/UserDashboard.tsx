import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserStats } from '../services/api';
import { UserStats, User } from '../types';
import { Home, User as UserIcon, Calendar, Wrench, GraduationCap, Clapperboard, Store, Gift, MessageSquare, Users, Settings, Bell, LogOut, Award } from 'lucide-react';

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
    { icon: <MessageSquare size={20} />, label: 'Mensagens', path: '/messages' },
    { icon: <Users size={20} />, label: 'Parceiros', path: '/partners' },
    { icon: <Settings size={20} />, label: 'Configurações', path: '/settings' }
];

const shortcuts = [
    { icon: <Calendar size={32}/>, label: 'Eventos', color: 'bg-blue-600', path: '/events' },
    { icon: <Wrench size={32}/>, label: 'Ferramentas', color: 'bg-green-600', path: '/tools' },
    { icon: <GraduationCap size={32}/>, label: 'Cursos', color: 'bg-purple-600', path: '/academy' },
    { icon: <Store size={32}/>, label: 'Loja', color: 'bg-pink-600', path: '/store' },
    { icon: <Gift size={32}/>, label: 'Benefícios', color: 'bg-yellow-600', path: '/benefits' },
    { icon: <Clapperboard size={32}/>, label: 'Live Academy', color: 'bg-red-600', path: '/live' },
    { icon: <MessageSquare size={32}/>, label: 'Mensagens', color: 'bg-indigo-600', path: '/messages' },
    { icon: <Users size={32}/>, label: 'Parceiros', color: 'bg-teal-600', path: '/partners' }
];

const UserSidebar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };
    return (
        <aside className="w-64 bg-haut-surface border-r border-haut-border flex-col hidden lg:flex">
            <div className="p-6">
                <h2 className="text-xl font-bold text-haut-accent">Haut Academy</h2>
                <p className="text-haut-muted text-sm">Workspace</p>
            </div>
            <nav className="flex-1 px-4 overflow-y-auto">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center gap-3 px-4 py-3 mb-1 text-haut-muted hover:bg-haut-border hover:text-white rounded-lg transition-colors"
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

const UserDashboard: React.FC = () => {
    const [stats, setStats] = useState<UserStats | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getUserStats();
            setStats(data);
        };
        fetchStats();

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="min-h-screen bg-haut-dark text-white flex">
            <UserSidebar />
            <main className="flex-1">
                <header className="bg-haut-surface border-b border-haut-border px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Bem-vindo, {user?.full_name.split(' ')[0]}</h1>
                            <p className="text-haut-muted">Confira as novidades e atividades do Grupo Haut</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative text-haut-muted hover:text-white">
                                <Bell size={22} />
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-haut-surface"></span>
                            </button>
                            <div className="flex items-center gap-2">
                                <img src={user?.avatar_url} alt="User Avatar" className="w-9 h-9 rounded-full bg-haut-accent object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-haut-surface border border-haut-border p-6 rounded-lg"><Calendar className="text-blue-400 mb-4" size={32}/><p className="text-3xl font-bold text-white">{stats?.nextEvents ?? '...'}</p><p className="text-haut-muted text-sm">Próximos Eventos</p></div>
                        <div className="bg-haut-surface border border-haut-border p-6 rounded-lg"><GraduationCap className="text-purple-400 mb-4" size={32}/><p className="text-3xl font-bold text-white">{stats?.activeCourses ?? '...'}</p><p className="text-haut-muted text-sm">Cursos Ativos</p></div>
                        <div className="bg-haut-surface border border-haut-border p-6 rounded-lg"><Wrench className="text-green-400 mb-4" size={32}/><p className="text-3xl font-bold text-white">{stats?.availableTools ?? '...'}</p><p className="text-haut-muted text-sm">Ferramentas</p></div>
                        <div className="bg-haut-surface border border-haut-border p-6 rounded-lg"><Award className="text-yellow-400 mb-4" size={32}/><p className="text-3xl font-bold text-white">{stats?.earnedTitles ?? '...'}</p><p className="text-haut-muted text-sm">Títulos</p></div>
                    </div>
                    
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-white mb-4">Acesso Rápido</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                            {shortcuts.map((item) => (
                                <button key={item.label} onClick={() => navigate(item.path)} className={`${item.color} p-4 rounded-lg hover:brightness-125 transition text-center flex flex-col items-center justify-center aspect-square`}>
                                    {item.icon}
                                    <span className="text-white font-semibold text-sm mt-2">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-haut-surface border border-haut-border rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-white">Próximos Eventos</h2>
                                <Link to="/events" className="text-haut-accent hover:underline text-sm">Ver todos →</Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-haut-border rounded-lg p-4 bg-haut-dark/50">
                                    <h3 className="font-semibold text-white mb-2">Workshop de Vendas</h3>
                                    <p className="text-haut-muted text-sm mb-3">15 de Agosto, 19:00 - Online</p>
                                    <button className="w-full px-4 py-2 bg-haut-accent text-haut-dark font-bold rounded-md hover:brightness-90 text-sm transition">Ver Detalhes</button>
                                </div>
                                <div className="border border-haut-border rounded-lg p-4 bg-haut-dark/50">
                                    <h3 className="font-semibold text-white mb-2">Treinamento Técnico</h3>
                                    <p className="text-haut-muted text-sm mb-3">20 de Agosto, 14:00 - Presencial</p>
                                    <button className="w-full px-4 py-2 bg-haut-accent text-haut-dark font-bold rounded-md hover:brightness-90 text-sm transition">Ver Detalhes</button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-haut-surface border border-haut-border rounded-lg p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Notificações Recentes</h2>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 bg-haut-border/50 rounded-md">
                                    <span className="mt-1"><Calendar size={20} className="text-blue-400" /></span>
                                    <div><p className="text-white text-sm">Novo evento disponível: Workshop de Vendas</p><p className="text-haut-muted text-xs">Há 2 horas</p></div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-haut-border/50 rounded-md">
                                    <span className="mt-1"><GraduationCap size={20} className="text-purple-400" /></span>
                                    <div><p className="text-white text-sm">Você completou 50% do curso de Marketing Digital</p><p className="text-haut-muted text-xs">Há 1 dia</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;