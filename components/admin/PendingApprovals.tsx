
import React, { useState, useEffect } from 'react';
import { getPendingRequests, approveRequest, rejectRequest } from '../../services/api';
import { AccessRequest } from '../../types';
import { User, Mail, Phone, Briefcase, Tag, Check, X, Send } from 'lucide-react';

const PendingApprovals: React.FC<{ initialRequests: AccessRequest[] }> = ({ initialRequests }) => {
    const [requests, setRequests] = useState<AccessRequest[]>(initialRequests);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!initialRequests.length) {
            getPendingRequests().then(data => {
                setRequests(data);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [initialRequests]);
    
    const handleApprove = async (id: string) => {
        // In a real app, you might open a modal for configuration first.
        await approveRequest(id);
        setRequests(requests.filter(r => r.id !== id));
    };

    const handleReject = async (id: string) => {
        await rejectRequest(id);
        setRequests(requests.filter(r => r.id !== id));
    };

    if (loading) {
        return <div className="text-center p-8 text-haut-muted">Carregando solicitações...</div>;
    }

    if (requests.length === 0) {
        return <div className="text-center p-8 text-haut-muted">Nenhuma solicitação pendente.</div>;
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            {requests.map((request) => (
                <div key={request.id} className="bg-haut-surface rounded-lg p-6 border border-haut-border">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                        <div className="flex-1">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 bg-haut-dark rounded-full flex items-center justify-center text-3xl text-haut-accent border-2 border-haut-border">
                                    <User />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white">{request.full_name}</h3>
                                    <p className="text-haut-muted flex items-center gap-2"><Mail size={14} /> {request.email}</p>
                                    <p className="text-haut-muted flex items-center gap-2"><Phone size={14} /> {request.phone}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-sm">
                                <InfoItem icon={<Briefcase size={16}/>} label="Organização" value={request.organization} />
                                <InfoItem icon={<Tag size={16}/>} label="Perfil Solicitado" value={request.role_requested} />
                                <InfoItem icon={<Tag size={16}/>} label="Segmento" value={request.segment} />
                            </div>

                             {request.invitation_code && (
                                <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                                    <p className="text-sm text-green-400 font-semibold">Código de Convite: {request.invitation_code}</p>
                                </div>
                            )}

                        </div>
                        <div className="flex-shrink-0 flex flex-col items-end gap-2">
                             <p className="text-sm text-haut-muted text-right">
                                Solicitado em {new Date(request.created_at).toLocaleDateString('pt-BR')}
                            </p>
                             <div className="flex flex-wrap gap-2 justify-end">
                                <button onClick={() => handleApprove(request.id)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition text-sm"><Check size={18}/> Aprovar</button>
                                <button onClick={() => handleReject(request.id)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition text-sm"><X size={18}/> Rejeitar</button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-haut-border text-white font-semibold rounded-lg hover:bg-haut-border/70 transition text-sm"><Send size={18}/> Mensagem</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const InfoItem: React.FC<{icon: React.ReactNode, label: string, value: string}> = ({ icon, label, value }) => (
    <div>
        <p className="text-xs text-haut-muted flex items-center gap-1">{icon} {label}</p>
        <p className="text-white font-medium">{value}</p>
    </div>
);


export default PendingApprovals;
