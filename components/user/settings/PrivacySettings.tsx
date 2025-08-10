import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PrivacySettings: React.FC = () => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <h2 className="text-xl font-bold text-white">Privacidade</h2>
            
            <SettingItem title="Visibilidade do Perfil" description="Controle quem pode ver seu perfil detalhado na plataforma.">
                 <div className="flex gap-2 p-1 bg-haut-dark rounded-lg border border-haut-border">
                    <OptionButton icon={<Eye size={18}/>} label="Público" value="public" activeValue={"public"} onClick={()=>{}}/>
                    <OptionButton icon={<EyeOff size={18}/>} label="Privado" value="private" activeValue={"public"} onClick={()=>{}}/>
                </div>
            </SettingItem>

             <ToggleItem title="Mostrar Status Online" description="Permita que outros usuários vejam quando você está online." enabled={true} />
             <ToggleItem title="Permitir Mensagens" description="Permitir que outros parceiros iniciem uma conversa com você." enabled={true} />
             <ToggleItem title="Atividade de Cursos" description="Compartilhar seu progresso e conclusão de cursos no seu perfil." enabled={false} />
            
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

const OptionButton: React.FC<{icon: React.ReactNode, label: string, value: string, activeValue: string, onClick: (value: any)=>void}> = ({icon, label, value, activeValue, onClick}) => (
    <button onClick={() => onClick(value)} className={`px-4 py-2 text-sm rounded-md flex items-center gap-2 transition ${activeValue === value ? 'bg-haut-accent text-haut-dark font-semibold' : 'text-haut-muted hover:bg-haut-border'}`}>
        {icon} {label}
    </button>
);

const ToggleItem: React.FC<{title: string, description: string, enabled: boolean }> = ({ title, description, enabled }) => (
     <div className="flex justify-between items-center gap-4 py-4 border-b border-haut-border last:border-b-0">
        <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-sm text-haut-muted">{description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked={enabled} className="sr-only peer" />
            <div className="w-11 h-6 bg-haut-dark peer-focus:outline-none rounded-full peer border border-haut-border peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-haut-accent"></div>
        </label>
    </div>
)

export default PrivacySettings;