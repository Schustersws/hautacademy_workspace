
import React, { useState } from 'react';
import { Event } from '../../types';
import { createOrUpdateEvent } from '../../services/api';
import { X, Eye, Edit, Info, Calendar, MapPin, Film, MessageSquare, Users, EyeOff, Bell } from 'lucide-react';

type Props = {
  event: Event | null;
  onClose: () => void;
};

const EventModal: React.FC<Props> = ({ event, onClose }) => {
    const [formData, setFormData] = useState<Partial<Event>>(
        event || {
            title: '',
            slug: '',
            description: '',
            event_type: 'presencial',
            start_date: '',
            end_date: '',
            location: '',
            meet_link: '',
            map_url: '',
            image_url: '',
            video_url: '',
            max_attendees: undefined,
            consultant_name: '',
            consultant_whatsapp: '',
            whatsapp_message: 'Olá! Tenho interesse no evento {{nome_evento}}',
            status: 'draft',
            visibility_mode: 'public',
            segments: [],
        }
    );
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    // @ts-ignore
    const val = isCheckbox ? e.target.checked : value;
    setFormData({ ...formData, [name]: val });
  };
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
        await createOrUpdateEvent(formData);
        onClose(); // Reload would happen in parent component
    } catch (error) {
        console.error("Failed to save event", error);
    } finally {
        setLoading(false);
    }
  }

  const tabs = [
    { id: 'basic', label: 'Informações', icon: <Info size={16}/> },
    { id: 'datetime', label: 'Data/Hora', icon: <Calendar size={16}/> },
    { id: 'location', label: 'Local', icon: <MapPin size={16}/> },
    { id: 'media', label: 'Mídia', icon: <Film size={16}/> },
    { id: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare size={16}/> },
    { id: 'capacity', label: 'Capacidade', icon: <Users size={16}/> },
    { id: 'visibility', label: 'Visibilidade', icon: <EyeOff size={16}/> },
    { id: 'notifications', label: 'Notificações', icon: <Bell size={16}/> },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-haut-surface rounded-lg w-full max-w-5xl max-h-[90vh] flex flex-col border border-haut-border">
        {/* Header */}
        <div className="bg-haut-surface px-6 py-4 flex justify-between items-center border-b border-haut-border flex-shrink-0">
          <h2 className="text-xl font-bold text-white">{event ? 'Editar Evento' : 'Novo Evento'}</h2>
          <button onClick={onClose} className="text-haut-muted hover:text-white"><X size={24} /></button>
        </div>

        {/* Tabs */}
        <div className="bg-haut-surface px-6 border-b border-haut-border flex-shrink-0">
          <div className="flex gap-4 overflow-x-auto -mb-px">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-1 border-b-2 whitespace-nowrap transition ${activeTab === tab.id ? 'border-haut-accent text-haut-accent' : 'border-transparent text-haut-muted hover:text-white'}`}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow">
            {/* Render form content based on activeTab */}
            {activeTab === 'basic' && (
                <div className="space-y-4">
                     <FormInput label="Título do Evento *" name="title" value={formData.title} onChange={handleInputChange} />
                     <FormInput label="Slug (URL amigável)" name="slug" value={formData.slug} onChange={handleInputChange} placeholder="gerado-automaticamente" />
                     <FormTextarea label="Descrição Completa *" name="description" value={formData.description} onChange={handleInputChange} rows={5}/>
                     <FormRadioGroup label="Tipo de Evento *" name="event_type" value={formData.event_type} onChange={handleInputChange} options={[{value:'online', label:'Online'}, {value:'presencial', label:'Presencial'}, {value:'hybrid', label:'Híbrido'}]} />
                </div>
            )}
             {activeTab === 'datetime' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput label="Data/Hora de Início *" name="start_date" type="datetime-local" value={formData.start_date} onChange={handleInputChange} />
                    <FormInput label="Data/Hora de Término" name="end_date" type="datetime-local" value={formData.end_date} onChange={handleInputChange} />
                </div>
            )}
            {activeTab === 'location' && (
                <div className="space-y-4">
                    {(formData.event_type === 'presencial' || formData.event_type === 'hybrid') && (
                        <FormTextarea label="Local do Evento" name="location" value={formData.location} onChange={handleInputChange} rows={3} placeholder="Nome do local, endereço completo..."/>
                    )}
                     {(formData.event_type === 'online' || formData.event_type === 'hybrid') && (
                        <FormInput label="Link da Transmissão/Reunião" name="meet_link" value={formData.meet_link} onChange={handleInputChange} placeholder="https://zoom.us/..."/>
                     )}
                </div>
            )}
             {activeTab === 'media' && (
                <div className="space-y-4">
                    <FormInput label="URL do Banner do Evento" name="image_url" value={formData.image_url} onChange={handleInputChange} placeholder="https://..."/>
                    <FormInput label="URL do Vídeo Promocional" name="video_url" value={formData.video_url} onChange={handleInputChange} placeholder="https://youtube.com/..."/>
                </div>
            )}
            {activeTab === 'visibility' && (
                 <div className="space-y-4">
                    <FormRadioGroup label="Modo de Visibilidade *" name="visibility_mode" value={formData.visibility_mode} onChange={handleInputChange} options={[{value:'public', label:'Público'}, {value:'segmented', label:'Segmentado'}]} />
                    <FormSelect label="Status do Evento *" name="status" value={formData.status} onChange={handleInputChange} options={[{value:'draft', label:'Rascunho'}, {value:'published', label:'Publicado'}, {value:'cancelled', label:'Cancelado'}]} />
                 </div>
            )}
            {/* Other tabs would go here */}

        </div>

        {/* Footer */}
        <div className="bg-haut-surface px-6 py-4 flex justify-end items-center border-t border-haut-border flex-shrink-0">
          <div className="flex gap-3">
            <button onClick={onClose} className="px-6 py-2 bg-haut-border text-white rounded-lg hover:bg-haut-border/70">Cancelar</button>
            <button onClick={handleSubmit} disabled={loading} className="px-6 py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 disabled:opacity-50">
                {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components for the form
const FormInput: React.FC<any> = ({ label, name, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-haut-muted mb-2">{label}</label>
        <input name={name} {...props} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent" />
    </div>
);

const FormTextarea: React.FC<any> = ({ label, name, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-haut-muted mb-2">{label}</label>
        <textarea name={name} {...props} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent" />
    </div>
);

const FormSelect: React.FC<any> = ({ label, name, options, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-haut-muted mb-2">{label}</label>
        <select name={name} {...props} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white appearance-none focus:outline-none focus:border-haut-accent">
            {options.map((opt:any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);

const FormRadioGroup: React.FC<any> = ({ label, name, value, options, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-haut-muted mb-2">{label}</label>
        <div className="flex gap-4">
            {options.map((opt: any) => (
                <label key={opt.value} className="flex items-center gap-2 text-haut-text">
                    <input type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={onChange} className="w-4 h-4 text-haut-accent bg-haut-dark border-haut-border focus:ring-haut-accent"/>
                    {opt.label}
                </label>
            ))}
        </div>
    </div>
);


export default EventModal;
