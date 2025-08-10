import React from 'react';
import { Product } from '../../types';
import { Edit, Package } from 'lucide-react';

type Props = {
  product: Product;
  onEdit: (product: Product) => void;
};

const ProductCardAdmin: React.FC<Props> = ({ product, onEdit }) => {
  const statusStyles = {
    active: 'bg-green-600/10 text-green-400',
    draft: 'bg-yellow-600/10 text-yellow-400',
    archived: 'bg-gray-600/10 text-gray-400',
  };

  return (
    <div className="bg-haut-surface rounded-lg overflow-hidden border border-haut-border hover:border-haut-accent transition flex flex-col">
      <div className="relative h-48 bg-haut-dark">
        {product.main_image_url ? (
          <img src={product.main_image_url} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-haut-muted"><Package size={48} /></div>
        )}
        <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[product.status]}`}>
          {product.status}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-haut-muted mb-1">{product.category?.name}</p>
        <h3 className="text-lg font-bold text-white mb-2 h-12 line-clamp-2">{product.name}</h3>
        <div className="flex justify-between items-center text-sm mb-4">
          <span className="text-xl font-bold text-haut-accent">R$ {(product.price_cents / 100).toFixed(2)}</span>
          <span className="text-haut-muted">Estoque: {product.inventory_qty}</span>
        </div>
        <div className="mt-auto pt-4 border-t border-haut-border flex gap-2">
          <button onClick={() => onEdit(product)} className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-haut-border text-white rounded-md hover:bg-haut-border/70 text-sm">
            <Edit size={14}/>Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardAdmin;