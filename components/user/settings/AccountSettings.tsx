import React from 'react';
import { Download, Trash2, AlertTriangle } from 'lucide-react';

const AccountSettings: React.FC = () => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <h2 className="text-xl font-bold text-white">Gerenciamento da Conta</h2>

            <div className="p-6 bg-haut-dark/50 rounded-lg border border-haut-border">
                <h3 className="font-semibold text-white mb-2">Exportar meus dados</h3>
                <p className="text-sm text-haut-muted mb-4">Faça o download de todas as suas informações pessoais e atividades na plataforma em um arquivo JSON.</p>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                    <Download size={18}/> Exportar Dados
                </button>
            </div>
            
             <div className="p-6 bg-red-600/10 rounded-lg border border-red-500/30">
                <h3 className="font-semibold text-red-400 mb-2 flex items-center gap-2"><AlertTriangle/> Excluir Conta</h3>
                <p className="text-sm text-red-400/80 mb-4">Esta ação é irreversível. Todos os seus dados, certificados e progresso serão permanentemente apagados. Esta ação não pode ser desfeita.</p>
                <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">
                    <Trash2 size={18} className="inline mr-2"/> Excluir minha conta
                </button>
            </div>

        </div>
    );
};

export default AccountSettings;