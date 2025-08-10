
import React, { useState } from 'react';
import { Title } from '../../types';
import { createOrUpdateTitle } from '../../services/api';
import { X, Info, Palette, Settings, Gift } from 'lucide-react';
import { TitleIcon } from '../helpers/TitleIcon';

type Props = {
  title: Title | null;
  onClose: () => void;
};

const iconOptions = ['crown', 'medal', 'award', 'star', 'certificate', 'shield', 'gem', 'trophy', 'badge', 'ribbon', 'sparkles', 'stethoscope', 'rocket', 'trending-up'];

const TitleFormModal: React.FC<Props> = ({ title, onClose }) => {
  const [formData, setFormData] = useState<Partial<Title>>({
    name: '', slug: '', description: '', short_description: '',
    category: 'partnership', color: '#FFD11A', background_color: '#37300a',
    icon_key: 'award', priority: 100, is_active: true, is_visible: true,
    ...title
  });
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await createOrUpdateTitle(formData);
    setLoading(false);
    onClose();
  };

  const tabs = [
    { id: 'basic', label: 'Informações', icon: <Info size={16}/> },
    { id: 'visual', label: 'Aparência', icon: <Palette size={16}/> },
    { id: 'rules', label: 'Regras', icon: <Settings size={16}/> },
    { id: 'benefits', label: 'Benefícios', icon: <Gift size={16}/> },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-haut-surface rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col border border-haut-border">
        <header className="px-6 py-4 flex justify-between items-center border-b border-haut-border">
          <h2 className="text-xl font-bold text-white">{title ? 'Editar Título' : 'Novo Título'}</h2>
          <button onClick={onClose} className="text-haut-muted hover:text-white"><X size={24} /></button>
        </header>
        
        <div className="border-b border-haut-border px-6">
            <div className="flex gap-4 -mb-px">
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium transition ${activeTab === tab.id ? 'border-haut-accent text-haut-accent' : 'border-transparent text-haut-muted hover:text-white'}`}>{tab.icon} {tab.label}</button>
                ))}
            </div>
        </div>

        <main className="p-6 overflow-y-auto flex-grow">
          {activeTab === 'basic' && (
            <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <FormInput label="Nome do Título *" name="name" value={formData.name} onChange={setFormData} />
                    <FormInput label="Slug (URL)" name="slug" value={formData.slug} onChange={setFormData} />
                </div>
                 <div className="grid md:grid-cols-2 gap-4">
                    <FormSelect label="Categoria" name="category" value={formData.category} onChange={setFormData} options={['partnership', 'achievement', 'certification', 'special']} />
                    <FormInput label="Prioridade" name="priority" type="number" value={formData.priority} onChange={setFormData} />
                </div>
                <FormTextarea label="Descrição Completa" name="description" value={formData.description} onChange={setFormData} rows={4} />
            </div>
          )}
          {activeTab === 'visual' && (
             <div className="space-y-6">
                <div className="bg-haut-dark p-6 rounded-lg border border-haut-border">
                  <h3 className="text-white font-semibold mb-4">Preview</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg" style={{ backgroundColor: formData.background_color || formData.color + '20', color: formData.color, border: `2px solid ${formData.color}`}}>
                        <TitleIcon iconKey={formData.icon_key} />
                    </div>
                    <div className="px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: formData.color + '20', color: formData.color, border: `1px solid ${formData.color}`}}>{formData.name || 'Título'}</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <FormColorInput label="Cor Principal" name="color" value={formData.color} onChange={setFormData} />
                    <FormColorInput label="Cor de Fundo" name="background_color" value={formData.background_color} onChange={setFormData} />
                </div>
                 <FormSelect label="Ícone" name="icon_key" value={formData.icon_key} onChange={setFormData} options={iconOptions} />
            </div>
          )}
          {activeTab === 'rules' && (
              <div className="space-y-4">
                  <FormCheckbox label="Requer aprovação do admin" name="requires_approval" checked={formData.requires_approval} onChange={setFormData} />
                  <FormCheckbox label="Visível no perfil público" name="is_visible" checked={formData.is_visible} onChange={setFormData} />
                  <FormInput label="Expira após (dias)" name="expires_after_days" type="number" placeholder="Deixe em branco para permanente" value={formData.expires_after_days} onChange={setFormData} />
              </div>
          )}
        </main>

        <footer className="px-6 py-4 flex justify-end gap-3 border-t border-haut-border">
          <button onClick={onClose} className="px-6 py-2 bg-haut-border text-white rounded-lg hover:bg-haut-border/70">Cancelar</button>
          <button onClick={handleSave} disabled={loading} className="px-6 py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 disabled:opacity-50">{loading ? 'Salvando...' : 'Salvar'}</button>
        </footer>
      </div>
    </div>
  );
};

// Form Helper Components
const FormInput: React.FC<any> = ({ label, name, value, onChange, ...props }) => (<div><label className="block text-sm font-medium text-haut-muted mb-2">{label}</label><input name={name} value={value || ''} onChange={(e) => onChange(p => ({...p, [name]: e.target.value}))} {...props} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white" /></div>);
const FormTextarea: React.FC<any> = ({ label, name, value, onChange, ...props }) => (<div><label className="block text-sm font-medium text-haut-muted mb-2">{label}</label><textarea name={name} value={value || ''} onChange={(e) => onChange(p => ({...p, [name]: e.target.value}))} {...props} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white" /></div>);
const FormSelect: React.FC<any> = ({ label, name, value, options, onChange, ...props }) => (<div><label className="block text-sm font-medium text-haut-muted mb-2">{label}</label><select name={name} value={value || ''} onChange={(e) => onChange(p => ({...p, [name]: e.target.value}))} {...props} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white appearance-none capitalize">{options.map((o:string) => <option key={o} value={o} className="capitalize">{o}</option>)}</select></div>);
const FormColorInput: React.FC<any> = ({ label, name, value, onChange }) => (<div><label className="block text-sm font-medium text-haut-muted mb-2">{label}</label><div className="flex gap-2"><input type="color" value={value || '#000000'} onChange={(e) => onChange(p => ({...p, [name]: e.target.value}))} className="w-12 h-10 p-1 bg-haut-dark border border-haut-border rounded-md cursor-pointer" /><input type="text" value={value || ''} onChange={(e) => onChange(p => ({...p, [name]: e.target.value}))} className="flex-1 px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white"/></div></div>);
const FormCheckbox: React.FC<any> = ({ label, name, checked, onChange }) => (<label className="flex items-center gap-3 p-3 bg-haut-dark border border-haut-border rounded-lg"><input type="checkbox" name={name} checked={!!checked} onChange={(e) => onChange(p => ({...p, [name]: e.target.checked}))} className="w-5 h-5 rounded bg-haut-border border-haut-border text-haut-accent focus:ring-haut-accent" /><span className="text-white">{label}</span></label>);


export default TitleFormModal;
