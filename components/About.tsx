
import React from 'react';
import { Award, Users, Rocket, Clock, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  const stats = [
    { label: 'Projetos Concluídos', value: '1,200+', icon: <Rocket /> },
    { label: 'Instrutor MCT', value: 'Certificado', icon: <ShieldCheck /> },
    { label: 'Horas de Aula', value: '15,000+', icon: <Clock /> },
    { label: 'Nota Média', value: '4.9/5', icon: <Award /> },
  ];

  return (
    <section id="sobre" className="py-24 relative overflow-hidden bg-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-700/5 rounded-full blur-3xl"></div>
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
                alt="Tecnologia e Dados Treinatech"
                className="w-full h-[550px] object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-sm font-bold uppercase tracking-widest text-green-400 mb-2">Nossa Essência</p>
                <p className="text-xl font-medium leading-relaxed italic">
                  "Capacitar profissionais não é apenas sobre software, é sobre liberdade e decisão estratégica."
                </p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="flex flex-wrap gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/50 text-green-400 text-xs font-bold uppercase tracking-widest">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Conheça a Treinatech
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 text-xs font-bold uppercase tracking-widest border border-blue-800/50">
                    MCT - Microsoft Certified Trainer
                </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-8 leading-tight">
              Uma trajetória dedicada à <span className="text-green-400">excelência em dados</span>.
            </h2>

            <div className="space-y-6 text-lg text-slate-300 leading-relaxed mb-10">
              <p className="font-medium text-slate-200">
                A Treinatech nasceu da percepção de que o mercado corporativo brasileiro possuía uma lacuna imensa: profissionais com excelentes ideias, mas com dificuldades técnicas para traduzi-las em dados acionáveis.
              </p>
              <p>
                Todos os nossos treinamentos são ministrados por instrutores com a prestigiosa certificação <span className="text-white font-bold">MCT (Microsoft Certified Trainer)</span>, garantindo que você receba uma instrução que segue os mais rigorosos padrões globais de qualidade e didática da Microsoft.
              </p>
              <p>
                Hoje, somos referência em treinamentos in-company e capacitação individual, ajudando milhares de alunos a conquistarem promoções e empresas a reduzirem custos através da automação e análise inteligente.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-green-400 border border-slate-700 group-hover:bg-green-700 group-hover:text-white transition-all duration-300">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
