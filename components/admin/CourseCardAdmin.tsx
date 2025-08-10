import React from 'react';
import { Course } from '../../types';
import { Edit, BarChart2, Archive } from 'lucide-react';

type Props = {
  course: Course;
  onEdit: (course: Course) => void;
};

const CourseCardAdmin: React.FC<Props> = ({ course, onEdit }) => {
  const statusStyles = {
    published: 'bg-green-600/10 text-green-400',
    draft: 'bg-yellow-600/10 text-yellow-400',
    archived: 'bg-gray-600/10 text-gray-400',
  };

  return (
    <div className="bg-haut-surface rounded-lg overflow-hidden border border-haut-border hover:border-haut-accent transition flex flex-col">
      <div className="relative h-48 bg-haut-dark">
        <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
        <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[course.status]}`}>
          {course.status}
        </span>
        <span className={`absolute bottom-2 left-2 px-3 py-1 font-bold rounded ${course.is_free ? 'bg-green-600/80 text-white' : 'bg-haut-accent/90 text-haut-dark'}`}>
          {course.is_free ? 'GRATUITO' : `R$ ${(course.price_cents / 100).toFixed(2)}`}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{course.title}</h3>
        <p className="text-haut-muted text-sm mb-3 h-10 line-clamp-2">{course.subtitle}</p>
        <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-center">
          <div><p className="text-white font-semibold">{course.modules_count || 0}</p><p className="text-haut-muted/70 text-xs">Módulos</p></div>
          <div><p className="text-white font-semibold">{course.lessons_count || 0}</p><p className="text-haut-muted/70 text-xs">Aulas</p></div>
          <div><p className="text-white font-semibold">{course.enrollments_count || 0}</p><p className="text-haut-muted/70 text-xs">Alunos</p></div>
        </div>
        <div className="mt-auto pt-4 border-t border-haut-border flex gap-2">
          <button onClick={() => onEdit(course)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-haut-border text-white rounded-md hover:bg-haut-border/70 text-sm"><Edit size={14}/>Editar</button>
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-haut-border text-white rounded-md hover:bg-haut-border/70 text-sm"><BarChart2 size={14}/>Analytics</button>
          <button className="px-3 py-2 bg-haut-border text-haut-muted rounded-md hover:bg-red-500/20 hover:text-red-400"><Archive size={14}/></button>
        </div>
      </div>
    </div>
  );
};

export default CourseCardAdmin;
