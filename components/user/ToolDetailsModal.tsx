import React, { useState, useEffect } from 'react';
import { Tool } from '../../types';
import { getToolDetails } from '../../services/api';
import { X, CheckSquare, ExternalLink, Download, Code, Video, Bot } from 'lucide-react';

type Props = {
  tool: Tool;
  onClose: () => void;
};

const getCTALabel = (type: Tool['type']) => {
  switch(type) {
    case 'link': return 'Abrir Link';
    case 'download': return 'Baixar Arquivo';
    case 'html_embed': return 'Abrir App';
    case 'video': return 'Assistir Vídeo';
    case 'automation': return 'Executar';
    default: return 'Acessar';
  }
};

const getCTAIcon = (type: Tool['type']) => {
    switch(type) {
        case 'link': return <ExternalLink size={18}/>;
        case 'download': return <Download size={18}/>;
        case 'html_embed': return <Code size={18}/>;
        case 'video': return <Video size={18}/>;
        case 'automation': return <Bot size={18}/>;
        default: return <ExternalLink size={18}/>;
    }
};

const ToolDetailsModal: React.FC<Props> = ({ tool: initialTool, onClose }) => {
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    getToolDetails(initialTool.id).then(data => {
      setTool(data);
      setLoading(false);
    });
  }, [initialTool.id]);
  
  const handlePrimaryAction = () => {
    if (!tool) return;
    // In a real app, track usage here via API
    console.log(`Action '${tool.type}' triggered for tool: ${tool.name}`);
    
    let urlToOpen = tool.external_url || tool.download_url || tool.video_url || tool.embed_url;
    if (urlToOpen) {
      window.open(urlToOpen, '_blank');
    }
    onClose();
  };

  if (loading || !tool) {
      return (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <div className="text-white">Carregando detalhes...</div>
          </div>
      )
  }

  const canPerformAction = !tool.requires_ack || (tool.requires_ack && termsAccepted);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-haut-surface rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col border border-haut-border">
        <header className="relative h-64 bg-haut-dark">
          {tool.banner_url && <img src={tool.banner_url} alt={tool.name} className="w-full h-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
            <h2 className="text-3xl font-bold text-white">{tool.name}</h2>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white hover:bg-black/70"><X size={24}/></button>
        </header>

        <main className="p-6 flex-grow overflow-y-auto space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Sobre esta ferramenta</h3>
            <div className="text-haut-muted prose prose-invert max-w-none prose-sm" dangerouslySetInnerHTML={{ __html: tool.description_html }}/>
          </div>

          {tool.requires_ack && (
            <div className="p-4 bg-haut-dark/50 border border-haut-border rounded-lg">
                <h3 className="text-lg font-semibold text-haut-accent mb-2 flex items-center gap-2"><CheckSquare size={20}/> Termos de Uso</h3>
                <div className="text-sm text-haut-muted mb-4 max-h-32 overflow-y-auto prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: tool.terms_html || '' }} />
                <label className="flex items-center gap-3 p-3 bg-haut-dark border border-haut-border rounded-lg">
                    <input type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} className="w-5 h-5 rounded bg-haut-border border-haut-border text-haut-accent focus:ring-haut-accent" />
                    <span className="text-white">Li e aceito os termos de uso</span>
                </label>
            </div>
          )}
        </main>
        
        <footer className="p-4 mt-auto border-t border-haut-border flex justify-end">
            <button
                onClick={handlePrimaryAction}
                disabled={!canPerformAction}
                className="px-6 py-3 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {getCTAIcon(tool.type)} {getCTALabel(tool.type)}
            </button>
        </footer>
      </div>
    </div>
  );
};

export default ToolDetailsModal;
