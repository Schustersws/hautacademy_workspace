import React, { useState } from 'react';
import { Product, ProductCategory } from '../../types';
import { createOrUpdateProduct } from '../../services/api';
import { X, Info, Image as ImageIcon, DollarSign, Eye, MessageCircle, Clock, Save } from 'lucide-react';
import CountdownTimer from '../common/CountdownTimer';

type Props = {
  product: Product | null;
  categories: ProductCategory[];
  onClose: () => void;
};

const ProductFormModal: React.FC<Props> = ({ product, categories, onClose }) => {
  const [formData, setFormData] = useState<Partial<Product>>(product || { name: '', status: 'draft', price_cents: 0, inventory_qty: 0, visibility_mode: 'public', is_prelaunch: false, prelaunch_countdown: false, hide_when_unavailable: true, whatsapp_template: 'Olá! Tenho interesse no produto {{nome_produto}}. Poderia me passar mais informações?' });
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    // @ts-ignore
    const val = isCheckbox ? e.target.checked : (type === 'number' ? parseInt(value) || 0 : value);
    setFormData(p => ({...p, [name]: val}));
  };

  const handleSave = async () => {
    setLoading(true);
    await createOrUpdateProduct(formData);
    setLoading(false);
    onClose();
  };

  const tabs = [
    { id: 'basic', label: 'Informações', icon: <Info size={16}/> },
    { id: 'media', label: 'Mídia', icon: <ImageIcon size={16}/> },
    { id: 'pricing', label: 'Preço & Estoque', icon: <DollarSign size={16}/> },
    { id: 'visibility', label: 'Visibilidade', icon: <Eye size={16}/> },
    { id: 'actions', label: 'Ações', icon: <MessageCircle size={16}/> },
    { id: 'prelaunch', label: 'Pré-lançamento', icon: <Clock size={16}/> },
  ];

  return (
     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-haut-surface rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col border border-haut-border">
        <header className="px-6 py-4 flex justify-between items-center border-b border-haut-border"><h2 className="text-xl font-bold text-white">{product ? 'Editar Produto' : 'Novo Produto'}</h2><button onClick={onClose} className="text-haut-muted hover:text-white"><X size={24}/></button></header>
        <div className="border-b border-haut-border px-6"><div className="flex gap-4 -mb-px overflow-x-auto">{tabs.map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium whitespace-nowrap transition ${activeTab === tab.id ? 'border-haut-accent text-haut-accent' : 'border-transparent text-haut-muted hover:text-white'}`}>{tab.icon}{tab.label}</button>))}</div></div>
        
        <main className="p-6 overflow-y-auto flex-grow space-y-6">
            {activeTab === 'basic' && <>
                <FormInput label="Nome do Produto *" name="name" value={formData.name} onChange={handleChange} />
                <FormInput label="Slug (URL)" name="slug" value={formData.slug} onChange={handleChange} />
                <FormTextarea label="Descrição Curta" name="short_description" value={formData.short_description} onChange={handleChange} rows={3} maxLength={500}/>
                <FormTextarea label="Descrição Completa (HTML)" name="description_html" value={formData.description_html} onChange={handleChange} rows={6}/>
                <FormSelect label="Categoria" name="category_id" value={formData.category_id} onChange={handleChange} options={categories.map(c=>({value:c.id, label:c.name}))} placeholder="Selecione..."/>
            </>}
            {activeTab === 'media' && <>
                 <FormInput label="URL da Imagem Principal" name="main_image_url" value={formData.main_image_url} onChange={handleChange} placeholder="https://..."/>
                 <FormInput label="URL do Vídeo (Youtube/Vimeo)" name="video_url" value={formData.video_url} onChange={handleChange} placeholder="https://..."/>
            </>}
             {activeTab === 'pricing' && <>
                <div className="grid md:grid-cols-2 gap-4">
                    <FormInput label="Preço Base (em centavos)" name="price_cents" type="number" value={formData.price_cents} onChange={handleChange} />
                    <FormInput label="Estoque" name="inventory_qty" type="number" value={formData.inventory_qty} onChange={handleChange} />
                </div>
                 <FormCheckbox label="Ocultar quando esgotado" name="hide_when_unavailable" checked={formData.hide_when_unavailable} onChange={handleChange} />
             </>}
             {activeTab === 'visibility' && <>
                <FormSelect label="Visibilidade" name="visibility_mode" value={formData.visibility_mode} onChange={handleChange} options={[{value:'public', label:'Público'}, {value:'segmented', label:'Segmentado'}]} />
                {/* Segment selector would be here */}
             </>}
             {activeTab === 'actions' && <>
                <FormInput label="WhatsApp do Consultor" name="whatsapp_number" value={formData.whatsapp_number} onChange={handleChange} placeholder="+55..."/>
                <FormTextarea label="Template de Mensagem" name="whatsapp_template" value={formData.whatsapp_template} onChange={handleChange} rows={3}/>
             </>}
             {activeTab === 'prelaunch' && <>
                <FormCheckbox label="Ativar modo pré-lançamento" name="is_prelaunch" checked={formData.is_prelaunch} onChange={handleChange}/>
                {formData.is_prelaunch && <>
                    <FormInput label="Data de Lançamento" name="prelaunch_starts_at" type="datetime-local" value={formData.prelaunch_starts_at} onChange={handleChange} />
                    <FormCheckbox label="Exibir contagem regressiva" name="prelaunch_countdown" checked={formData.prelaunch_countdown} onChange={handleChange}/>
                    {formData.prelaunch_countdown && <div className="bg-haut-dark border border-haut-border p-4 rounded-lg"><CountdownTimer targetDate={formData.prelaunch_starts_at} /></div>}
                </>}
             </>}
        </main>

        <footer className="px-6 py-4 flex justify-between items-center border-t border-haut-border">
            <FormSelect name="status" value={formData.status} onChange={handleChange} options={[{value:'draft', label:'Rascunho'}, {value:'active', label:'Ativo'}, {value:'archived', label:'Arquivado'}]} className="w-40"/>
            <div className="flex gap-3">
                <button onClick={onClose} className="px-6 py-2 bg-haut-border text-white rounded-lg hover:bg-haut-border/70">Cancelar</button>
                <button onClick={handleSave} disabled={loading} className="px-6 py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 disabled:opacity-50 flex items-center gap-2"><Save size={16}/>{loading ? 'Salvando...' : 'Salvar Produto'}</button>
            </div>
        </footer>
      </div>
    </div>
  );
};

const FormInput: React.FC<any> = ({ label, ...props }) => (<div><label className="block text-sm font-medium text-haut-muted mb-2">{label}</label><input {...props} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg" /></div>);
const FormTextarea: React.FC<any> = ({ label, ...props }) => (<div><label className="block text-sm font-medium text-haut-muted mb-2">{label}</label><textarea {...props} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg" /></div>);
const FormSelect: React.FC<any> = ({ label, options, placeholder, ...props }) => (<div>{label && <label className="block text-sm font-medium text-haut-muted mb-2">{label}</label>}<select {...props} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg appearance-none"><option value="">{placeholder}</option>{options.map((o:any) => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>);
const FormCheckbox: React.FC<any> = ({ label, ...props }) => (<label className="flex items-center gap-3 p-3 bg-haut-dark border border-haut-border rounded-lg"><input type="checkbox" {...props} className="w-5 h-5 rounded bg-haut-border border-haut-border text-haut-accent" /><span className="text-white">{label}</span></label>);

export default ProductFormModal;
