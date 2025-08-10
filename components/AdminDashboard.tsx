import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminStats } from '../services/api';
import { AdminStats, User } from '../types';
import { LayoutDashboard, Users, Calendar, Award, Building, GraduationCap, Gift, Wrench, Store, Clapperboard, Mail, MessageSquare, Settings, Bell, LogOut, FileCheck, Check, X, UserPlus, CalendarPlus, Library, BarChart } from 'lucide-react';

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

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

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


const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getAdminStats();
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
            <AdminSidebar />
            <main className="flex-1">
                <header className="bg-haut-surface border-b border-haut-border px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-white">Dashboard Administrativo</h1>
                        <div className="flex items-center gap-4">
                            <button className="text-haut-muted hover:text-white">
                                <Bell size={22} />
                            </button>
                            <div className="flex items-center gap-2">
                                <img src={user?.avatar_url} alt="User Avatar" className="w-9 h-9 rounded-full bg-haut-accent object-cover" />
                                <div>
                                    <span className="text-white font-semibold">{user?.full_name}</span>
                                    <p className="text-xs text-haut-muted">{user?.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-haut-surface border border-haut-border p-6 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <FileCheck className="text-haut-accent" size={32} />
                                <span className="text-yellow-400 text-sm font-semibold bg-yellow-400/10 px-2 py-1 rounded">Pendente</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{stats?.pendingRequests ?? '...'}</p>
                            <p className="text-haut-muted text-sm">Solicitações de Acesso</p>
                        </div>
                        <div className="bg-haut-surface border border-haut-border p-6 rounded-lg">
                             <div className="flex items-center justify-between mb-4">
                                <Users className="text-green-400" size={32} />
                                <span className="text-green-400 text-sm font-semibold bg-green-400/10 px-2 py-1 rounded">Ativo</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{stats?.totalUsers ?? '...'}</p>
                            <p className="text-haut-muted text-sm">Usuários Ativos</p>
                        </div>
                        <div className="bg-haut-surface border border-haut-border p-6 rounded-lg">
                             <div className="flex items-center justify-between mb-4">
                                <Calendar className="text-blue-400" size={32} />
                                <span className="text-blue-400 text-sm font-semibold bg-blue-400/10 px-2 py-1 rounded">Próximos</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{stats?.totalEvents ?? '...'}</p>
                            <p className="text-haut-muted text-sm">Eventos Agendados</p>
                        </div>
                         <div className="bg-haut-surface border border-haut-border p-6 rounded-lg">
                             <div className="flex items-center justify-between mb-4">
                                <GraduationCap className="text-purple-400" size={32} />
                                 <span className="text-purple-400 text-sm font-semibold bg-purple-400/10 px-2 py-1 rounded">Em andamento</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{stats?.activeCourses ?? '...'}</p>
                            <p className="text-haut-muted text-sm">Cursos Ativos</p>
                        </div>
                    </div>

                    <div className="bg-haut-surface border border-haut-border rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-bold text-white mb-4">Pendentes de Aprovação</h2>
                        <div className="space-y-4">
                            <div className="border border-haut-border rounded-lg p-4 flex justify-between items-center animate-slideIn">
                                <div>
                                    <h3 className="font-semibold text-white">João Silva</h3>
                                    <p className="text-haut-muted text-sm">joao@empresa.com • Parceiro • Medical</p>
                                    <p className="text-haut-muted/70 text-xs mt-1">Solicitado em: 09/08/2025</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-1 text-sm"><Check size={16}/>Aprovar</button>
                                    <button className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-1 text-sm"><X size={16}/>Rejeitar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-haut-surface border border-haut-border rounded-lg p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Ações Rápidas</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button className="p-4 bg-haut-border hover:bg-haut-border/70 rounded-lg text-center transition-colors">
                                <UserPlus className="mx-auto text-haut-accent" size={28}/>
                                <span className="text-white text-sm mt-2 block">Novo Usuário</span>
                            </button>
                             <button className="p-4 bg-haut-border hover:bg-haut-border/70 rounded-lg text-center transition-colors">
                                <CalendarPlus className="mx-auto text-haut-accent" size={28}/>
                                <span className="text-white text-sm mt-2 block">Criar Evento</span>
                            </button>
                             <button className="p-4 bg-haut-border hover:bg-haut-border/70 rounded-lg text-center transition-colors">
                                <Library className="mx-auto text-haut-accent" size={28}/>
                                <span className="text-white text-sm mt-2 block">Novo Curso</span>
                            </button>
                             <button className="p-4 bg-haut-border hover:bg-haut-border/70 rounded-lg text-center transition-colors">
                                <BarChart className="mx-auto text-haut-accent" size={28}/>
                                <span className="text-white text-sm mt-2 block">Relatórios</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;