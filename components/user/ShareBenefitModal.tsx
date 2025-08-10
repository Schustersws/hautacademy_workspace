import React, { useState } from 'react';
import { UserBenefit } from '../../types';
import { X, Link as LinkIcon, QrCode, Image as ImageIcon, Download } from 'lucide-react';

type Props = {
  benefit: UserBenefit;
  onClose: () => void;
};

const ShareBenefitModal: React.FC<Props> = ({ benefit, onClose }) => {
  const [activeTab, setActiveTab] = useState('link');
  const shareUrl = `https://haut.academy/r/${benefit.share_token}`;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-haut-surface rounded-lg max-w-2xl w-full border border-haut-border">
        <header className="p-4 border-b border-haut-border flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Compartilhar Benefício</h2>
          <button onClick={onClose} className="text-haut-muted hover:text-white"><X/></button>
        </header>

        <div className="flex border-b border-haut-border">
          <TabButton icon={<LinkIcon size={18}/>} label="Link" isActive={activeTab === 'link'} onClick={() => setActiveTab('link')} />
          <TabButton icon={<QrCode size={18}/>} label="QR Code" isActive={activeTab === 'qr'} onClick={() => setActiveTab('qr')} />
          <TabButton icon={<ImageIcon size={18}/>} label="Card Social" isActive={activeTab === 'card'} onClick={() => setActiveTab('card')} />
        </div>

        <div className="p-6">
          {activeTab === 'link' && (
            <div className="p-4 bg-haut-dark rounded-lg border border-haut-border">
              <p className="text-haut-muted text-sm mb-2">Link único de compartilhamento:</p>
              <div className="flex gap-2"><input type="text" value={shareUrl} readOnly className="flex-1 px-3 py-2 bg-haut-surface border border-haut-border rounded"/><button onClick={() => navigator.clipboard.writeText(shareUrl)} className="px-4 py-2 bg-haut-accent text-haut-dark rounded hover:brightness-90">Copiar</button></div>
            </div>
          )}
          {activeTab === 'qr' && (
            <div className="text-center space-y-4">
                <div className="inline-block p-4 bg-white rounded-lg"><div className="w-64 h-64 bg-gray-300 flex items-center justify-center text-gray-500">QR Code Placeholder</div></div>
                <button className="px-6 py-2 bg-haut-accent text-haut-dark rounded-lg hover:brightness-90 flex items-center gap-2 mx-auto"><Download size={16}/> Baixar QR Code</button>
            </div>
          )}
           {activeTab === 'card' && (
            <div className="space-y-4">
                <p className="text-haut-muted text-center">Escolha o formato do card personalizado:</p>
                <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 bg-haut-dark border border-haut-border rounded-lg hover:border-haut-accent text-center"><ImageIcon size={32} className="mx-auto mb-2 text-haut-accent"/><p className="text-white">Feed</p><p className="text-haut-muted text-xs">1080x1350</p></button>
                    <button className="p-4 bg-haut-dark border border-haut-border rounded-lg hover:border-haut-accent text-center"><ImageIcon size={32} className="mx-auto mb-2 text-haut-accent"/><p className="text-white">Story</p><p className="text-haut-muted text-xs">1080x1920</p></button>
                    <button className="p-4 bg-haut-dark border border-haut-border rounded-lg hover:border-haut-accent text-center"><ImageIcon size={32} className="mx-auto mb-2 text-haut-accent"/><p className="text-white">Banner</p><p className="text-haut-muted text-xs">1200x628</p></button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{icon: React.ReactNode, label: string, isActive: boolean, onClick: ()=>void}> = ({icon, label, isActive, onClick}) => (
    <button onClick={onClick} className={`flex-1 py-3 flex items-center justify-center gap-2 ${isActive ? 'bg-haut-dark/50 text-haut-accent border-b-2 border-haut-accent' : 'text-haut-muted hover:text-white'}`}>{icon} {label}</button>
)

export default ShareBenefitModal;
