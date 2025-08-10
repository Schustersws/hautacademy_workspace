import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Subsidiary } from '../../types';
import { getAdminSubsidiaries } from '../../services/api';
import { LayoutDashboard, Users, Calendar, Award, Building, GraduationCap, Gift, Wrench, Store, Clapperboard, Mail, MessageSquare, Settings, LogOut, PlusCircle, Edit, Trash2, ShoppingCart } from 'lucide-react';
import SubsidiaryFormModal from './SubsidiaryFormModal';

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

const SubsidiariesPage: React.FC = () => {
    const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingSubsidiary, setEditingSubsidiary] = useState<Subsidiary | null>(null);

    const fetchSubsidiaries = useCallback(async () => {
        setLoading(true);
        const data = await getAdminSubsidiaries();
        setSubsidiaries(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchSubsidiaries();
    }, [fetchSubsidiaries]);

    const handleEdit = (subsidiary: Subsidiary) => {
        setEditingSubsidiary(subsidiary);
        setShowModal(true);
    };

    const handleCreateNew = () => {
        setEditingSubsidiary(null);
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
        setEditingSubsidiary(null);
        fetchSubsidiaries();
    };

    return (
        <div className="min-h-screen bg-haut-dark text-white flex">
            <AdminSidebar />
            <main className="flex-1 p-6 overflow-y-auto">
                <header className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Subsidiárias e Marcas</h1>
                        <p className="text-haut-muted mt-1">Gerencie as linhas de negócio e marcas do Grupo Haut.</p>
                    </div>
                    <button onClick={handleCreateNew} className="px-5 py-2.5 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 flex items-center gap-2"><PlusCircle size={18}/> Nova Subsidiária</button>
                </header>

                <div className="bg-haut-surface rounded-lg border border-haut-border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-haut-border/20">
                                <tr>
                                    <th className="p-4 text-left text-sm font-semibold text-haut-muted">Marca</th>
                                    <th className="p-4 text-left text-sm font-semibold text-haut-muted">Slug</th>
                                    <th className="p-4 text-left text-sm font-semibold text-haut-muted">Cores</th>
                                    <th className="p-4 text-left text-sm font-semibold text-haut-muted">Status</th>
                                    <th className="p-4 text-right text-sm font-semibold text-haut-muted">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={5} className="text-center p-8 text-haut-muted">Carregando...</td></tr>
                                ) : subsidiaries.map(sub => (
                                    <tr key={sub.id} className="border-t border-haut-border">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={sub.logo_url} alt={sub.name} className="w-8 h-8 rounded-full bg-haut-dark p-1" />
                                                <span className="font-semibold text-white">{sub.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-haut-muted font-mono text-sm">{sub.slug}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full border border-haut-border" style={{backgroundColor: sub.brand_color}}></div>
                                                <div className="w-5 h-5 rounded-full border border-haut-border" style={{backgroundColor: sub.accent_color}}></div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                             <span className={`px-2 py-1 text-xs font-medium rounded-full ${sub.is_active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                                {sub.is_active ? 'Ativa' : 'Inativa'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button onClick={() => handleEdit(sub)} className="p-2 text-haut-muted hover:text-haut-accent"><Edit size={16}/></button>
                                            <button className="p-2 text-haut-muted hover:text-red-400"><Trash2 size={16}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {showModal && <SubsidiaryFormModal subsidiary={editingSubsidiary} onClose={handleCloseModal} />}
            </main>
        </div>
    );
};

export default SubsidiariesPage;
