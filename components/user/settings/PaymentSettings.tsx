import React from 'react';
import { CreditCard, PlusCircle } from 'lucide-react';

const PaymentSettings: React.FC = () => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <h2 className="text-xl font-bold text-white">Métodos de Pagamento</h2>
            
            <div className="p-6 bg-haut-dark/50 rounded-lg border border-haut-border">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-white">Cartões Salvos</h3>
                    <button className="flex items-center gap-2 px-4 py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90">
                        <PlusCircle size={18}/> Adicionar Cartão
                    </button>
                </div>
                
                 <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-haut-dark rounded-lg border border-haut-border">
                        <div className="flex items-center gap-4">
                            <CreditCard />
                            <div>
                                <p className="font-semibold text-white">Visa •••• 1234</p>
                                <p className="text-sm text-haut-muted">Expira em 12/2025</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                             <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Padrão</span>
                             <button className="text-sm text-haut-muted hover:text-red-400">Remover</button>
                        </div>
                    </div>
                 </div>
            </div>

            <div className="text-center p-8 bg-haut-dark/30 rounded-lg border-2 border-dashed border-haut-border">
                <p className="text-haut-muted">
                    A funcionalidade completa de gerenciamento de pagamentos está em desenvolvimento.
                </p>
            </div>
        </div>
    );
};

export default PaymentSettings;