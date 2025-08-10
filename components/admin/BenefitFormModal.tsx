import React, { useState } from 'react';
import { Benefit } from '../../types';
import { createOrUpdateBenefit } from '../../services/api';
import { X, Info, Settings, Target, Key, Share2, Palette, Save } from 'lucide-react';

type Props = {
  benefit: Benefit | null;
  onClose: () => void;
};

const BenefitFormModal: React.FC<Props> = ({ benefit, onClose }) => {
  const [formData, setFormData] = useState<Partial<Benefit>>(benefit || { name: '', type: 'coupon', scope: 'any', status: 'draft', shareable: false });
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await createOrUpdateBenefit(formData);
    setLoading(false);
    onClose();
  };

  const tabs = [
    { id: 'basic', label: 'Dados', icon: <Info size={16}/> },
    { id: 'rules', label: 'Regras', icon: <Settings size={16}/> },
    { id: 'distribution', label: 'Distribuição', icon: <Target size={16}/> },
    { id: 'codes', label: 'Códigos', icon: <Key size={16}/> },
    { id: 'sharing', label: 'Compartilhamento', icon: <Share2 size={16}/> },
    { id: 'visual', label: 'Visual', icon: <Palette size={16}/> },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-haut-surface rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col border border-haut-border">
        <header className="px-6 py-4 flex justify-between items-center border-b border-haut-border"><h2 className="text-xl font-bold text-white">{benefit ? 'Editar Benefício' : 'Novo Benefício'}</h2><button onClick={onClose} className="text-haut-muted hover:text-white"><X size={24}/></button></header>
        <div className="border-b border-haut-border px-6"><div className="flex gap-4 -mb-px overflow-x-auto">{tabs.map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium whitespace-nowrap transition ${activeTab === tab.id ? 'border-haut-accent text-haut-accent' : 'border-transparent text-haut-muted hover:text-white'}`}>{tab.icon} {tab.label}</button>))}</div></div>
        
        <main className="p-6 overflow-y-auto flex-grow space-y-6">
          {activeTab === 'basic' && <p className="text-haut-muted">Formulário para 'Dados Básicos' em construção.</p>}
          {activeTab === 'rules' && <p className="text-haut-muted">Formulário para 'Regras' em construção.</p>}
          {activeTab === 'distribution' && <p className="text-haut-muted">Formulário para 'Distribuição' em construção.</p>}
          {activeTab === 'codes' && <p className="text-haut-muted">Formulário para 'Códigos' em construção.</p>}
          {activeTab === 'sharing' && <p className="text-haut-muted">Formulário para 'Compartilhamento' em construção.</p>}
          {activeTab === 'visual' && <p className="text-haut-muted">Formulário para 'Visual' em construção.</p>}
        </main>
        
        <footer className="px-6 py-4 flex justify-end gap-3 border-t border-haut-border">
          <button onClick={onClose} className="px-6 py-2 bg-haut-border text-white rounded-lg hover:bg-haut-border/70">Cancelar</button>
          <button onClick={handleSave} disabled={loading} className="px-6 py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 disabled:opacity-50 flex items-center gap-2"><Save size={16}/>{loading ? 'Salvando...' : 'Salvar Benefício'}</button>
        </footer>
      </div>
    </div>
  );
};

export default BenefitFormModal;