
import React, { useState, useEffect } from 'react';
import { Event } from '../../types';
import { Calendar, MapPin, Users, Star } from 'lucide-react';

type Props = {
  event: Event;
  onViewDetails: (event: Event) => void;
};

const EventCard: React.FC<Props> = ({ event, onViewDetails }) => {
  const [countdown, setCountdown] = useState<string | null>(null);

  useEffect(() => {
    if (event.is_prelaunch && event.prelaunch_opens_at) {
      const interval = setInterval(() => {
        const diff = new Date(event.prelaunch_opens_at!).getTime() - new Date().getTime();
        if (diff > 0) {
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const m = Math.floor((diff / 1000 / 60) % 60);
          const s = Math.floor((diff / 1000) % 60);
          setCountdown(`${d}d ${h}h ${m}m ${s}s`);
        } else {
          setCountdown(null);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [event.is_prelaunch, event.prelaunch_opens_at]);

  const isSoldOut = event.max_attendees && (event.registered_count || 0) >= event.max_attendees;

  return (
    <div className="bg-haut-surface rounded-lg border border-haut-border overflow-hidden flex flex-col group transition-all duration-300 hover:border-haut-accent hover:shadow-2xl hover:shadow-haut-accent/10">
      <div className="relative h-48 bg-haut-dark">
        <img src={event.image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 left-2 flex gap-2">
            {event.is_prelaunch && <Badge color="yellow">EM BREVE</Badge>}
            {isSoldOut && <Badge color="red">ESGOTADO</Badge>}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-haut-accent font-semibold mb-1">{event.event_type.toUpperCase()}</p>
        <h3 className="font-bold text-white mb-2 h-12 line-clamp-2">{event.title}</h3>
        <div className="text-sm text-haut-muted flex items-center gap-2 mb-1"><Calendar size={14} /><span>{new Date(event.start_date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span></div>
        <div className="text-sm text-haut-muted flex items-center gap-2 mb-4"><MapPin size={14} /><span>{event.event_type === 'online' ? 'Evento Online' : event.location}</span></div>
        
        {countdown && (
          <div className="bg-haut-dark border border-haut-border p-2 rounded-lg mb-4 text-center">
            <p className="text-xs text-haut-muted mb-1">Inscrições abrem em:</p>
            <p className="text-lg font-bold text-haut-accent">{countdown}</p>
          </div>
        )}
        
        <div className="mt-auto flex gap-2">
          <button onClick={() => onViewDetails(event)} className="w-full px-4 py-2 bg-haut-border text-white rounded-lg hover:bg-haut-border/70 text-sm font-semibold">Ver Detalhes</button>
           <button disabled={isSoldOut || !!countdown} onClick={() => onViewDetails(event)} className="w-full px-4 py-2 bg-haut-accent text-haut-dark rounded-lg hover:brightness-90 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed">
            {isSoldOut ? 'Esgotado' : (countdown ? 'Em Breve' : 'Participar')}
           </button>
        </div>
      </div>
    </div>
  );
};

const Badge: React.FC<{color: 'yellow' | 'red', children: React.ReactNode}> = ({color, children}) => {
    const styles = {
        yellow: 'bg-haut-accent text-haut-dark',
        red: 'bg-red-500 text-white',
    }
    return <span className={`px-2 py-0.5 text-xs font-bold rounded ${styles[color]}`}>{children}</span>
}


export default EventCard;
