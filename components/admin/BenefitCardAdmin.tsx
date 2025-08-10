import React from 'react';
import { Benefit } from '../../types';
import { Edit, BarChart2 } from 'lucide-react';

type Props = {
  benefit: Benefit;
  onEdit: (benefit: Benefit) => void;
};

const BenefitCardAdmin: React.FC<Props> = ({ benefit, onEdit }) => {
  const typeStyles = {
    coupon: 'bg-blue-600/20 text-blue-400',
    credit: 'bg-green-600/20 text-green-400',
    perk: 'bg-purple-600/20 text-purple-400',
    voucher: 'bg-orange-600/20 text-orange-400',
  };

  const getBenefitValue = () => {
    if (benefit.type === 'coupon') {
      if (benefit.discount_kind === 'percent') {
        return `${(benefit.discount_value_cents ?? 0) / 100}% OFF`;
      }
      return `R$ ${(benefit.discount_value_cents ?? 0) / 100}`;
    }
    if (benefit.type === 'credit') {
      return `R$ ${(benefit.credit_value_cents ?? 0) / 100}`;
    }
    return 'Vantagem';
  };

  return (
    <div className="bg-haut-surface rounded-lg border border-haut-border flex flex-col hover:border-haut-accent transition">
      {benefit.banner_url && <img src={benefit.banner_url} alt={benefit.name} className="h-32 w-full object-cover rounded-t-lg" />}
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-white pr-2 line-clamp-2">{benefit.name}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${typeStyles[benefit.type]}`}>{benefit.type}</span>
        </div>
        <p className="text-2xl font-bold text-haut-accent mb-3">{getBenefitValue()}</p>
        <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
          <div><p className="text-haut-muted">Atribuídos</p><p className="text-white font-semibold">{benefit.assigned_count ?? 0}</p></div>
          <div><p className="text-haut-muted">Usados</p><p className="text-white font-semibold">{benefit.redeemed_count ?? 0}</p></div>
          <div><p className="text-haut-muted">Taxa</p><p className="text-white font-semibold">{benefit.usage_rate ?? 0}%</p></div>
        </div>
        <div className="mt-auto pt-4 border-t border-haut-border flex gap-2">
          <button onClick={() => onEdit(benefit)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-haut-border text-white rounded-md hover:bg-haut-border/70 text-sm"><Edit size={14}/>Editar</button>
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-haut-border text-white rounded-md hover:bg-haut-border/70 text-sm"><BarChart2 size={14}/>Analytics</button>
        </div>
      </div>
    </div>
  );
};

export default BenefitCardAdmin;