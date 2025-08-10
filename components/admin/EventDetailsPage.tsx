
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import EventRegistrations from './EventRegistrations';
import { ChevronLeft } from 'lucide-react';

const EventDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // In a real app, you would fetch event details here
    const eventName = `Evento ID: ${id}`; 

    return (
        <div className="min-h-screen bg-haut-dark text-white p-6">
            <div className="max-w-7xl mx-auto">
                <Link to="/admin/events" className="flex items-center gap-2 text-haut-accent mb-4 hover:underline">
                    <ChevronLeft size={20} />
                    Voltar para todos os eventos
                </Link>
                <h1 className="text-3xl font-bold text-white mb-2">Gerenciar Evento</h1>
                <p className="text-lg text-haut-muted mb-6">{eventName}</p>
                
                {id ? (
                    <EventRegistrations eventId={id} />
                ) : (
                    <p>ID do evento não encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default EventDetailsPage;
