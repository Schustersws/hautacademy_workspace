import React, { useState } from 'react';
import { NotificationPreferences, Settings } from '../../../types';
import { ChevronDown, Mail, BellRing } from 'lucide-react';

type Props = {
    preferences: NotificationPreferences;
    onUpdate: (update: Partial<Settings>) => void;
};

const NotificationSettings: React.FC<Props> = ({ preferences, onUpdate }) => {

    const handleChannelChange = (channel: 'email' | 'push', value: boolean) => {
        const updatedPrefs = { ...preferences, channels: { ...preferences.channels, [channel]: value } };
        onUpdate({ notificationPreferences: updatedPrefs });
    };
    
    const handleCategoryChange = (category: keyof NotificationPreferences['categories'], key: string, value: boolean) => {
        const updatedCategory = { ...preferences.categories[category], [key]: value };
        const updatedPrefs = { ...preferences, categories: { ...preferences.categories, [category]: updatedCategory } };
        onUpdate({ notificationPreferences: updatedPrefs });
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <h2 className="text-xl font-bold text-white">Notificações</h2>

            <div className="p-6 bg-haut-dark/50 rounded-lg border border-haut-border">
                <h3 className="font-semibold text-white mb-4">Canais de Notificação</h3>
                <div className="space-y-4">
                    <ToggleItem icon={<Mail size={20}/>} label="E-mail" description="Receba e-mails importantes sobre sua conta e atividades." enabled={preferences.channels.email} onToggle={(val) => handleChannelChange('email', val)}/>
                    <ToggleItem icon={<BellRing size={20}/>} label="Push Notifications" description="Receba notificações diretamente no seu navegador." enabled={preferences.channels.push} onToggle={(val) => handleChannelChange('push', val)}/>
                </div>
            </div>

            <div className="space-y-4">
                <Accordion title="Eventos">
                    <CheckboxItem label="Um novo evento para você for publicado" checked={preferences.categories.events.new_event} onChange={v => handleCategoryChange('events', 'new_event', v)} />
                    <CheckboxItem label="Lembretes de eventos que você se inscreveu" checked={preferences.categories.events.event_reminder} onChange={v => handleCategoryChange('events', 'event_reminder', v)} />
                </Accordion>
                <Accordion title="Cursos">
                    <CheckboxItem label="Um novo curso para você for publicado" checked={preferences.categories.courses.new_course} onChange={v => handleCategoryChange('courses', 'new_course', v)} />
                    <CheckboxItem label="Marcos de progresso e certificados" checked={preferences.categories.courses.progress_milestone} onChange={v => handleCategoryChange('courses', 'progress_milestone', v)} />
                </Accordion>
                 <Accordion title="Loja e Benefícios">
                    <CheckboxItem label="Novos produtos na loja de parceiros" checked={preferences.categories.store.new_product} onChange={v => handleCategoryChange('store', 'new_product', v)} />
                    <CheckboxItem label="Atualizações sobre seus pedidos" checked={preferences.categories.store.order_status} onChange={v => handleCategoryChange('store', 'order_status', v)} />
                    <CheckboxItem label="Novos benefícios disponíveis" checked={preferences.categories.benefits.new_benefit} onChange={v => handleCategoryChange('benefits', 'new_benefit', v)} />
                 </Accordion>
                  <Accordion title="Sistema">
                    <CheckboxItem label="Alertas importantes de segurança" checked={preferences.categories.system.security_alerts} onChange={v => handleCategoryChange('system', 'security_alerts', v)} />
                    <CheckboxItem label="Newsletter e novidades" checked={preferences.categories.system.newsletters} onChange={v => handleCategoryChange('system', 'newsletters', v)} />
                 </Accordion>
            </div>
        </div>
    );
};

const ToggleItem: React.FC<{icon: React.ReactNode, label:string, description: string, enabled: boolean, onToggle: (val:boolean)=>void}> = ({icon, label, description, enabled, onToggle}) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="text-haut-accent">{icon}</div>
            <div>
                <p className="font-semibold text-white">{label}</p>
                <p className="text-sm text-haut-muted">{description}</p>
            </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={enabled} onChange={(e) => onToggle(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-haut-dark peer-focus:outline-none rounded-full peer border border-haut-border peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-haut-accent"></div>
        </label>
    </div>
);

const Accordion: React.FC<{title:string, children: React.ReactNode}> = ({title, children}) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="bg-haut-dark/50 rounded-lg border border-haut-border">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4">
                <h3 className="font-semibold text-white">{title}</h3>
                <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-4 border-t border-haut-border space-y-3">
                    {children}
                </div>
            )}
        </div>
    );
};

const CheckboxItem: React.FC<{label: string, checked: boolean, onChange: (val: boolean)=>void}> = ({label, checked, onChange}) => (
     <label className="flex items-center gap-3">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="w-5 h-5 rounded bg-haut-dark border-haut-border text-haut-accent focus:ring-haut-accent" />
        <span className="text-haut-muted">{label}</span>
    </label>
);

export default NotificationSettings;