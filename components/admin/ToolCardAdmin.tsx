import React from 'react';
import { Tool } from '../../types';
import { Edit, Link as LinkIcon, Download, Code, Video, Bot, Package } from 'lucide-react';

type Props = {
  tool: Tool;
  onEdit: (tool: Tool) => void;
};

const typeIcons: { [key in Tool['type']]: React.ReactNode } = {
  link: <LinkIcon size={14} />,
  download: <Download size={14} />,
  html_embed: <Code size={14} />,
  video: <Video size={14} />,
  automation: <Bot size={14} />,
};

const ToolCardAdmin: React.FC<Props> = ({ tool, onEdit }) => {
  const statusStyles = {
    active: 'bg-green-600/10 text-green-400',
    draft: 'bg-yellow-600/10 text-yellow-400',
    archived: 'bg-gray-600/10 text-gray-400',
  };

  return (
    <div className="bg-haut-surface rounded-lg overflow-hidden border border-haut-border hover:border-haut-accent transition flex flex-col">
      <div className="relative h-48 bg-haut-dark">
        {tool.banner_url ? (
          <img src={tool.banner_url} alt={tool.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-haut-muted"><Package size={48} /></div>
        )}
        <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[tool.status]}`}>
          {tool.status}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 h-12 line-clamp-2">{tool.name}</h3>
        <p className="text-haut-muted text-sm mb-4 h-10 line-clamp-2">{tool.short_description}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="flex items-center gap-1.5 px-2 py-1 bg-haut-border text-xs rounded-full text-haut-muted capitalize">{typeIcons[tool.type]} {tool.type.replace('_',' ')}</span>
          <span className="px-2 py-1 bg-haut-border text-xs rounded-full text-haut-muted">{tool.category?.name}</span>
          {tool.visibility_mode === 'segmented' && <span className="px-2 py-1 bg-yellow-600/10 text-yellow-400 text-xs rounded-full">Segmentado</span>}
        </div>
        <div className="mt-auto pt-4 border-t border-haut-border flex gap-2">
          <button onClick={() => onEdit(tool)} className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-haut-border text-white rounded-md hover:bg-haut-border/70 text-sm">
            <Edit size={14}/>Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolCardAdmin;