import React from 'react';
import { BarChart3, ArrowRight, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  iframeSrc: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Demonstrativo de Vendas',
    iframeSrc: 'https://app.powerbi.com/view?r=eyJrIjoiZDYzZGMwYjQtZDM0Yy00NjhhLTk3MzMtYzYyNTU2MzVjYjBjIiwidCI6ImNhNWFmOGFlLThkZjMtNDM3OS1hMGU5LTA5YWM4ZmE1YTk5ZCJ9',
  },
  {
    title: 'International Motors',
    iframeSrc: 'https://app.powerbi.com/view?r=eyJrIjoiMWY0NDMzY2EtZTk4OS00ZjZiLTlmMTAtYjU3OGJlNDk5ZGEzIiwidCI6ImNhNWFmOGFlLThkZjMtNDM3OS1hMGU5LTA5YWM4ZmE1YTk5ZCJ9',
  },
  {
    title: 'Lançamento de Produtos',
    iframeSrc: 'https://app.powerbi.com/view?r=eyJrIjoiZDE3ODQ3ZGQtYjRjZS00OTVjLWI1NTctNzU0MzJhYWU0MDVjIiwidCI6ImNhNWFmOGFlLThkZjMtNDM3OS1hMGU5LTA5YWM4ZmE1YTk5ZCJ9',
  },
];

export const DemoPage: React.FC = () => {
  return (
    <main className="pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest text-green-400 bg-green-900/40 rounded-full">
            Projetos Reais
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Dashboards criados nos treinamentos
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Estes são projetos desenvolvidos durante os treinamentos corporativos — dados reais,
            decisões reais, resultados reais.
          </p>
        </div>

        {/* Lista de projetos empilhados */}
        <div className="flex flex-col gap-8 mb-8">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">

              {/* Header do card */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-700 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white font-bold text-sm">{project.title}</p>
                </div>
                <a
                  href={project.iframeSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 font-bold transition-colors"
                >
                  Abrir em tela cheia
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* iframe responsivo */}
              <div className="relative w-full" style={{ paddingBottom: '62.25%' }}>
                <iframe
                  title={project.title}
                  src={project.iframeSrc}
                  frameBorder="0"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Nota de rodapé */}
        <p className="text-center text-slate-500 text-xs mb-12">
          Dados utilizados com autorização dos clientes. Projetos desenvolvidos durante treinamentos corporativos da Treinatech.
        </p>

        {/* CTA */}
        <div className="text-center">
          <p className="text-slate-300 text-base mb-6">
            Quer sua equipe criando dashboards assim?
          </p>
          <a
            href="#contato"
            onClick={() => {
              window.location.hash = '';
              setTimeout(() => {
                const el = document.getElementById('contato');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="inline-flex items-center gap-3 bg-green-700 text-white font-bold px-10 py-5 rounded-2xl hover:bg-green-800 transition-all shadow-xl hover:shadow-green-900/20 active:scale-95 group"
          >
            Solicitar treinamento
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="text-slate-400 text-sm mt-4">
            Ou{' '}
            <a href="https://wa.me/5541991832100" target="_blank" rel="noopener noreferrer" className="text-green-400 font-bold hover:underline">
              fale pelo WhatsApp
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};
