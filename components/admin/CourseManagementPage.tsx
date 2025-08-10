import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Course } from '../../types';
import { getAdminCourses } from '../../services/api';
import { LayoutDashboard, Users, Calendar, Award, Building, GraduationCap, Gift, Wrench, Store, Clapperboard, Mail, MessageSquare, Settings, LogOut, PlusCircle, Search } from 'lucide-react';
import CourseCardAdmin from './CourseCardAdmin';
import CourseFormModal from './CourseFormModal';

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

const CourseManagementPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', category: 'all', status: 'all', price: 'all' });
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    const data = await getAdminCourses();
    setCourses(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setShowModal(true);
  };
  
  const handleCreateNew = () => {
    setEditingCourse(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCourse(null);
    fetchCourses();
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(filters.search.toLowerCase()) &&
    (filters.status === 'all' || course.status === filters.status)
  );

  return (
    <div className="min-h-screen bg-haut-dark text-white flex">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="bg-haut-surface rounded-lg p-6 mb-6 border border-haut-border">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Gestão de Cursos</h1>
              <p className="text-haut-muted mt-1">Crie e gerencie o conteúdo educacional da plataforma.</p>
            </div>
            <button onClick={handleCreateNew} className="px-5 py-2.5 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 flex items-center gap-2"><PlusCircle size={18}/> Novo Curso</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" placeholder="Buscar curso..." value={filters.search} onChange={(e) => setFilters({...filters, search: e.target.value})} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white" />
            <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} className="px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white"><option value="all">Todos Status</option><option value="draft">Rascunho</option><option value="published">Publicado</option><option value="archived">Arquivado</option></select>
          </div>
        </header>
        
        {loading ? <p>Carregando...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCardAdmin key={course.id} course={course} onEdit={handleEdit} />
            ))}
          </div>
        )}
        
        {showModal && <CourseFormModal course={editingCourse} onClose={handleCloseModal} />}
      </main>
    </div>
  );
};

export default CourseManagementPage;