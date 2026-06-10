import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';

export const DemoPage: React.FC = () => {
  return (
    <main className="pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-900/40 rounded-full">
            Treinamento Gratuito
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Introdução à IA com Foco no Claude
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Assista à aula de abertura do nosso treinamento gratuito. Em 1h30, você sai com
            3 usos práticos funcionando — sem nenhum conhecimento prévio.
          </p>
        </div>

        {/* Vídeo de Abertura */}
        <div className="mb-14">
          <div className="bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700">
              <div className="w-9 h-9 bg-violet-700 rounded-xl flex items-center justify-center">
                <PlayCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Aula de Abertura</p>
                <p className="text-slate-400 text-xs">Introdução à IA com Foco no Claude — Gratuito</p>
              </div>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                title="Abertura — Treina IA"
                src="https://www.youtube.com/embed/TC8lC3Qqb30"
                frameBorder="0"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-slate-300 text-base mb-6">
            Quer acessar o treinamento completo?
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
            className="inline-flex items-center gap-3 bg-violet-700 text-white font-bold px-10 py-5 rounded-2xl hover:bg-violet-800 transition-all shadow-xl hover:shadow-violet-900/20 active:scale-95 group"
          >
            Solicitar treinamento
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="text-slate-400 text-sm mt-4">
            Ou{' '}
            <a href="https://wa.me/5541991832100" target="_blank" rel="noopener noreferrer" className="text-violet-400 font-bold hover:underline">
              fale pelo WhatsApp
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};
