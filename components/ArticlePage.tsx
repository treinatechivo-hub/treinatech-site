import React, { useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, User, BookOpen, ExternalLink, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

interface ArticlePageProps {
  articleId: number;
  onBack: () => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ articleId, onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [articleId]);

  // Artigo 1 — Excel vs Power BI
  if (articleId === 1) {
    return (
      <article className="min-h-screen bg-slate-50">
        {/* Header do artigo */}
        <div className="bg-gradient-to-br from-slate-900 via-green-950 to-slate-900 pt-28 pb-16 px-4">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-bold mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
            </button>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-400 bg-green-400/10 border border-green-400/20 px-4 py-1.5 rounded-full mb-5">
              Excel &amp; Power BI
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6">
              Excel vs Power BI: Qual ferramenta usar em cada situação?
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-green-400" />
                <span className="text-white font-semibold">Ivo Amarante</span> · Instrutor MCT
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> 25 mar 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> 6 min de leitura
              </span>
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Nível: Iniciante
              </span>
            </div>
          </div>
        </div>

        {/* Imagem de capa */}
        <div className="max-w-3xl mx-auto px-4 -mt-1">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85"
            alt="Excel vs Power BI"
            className="w-full h-72 object-cover rounded-3xl shadow-2xl"
          />
        </div>

        {/* Conteúdo */}
        <div className="max-w-3xl mx-auto px-4 py-14">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Artigo principal */}
            <div className="flex-1 prose-custom">

              {/* Intro */}
              <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium border-l-4 border-green-500 pl-5 bg-green-50 py-4 pr-4 rounded-r-2xl">
                Esta é uma das perguntas mais frequentes em treinamentos corporativos: <strong>"Eu já uso Excel há anos — por que precisaria do Power BI?"</strong> A resposta não é simples, e a boa notícia é que você não precisa escolher apenas um. Entenda as diferenças e saiba exatamente quando usar cada ferramenta.
              </p>

              {/* Seção 1 */}
              <h2 id="excel" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">O que é o Excel, afinal?</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                O Microsoft Excel é a ferramenta de planilhas mais utilizada no mundo — presente em mais de 1 bilhão de dispositivos. Ele nasceu para cálculos, análises ad hoc, organização de dados e automação via fórmulas e VBA. Com o tempo, ganhou recursos poderosos de BI como Tabelas Dinâmicas, Power Query e Power Pivot.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Segundo a própria Microsoft, o Excel é ideal para <strong>"análises detalhadas e ad hoc"</strong>, cálculos rápidos, modelagem financeira e exploração de dados por um único usuário ou pequenos grupos.
              </p>

              {/* Seção 2 */}
              <h2 id="powerbi" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">O que é o Power BI?</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                O Power BI é a plataforma de <em>Business Intelligence</em> da Microsoft lançada em 2015. Segundo a documentação oficial (<a href="https://learn.microsoft.com/pt-br/power-bi/fundamentals/power-bi-overview" target="_blank" rel="noopener noreferrer" className="text-green-700 font-semibold hover:underline">Microsoft Learn</a>), ele foi construído para <strong>"transformar dados de fontes não relacionadas em insights coerentes, visualmente envolventes e interativos"</strong>.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Diferente do Excel, o Power BI foi projetado para escala corporativa: dashboards publicados na nuvem, acesso via mobile, atualização automática de dados e controle de acesso por perfil (Row-Level Security). É uma ferramenta de <em>compartilhamento</em> e <em>governança</em>, não apenas de análise individual.
              </p>

              {/* Tabela comparativa */}
              <h2 id="comparativo" className="text-2xl font-extrabold text-slate-900 mt-10 mb-6 scroll-mt-24">Comparativo direto: Excel vs Power BI</h2>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800 text-white">
                      <th className="text-left px-5 py-4 font-bold">Critério</th>
                      <th className="text-center px-5 py-4 font-bold">Excel</th>
                      <th className="text-center px-5 py-4 font-bold">Power BI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Volume de dados', 'Até ~1 milhão de linhas', 'Bilhões de linhas (DirectQuery)'],
                      ['Colaboração', 'Limitada (arquivo compartilhado)', 'Nativa (nuvem, workspace)'],
                      ['Visualizações', 'Gráficos básicos e dinâmicos', 'Visuais interativos e customizáveis'],
                      ['Atualização de dados', 'Manual', 'Automática (agendada ou em tempo real)'],
                      ['Fórmulas e cálculos', 'Avançado (fórmulas, VBA)', 'DAX (otimizado para BI)'],
                      ['Modelagem de dados', 'Power Pivot (limitado)', 'Motor nativo robusto'],
                      ['Segurança por perfil (RLS)', 'Não nativo', 'Sim, nativo'],
                      ['Acesso mobile', 'Limitado', 'App dedicado'],
                      ['Curva de aprendizado', 'Familiar para maioria', 'Requer treinamento específico'],
                      ['Custo', 'Incluído no Microsoft 365', 'Power BI Pro: ~R$ 50/mês/usuário'],
                    ].map(([criterio, excel, pbi], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-5 py-3 font-semibold text-slate-700">{criterio}</td>
                        <td className="px-5 py-3 text-center text-slate-600">{excel}</td>
                        <td className="px-5 py-3 text-center text-slate-600">{pbi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Quando usar Excel */}
              <h2 id="quando-excel" className="text-2xl font-extrabold text-slate-900 mt-10 mb-5 scroll-mt-24">✅ Quando usar o Excel</h2>
              <div className="space-y-3 mb-8">
                {[
                  'Análises financeiras com fórmulas complexas (VPL, TIR, simulações)',
                  'Planilhas operacionais: controle de estoque, fluxo de caixa, orçamentos',
                  'Análise ad hoc rápida por um único usuário',
                  'Dados com menos de 500 mil linhas e sem necessidade de atualização automática',
                  'Automações simples com macros VBA',
                  'Equipes que ainda não têm infraestrutura de BI implantada',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Quando usar Power BI */}
              <h2 id="quando-powerbi" className="text-2xl font-extrabold text-slate-900 mt-10 mb-5 scroll-mt-24">🚀 Quando usar o Power BI</h2>
              <div className="space-y-3 mb-8">
                {[
                  'Dashboards corporativos acessados por múltiplos usuários simultaneamente',
                  'Dados de grandes volumes vindos de ERP, CRM, bancos de dados SQL',
                  'Relatórios que precisam de atualização automática (diária, horária ou em tempo real)',
                  'Ambientes que exigem controle de acesso por departamento ou perfil (RLS)',
                  'Storytelling de dados com visuais interativos para apresentações à diretoria',
                  'Integração com o ecossistema Microsoft (Fabric, Azure, Teams, SharePoint)',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Quando NÃO usar */}
              <h2 id="erros" className="text-2xl font-extrabold text-slate-900 mt-10 mb-5 scroll-mt-24">❌ Erros comuns de uso</h2>
              <div className="space-y-3 mb-10">
                {[
                  ['Usar Excel como banco de dados', 'Para grandes volumes e múltiplos usuários editando ao mesmo tempo, o Excel trava e corrompe dados. Use SQL + Power BI.'],
                  ['Criar dashboards no Excel para toda a empresa', 'Dificulta o versionamento, atualizações manuais geram erros e o arquivo fica pesado. Migre para Power BI.'],
                  ['Usar Power BI para fazer a planilha de despesas pessoais', 'Complexidade desnecessária. O Excel resolve em minutos o que levaria horas no Power BI.'],
                  ['Pensar que Power BI substitui o Excel completamente', 'São ferramentas complementares. Muitas empresas usam Excel para coleta e Power BI para visualização.'],
                ].map(([titulo, desc], i) => (
                  <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-800 text-sm font-bold">{titulo}</p>
                      <p className="text-slate-600 text-xs mt-1">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Como usá-los juntos */}
              <h2 id="combinacao" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">🔗 A combinação ideal: Excel + Power BI</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                A própria Microsoft recomenda usar as duas ferramentas em conjunto. O fluxo mais comum em grandes empresas é:
              </p>
              <div className="bg-slate-900 rounded-2xl p-6 mb-6 text-sm font-mono">
                <div className="flex flex-wrap items-center gap-2 text-center">
                  {['Fonte de dados\n(ERP / SQL)', 'Power Query\n(ETL)', 'Power BI Desktop\n(Modelagem + Visual)', 'Power BI Service\n(Publicação na nuvem)', 'Análise avançada\n(Excel conectado)'].map((step, i, arr) => (
                    <React.Fragment key={i}>
                      <div className="bg-green-800/40 border border-green-700/40 rounded-xl px-3 py-2 text-green-200 text-xs whitespace-pre-line text-center">{step}</div>
                      {i < arr.length - 1 && <ChevronRight className="w-4 h-4 text-slate-500 hidden sm:block" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-8">
                Com a funcionalidade <strong>"Analisar no Excel"</strong>, os usuários podem conectar uma planilha diretamente a um modelo semântico do Power BI — obtendo o melhor dos dois mundos: a familiaridade do Excel com a governança e escalabilidade do Power BI.
              </p>

              {/* Conclusão */}
              <h2 id="conclusao" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">Conclusão</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Não existe resposta única. A escolha depende do contexto: volume de dados, número de usuários, necessidade de atualização automática e maturidade da cultura de dados na sua empresa.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Se você usa Excel hoje e quer evoluir para o Power BI, o caminho natural é: <strong>dominar Power Query e o modelo de dados no Excel</strong>, depois migrar essa lógica para o Power BI Desktop. Muitos conceitos se transferem — e a curva de aprendizado fica bem mais suave.
              </p>

              {/* CTA fonte */}
              <div className="bg-slate-100 rounded-2xl p-5 text-sm text-slate-500 border border-slate-200 mb-10">
                <p className="font-bold text-slate-700 mb-2">📚 Fontes consultadas</p>
                <ul className="space-y-1">
                  <li>
                    <a href="https://learn.microsoft.com/pt-br/power-bi/fundamentals/power-bi-overview" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Microsoft Learn — O que é o Power BI?
                    </a>
                  </li>
                  <li>
                    <a href="https://www.microsoft.com/pt-br/power-platform/products/power-bi/excel-and-power-bi" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Microsoft — Visualização de dados com Excel e Power BI
                    </a>
                  </li>
                  <li>
                    <a href="https://learn.microsoft.com/pt-br/power-bi/collaborate-share/service-connect-power-bi-datasets-excel" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Microsoft Learn — Conectar o Excel a modelos semânticos do Power BI
                    </a>
                  </li>
                  <li>
                    <a href="https://learn.microsoft.com/pt-br/power-bi/guidance/powerbi-implementation-planning-usage-scenario-personal-bi" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Microsoft Learn — Cenários de uso do Power BI: BI pessoal
                    </a>
                  </li>
                </ul>
              </div>

              {/* CTA Treinatech */}
              <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-3xl p-8 text-white text-center">
                <p className="text-lg font-extrabold mb-2">Quer dominar as duas ferramentas?</p>
                <p className="text-green-100 text-sm mb-6">A Treinatech tem trilhas completas de Excel Avançado e Power BI Professional com certificação MCT.</p>
                <a
                  href="#cursos"
                  onClick={() => { window.location.hash = ''; setTimeout(() => { window.location.hash = ''; const el = document.getElementById('cursos'); if(el) el.scrollIntoView({behavior:'smooth'}); }, 50); }}
                  className="inline-block bg-white text-green-800 font-extrabold px-8 py-3 rounded-2xl hover:bg-green-50 transition-colors active:scale-95"
                >
                  Ver trilhas de treinamento →
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0 space-y-6">
              {/* Índice */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm sticky top-24">
                <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Neste artigo</p>
                <nav className="space-y-2">
                  {[
                    { label: 'O que é o Excel?', id: 'excel' },
                    { label: 'O que é o Power BI?', id: 'powerbi' },
                    { label: 'Comparativo direto', id: 'comparativo' },
                    { label: 'Quando usar o Excel', id: 'quando-excel' },
                    { label: 'Quando usar o Power BI', id: 'quando-powerbi' },
                    { label: 'Erros comuns', id: 'erros' },
                    { label: 'A combinação ideal', id: 'combinacao' },
                    { label: 'Conclusão', id: 'conclusao' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        const el = document.getElementById(item.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="w-full text-left text-sm text-slate-500 hover:text-green-700 cursor-pointer transition-colors py-1 border-b border-slate-50 last:border-0"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Artigos relacionados */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Leia também</p>
                <div className="space-y-4">
                  {[
                    { title: 'DAX do zero: os 10 conceitos essenciais', id: 2 },
                    { title: 'Power Query: o segredo dos analistas mais rápidos', id: 7 },
                    { title: 'Como criar um dashboard profissional em 1 hora', id: 4 },
                  ].map((rel) => (
                    <p key={rel.id} className="text-sm text-slate-700 hover:text-green-700 cursor-pointer font-semibold leading-snug transition-colors">
                      {rel.title} →
                    </p>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    );
  }

  // Artigos ainda não desenvolvidos
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 max-w-md">
        <span className="text-5xl mb-6 block">✍️</span>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Artigo em produção!</h2>
        <p className="text-slate-500 mb-8">Nossos instrutores estão preparando este conteúdo com muito cuidado. Em breve estará disponível.</p>
        <button
          onClick={onBack}
          className="flex items-center gap-2 mx-auto bg-green-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
        </button>
      </div>
    </div>
  );
};
