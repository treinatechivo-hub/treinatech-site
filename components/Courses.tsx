
import React, { useState, useEffect } from 'react';
import { COURSES } from '../constants';
import { CheckCircle2, X, ArrowRight, BookOpen } from 'lucide-react';
import { Course } from '../types';

export const Courses: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Fecha o modal ao pressionar ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedCourse(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Impede o scroll do body quando o modal está aberto
  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedCourse]);

  return (
    <section id="cursos" className="py-24 bg-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Nossos Treinamentos</h2>
          <p className="text-lg text-slate-300">
            Cursos desenhados por profissionais ativos no mercado para garantir que você aprenda o que realmente importa. Clique nos cards para ver o cronograma completo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {COURSES.map((course) => {
            const badgeStyles = {
              green: 'bg-green-500 text-white',
              blue: 'bg-blue-500 text-white',
              purple: 'bg-purple-500 text-white',
            };
            return (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="group text-left bg-slate-800 rounded-[2rem] p-8 border-2 border-slate-700 hover:border-green-500 transition-all hover:shadow-2xl hover:shadow-green-900/20 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-bl-[100px] opacity-0 group-hover:opacity-40 transition-opacity"></div>

              {/* Badge */}
              {course.badge && (
                <span className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeStyles[course.badgeColor ?? 'green']}`}>
                  {course.badge}
                </span>
              )}

              <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center text-green-400 shadow-sm mb-6 group-hover:bg-green-700 group-hover:text-white transition-colors duration-500">
                {course.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">{course.title}</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">{course.description}</p>

              <ul className="space-y-3 mb-8">
                {course.topics.map((topic, idx) => (
                  <li key={idx} className="flex items-center text-sm font-medium text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-2 shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>

              <div className="inline-flex items-center text-green-400 font-bold">
                Ver conteúdo completo
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
            );
          })}
        </div>
      </div>

      {/* Modal de Detalhes do Curso */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedCourse(null)}
          ></div>
          
          {/* Conteúdo do Modal */}
          <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 fade-in duration-300">
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-6 sm:p-10 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-green-700 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/20">
                    {selectedCourse.icon}
                </div>
                <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{selectedCourse.title}</h3>
                    <p className="text-green-700 font-bold text-sm uppercase tracking-widest flex items-center gap-2 mt-1">
                        <BookOpen size={14} />
                        Conteúdo Programático
                    </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="p-3 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-900 shadow-sm border border-transparent hover:border-slate-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* Corpo do Modal (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10">
                <div className="mb-10">
                    <h4 className="text-lg font-bold text-slate-900 mb-4">Sobre o treinamento</h4>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        {selectedCourse.modalDescription}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {selectedCourse.fullSyllabus.map((module, mIdx) => (
                        <div key={mIdx} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 group hover:border-green-200 transition-colors">
                            <h5 className="text-green-700 font-bold mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-xs">0{mIdx + 1}</span>
                                {module.title}
                            </h5>
                            <ul className="space-y-3">
                                {module.items.map((item, iIdx) => (
                                    <li key={iIdx} className="flex items-start gap-3 text-sm text-slate-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-8 bg-green-50 rounded-3xl border border-green-100">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="max-w-md">
                            <h4 className="text-xl font-bold text-green-900 mb-2">Ficou com alguma dúvida?</h4>
                            <p className="text-green-800/70">Nossos consultores estão prontos para te ajudar a escolher a melhor trilha para seu momento de carreira.</p>
                        </div>
                        <a 
                            href="#contato" 
                            onClick={() => setSelectedCourse(null)}
                            className="w-full md:w-auto px-8 py-4 bg-green-700 text-white font-bold rounded-2xl hover:bg-green-800 transition-all text-center shadow-lg shadow-green-900/10"
                        >
                            Quero me inscrever
                        </a>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
