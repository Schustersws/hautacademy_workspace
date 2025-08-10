import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, Palette, Shield, CreditCard, Bell, Lock, User as UserIcon, Home, Calendar, Wrench, GraduationCap, Clapperboard, Store, Gift, Award, LogOut } from 'lucide-react';

import { getUserSettings, updateUserSettings } from '../../services/api';
import { Settings as SettingsType } from '../../types';

import AppearanceSettings from './settings/AppearanceSettings';
import SecuritySettings from './settings/SecuritySettings';
import PaymentSettings from './settings/PaymentSettings';
import NotificationSettings from './settings/NotificationSettings';
import AccountSettings from './settings/AccountSettings';
import PrivacySettings from './settings/PrivacySettings';


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
    { icon: <SettingsIcon size={20} />, label: 'Configurações', path: '/settings' }
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


const settingsTabs = [
    { id: 'appearance', label: 'Aparência', icon: <Palette size={20} /> },
    { id: 'security', label: 'Segurança', icon: <Shield size={20} /> },
    { id: 'payments', label: 'Pagamentos', icon: <CreditCard size={20} /> },
    { id: 'notifications', label: 'Notificações', icon: <Bell size={20} /> },
    { id: 'privacy', label: 'Privacidade', icon: <Lock size={20} /> },
    { id: 'account', label: 'Conta', icon: <UserIcon size={20} /> },
];

const UserSettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('appearance');
    const [settings, setSettings] = useState<SettingsType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserSettings().then(data => {
            setSettings(data);
            setLoading(false);
        });
    }, []);

    const handleUpdate = async (newSettings: Partial<SettingsType>) => {
        if (!settings) return;
        const updated = await updateUserSettings(newSettings);
        setSettings(updated);
    };

    const renderContent = () => {
        if (loading || !settings) {
            return <div>Carregando configurações...</div>;
        }

        switch (activeTab) {
            case 'appearance':
                return <AppearanceSettings settings={settings.userSettings} onUpdate={handleUpdate} />;
            case 'security':
                return <SecuritySettings activeSessions={settings.activeSessions} onUpdate={handleUpdate} />;
            case 'payments':
                return <PaymentSettings />;
            case 'notifications':
                return <NotificationSettings preferences={settings.notificationPreferences} onUpdate={handleUpdate} />;
             case 'privacy':
                return <PrivacySettings />;
            case 'account':
                return <AccountSettings />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-haut-dark text-white flex">
            <UserSidebar />
            <main className="flex-1 p-6 overflow-y-auto">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-white">Configurações</h1>
                    <p className="text-haut-muted mt-1">Gerencie suas preferências e segurança da conta.</p>
                </header>
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="md:w-1/4 lg:w-1/5">
                        <nav className="space-y-2">
                            {settingsTabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${activeTab === tab.id ? 'bg-haut-accent/10 text-haut-accent font-semibold' : 'text-haut-muted hover:bg-haut-border hover:text-white'}`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </aside>
                    <div className="flex-1 bg-haut-surface rounded-lg border border-haut-border p-6">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserSettingsPage;