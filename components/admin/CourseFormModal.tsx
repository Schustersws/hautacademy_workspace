import React, { useState } from 'react';
import { Course, CourseModule, Lesson } from '../../types';
import { createOrUpdateCourse } from '../../services/api';
import { X, Info, Book, Tag, Ribbon, Rocket, GripVertical, Trash2, PlusCircle, Video, FileText, File, TestTube2, Edit } from 'lucide-react';

type Props = {
  course: Course | null;
  onClose: () => void;
};

const CourseFormModal: React.FC<Props> = ({ course, onClose }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<Partial<Course>>(course || { status: 'draft' });
  const [modules, setModules] = useState<CourseModule[]>(course?.modules || []);

  const handleSave = async () => {
    await createOrUpdateCourse({ ...formData, modules });
    onClose();
  };
  
  const addModule = () => setModules([...modules, { id: `new_${Date.now()}`, course_id: formData.id || '', title: 'Novo Módulo', sort_order: modules.length + 1, lessons: [] }]);
  const addLesson = (moduleIndex: number) => {
      const newModules = [...modules];
      newModules[moduleIndex].lessons.push({ id: `new_lesson_${Date.now()}`, module_id: modules[moduleIndex].id, title: 'Nova Aula', type: 'video', is_preview: false, sort_order: modules[moduleIndex].lessons.length + 1 });
      setModules(newModules);
  };


  const tabs = [
    { id: 'basic', label: 'Informações', icon: <Info size={16}/> },
    { id: 'content', label: 'Conteúdo', icon: <Book size={16}/> },
    { id: 'pricing', label: 'Preço', icon: <Tag size={16}/> },
    { id: 'certificate', label: 'Certificado', icon: <Ribbon size={16}/> },
    { id: 'publish', label: 'Publicação', icon: <Rocket size={16}/> }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-haut-surface rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col border border-haut-border">
        <header className="px-6 py-4 flex justify-between items-center border-b border-haut-border">
          <h2 className="text-xl font-bold text-white">{course ? 'Editar Curso' : 'Novo Curso'}</h2>
          <button onClick={onClose} className="text-haut-muted hover:text-white"><X size={24}/></button>
        </header>
        <div className="border-b border-haut-border px-6"><div className="flex gap-4 -mb-px">{tabs.map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium transition ${activeTab === tab.id ? 'border-haut-accent text-haut-accent' : 'border-transparent text-haut-muted hover:text-white'}`}>{tab.icon} {tab.label}</button>))}</div></div>
        
        <main className="p-6 overflow-y-auto flex-grow">
          {activeTab === 'content' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center"><h3 className="text-white font-semibold">Módulos e Aulas</h3><button onClick={addModule} className="flex items-center gap-2 px-4 py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90"><PlusCircle size={18}/>Adicionar Módulo</button></div>
                <div className="space-y-4">
                    {modules.map((module, moduleIndex) => (
                        <div key={module.id} className="bg-haut-dark/50 rounded-lg p-4 border border-haut-border">
                             <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-3"><GripVertical className="text-haut-muted cursor-move"/><input type="text" className="px-3 py-1 bg-haut-surface border border-haut-border rounded text-white" value={module.title} /></div><button className="text-haut-muted hover:text-red-400"><Trash2 size={16}/></button></div>
                            <div className="ml-8 space-y-2">
                                {module.lessons.map((lesson, lessonIndex) => (
                                     <div key={lesson.id} className="flex items-center gap-2 bg-haut-surface p-2 rounded border border-haut-border"><GripVertical className="text-haut-muted cursor-move"/><input type="text" className="flex-1 px-2 py-1 bg-haut-dark border border-haut-border rounded text-sm" value={lesson.title}/><button className="p-1 text-haut-muted hover:text-white"><Edit size={14}/></button><button className="p-1 text-haut-muted hover:text-red-400"><Trash2 size={14}/></button></div>
                                ))}
                                <button onClick={() => addLesson(moduleIndex)} className="w-full py-2 border-2 border-dashed border-haut-border rounded text-haut-muted hover:border-haut-accent hover:text-haut-accent transition"><PlusCircle size={16} className="inline mr-2"/>Adicionar Aula</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          )}
          {/* Other tabs are placeholders */}
          {activeTab !== 'content' && <div className="text-haut-muted">Conteúdo da aba '{activeTab}' em construção.</div>}
        </main>

        <footer className="px-6 py-4 flex justify-end gap-3 border-t border-haut-border">
            <button onClick={onClose} className="px-6 py-2 bg-haut-border text-white rounded-lg hover:bg-haut-border/70">Cancelar</button>
            <button onClick={handleSave} className="px-6 py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90">Salvar Curso</button>
        </footer>
      </div>
    </div>
  );
};

export default CourseFormModal;