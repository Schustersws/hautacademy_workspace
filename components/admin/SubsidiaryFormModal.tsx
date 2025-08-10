import React, { useState } from 'react';
import { Subsidiary } from '../../types';
import { createOrUpdateSubsidiary } from '../../services/api';
import { X, Save } from 'lucide-react';

type Props = {
  subsidiary: Subsidiary | null;
  onClose: () => void;
};

const SubsidiaryFormModal: React.FC<Props> = ({ subsidiary, onClose }) => {
  const [formData, setFormData] = useState<Partial<Subsidiary>>(subsidiary || { 
      name: '', slug: '', logo_url: '', brand_color: '#FFD11A', accent_color: '#0F0F0F', is_active: true 
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = async () => {
    setLoading(true);
    await createOrUpdateSubsidiary(formData);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-haut-surface rounded-lg w-full max-w-lg flex flex-col border border-haut-border">
        <header className="px-6 py-4 flex justify-between items-center border-b border-haut-border">
          <h2 className="text-xl font-bold text-white">{subsidiary ? 'Editar Subsidiária' : 'Nova Subsidiária'}</h2>
          <button onClick={onClose} className="text-haut-muted hover:text-white"><X size={24}/></button>
        </header>
        
        <main className="p-6 space-y-4">
          <FormInput label="Nome da Marca *" name="name" value={formData.name} onChange={handleChange} />
          <FormInput label="Slug (URL)" name="slug" value={formData.slug} onChange={handleChange} />
          <FormInput label="URL do Logo" name="logo_url" value={formData.logo_url} onChange={handleChange} />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Cor da Marca" name="brand_color" type="color" value={formData.brand_color} onChange={handleChange} />
            <FormInput label="Cor de Destaque" name="accent_color" type="color" value={formData.accent_color} onChange={handleChange} />
          </div>
          <label className="flex items-center gap-3 p-3 bg-haut-dark border border-haut-border rounded-lg">
            <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} className="w-5 h-5 rounded bg-haut-border border-haut-border text-haut-accent"/>
            <span className="text-white">Marca Ativa</span>
          </label>
        </main>

        <footer className="px-6 py-4 flex justify-end gap-3 border-t border-haut-border">
          <button onClick={onClose} className="px-6 py-2 bg-haut-border text-white rounded-lg hover:bg-haut-border/70">Cancelar</button>
          <button onClick={handleSave} disabled={loading} className="px-6 py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 disabled:opacity-50 flex items-center gap-2">
            <Save size={16}/>{loading ? 'Salvando...' : 'Salvar'}
          </button>
        </footer>
      </div>
    </div>
  );
};

const FormInput: React.FC<any> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-haut-muted mb-2">{label}</label>
        <input {...props} className={`w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white ${props.type === 'color' ? 'p-1 h-10' : ''}`} />
    </div>
);

export default SubsidiaryFormModal;
