
import React from 'react';
import { Event } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Edit, Users, Calendar, Eye, MoreVertical } from 'lucide-react';

type Props = {
  events: Event[];
  onEdit: (event: Event) => void;
};

const EventsGrid: React.FC<Props> = ({ events, onEdit }) => {
    const navigate = useNavigate();

    const StatusBadge = ({ status }: { status: Event['status'] }) => {
        const styles = {
            published: 'bg-green-500/10 text-green-400',
            draft: 'bg-yellow-500/10 text-yellow-400',
            cancelled: 'bg-red-500/10 text-red-400',
            completed: 'bg-gray-500/10 text-gray-400',
        };
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>{status}</span>;
    };

    if (events.length === 0) {
        return <p className="text-center text-haut-muted py-10">Nenhum evento encontrado.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {events.map(event => (
                <div key={event.id} className="bg-haut-surface rounded-lg border border-haut-border flex flex-col">
                    <div className="h-40 bg-haut-dark rounded-t-lg">
                        {event.image_url && <img src={event.image_url} alt={event.title} className="w-full h-full object-cover rounded-t-lg" />}
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                             <h3 className="font-bold text-white pr-2 line-clamp-2">{event.title}</h3>
                             <StatusBadge status={event.status} />
                        </div>
                        <div className="flex items-center text-sm text-haut-muted gap-2 mb-4">
                           <Calendar size={14}/> {new Date(event.start_date).toLocaleDateString('pt-BR')}
                        </div>
                         <div className="flex items-center text-sm text-haut-muted gap-4 mb-4">
                            <div className="flex items-center gap-1"><Users size={14}/><span>{event.registered_count || 0} / {event.max_attendees || '∞'}</span></div>
                        </div>
                        <div className="mt-auto pt-4 border-t border-haut-border flex justify-end gap-2">
                             <button onClick={() => navigate(`/admin/events/${event.id}`)} className="px-3 py-1.5 text-sm bg-haut-border text-white rounded-md hover:bg-haut-border/70">Ver Inscrições</button>
                             <button onClick={() => onEdit(event)} className="px-3 py-1.5 text-sm bg-haut-accent text-haut-dark font-semibold rounded-md hover:brightness-90">Editar</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventsGrid;
