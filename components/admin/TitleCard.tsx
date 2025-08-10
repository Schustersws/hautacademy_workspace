
import React from 'react';
import { Title } from '../../types';
import { Edit, Users, Trash2 } from 'lucide-react';
import { TitleIcon } from '../helpers/TitleIcon';

type Props = {
  title: Title;
  onEdit: (title: Title) => void;
};

const TitleCard: React.FC<Props> = ({ title, onEdit }) => {
  return (
    <div className="bg-haut-surface rounded-lg p-6 border border-haut-border hover:border-haut-accent transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
          style={{ backgroundColor: title.color + '20' }}
        >
          <TitleIcon iconKey={title.icon_key} style={{ color: title.color }} size={32} />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            title.is_active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {title.is_active ? 'Ativo' : 'Inativo'}
          </span>
          <span className="px-2 py-1 bg-haut-border rounded-full text-xs text-haut-muted capitalize">
            {title.category}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-2">{title.name}</h3>
      <p className="text-haut-muted text-sm mb-4 h-10 line-clamp-2">{title.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-haut-muted/70">Usuários:</span>
          <span className="text-white ml-2 font-semibold">{title.users_count || 0}</span>
        </div>
        <div>
          <span className="text-haut-muted/70">Prioridade:</span>
          <span className="text-white ml-2 font-semibold">{title.priority}</span>
        </div>
      </div>

      <div className="flex gap-2 border-t border-haut-border pt-4">
        <button
          onClick={() => onEdit(title)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-haut-border text-white rounded-md hover:bg-haut-border/70 text-sm"
        >
          <Edit size={14} />Editar
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-haut-border text-white rounded-md hover:bg-haut-border/70 text-sm">
          <Users size={14} />Atribuir
        </button>
        <button className="px-3 py-2 bg-haut-border text-haut-muted rounded-md hover:bg-red-500/20 hover:text-red-400">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default TitleCard;
