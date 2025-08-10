import React, { useState } from 'react';
import { UserBenefit } from '../../types';
import { Copy, Gift, Share2 } from 'lucide-react';
import ShareBenefitModal from './ShareBenefitModal';

type Props = {
  userBenefit: UserBenefit;
};

const BenefitCardUser: React.FC<Props> = ({ userBenefit }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const { benefit } = userBenefit;

  const handleCopyCode = () => {
    if (!userBenefit.code) return;
    navigator.clipboard.writeText(userBenefit.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusInfo = () => {
    switch (userBenefit.status) {
      case 'available': return { color: 'border-green-500', label: 'Disponível' };
      case 'redeemed': return { color: 'border-blue-500', label: 'Utilizado' };
      case 'expired': return { color: 'border-gray-500', label: 'Expirado' };
      default: return { color: 'border-haut-border', label: userBenefit.status };
    }
  };

  const getBenefitValue = () => {
    if (benefit.type === 'coupon') {
        if (benefit.discount_kind === 'percent') return `${(benefit.discount_value_cents ?? 0) / 100}%`;
        return `R$${((benefit.discount_value_cents ?? 0) / 100).toFixed(2)}`;
    }
    if (benefit.type === 'credit') return `R$${((benefit.credit_value_cents ?? 0) / 100).toFixed(2)}`;
    return "Vantagem Exclusiva";
  };

  return (
    <>
      <div className={`bg-haut-surface rounded-lg overflow-hidden border-2 ${getStatusInfo().color}`}>
        {benefit.banner_url && <img src={benefit.banner_url} alt={benefit.name} className="h-32 w-full object-cover" />}
        <div className="p-4">
          <h3 className="font-bold text-white mb-1">{benefit.name}</h3>
          <p className="text-haut-muted text-sm mb-3 h-10 line-clamp-2">{benefit.description}</p>
          <div className="text-center mb-4 py-3 bg-haut-dark border border-haut-border rounded-lg">
            <p className="text-3xl font-bold" style={{color: benefit.color || '#FFD11A'}}>{getBenefitValue()}</p>
            <p className="text-haut-muted text-sm capitalize">{benefit.type === 'coupon' ? 'de desconto' : benefit.type}</p>
          </div>

          {userBenefit.code && userBenefit.status === 'available' && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-haut-dark border border-haut-border rounded-lg">
              <code className="flex-1 font-mono text-haut-accent text-center tracking-widest">{userBenefit.code}</code>
              <button onClick={handleCopyCode} className="px-3 py-1 bg-haut-border text-white rounded hover:bg-haut-border/70">{copied ? '✓' : <Copy size={16}/>}</button>
            </div>
          )}

          <div className="space-y-2">
            {userBenefit.status === 'available' && (
              <button className="w-full py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90">Usar Agora</button>
            )}
            {benefit.shareable && userBenefit.status === 'available' && (
              <button onClick={() => setShowShareModal(true)} className="w-full py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"><Share2 size={16}/> Compartilhar</button>
            )}
            <button className="w-full py-2 border border-haut-border text-haut-muted rounded-lg hover:bg-haut-border/50">Ver Detalhes</button>
          </div>
        </div>
      </div>
      {showShareModal && <ShareBenefitModal benefit={userBenefit} onClose={() => setShowShareModal(false)} />}
    </>
  );
};

export default BenefitCardUser;
