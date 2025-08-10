import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseDetails } from '../../services/api';
import { Course, Lesson } from '../../types';
import { ChevronLeft, ChevronRight, CheckCircle, PlayCircle, Lock, Store, Gift } from 'lucide-react';

const CoursePlayerPage: React.FC = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (courseSlug) {
      getCourseDetails(courseSlug).then(data => {
        setCourse(data);
        if (data?.modules?.[0]?.lessons?.[0]) {
          setCurrentLesson(data.modules[0].lessons[0]);
        }
      });
    }
  }, [courseSlug]);

  if (!course || !currentLesson) {
    return <div className="min-h-screen bg-haut-dark flex items-center justify-center">Carregando curso...</div>;
  }

  return (
    <div className="min-h-screen bg-haut-dark text-white flex">
      <main className="flex-1 flex flex-col">
        <header className="bg-haut-surface border-b border-haut-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/academy" className="text-haut-muted hover:text-white"><ChevronLeft size={20}/></Link>
            <div>
              <p className="text-haut-muted text-sm">{course.title}</p>
              <h1 className="text-lg font-bold text-white">{currentLesson.title}</h1>
            </div>
          </div>
        </header>

        <div className="flex-1 bg-black aspect-video">
           {currentLesson.video_url ? (
             <iframe src={currentLesson.video_url} title={currentLesson.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
           ) : (
             <div className="w-full h-full flex items-center justify-center bg-haut-dark"><p>Conteúdo da aula aqui.</p></div>
           )}
        </div>
        
        <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Sobre esta aula</h2>
            <p className="text-haut-muted">Descrição detalhada da aula viria aqui...</p>
        </div>

        <footer className="mt-auto sticky bottom-0 bg-haut-surface border-t border-haut-border px-6 py-3 flex items-center justify-between">
          <button className="flex items-center gap-2 text-haut-muted hover:text-white"><ChevronLeft size={18}/> Aula Anterior</button>
          <button className="px-6 py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90">Marcar como Concluída</button>
          <button className="flex items-center gap-2 text-haut-muted hover:text-white">Próxima Aula <ChevronRight size={18}/></button>
        </footer>
      </main>

      <aside className="w-80 bg-haut-surface border-l border-haut-border flex-col flex">
        <div className="p-4 border-b border-haut-border">
          <h3 className="text-white font-semibold">Conteúdo do Curso</h3>
          <p className="text-sm text-haut-muted mt-1">33% concluído</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {course.modules?.map(module => (
            <div key={module.id} className="p-4 border-b border-haut-border">
              <h4 className="text-white font-medium text-sm mb-2">{module.title}</h4>
              <div className="space-y-1">
                {module.lessons.map(lesson => (
                  <button key={lesson.id} onClick={() => setCurrentLesson(lesson)} className={`w-full text-left p-2 rounded-md flex items-center gap-3 transition ${currentLesson.id === lesson.id ? 'bg-haut-accent/10' : 'hover:bg-haut-border'}`}>
                    <PlayCircle size={16} className={currentLesson.id === lesson.id ? 'text-haut-accent' : 'text-haut-muted'} />
                    <span className={`text-sm flex-1 ${currentLesson.id === lesson.id ? 'text-haut-accent' : 'text-haut-muted'}`}>{lesson.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default CoursePlayerPage;