import React from 'react';
import { Product } from '../../types';
import CountdownTimer from '../common/CountdownTimer';
import { Package, Zap } from 'lucide-react';

type Props = {
  product: Product;
  onSelect: (product: Product) => void;
};

const ProductCardUser: React.FC<Props> = ({ product, onSelect }) => {
  const isSoldOut = !product.is_prelaunch && product.available_stock === 0;

  return (
    <div onClick={() => onSelect(product)} className="bg-haut-surface rounded-lg border border-haut-border overflow-hidden flex flex-col group transition-all duration-300 hover:border-haut-accent hover:shadow-2xl hover:shadow-haut-accent/10 cursor-pointer">
      <div className="relative h-48 bg-haut-dark">
        {product.main_image_url ? (
          <img src={product.main_image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-haut-muted"><Package size={48} /></div>
        )}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.is_prelaunch && <Badge color="purple">Em Breve</Badge>}
          {isSoldOut && <Badge color="red">Esgotado</Badge>}
          {product.has_discount && <Badge color="yellow" icon={<Zap size={12}/>}>Seu Preço</Badge>}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-haut-muted mb-1">{product.category?.name}</p>
        <h3 className="font-bold text-white mb-2 h-12 line-clamp-2">{product.name}</h3>
        <div className="mb-4">
          {product.has_discount ? (
            <><span className="text-gray-500 line-through text-sm">R$ {(product.price_cents / 100).toFixed(2)}</span><span className="text-xl font-bold text-haut-accent ml-2">R$ {(product.user_final_price_cents! / 100).toFixed(2)}</span></>
          ) : (
            <span className="text-xl font-bold text-white">R$ {(product.price_cents / 100).toFixed(2)}</span>
          )}
        </div>
        
        {product.is_prelaunch && product.prelaunch_starts_at ? (
            <div className="mb-4 text-center text-sm p-2 rounded-lg bg-haut-dark border border-haut-border"><CountdownTimer targetDate={product.prelaunch_starts_at} /></div>
        ) : null}

        <div className="mt-auto">
            <button disabled={isSoldOut && !product.is_prelaunch} className={`w-full py-2 px-4 rounded-lg font-semibold transition ${isSoldOut ? 'bg-haut-border text-haut-muted cursor-not-allowed' : product.is_prelaunch ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-haut-accent text-haut-dark hover:brightness-90'}`}>
                {isSoldOut ? 'Esgotado' : product.is_prelaunch ? 'Avise-me' : 'Ver Detalhes'}
            </button>
        </div>
      </div>
    </div>
  );
};

const Badge: React.FC<{color: 'yellow' | 'red' | 'purple', icon?: React.ReactNode, children: React.ReactNode}> = ({color, icon, children}) => {
    const styles = {
        yellow: 'bg-haut-accent text-haut-dark',
        red: 'bg-red-500 text-white',
        purple: 'bg-purple-600 text-white',
    };
    return <span className={`flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded ${styles[color]}`}>{icon}{children}</span>
}

export default ProductCardUser;