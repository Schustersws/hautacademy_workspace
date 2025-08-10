import React, { useState } from 'react';
import { ActiveSession, Settings } from '../../../types';
import { ShieldCheck, Smartphone, Laptop, Trash2, KeyRound } from 'lucide-react';

type Props = {
    activeSessions: ActiveSession[];
    onUpdate: (update: Partial<Settings>) => void;
};

const SecuritySettings: React.FC<Props> = ({ activeSessions }) => {
    return (
        <div className="space-y-12 animate-fadeIn">
            <div>
                <h2 className="text-xl font-bold text-white mb-6">Segurança da Conta</h2>
                <div className="space-y-6">
                    {/* Change Password */}
                    <div className="p-6 bg-haut-dark/50 rounded-lg border border-haut-border">
                        <h3 className="font-semibold text-white mb-4">Alterar Senha</h3>
                        <form className="space-y-4">
                            <input type="password" placeholder="Senha Atual" className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg" />
                            <input type="password" placeholder="Nova Senha" className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg" />
                            <input type="password" placeholder="Confirmar Nova Senha" className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg" />
                            <div className="text-right">
                                <button type="submit" className="px-4 py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90">Alterar Senha</button>
                            </div>
                        </form>
                    </div>

                    {/* 2FA */}
                    <div className="p-6 bg-haut-dark/50 rounded-lg border border-haut-border">
                         <h3 className="font-semibold text-white mb-2">Autenticação de Dois Fatores (2FA)</h3>
                         <p className="text-sm text-haut-muted mb-4">Aumente a segurança da sua conta exigindo um código de verificação ao fazer login.</p>
                        <div className="flex items-center gap-4">
                            <ShieldCheck className="text-green-400" size={32} />
                            <div>
                               <p className="font-semibold text-white">2FA está Ativo</p>
                               <p className="text-sm text-haut-muted">Configurado em 15/01/2024</p>
                            </div>
                             <button className="ml-auto px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 font-semibold rounded-lg hover:bg-red-600/40">Desativar</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h2 className="text-xl font-bold text-white mb-6">Sessões Ativas</h2>
                <div className="space-y-4">
                    {activeSessions.map(session => (
                        <div key={session.id} className="flex items-center justify-between p-4 bg-haut-dark/50 rounded-lg border border-haut-border">
                            <div className="flex items-center gap-4">
                                {session.device_info.os.includes('iPhone') ? <Smartphone /> : <Laptop />}
                                <div>
                                    <p className="font-semibold text-white">{session.device_info.browser} em {session.device_info.os} {session.is_current && <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full ml-2">Sessão Atual</span>}</p>
                                    <p className="text-sm text-haut-muted">IP: {session.ip_address} • Última atividade: {new Date(session.last_activity).toLocaleDateString()}</p>
                                </div>
                            </div>
                            {!session.is_current && <button className="p-2 text-haut-muted hover:text-red-400"><Trash2 size={18}/></button>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;