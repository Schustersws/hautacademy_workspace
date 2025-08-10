import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailTemplate } from '../../types';
import { getAdminEmailTemplates } from '../../services/api';
import { LayoutDashboard, Users, Calendar, Award, Building, GraduationCap, Gift, Wrench, Store, Clapperboard, Mail, MessageSquare, Settings, LogOut, PlusCircle, Edit, Search, ShoppingCart } from 'lucide-react';

const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <Users size={20} />, label: 'Usuários', path: '/admin/users' },
    { icon: <Calendar size={20} />, label: 'Eventos', path: '/admin/events' },
    { icon: <Award size={20} />, label: 'Títulos', path: '/admin/titles' },
    { icon: <Building size={20} />, label: 'Subsidiárias', path: '/admin/subsidiaries' },
    { icon: <GraduationCap size={20} />, label: 'Cursos', path: '/admin/courses' },
    { icon: <Gift size={20} />, label: 'Benefícios', path: '/admin/benefits' },
    { icon: <Wrench size={20} />, label: 'Ferramentas', path: '/admin/tools' },
    { icon: <Store size={20} />, label: 'Produtos', path: '/admin/store' },
    { icon: <ShoppingCart size={20} />, label: 'Pedidos', path: '/admin/store/orders' },
    { icon: <Clapperboard size={20} />, label: 'Live Academy', path: '/admin/live' },
    { icon: <Mail size={20} />, label: 'E-mails', path: '/admin/emails' },
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


const EmailTemplatesPage: React.FC = () => {
    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ search: '', status: 'all' });

    useEffect(() => {
        getAdminEmailTemplates().then(data => {
            setTemplates(data);
            setLoading(false);
        });
    }, []);

    const filteredTemplates = templates.filter(t => 
        (t.name.toLowerCase().includes(filters.search.toLowerCase()) || t.subject.toLowerCase().includes(filters.search.toLowerCase())) &&
        (filters.status === 'all' || (filters.status === 'active' && t.is_active) || (filters.status === 'inactive' && !t.is_active))
    );

    return (
        <div className="min-h-screen bg-haut-dark text-white flex">
            <AdminSidebar />
            <main className="flex-1 p-6 overflow-y-auto">
                 <header className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Templates de E-mail</h1>
                        <p className="text-haut-muted mt-1">Gerencie os e-mails transacionais e comunicados da plataforma.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 flex items-center gap-2">
                        <PlusCircle size={18}/> Novo Template
                    </button>
                </header>

                <div className="bg-haut-surface rounded-lg border border-haut-border">
                    <div className="p-4 flex gap-4 border-b border-haut-border">
                         <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-haut-muted" size={20}/>
                            <input 
                                type="text" 
                                placeholder="Buscar por nome ou assunto..." 
                                value={filters.search}
                                onChange={e => setFilters({...filters, search: e.target.value})}
                                className="w-full pl-10 pr-4 py-2 bg-haut-dark border border-haut-border rounded-lg"
                            />
                        </div>
                        <select 
                            value={filters.status}
                            onChange={e => setFilters({...filters, status: e.target.value})}
                            className="px-4 py-2 bg-haut-dark border border-haut-border rounded-lg appearance-none"
                        >
                            <option value="all">Todos Status</option>
                            <option value="active">Ativos</option>
                            <option value="inactive">Inativos</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-haut-border/20">
                                <tr>
                                    <th className="p-4 text-left text-sm font-semibold text-haut-muted">Nome do Template</th>
                                    <th className="p-4 text-left text-sm font-semibold text-haut-muted">Assunto</th>
                                    <th className="p-4 text-left text-sm font-semibold text-haut-muted">Status</th>
                                    <th className="p-4 text-left text-sm font-semibold text-haut-muted">Última Atualização</th>
                                    <th className="p-4 text-right text-sm font-semibold text-haut-muted">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={5} className="text-center p-8 text-haut-muted">Carregando...</td></tr>
                                ) : filteredTemplates.map(template => (
                                    <tr key={template.id} className="border-t border-haut-border">
                                        <td className="p-4 font-semibold text-white">{template.name}</td>
                                        <td className="p-4 text-haut-muted">{template.subject}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${template.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
                                                {template.is_active ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-haut-muted">{new Date(template.updated_at).toLocaleString('pt-BR')}</td>
                                        <td className="p-4 text-right">
                                            <button className="p-2 text-haut-muted hover:text-haut-accent"><Edit size={16}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EmailTemplatesPage;
