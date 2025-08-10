
import React, { useState, useEffect } from 'react';
import { getEventRegistrations } from '../../services/api';
import { EventRegistration } from '../../types';
import { Check, X, MessageSquare, Download, Users, UserCheck, Hourglass, UserX as UserXIcon } from 'lucide-react';

type Props = {
  eventId: string;
};

const EventRegistrations: React.FC<Props> = ({ eventId }) => {
    const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        getEventRegistrations(eventId).then(data => {
            setRegistrations(data);
            setLoading(false);
        });
    }, [eventId]);
    
    const StatusBadge = ({ status }: { status: EventRegistration['status'] }) => {
        const styles: { [key: string]: string } = {
            confirmed: 'bg-green-500/10 text-green-400',
            pending: 'bg-yellow-500/10 text-yellow-400',
            cancelled: 'bg-red-500/10 text-red-400',
            attended: 'bg-blue-500/10 text-blue-400',
            interested: 'bg-purple-500/10 text-purple-400'
        };
        
        if(!styles[status]) return null;
        
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>{status}</span>;
    };
    
    const filteredRegistrations = registrations.filter(r => filter === 'all' || r.status === filter);

    return (
        <div className="bg-haut-surface rounded-lg border border-haut-border">
            <div className="p-6 border-b border-haut-border">
                <h3 className="text-xl font-bold text-white mb-4">Gerenciar Inscrições</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard icon={<Users size={24}/>} label="Total" value={registrations.length}/>
                    <StatCard icon={<Hourglass size={24}/>} label="Pendentes" value={registrations.filter(r=>r.status === 'pending').length} />
                    <StatCard icon={<UserCheck size={24}/>} label="Confirmados" value={registrations.filter(r=>r.status === 'confirmed').length} />
                    <StatCard icon={<UserXIcon size={24}/>} label="Cancelados" value={registrations.filter(r=>r.status === 'cancelled').length} />
                </div>
            </div>
            
            <div className="p-4 border-b border-haut-border flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-1 bg-haut-dark p-1 rounded-lg border border-haut-border">
                    {['all', 'pending', 'confirmed', 'attended', 'cancelled'].map(status => (
                        <button key={status} onClick={() => setFilter(status)} className={`px-3 py-1 text-sm rounded-md ${filter === status ? 'bg-haut-accent text-haut-dark font-semibold' : 'text-haut-muted hover:bg-haut-border'}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-haut-border text-white rounded-lg hover:bg-haut-border/70 text-sm"><Download size={16}/> Exportar</button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"><MessageSquare size={16}/> Enviar Mensagem</button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                    <thead className="bg-haut-border/20">
                        <tr>
                            <th className="p-4 text-left text-sm font-semibold text-haut-muted">Participante</th>
                            <th className="p-4 text-left text-sm font-semibold text-haut-muted">Status</th>
                            <th className="p-4 text-left text-sm font-semibold text-haut-muted">Inscrição</th>
                            <th className="p-4 text-left text-sm font-semibold text-haut-muted">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr><td colSpan={4} className="p-8 text-center text-haut-muted">Carregando...</td></tr> :
                         filteredRegistrations.map(reg => (
                            <tr key={reg.id} className="border-t border-haut-border">
                                <td className="p-4"><div className="flex items-center gap-3"><img src={reg.user?.avatar_url} className="w-10 h-10 rounded-full object-cover bg-haut-border"/><div className="font-semibold text-white">{reg.user?.full_name}</div></div></td>
                                <td className="p-4"><StatusBadge status={reg.status}/></td>
                                <td className="p-4 text-haut-muted text-sm">{new Date(reg.created_at).toLocaleString('pt-BR')}</td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        {reg.status === 'pending' && <button className="p-2 text-green-400 hover:text-green-300" title="Aprovar"><Check size={18}/></button>}
                                        {reg.status === 'pending' && <button className="p-2 text-red-400 hover:text-red-300" title="Rejeitar"><X size={18}/></button>}
                                        <button className="p-2 text-haut-muted hover:text-white" title="Enviar Mensagem"><MessageSquare size={18}/></button>
                                    </div>
                                </td>
                            </tr>
                         ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: number }> = ({ icon, label, value }) => (
    <div className="bg-haut-dark border border-haut-border p-3 rounded-lg">
        <p className="text-haut-muted text-sm flex items-center gap-2">{icon} {label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
    </div>
);

export default EventRegistrations;
