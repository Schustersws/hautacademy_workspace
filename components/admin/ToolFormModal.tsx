import React, { useState } from 'react';
import { Tool, ToolCategory } from '../../types';
import { createOrUpdateTool } from '../../services/api';
import { X, Info, Image as ImageIcon, Link2, Download, Code, Video, Bot, Eye, Lock, CheckSquare, Rocket, Save } from 'lucide-react';

type Props = {
  tool: Tool | null;
  categories: ToolCategory[];
  onClose: () => void;
};

const ToolFormModal: React.FC<Props> = ({ tool, categories, onClose }) => {
  const [formData, setFormData] = useState<Partial<Tool>>(tool || { 
      name: '', slug: '', short_description: '', description_html: '',
      category_id: '', type: 'link', status: 'draft', visibility_mode: 'public',
      requires_ack: false,
  });
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
     // @ts-ignore
    const val = isCheckbox ? e.target.checked : value;
    setFormData(p => ({ ...p, [name]: val }));
  };

  const handleSave = async () => {
    setLoading(true);
    await createOrUpdateTool(formData);
    setLoading(false);
    onClose();
  };

  const tabs = [
    { id: 'basic', label: 'Básico', icon: <Info size={16}/> },
    { id: 'content', label: 'Conteúdo', icon: <ImageIcon size={16}/> },
    { id: 'access', label: 'Acesso', icon: <Lock size={16}/> },
    { id: 'terms', label: 'Termos', icon: <CheckSquare size={16}/> },
    { id: 'publish', label: 'Publicação', icon: <Rocket size={16}/> },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-haut-surface rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col border border-haut-border">
        <header className="px-6 py-4 flex justify-between items-center border-b border-haut-border"><h2 className="text-xl font-bold text-white">{tool ? 'Editar Ferramenta' : 'Nova Ferramenta'}</h2><button onClick={onClose} className="text-haut-muted hover:text-white"><X size={24}/></button></header>
        <div className="border-b border-haut-border px-6"><div className="flex gap-4 -mb-px overflow-x-auto">{tabs.map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium whitespace-nowrap transition ${activeTab === tab.id ? 'border-haut-accent text-haut-accent' : 'border-transparent text-haut-muted hover:text-white'}`}>{tab.icon} {tab.label}</button>))}</div></div>
        
        <main className="p-6 overflow-y-auto flex-grow space-y-6">
          {activeTab === 'basic' && <>
            <FormInput label="Nome da Ferramenta *" name="name" value={formData.name} onChange={handleChange} />
            <FormInput label="Descrição Curta" name="short_description" value={formData.short_description} onChange={handleChange} />
            <div className="grid md:grid-cols-2 gap-4">
              <FormSelect label="Categoria" name="category_id" value={formData.category_id} onChange={handleChange} options={categories.map(c=>({value:c.id, label:c.name}))} placeholder="Selecione..."/>
              <FormSelect label="Tipo" name="type" value={formData.type} onChange={handleChange} options={[{value: 'link', label: 'Link Externo'}, {value: 'download', label: 'Download'}, {value: 'html_embed', label: 'HTML Embed'}, {value: 'video', label: 'Vídeo'}, {value: 'automation', label: 'Automação'}]} placeholder="Selecione..." />
            </div>
            <FormTextarea label="Descrição Detalhada (HTML)" name="description_html" value={formData.description_html} onChange={handleChange} rows={6} />
          </>}
          {activeTab === 'content' && <>
            <FormInput label="URL do Banner" name="banner_url" value={formData.banner_url} onChange={handleChange} placeholder="https://..."/>
            {formData.type === 'link' && <FormInput label="URL Externa *" name="external_url" value={formData.external_url} onChange={handleChange}/>}
            {formData.type === 'download' && <FormInput label="URL do Arquivo *" name="download_url" value={formData.download_url} onChange={handleChange}/>}
            {formData.type === 'html_embed' && <FormInput label="URL do Embed *" name="embed_url" value={formData.embed_url} onChange={handleChange}/>}
            {formData.type === 'video' && <FormInput label="URL do Vídeo *" name="video_url" value={formData.video_url} onChange={handleChange}/>}
          </>}
          {activeTab === 'access' && <>
            <FormSelect label="Visibilidade" name="visibility_mode" value={formData.visibility_mode} onChange={handleChange} options={[{value:'public', label:'Público'}, {value:'segmented', label:'Segmentado'}]} placeholder="Selecione..." />
            {/* Segment selector would be here */}
          </>}
          {activeTab === 'terms' && <>
            <FormCheckbox label="Requer concordância com termos" name="requires_ack" checked={formData.requires_ack} onChange={handleChange} />
            {formData.requires_ack && <FormTextarea label="Termos de Uso (HTML)" name="terms_html" value={formData.terms_html} onChange={handleChange} rows={6} />}
          </>}
          {activeTab === 'publish' && <>
            <FormSelect label="Status" name="status" value={formData.status} onChange={handleChange} options={[{value:'draft', label:'Rascunho'}, {value:'active', label:'Ativo'}, {value:'archived', label:'Arquivado'}]} placeholder="Selecione..." />
          </>}
        </main>

        <footer className="px-6 py-4 flex justify-end gap-3 border-t border-haut-border">
          <button onClick={onClose} className="px-6 py-2 bg-haut-border text-white rounded-lg hover:bg-haut-border/70">Cancelar</button>
          <button onClick={handleSave} disabled={loading} className="px-6 py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 disabled:opacity-50 flex items-center gap-2"><Save size={16}/>{loading ? 'Salvando...' : 'Salvar Ferramenta'}</button>
        </footer>
      </div>
    </div>
  );
};

// Form Helper Components
const FormInput: React.FC<any> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-haut-muted mb-2">{label}</label>
        <input {...props} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent" />
    </div>
);

const FormTextarea: React.FC<any> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-haut-muted mb-2">{label}</label>
        <textarea {...props} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent" />
    </div>
);

const FormSelect: React.FC<any> = ({ label, options, placeholder, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-haut-muted mb-2">{label}</label>
        <select {...props} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white appearance-none focus:outline-none focus:border-haut-accent">
            <option value="">{placeholder}</option>
            {options.map((opt:any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);

const FormCheckbox: React.FC<any> = ({ label, ...props }) => (
    <label className="flex items-center gap-3 p-3 bg-haut-dark border border-haut-border rounded-lg">
        <input type="checkbox" {...props} className="w-5 h-5 rounded bg-haut-border border-haut-border text-haut-accent focus:ring-haut-accent" />
        <span className="text-white">{label}</span>
    </label>
);

export default ToolFormModal;
