import React from 'react';
import { UserSettings, Settings } from '../../../types';
import { Sun, Moon, Monitor, Columns, ChevronsRightLeft } from 'lucide-react';

type Props = {
    settings: UserSettings;
    onUpdate: (update: Partial<Settings>) => void;
};

const AppearanceSettings: React.FC<Props> = ({ settings, onUpdate }) => {
    
    const handleSettingChange = (key: keyof UserSettings, value: any) => {
        onUpdate({ userSettings: { ...settings, [key]: value } });
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <h2 className="text-xl font-bold text-white">Aparência</h2>
            
            <SettingItem title="Tema" description="Escolha como o workspace deve aparecer para você.">
                <div className="flex gap-2 p-1 bg-haut-dark rounded-lg border border-haut-border">
                    <ThemeOption icon={<Sun size={18}/>} label="Claro" value="light" activeValue={settings.theme} onClick={handleSettingChange}/>
                    <ThemeOption icon={<Moon size={18}/>} label="Escuro" value="dark" activeValue={settings.theme} onClick={handleSettingChange}/>
                    <ThemeOption icon={<Monitor size={18}/>} label="Sistema" value="system" activeValue={settings.theme} onClick={handleSettingChange}/>
                </div>
            </SettingItem>

            <SettingItem title="Densidade da Interface" description="Ajuste o espaçamento dos elementos para mais ou menos informação na tela.">
                 <div className="flex gap-2 p-1 bg-haut-dark rounded-lg border border-haut-border">
                    <ThemeOption icon={<Columns size={18}/>} label="Confortável" value="comfortable" activeValue={settings.density} onClick={handleSettingChange}/>
                    <ThemeOption icon={<ChevronsRightLeft size={18}/>} label="Compacto" value="compact" activeValue={settings.density} onClick={handleSettingChange}/>
                </div>
            </SettingItem>

            <SettingItem title="Animações" description="Ative ou desative animações e transições na interface.">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={settings.animations} onChange={(e) => handleSettingChange('animations', e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-haut-dark peer-focus:outline-none rounded-full peer border border-haut-border peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-haut-accent"></div>
                </label>
            </SettingItem>
        </div>
    );
};

const SettingItem: React.FC<{title: string, description: string, children: React.ReactNode}> = ({ title, description, children }) => (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 py-4 border-b border-haut-border last:border-b-0">
        <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-sm text-haut-muted">{description}</p>
        </div>
        <div>{children}</div>
    </div>
);

const ThemeOption: React.FC<{icon: React.ReactNode, label: string, value: string, activeValue: string, onClick: (key: any, value: any)=>void}> = ({icon, label, value, activeValue, onClick}) => (
    <button onClick={() => onClick(activeValue === 'light' || activeValue === 'dark' || activeValue === 'system' ? 'theme' : 'density', value)} className={`px-4 py-2 text-sm rounded-md flex items-center gap-2 transition ${activeValue === value ? 'bg-haut-accent text-haut-dark font-semibold' : 'text-haut-muted hover:bg-haut-border'}`}>
        {icon} {label}
    </button>
);


export default AppearanceSettings;