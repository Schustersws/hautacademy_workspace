import React, { useState, useEffect } from 'react';
import { Product, StoreOrder } from '../../types';
import { createReservation } from '../../services/api';
import { X, CheckCircle, PackageCheck, Send, ExternalLink, ChevronLeft, ChevronRight, Video } from 'lucide-react';
import CountdownTimer from '../common/CountdownTimer';

type Props = {
  product: Product;
  onClose: () => void;
};

const ProductDetailsModal: React.FC<Props> = ({ product, onClose }) => {
  const [activeMedia, setActiveMedia] = useState(product.main_image_url);
  const [isReserving, setIsReserving] = useState(false);
  const [reservation, setReservation] = useState<StoreOrder | null>(null);

  const media = [
    ...(product.main_image_url ? [product.main_image_url] : []),
    ...(product.gallery_urls || []),
    ...(product.video_url ? ['video'] : []),
  ];

  const handleReserve = async () => {
    setIsReserving(true);
    const order = await createReservation(product.id);
    setReservation(order);
    setIsReserving(false);
  };
  
  if (reservation) {
    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-haut-surface rounded-lg max-w-lg w-full text-center p-8 border border-haut-border">
                <PackageCheck className="text-haut-accent mx-auto mb-4" size={64}/>
                <h2 className="text-2xl font-bold text-white mb-2">Reserva Realizada!</h2>
                <p className="text-haut-muted mb-4">Um de nossos consultores entrará em contato em breve para finalizar sua compra.</p>
                <div className="bg-haut-dark border border-haut-border rounded-lg p-4 mb-6">
                    <p className="text-sm text-haut-muted">Nº do Pedido: <span className="font-bold text-white">#{reservation.order_number}</span></p>
                    <p className="text-sm text-haut-muted mt-2">Sua reserva expira em:</p>
                    <CountdownTimer targetDate={reservation.reservation_expires_at} onExpire={onClose} />
                </div>
                <button onClick={onClose} className="w-full py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90">Fechar</button>
            </div>
        </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-haut-surface rounded-lg max-w-5xl w-full max-h-[90vh] flex flex-col border border-haut-border">
        <header className="sticky top-0 bg-haut-surface p-4 border-b border-haut-border flex justify-between items-center z-10"><h2 className="text-xl font-bold text-white truncate pr-4">{product.name}</h2><button onClick={onClose} className="text-haut-muted hover:text-white"><X/></button></header>
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6">
                <div className="aspect-video bg-haut-dark rounded-lg overflow-hidden mb-4"><img src={activeMedia} alt={product.name} className="w-full h-full object-cover"/></div>
                <div className="flex gap-2 justify-center">{media.map((m, i) => <button key={i} onClick={()=>setActiveMedia(m)} className={`w-16 h-16 rounded overflow-hidden flex-shrink-0 border-2 ${activeMedia === m ? 'border-haut-accent' : 'border-transparent'}`}><img src={m} className="w-full h-full object-cover"/></button>)}</div>
            </div>
            <div className="p-6 space-y-4">
                <div><h3 className="text-lg font-semibold text-white mb-2">Descrição</h3><div className="text-haut-muted prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: product.description_html }}/></div>
                <div className="bg-haut-dark rounded-lg p-4 border border-haut-border">
                    <h3 className="text-lg font-semibold text-white mb-4">Valor</h3>
                    <div className="space-y-2">
                        {product.has_discount && <div className="flex justify-between text-sm"><span className="text-haut-muted">Preço base:</span><span className="text-haut-muted line-through">R$ {(product.price_cents / 100).toFixed(2)}</span></div>}
                        {product.has_discount && <div className="flex justify-between text-sm"><span className="text-green-400">Desconto de Parceiro:</span><span className="text-green-400">- R$ {((product.price_cents - product.user_final_price_cents!) / 100).toFixed(2)}</span></div>}
                        <div className="pt-2 border-t border-haut-border"><div className="flex justify-between text-xl font-bold"><span className="text-white">Total:</span><span className="text-haut-accent">R$ {(product.user_final_price_cents! / 100).toFixed(2)}</span></div></div>
                    </div>
                </div>
                <div className="space-y-3">
                    <button onClick={handleReserve} disabled={isReserving} className="w-full py-3 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 disabled:opacity-50">{isReserving ? 'Reservando...' : 'Reservar Produto'}</button>
                    {product.whatsapp_number && <button onClick={() => window.open(`https://wa.me/${product.whatsapp_number!.replace(/\D/g,'')}`,'_blank')} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"><Send size={18}/>Falar com Consultor</button>}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;