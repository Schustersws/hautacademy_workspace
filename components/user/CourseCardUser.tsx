import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../types';
import { BookOpen, Clock, BarChart } from 'lucide-react';

type Props = {
  course: Course;
};

const CourseCardUser: React.FC<Props> = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/course/${course.slug}`)} className="bg-haut-surface rounded-lg border border-haut-border overflow-hidden flex flex-col group transition-all duration-300 hover:border-haut-accent hover:shadow-2xl hover:shadow-haut-accent/10 cursor-pointer">
      <div className="relative h-48 bg-haut-dark">
        <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {course.enrollment && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-haut-border/50">
            <div className="h-full bg-haut-accent" style={{ width: `${course.enrollment.progress_percentage}%` }}></div>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-haut-accent font-semibold mb-1 uppercase">{course.level}</p>
        <h3 className="font-bold text-white mb-2 h-12 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-haut-muted flex items-center gap-2 mb-4">
            <img src={course.instructor?.avatar_url} className="w-6 h-6 rounded-full" />
            {course.instructor?.full_name}
        </p>
        <div className="mt-auto pt-2 border-t border-haut-border/50 flex items-center justify-between text-xs text-haut-muted">
             <span className="flex items-center gap-1"><BookOpen size={12}/> {course.lessons_count} aulas</span>
             <span className="flex items-center gap-1"><Clock size={12}/> {course.duration_hours}h</span>
             <span className="flex items-center gap-1"><BarChart size={12}/> {course.enrollments_count} alunos</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCardUser;
