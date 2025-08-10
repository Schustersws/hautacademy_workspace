
import React, { useState } from 'react';
import { Event } from '../../types';
import { registerForEvent } from '../../services/api';
import { X, Calendar, Clock, MapPin, Video, Info, User, CheckCircle, Send, Plus } from 'lucide-react';

type Props = {
  event: Event;
  onClose: () => void;
};

const EventDetailsModal: React.FC<Props> = ({ event, onClose }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(event.user_registration_status);

  const handleRegister = async () => {
    setLoading(true);
    try {
        const result = await registerForEvent(event.id, 'f1e2d3c4-b5a6-7890-1234-567890fedcba'); // Mocked user ID
        setRegistrationStatus(result.status);
    } catch(err) {
        console.error(err);
        // Show error to user
    } finally {
        setLoading(false);
    }
  };

  const handleAddToCalendar = () => {
    // Basic .ics file generation
    const formatICSDate = (date: Date) => date.toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';
    const startDate = new Date(event.start_date);
    const endDate = event.end_date ? new Date(event.end_date) : new Date(startDate.getTime() + 60 * 60 * 1000);
    const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        `URL:${window.location.href}`,
        `DTSTART:${formatICSDate(startDate)}`,
        `DTEND:${formatICSDate(endDate)}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:${event.location || 'Online'}`,
        "END:VEVENT",
        "END:VCALENDAR"
    ].join('\n');
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.slug}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  const handleWhatsApp = () => {
    const message = event.whatsapp_message?.replace('{{nome_evento}}', event.title) || `Olá, tenho interesse no evento ${event.title}`;
    const url = `https://wa.me/${event.consultant_whatsapp?.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-haut-surface rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col border border-haut-border">
        <div className="relative h-64 bg-haut-dark">
          {event.image_url && <img src={event.image_url} alt={event.title} className="w-full h-full object-cover"/>}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
            <h2 className="text-3xl font-bold text-white">{event.title}</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-haut-muted mt-2">
                <InfoPill icon={<Calendar size={16}/>} text={new Date(event.start_date).toLocaleDateString()}/>
                <InfoPill icon={<Clock size={16}/>} text={new Date(event.start_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}/>
                <InfoPill icon={event.event_type === 'online' ? <Video size={16}/> : <MapPin size={16}/>} text={event.event_type}/>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white hover:bg-black/70"><X size={24}/></button>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto">
            <h3 className="font-bold text-white text-lg mb-2">Sobre o Evento</h3>
            <p className="text-haut-muted whitespace-pre-line">{event.description}</p>
        </div>

        <div className="bg-haut-dark p-4 mt-auto border-t border-haut-border flex justify-between items-center">
            <div className="flex gap-2">
                <button onClick={handleAddToCalendar} className="px-4 py-2 bg-haut-border text-white rounded-lg hover:bg-haut-border/70 flex items-center gap-2"><Plus size={16}/> Calendário</button>
                 {event.consultant_whatsapp && <button onClick={handleWhatsApp} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"><Send size={16}/> Consultor</button>}
            </div>
            { !registrationStatus ? (
                 <button onClick={handleRegister} disabled={loading} className="px-6 py-3 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 disabled:opacity-50">
                    {loading ? 'Processando...' : 'Quero Participar'}
                 </button>
            ) : (
                <div className="px-6 py-3 bg-green-600/10 border border-green-600 text-green-300 font-bold rounded-lg flex items-center gap-2">
                    <CheckCircle size={20}/> Inscrito ({registrationStatus})
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

const InfoPill: React.FC<{icon: React.ReactNode, text: string}> = ({icon, text}) => (
    <div className="flex items-center gap-2">
        <span className="text-haut-accent">{icon}</span>
        <span className="capitalize">{text}</span>
    </div>
)

export default EventDetailsModal;
