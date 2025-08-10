import React from 'react';
import { Tool } from '../../types';
import { MoreVertical, BookOpen, HelpCircle } from 'lucide-react';

type Props = {
  tool: Tool;
  onSelect: () => void;
};

const getCTALabel = (type: Tool['type']) => {
  switch(type) {
    case 'link': return 'Abrir Link';
    case 'download': return 'Baixar Arquivo';
    case 'html_embed': return 'Abrir App';
    case 'video': return 'Assistir Vídeo';
    case 'automation': return 'Executar Automação';
    default: return 'Acessar';
  }
};

const ToolCardUser: React.FC<Props> = ({ tool, onSelect }) => {
  return (
    <div className="bg-haut-surface rounded-lg border border-haut-border overflow-hidden flex flex-col group transition-all duration-300 hover:border-haut-accent hover:shadow-2xl hover:shadow-haut-accent/10">
      <div className="relative h-48 bg-haut-dark cursor-pointer" onClick={onSelect}>
        {tool.banner_url ? (
          <img src={tool.banner_url} alt={tool.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-6xl opacity-50">{tool.icon_key || '🛠️'}</span>
          </div>
        )}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
            {tool.is_new && <Badge color="green">Novo</Badge>}
            {tool.is_updated && <Badge color="blue">Atualizado</Badge>}
        </div>
        <div className="absolute -bottom-6 right-4 w-12 h-12 bg-haut-border rounded-full flex items-center justify-center border-4 border-haut-surface text-haut-accent">
          <span className="text-2xl">{tool.icon_key || '🛠️'}</span>
        </div>
      </div>

      <div className="p-4 pt-8 flex flex-col flex-grow">
        <h3 className="font-bold text-white mb-2 h-12 line-clamp-2">{tool.name}</h3>
        <p className="text-haut-muted text-sm mb-4 h-10 line-clamp-2">{tool.short_description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-haut-dark text-xs rounded-full text-haut-muted">{tool.category?.name}</span>
          <span className="px-2 py-1 bg-haut-dark text-xs rounded-full text-haut-muted capitalize">{tool.type.replace('_', ' ')}</span>
        </div>

        <div className="mt-auto">
          <button
            onClick={onSelect}
            className="w-full px-4 py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 transition"
          >
            {getCTALabel(tool.type)}
          </button>
        </div>
      </div>
    </div>
  );
};

const Badge: React.FC<{color: 'green' | 'blue', children: React.ReactNode}> = ({color, children}) => {
    const styles = {
        green: 'bg-green-500/80 text-white',
        blue: 'bg-blue-500/80 text-white',
    }
    return <span className={`px-2 py-0.5 text-xs font-bold rounded ${styles[color]}`}>{children}</span>
}

export default ToolCardUser;
