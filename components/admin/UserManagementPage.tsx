import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminStats, getPendingRequests } from '../../services/api';
import { AdminStats, AccessRequest } from '../../types';
import { LayoutDashboard, Users, Calendar, Award, Building, GraduationCap, Gift, Wrench, Store, Clapperboard, Mail, MessageSquare, Settings, Bell, LogOut, UserCheck, UserX, UserPlus, Server } from 'lucide-react';
import UsersList from './UsersList';
import PendingApprovals from './PendingApprovals';

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


const UserManagementPage: React.FC = () => {
    const [stats, setStats] = useState<Partial<AdminStats>>({});
    const [pendingRequests, setPendingRequests] = useState<AccessRequest[]>([]);
    const [currentTab, setCurrentTab] = useState('users'); // users, pending

    useEffect(() => {
        const fetchData = async () => {
            const [statsData, requestsData] = await Promise.all([
                getAdminStats(),
                getPendingRequests()
            ]);
            setStats(statsData);
            setPendingRequests(requestsData);
        };
        fetchData();
    }, []);

    return (
         <div className="min-h-screen bg-haut-dark text-white flex">
            <AdminSidebar />
            <main className="flex-1 flex flex-col">
                <header className="bg-haut-surface border-b border-haut-border p-6">
                    <h1 className="text-2xl font-bold text-white mb-4">Gestão de Usuários</h1>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <StatCard icon={<Users size={24} />} label="Total" value={stats.totalUsers} color="text-white" />
                        <StatCard icon={<UserCheck size={24} />} label="Ativos" value={stats.totalUsers! - stats.totalSuspended!} color="text-green-400" />
                        <StatCard icon={<UserPlus size={24} />} label="Pendentes" value={stats.pendingRequests} color="text-yellow-400" />
                        <StatCard icon={<UserX size={24} />} label="Suspensos" value={stats.totalSuspended} color="text-red-400" />
                        <StatCard icon={<Server size={24} />} label="Admins" value={stats.totalAdmins} color="text-purple-400" />
                    </div>
                </header>

                <div className="bg-haut-surface border-b border-haut-border px-6">
                    <div className="flex gap-6">
                        <TabButton
                            label="Usuários Cadastrados"
                            isActive={currentTab === 'users'}
                            onClick={() => setCurrentTab('users')}
                        />
                        <TabButton
                            label="Pendentes de Aprovação"
                            isActive={currentTab === 'pending'}
                            onClick={() => setCurrentTab('pending')}
                            count={pendingRequests.length}
                        />
                    </div>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto bg-haut-dark">
                     {currentTab === 'users' ? (
                        <UsersList />
                    ) : (
                        <PendingApprovals initialRequests={pendingRequests} />
                    )}
                </div>
            </main>
        </div>
    );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value?: number, color: string }> = ({ icon, label, value, color }) => (
    <div className="bg-haut-dark border border-haut-border p-4 rounded-lg flex items-center gap-4">
        <div className={color}>{icon}</div>
        <div>
            <p className="text-haut-muted text-sm">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value ?? '...'}</p>
        </div>
    </div>
);

const TabButton: React.FC<{ label: string, isActive: boolean, onClick: () => void, count?: number }> = ({ label, isActive, onClick, count }) => (
    <button
        onClick={onClick}
        className={`py-3 px-1 border-b-2 transition relative font-medium ${
            isActive 
            ? 'border-haut-accent text-haut-accent' 
            : 'border-transparent text-haut-muted hover:text-white'
        }`}
    >
        {label}
        {count !== undefined && count > 0 && (
        <span className="absolute top-1 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {count}
        </span>
        )}
    </button>
);


export default UserManagementPage;