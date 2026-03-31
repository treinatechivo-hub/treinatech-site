import React from 'react';
import { Play, ArrowRight, CheckCircle, Clock, Users } from 'lucide-react';

export const DemoPage: React.FC = () => {
  return (
    <main className="pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest text-green-400 bg-green-900/40 rounded-full">
            Demonstração
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Veja a Treinatech em ação
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Em breve disponibilizamos um vídeo completo de 30 segundos mostrando como nossas aulas transformam profissionais em especialistas de dados.
          </p>
        </div>

        {/* Player placeholder */}
        <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl aspect-video flex items-center justify-center mb-12 group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 to-slate-900/80" />

          {/* Dashboard decorativo de fundo */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
              <rect x="20" y="20" width="200" height="120" rx="8" fill="#1e293b"/>
              <rect x="40" y="80" width="20" height="40" rx="2" fill="#3b82f6"/>
              <rect x="70" y="60" width="20" height="60" rx="2" fill="#3b82f6"/>
              <rect x="100" y="50" width="20" height="70" rx="2" fill="#60a5fa"/>
              <rect x="130" y="70" width="20" height="50" rx="2" fill="#3b82f6"/>
              <rect x="160" y="55" width="20" height="65" rx="2" fill="#93c5fd"/>
              <rect x="240" y="20" width="180" height="120" rx="8" fill="#1e293b"/>
              <circle cx="330" cy="80" r="40" fill="none" stroke="#10b981" strokeWidth="16"/>
              <circle cx="330" cy="80" r="40" fill="none" stroke="#f59e0b" strokeWidth="16" strokeDasharray="60 192" strokeDashoffset="-80"/>
              <rect x="440" y="20" width="340" height="120" rx="8" fill="#1e293b"/>
              <polyline points="460,120 510,100 560,80 610,90 660,60 710,45 760,55" fill="none" stroke="#10b981" strokeWidth="2"/>
              <rect x="20" y="160" width="380" height="270" rx="8" fill="#1e293b"/>
              <rect x="440" y="160" width="340" height="270" rx="8" fill="#1e293b"/>
              <rect x="460" y="185" width="140" height="12" rx="4" fill="#f59e0b" opacity="0.8"/>
              <rect x="460" y="210" width="110" height="12" rx="4" fill="#3b82f6" opacity="0.8"/>
              <rect x="460" y="235" width="160" height="12" rx="4" fill="#10b981" opacity="0.8"/>
              <rect x="460" y="260" width="90" height="12" rx="4" fill="#ef4444" opacity="0.8"/>
            </svg>
          </div>

          {/* Botão de play */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-white/10 border-2 border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-colors">
              <Play className="w-8 h-8 text-white fill-current ml-1" />
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">Vídeo em produção</p>
              <p className="text-white/60 text-sm">Disponível em breve</p>
            </div>
          </div>
        </div>

        {/* Roteiro da demo (30s) */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-green-100 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-700">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900">Roteiro da demonstração — 30 segundos</p>
              <p className="text-sm text-slate-500">Script para gravação profissional futura</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { time: '0–5s', cena: 'Abertura com logo animada da Treinatech + tagline "Sua carreira em dados começa aqui"' },
              { time: '5–12s', cena: 'Tela de uma aula ao vivo: instrutor explicando DAX no Power BI com dashboard aberto' },
              { time: '12–20s', cena: 'Split-screen: antes (planilha bagunçada) vs depois (dashboard profissional em Power BI)' },
              { time: '20–26s', cena: 'Depoimento de 5s de aluno real: "Consegui minha promoção 3 meses depois do curso"' },
              { time: '26–30s', cena: 'Call-to-action final: Logo + "Comece hoje — treinatech.com.br"' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap mt-0.5">
                  {item.time}
                </span>
                <p className="text-slate-600 text-sm leading-relaxed">{item.cena}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Destaques */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <CheckCircle className="w-6 h-6 text-green-600" />, label: 'Certificação MCT', desc: 'Microsoft Certified Trainer — reconhecido pelo mercado' },
            { icon: <Users className="w-6 h-6 text-green-600" />, label: '+5.000 alunos', desc: 'Cooperativas, empresas e profissionais em todo o Brasil' },
            { icon: <Play className="w-6 h-6 text-green-600" />, label: 'Aulas práticas', desc: 'Aprenda com projetos reais do mercado de dados' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm flex gap-4 items-start">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{item.label}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contato"
            onClick={() => { window.location.hash = ''; setTimeout(() => { window.location.hash = ''; const el = document.getElementById('contato'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 50); }}
            className="inline-flex items-center gap-3 bg-green-700 text-white font-bold px-10 py-5 rounded-2xl hover:bg-green-800 transition-all shadow-xl hover:shadow-green-900/20 active:scale-95 group"
          >
            Quero começar agora
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="text-slate-400 text-sm mt-4">Ou{' '}
            <a href="https://wa.me/5541991832100" target="_blank" rel="noopener noreferrer" className="text-green-400 font-bold hover:underline">
              fale pelo WhatsApp
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};
