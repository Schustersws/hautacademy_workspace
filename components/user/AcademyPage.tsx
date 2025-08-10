import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Course } from '../../types';
import { getUserCourses } from '../../services/api';
import { Home, User as UserIcon, Calendar, Wrench, GraduationCap, Settings, LogOut, Award, Search, Clapperboard, Store, Gift } from 'lucide-react';
import CourseCardUser from './CourseCardUser';

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

const AcademyPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({ search: '' });

  useEffect(() => {
    getUserCourses().then(data => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  const getFilteredCourses = () => {
    let filtered = courses.filter(c => c.title.toLowerCase().includes(filters.search.toLowerCase()));
    if (activeTab === 'in-progress') return filtered.filter(c => c.enrollment && c.enrollment.status === 'active');
    if (activeTab === 'completed') return filtered.filter(c => c.enrollment && c.enrollment.status === 'completed');
    return filtered;
  };
  
  const filteredCourses = getFilteredCourses();

  return (
    <div className="min-h-screen bg-haut-dark text-white flex">
      <UserSidebar />
      <main className="flex-1">
        <header className="bg-haut-surface border-b border-haut-border px-6 py-8">
          <h1 className="text-3xl font-bold text-white mb-2">Academia Haut</h1>
          <p className="text-haut-muted">Desenvolva suas habilidades com nossos cursos exclusivos.</p>
        </header>

        <div className="p-6">
          <div className="bg-haut-surface rounded-lg p-4 mb-6 border border-haut-border flex items-center gap-4">
              <div className="relative flex-grow"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-haut-muted" size={20}/><input type="text" placeholder="Buscar cursos..." value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} className="w-full pl-10 pr-4 py-2 bg-haut-dark border border-haut-border rounded-lg" /></div>
              <div className="flex gap-1 bg-haut-dark p-1 rounded-lg border border-haut-border">
                <TabButton label="Todos" isActive={activeTab === 'all'} onClick={() => setActiveTab('all')} />
                <TabButton label="Em Andamento" isActive={activeTab === 'in-progress'} onClick={() => setActiveTab('in-progress')} />
                <TabButton label="Concluídos" isActive={activeTab === 'completed'} onClick={() => setActiveTab('completed')} />
              </div>
          </div>
          
          {loading ? <p>Carregando...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map(course => <CourseCardUser key={course.id} course={course} />)}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const TabButton: React.FC<{label:string, isActive:boolean, onClick:()=>void}> = ({label, isActive, onClick}) => (
    <button onClick={onClick} className={`px-4 py-1.5 text-sm rounded-md transition ${isActive ? 'bg-haut-accent text-haut-dark font-semibold' : 'text-haut-muted hover:bg-haut-border'}`}>{label}</button>
);


export default AcademyPage;