import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyProfile, updateMyProfile } from '../../services/api';
import { User } from '../../types';
import { Home, User as UserIcon, Calendar, Wrench, GraduationCap, Clapperboard, Store, Gift, MessageSquare, Users, Settings, Bell, LogOut, Edit, Eye, Save, Camera, Award } from 'lucide-react';
import PublicProfileView from './PublicProfileView';

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
            <nav className="flex-1 px-4 overflow-y-auto">{menuItems.map((item) => (<Link key={item.path} to={item.path} className="flex items-center gap-3 px-4 py-3 mb-1 text-haut-muted hover:bg-haut-border hover:text-white rounded-lg transition-colors">{item.icon}<span>{item.label}</span></Link>))}</nav>
            <div className="p-4 border-t border-haut-border"><button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-haut-muted hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"><LogOut size={20} /><span>Sair</span></button></div>
        </aside>
    );
};

const MyProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<Partial<User>>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');
    const [isPublicView, setIsPublicView] = useState(false);

    useEffect(() => {
        getMyProfile().then(data => {
            setUser(data.user);
            setFormData(data.user);
        });
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            const updatedUser = await updateMyProfile(formData);
            setUser(updatedUser.user);
            setFormData(updatedUser.user);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error("Error saving profile", error);
        } finally {
            setLoading(false);
        }
    };
    
    if (!user) {
        return <div className="min-h-screen bg-haut-dark flex items-center justify-center text-white">Carregando perfil...</div>
    }

    return (
        <div className="min-h-screen bg-haut-dark text-white flex">
            <UserSidebar />
            <main className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-white">Meu Perfil</h1>
                        <div className="flex gap-4">
                            <button onClick={() => setIsPublicView(!isPublicView)} className="flex items-center gap-2 px-4 py-2 bg-haut-border text-white rounded-lg hover:bg-haut-border/70 transition">
                                {isPublicView ? <><Edit size={16}/> Modo Edição</> : <><Eye size={16}/> Ver como Visitante</>}
                            </button>
                            {!isPublicView && <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 px-6 py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 disabled:opacity-50 transition"><Save size={16} />{loading ? 'Salvando...' : 'Salvar'}</button>}
                        </div>
                    </div>

                    {success && <div className="mb-4 p-4 bg-green-600/20 border border-green-500 text-green-300 rounded-lg">✅ Perfil atualizado com sucesso!</div>}

                    {isPublicView ? <PublicProfileView user={user} /> : (
                        <div className="bg-haut-surface rounded-lg overflow-hidden border border-haut-border">
                            <div className="relative h-48 bg-haut-dark">
                                {formData.banner_url && <img src={formData.banner_url} alt="Banner" className="w-full h-full object-cover" />}
                                <label className="absolute top-4 right-4 p-2 bg-black/50 rounded-full cursor-pointer hover:bg-black/70"><Camera size={18}/><input type="file" className="hidden"/></label>
                            </div>
                            <div className="relative">
                               <div className="absolute left-6 -top-16">
                                    <div className="relative">
                                        <img src={formData.avatar_url} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-haut-surface object-cover bg-haut-dark" />
                                        <label className="absolute bottom-1 right-1 p-2 bg-haut-accent text-haut-dark rounded-full cursor-pointer hover:brightness-90"><Camera size={16} /><input type="file" className="hidden" /></label>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-20 px-6">
                                <h2 className="text-2xl font-bold text-white">{formData.full_name}</h2>
                                <p className="text-haut-muted">{formData.business_name}</p>
                            </div>

                            <div className="px-6 mt-4 border-b border-haut-border">
                               <div className="flex gap-6">
                                    <TabButton label="Pessoal" isActive={activeTab === 'personal'} onClick={() => setActiveTab('personal')} />
                                    <TabButton label="Profissional" isActive={activeTab === 'professional'} onClick={() => setActiveTab('professional')} />
                                    <TabButton label="Privacidade" isActive={activeTab === 'privacy'} onClick={() => setActiveTab('privacy')} />
                                </div>
                            </div>
                            
                            <div className="p-6">
                                {activeTab === 'personal' && <PersonalForm formData={formData} setFormData={setFormData} />}
                                {activeTab === 'professional' && <ProfessionalForm formData={formData} setFormData={setFormData} />}
                                {activeTab === 'privacy' && <PrivacyForm formData={formData} setFormData={setFormData} />}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const TabButton: React.FC<{label: string, isActive: boolean, onClick: () => void}> = ({label, isActive, onClick}) => (
    <button onClick={onClick} className={`py-3 px-1 border-b-2 font-medium transition ${isActive ? 'border-haut-accent text-haut-accent' : 'border-transparent text-haut-muted hover:text-white'}`}>{label}</button>
)

const FormInput: React.FC<{label:string, name:string, value:string, onChange: any, type?:string, disabled?:boolean}> = ({label, name, value, onChange, type="text", disabled=false}) => (
    <div>
        <label className="block text-sm font-medium text-haut-muted mb-2">{label}</label>
        <input type={type} name={name} value={value || ''} onChange={onChange} disabled={disabled} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent disabled:opacity-50"/>
    </div>
);

const PersonalForm: React.FC<{formData: Partial<User>, setFormData: any}> = ({formData, setFormData}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name]: e.target.value});
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            <FormInput label="Nome Completo" name="full_name" value={formData.full_name!} onChange={handleChange} />
            <FormInput label="E-mail" name="email" value={formData.email!} onChange={handleChange} disabled={true}/>
            <FormInput label="Telefone" name="phone" value={formData.phone!} onChange={handleChange} />
            <FormInput label="Endereço" name="address" value={formData.address!} onChange={handleChange} />
        </div>
    );
};

const ProfessionalForm: React.FC<{formData: Partial<User>, setFormData: any}> = ({formData, setFormData}) => {
     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({...formData, [e.target.name]: e.target.value});
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Nome do Negócio" name="business_name" value={formData.business_name!} onChange={handleChange} />
                <FormInput label="Categoria" name="business_category" value={formData.business_category!} onChange={handleChange} />
            </div>
             <div>
                <label className="block text-sm font-medium text-haut-muted mb-2">Biografia</label>
                <textarea name="bio" value={formData.bio || ''} onChange={handleChange} rows={4} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent" />
            </div>
            <div className="space-y-4">
                <FormInput label="Instagram URL" name="instagram_url" value={formData.instagram_url!} onChange={handleChange} />
                <FormInput label="LinkedIn URL" name="linkedin_url" value={formData.linkedin_url!} onChange={handleChange} />
                <FormInput label="Website URL" name="website_url" value={formData.website_url!} onChange={handleChange} />
            </div>
        </div>
    );
};

const PrivacyForm: React.FC<{formData: Partial<User>, setFormData: any}> = ({formData, setFormData}) => {
    const handleToggle = (name: keyof User) => setFormData({...formData, [name]: !formData[name]});
    const privacyOptions: {key: keyof User, label: string}[] = [
        { key: 'show_email', label: 'Exibir E-mail no perfil público' },
        { key: 'show_phone', label: 'Exibir Telefone no perfil público' },
        { key: 'show_business', label: 'Exibir detalhes do negócio publicamente' },
        { key: 'show_social', label: 'Exibir redes sociais publicamente' },
    ];
    return (
        <div className="space-y-4 animate-fadeIn">
            {privacyOptions.map(opt => (
                 <label key={String(opt.key)} className="flex items-center justify-between p-4 bg-haut-dark rounded-lg border border-haut-border">
                    <span className="text-white">{opt.label}</span>
                    <input type="checkbox" checked={!!formData[opt.key]} onChange={() => handleToggle(opt.key)} className="w-5 h-5 rounded bg-haut-border border-haut-border text-haut-accent focus:ring-haut-accent" />
                </label>
            ))}
        </div>
    );
}

export default MyProfilePage;