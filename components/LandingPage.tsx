
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Sliders, GraduationCap, Users, Gift, Clapperboard, CheckCircle } from 'lucide-react';

const featureItems = [
  { icon: <Calendar size={32} className="text-haut-accent" />, title: "Eventos Exclusivos", description: "Presenciais e online, com curadoria Haut" },
  { icon: <Sliders size={32} className="text-haut-accent" />, title: "Ferramentas de Gestão", description: "Documentos, playbooks e recursos operacionais" },
  { icon: <GraduationCap size={32} className="text-haut-accent" />, title: "Plataforma de Ensino", description: "Trilhas, cursos e certificações internas" },
  { icon: <Users size={32} className="text-haut-accent" />, title: "Comunidade Ativa", description: "Grupos por área, fóruns e networking" },
  { icon: <Gift size={32} className="text-haut-accent" />, title: "Benefícios Exclusivos", description: "Acordos com parceiros e condições especiais" },
  { icon: <Clapperboard size={32} className="text-haut-accent" />, title: "Live Academy", description: "Transmissões e sessões práticas em tempo real" }
];

const whyChooseItems = [
  "Acesso Completo ao ecossistema Haut",
  "Conteúdo Exclusivo e atualizado",
  "Networking Qualificado com parceiros",
  "Suporte Dedicado da equipe Haut"
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-haut-dark text-haut-text animate-fadeIn">
      <section className="bg-gradient-to-b from-haut-dark via-haut-dark to-haut-surface py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-haut-accent">
            Haut Academy Workspace
          </h1>
          <p className="text-lg md:text-xl text-haut-muted mb-10 max-w-3xl mx-auto">
            Plataforma corporativa para crescimento profissional e orquestração de operações do ecossistema Haut Group.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 transition-all transform hover:scale-105"
            >
              Fazer Login
            </button>
            <button 
              onClick={() => navigate('/request-access')}
              className="px-8 py-4 border-2 border-haut-accent text-haut-accent font-bold rounded-lg hover:bg-haut-accent hover:text-haut-dark transition-all transform hover:scale-105"
            >
              Solicitar Acesso
            </button>
          </div>
          <p className="mt-6 text-sm text-haut-muted/70">
            Acesso restrito a membros e parceiros Haut • Dados protegidos
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureItems.map((item, index) => (
              <div key={index} className="bg-haut-surface p-8 rounded-xl border border-haut-border hover:border-haut-accent transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-haut-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-haut-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Por que escolher o Haut Academy Workspace?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {whyChooseItems.map((item, index) => (
                <div key={index} className="flex items-center text-lg text-haut-text">
                  <CheckCircle className="w-6 h-6 mr-3 text-haut-accent" />
                  {item}
                </div>
              ))}
            </div>
            <div className="bg-haut-accent text-haut-dark p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">
                Pronto para transformar seu negócio?
              </h3>
              <p className="mb-6 opacity-80">
                Junte-se a centenas de parceiros que já fazem parte do ecossistema Haut.
              </p>
              <button 
                onClick={() => navigate('/request-access')}
                className="bg-haut-dark text-haut-accent px-6 py-3 rounded-md font-bold hover:bg-black/80 transition-colors"
              >
                Solicitar Acesso
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-haut-border">
        <div className="max-w-7xl mx-auto text-center text-haut-muted">
          <p className="mb-4">Acesso restrito a membros e parceiros Haut</p>
          <div className="flex gap-6 justify-center mb-4">
            <a href="#/privacy" className="hover:text-white transition">Política de Privacidade</a>
            <a href="#/terms" className="hover:text-white transition">Termos de Uso</a>
            <a href="mailto:suporte@hautacademy.com" className="hover:text-white transition">Contato</a>
          </div>
          <p>© 2025 Haut Academy Workspace. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
