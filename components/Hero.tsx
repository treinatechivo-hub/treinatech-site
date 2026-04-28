
import React from 'react';
import { ArrowRight, Play, BarChart3, ThumbsUp } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Fundo: SVG de dashboard escuro com gráficos coloridos */}
      <div className="absolute inset-0 -z-20" style={{ background: '#0f172a' }}>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          {/* Fundo escuro base */}
          <rect width="1200" height="700" fill="#0f172a"/>
          {/* Cards de dashboard */}
          {/* Card 1 - gráfico de barras azul */}
          <rect x="20" y="20" width="280" height="180" rx="10" fill="#1e293b"/>
          <text x="35" y="45" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">Vendas Mensais</text>
          <rect x="40" y="120" width="28" height="60" rx="3" fill="#3b82f6" opacity="0.9"/>
          <rect x="80" y="95" width="28" height="85" rx="3" fill="#3b82f6" opacity="0.9"/>
          <rect x="120" y="75" width="28" height="105" rx="3" fill="#60a5fa" opacity="0.9"/>
          <rect x="160" y="55" width="28" height="125" rx="3" fill="#3b82f6" opacity="0.9"/>
          <rect x="200" y="80" width="28" height="100" rx="3" fill="#93c5fd" opacity="0.9"/>
          <rect x="240" y="60" width="28" height="120" rx="3" fill="#3b82f6" opacity="0.9"/>
          {/* Card 2 - donut chart */}
          <rect x="320" y="20" width="220" height="180" rx="10" fill="#1e293b"/>
          <text x="335" y="45" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">Distribuição</text>
          <circle cx="430" cy="115" r="55" fill="none" stroke="#1d4ed8" strokeWidth="22"/>
          <circle cx="430" cy="115" r="55" fill="none" stroke="#f59e0b" strokeWidth="22" strokeDasharray="100 246" strokeDashoffset="-80"/>
          <circle cx="430" cy="115" r="55" fill="none" stroke="#10b981" strokeWidth="22" strokeDasharray="70 276" strokeDashoffset="-180"/>
          <circle cx="430" cy="115" r="55" fill="none" stroke="#ef4444" strokeWidth="22" strokeDasharray="50 296" strokeDashoffset="-250"/>
          <circle cx="430" cy="115" r="28" fill="#1e293b"/>
          {/* Card 3 - linha chart */}
          <rect x="560" y="20" width="300" height="180" rx="10" fill="#1e293b"/>
          <text x="575" y="45" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">Crescimento Anual</text>
          <polyline points="580,160 620,140 660,120 700,130 740,90 780,70 820,80 840,60" fill="none" stroke="#10b981" strokeWidth="2.5"/>
          <polyline points="580,170 620,165 660,150 700,155 740,130 780,115 820,125 840,100" fill="none" stroke="#6366f1" strokeWidth="2.5"/>
          {/* Card 4 - KPIs */}
          <rect x="880" y="20" width="300" height="180" rx="10" fill="#1e293b"/>
          <text x="895" y="45" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">Indicadores</text>
          <rect x="895" y="60" width="120" height="45" rx="6" fill="#1d4ed8" opacity="0.3"/>
          <text x="910" y="78" fill="#60a5fa" fontSize="10" fontFamily="sans-serif">Receita</text>
          <text x="910" y="95" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">R$4.2M</text>
          <rect x="1030" y="60" width="120" height="45" rx="6" fill="#059669" opacity="0.3"/>
          <text x="1045" y="78" fill="#34d399" fontSize="10" fontFamily="sans-serif">Margem</text>
          <text x="1045" y="95" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">32.4%</text>
          <rect x="895" y="120" width="120" height="45" rx="6" fill="#7c3aed" opacity="0.3"/>
          <text x="910" y="138" fill="#a78bfa" fontSize="10" fontFamily="sans-serif">Usuários</text>
          <text x="910" y="155" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">18,432</text>
          <rect x="1030" y="120" width="120" height="45" rx="6" fill="#dc2626" opacity="0.3"/>
          <text x="1045" y="138" fill="#f87171" fontSize="10" fontFamily="sans-serif">Churn</text>
          <text x="1045" y="155" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">2.1%</text>
          {/* Row 2 */}
          {/* Card 5 - área chart */}
          <rect x="20" y="220" width="360" height="200" rx="10" fill="#1e293b"/>
          <text x="35" y="245" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">Performance por Região</text>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polygon points="35,400 90,360 145,340 200,355 255,310 310,290 360,300 360,420 35,420" fill="url(#areaGrad)"/>
          <polyline points="35,400 90,360 145,340 200,355 255,310 310,290 360,300" fill="none" stroke="#818cf8" strokeWidth="2.5"/>
          {/* Card 6 - barras horizontais */}
          <rect x="400" y="220" width="360" height="200" rx="10" fill="#1e293b"/>
          <text x="415" y="245" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">Top Produtos</text>
          <rect x="415" y="262" width="200" height="18" rx="4" fill="#f59e0b" opacity="0.85"/>
          <rect x="415" y="292" width="160" height="18" rx="4" fill="#3b82f6" opacity="0.85"/>
          <rect x="415" y="322" width="230" height="18" rx="4" fill="#10b981" opacity="0.85"/>
          <rect x="415" y="352" width="120" height="18" rx="4" fill="#ef4444" opacity="0.85"/>
          <rect x="415" y="382" width="180" height="18" rx="4" fill="#8b5cf6" opacity="0.85"/>
          <text x="625" y="276" fill="#f59e0b" fontSize="10" fontFamily="sans-serif">67%</text>
          <text x="585" y="306" fill="#60a5fa" fontSize="10" fontFamily="sans-serif">53%</text>
          <text x="655" y="336" fill="#34d399" fontSize="10" fontFamily="sans-serif">77%</text>
          <text x="545" y="366" fill="#f87171" fontSize="10" fontFamily="sans-serif">40%</text>
          <text x="605" y="396" fill="#a78bfa" fontSize="10" fontFamily="sans-serif">60%</text>
          {/* Card 7 - scatter/bubbles */}
          <rect x="780" y="220" width="400" height="200" rx="10" fill="#1e293b"/>
          <text x="795" y="245" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">Análise Comparativa</text>
          <circle cx="840" cy="330" r="20" fill="#3b82f6" opacity="0.7"/>
          <circle cx="900" cy="290" r="30" fill="#f59e0b" opacity="0.7"/>
          <circle cx="970" cy="350" r="15" fill="#10b981" opacity="0.7"/>
          <circle cx="1040" cy="300" r="25" fill="#ef4444" opacity="0.7"/>
          <circle cx="1110" cy="320" r="18" fill="#8b5cf6" opacity="0.7"/>
          <circle cx="870" cy="380" r="12" fill="#06b6d4" opacity="0.7"/>
          <circle cx="1000" cy="260" r="22" fill="#f43f5e" opacity="0.7"/>
          <circle cx="1140" cy="380" r="28" fill="#84cc16" opacity="0.7"/>
        </svg>
      </div>
      {/* Overlay branco suave — 70% para o dashboard aparecer */}
      <div className="absolute inset-0 -z-10" style={{ background: 'rgba(255,255,255,0.70)' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-green-700 bg-green-100 rounded-full">
              <span>✦</span> Líder em Treinamentos Tech no Brasil
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Sua carreira em dados <span className="text-green-400 italic">começa</span> aqui.
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Domine as ferramentas de análise de dados mais exigidas pelo mercado: <span className="font-bold text-white">Excel, Power BI e SQL</span>. Transformamos você no especialista que as empresas procuram para gerar resultados reais.
            </p>
            <p className="text-base text-slate-400 mb-10 leading-relaxed">
              Números que comprovam: <span className="font-bold text-white">92% dos nossos participantes</span> relatam melhora direta na performance profissional após os treinamentos, e <span className="font-bold text-white">95% aprovam</span> o conteúdo e a metodologia aplicada.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#cursos"
                className="flex items-center justify-center px-8 py-4 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition-all shadow-xl hover:shadow-green-900/20 group"
              >
                Conhecer Cursos
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#demo"
                onClick={(e) => { e.preventDefault(); window.location.hash = '#demo'; }}
                className="flex items-center justify-center px-8 py-4 bg-white text-slate-800 font-bold rounded-xl border-2 border-slate-100 hover:border-green-200 hover:bg-green-50/50 transition-all"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Play className="w-4 h-4 text-green-700 fill-current" />
                </div>
                Ver Demonstração
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/${i + 10}/100/100`}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    alt="Estudante"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-300">
                <span className="font-bold text-white">+5.000 participantes</span> já transformaram suas carreiras
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
                alt="Análise de Dados Treinatech"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Floating Card 1 */}
            <div className="absolute -top-6 -right-6 md:right-0 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-bounce hover:animate-none">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <BarChart3 />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Performance</p>
                <p className="text-lg font-bold text-slate-800">+92%</p>
              </div>
            </div>
            
             {/* Floating Card 2 */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                <ThumbsUp />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Satisfação</p>
                <p className="text-sm font-bold text-slate-800">95% aprovação</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
