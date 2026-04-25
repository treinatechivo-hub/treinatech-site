import React, { useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, User, BookOpen, ExternalLink, CheckCircle, XCircle, ChevronRight, ChevronLeft } from 'lucide-react';

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

  if (articleId === 2) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 pt-28 pb-16 px-4">
          <div className="max-w-3xl mx-auto">
            <button onClick={onBack} className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-bold mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
            </button>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-4 py-1.5 rounded-full mb-5">
              Power BI
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6">
              DAX do zero: os 10 conceitos que todo analista precisa dominar
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-2"><User className="w-4 h-4 text-amber-400" /><span className="text-white font-semibold">Ivo Amarante</span> · Instrutor MCT</span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 18 mar 2026</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 8 min de leitura</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sm:p-12">

            {/* Intro */}
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              DAX (Data Analysis Expressions) é a linguagem de fórmulas do Power BI, Power Pivot e Analysis Services. Dominar os conceitos certos faz a diferença entre um relatório básico e um modelo de dados verdadeiramente profissional. Neste artigo, reunimos os 10 conceitos fundamentais — com explicação clara e exemplos práticos para cada um.
            </p>

            {/* Concept 1 */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-yellow-100 text-yellow-700 font-extrabold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <h2 className="text-2xl font-extrabold text-slate-900">Contexto de Filtro (Filter Context)</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-3">
                O contexto de filtro é o conjunto de filtros ativos que determinam quais linhas da tabela serão consideradas em um cálculo. Ele é gerado automaticamente por segmentações, linhas e colunas de uma tabela visual ou pela função CALCULATE.
              </p>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 mb-3">
                <span className="text-slate-400">// Vendas totais respeitando o filtro da página</span><br />
                Vendas Total = SUM(Vendas[Valor])
              </div>
              <p className="text-slate-500 text-sm">Quando você coloca essa medida numa tabela filtrada por "Região = Sul", o DAX automaticamente calcula apenas as vendas do Sul.</p>
            </div>

            {/* Concept 2 */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-yellow-100 text-yellow-700 font-extrabold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <h2 className="text-2xl font-extrabold text-slate-900">Contexto de Linha (Row Context)</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-3">
                O contexto de linha é criado quando o DAX itera sobre uma tabela linha por linha — como em colunas calculadas ou funções iteradoras (SUMX, AVERAGEX). Cada linha tem acesso aos valores de todas as colunas daquela linha específica.
              </p>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 mb-3">
                <span className="text-slate-400">// Coluna calculada — contexto de linha disponível</span><br />
                Margem = Vendas[Receita] - Vendas[Custo]
              </div>
              <p className="text-slate-500 text-sm italic">Atenção: em medidas, não existe contexto de linha por padrão — apenas em colunas calculadas e funções iteradoras.</p>
            </div>

            {/* Concept 3 */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-yellow-100 text-yellow-700 font-extrabold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <h2 className="text-2xl font-extrabold text-slate-900">CALCULATE — a função mais importante do DAX</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-3">
                CALCULATE avalia uma expressão em um contexto de filtro modificado. É a única função DAX capaz de alterar o contexto de filtro. Praticamente todo cálculo avançado passa por ela.
              </p>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 mb-3">
                <span className="text-slate-400">// Vendas apenas do produto "Notebook"</span><br />
                Vendas Notebook = CALCULATE(<br />
                &nbsp;&nbsp;SUM(Vendas[Valor]),<br />
                &nbsp;&nbsp;Produtos[Categoria] = "Notebook"<br />
                )
              </div>
              <p className="text-slate-500 text-sm">Sintaxe: <code className="bg-slate-100 px-1 rounded">CALCULATE(expressão, filtro1, filtro2, ...)</code></p>
            </div>

            {/* Concept 4 */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-yellow-100 text-yellow-700 font-extrabold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                <h2 className="text-2xl font-extrabold text-slate-900">ALL — ignorando filtros</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-3">
                ALL remove todos os filtros de uma tabela ou coluna, retornando todos os valores independentemente do contexto ativo. É muito usada para calcular totais absolutos e percentuais do total.
              </p>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 mb-3">
                <span className="text-slate-400">// % sobre o total geral, ignorando filtros de região</span><br />
                % do Total = DIVIDE(<br />
                &nbsp;&nbsp;SUM(Vendas[Valor]),<br />
                &nbsp;&nbsp;CALCULATE(SUM(Vendas[Valor]), ALL(Vendas))<br />
                )
              </div>
            </div>

            {/* Concept 5 */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-yellow-100 text-yellow-700 font-extrabold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">5</span>
                <h2 className="text-2xl font-extrabold text-slate-900">FILTER — filtrando tabelas</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-3">
                FILTER retorna uma tabela que é um subconjunto de outra tabela, aplicando uma condição linha por linha. É frequentemente usada dentro de CALCULATE para filtros mais complexos que uma simples igualdade.
              </p>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 mb-3">
                <span className="text-slate-400">// Vendas acima de R$ 1.000</span><br />
                Vendas Grandes = CALCULATE(<br />
                &nbsp;&nbsp;SUM(Vendas[Valor]),<br />
                &nbsp;&nbsp;FILTER(Vendas, Vendas[Valor] &gt; 1000)<br />
                )
              </div>
              <p className="text-slate-500 text-sm">Use FILTER quando precisar de condições que envolvem múltiplas colunas ou lógica mais complexa.</p>
            </div>

            {/* Concept 6 */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-yellow-100 text-yellow-700 font-extrabold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">6</span>
                <h2 className="text-2xl font-extrabold text-slate-900">RELATED — cruzando tabelas</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-3">
                RELATED traz um valor de uma tabela relacionada, navegando pelo relacionamento já definido no modelo de dados. É o equivalente DAX ao PROCV do Excel — mas usando a estrutura de relacionamentos.
              </p>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 mb-3">
                <span className="text-slate-400">// Coluna calculada: traz a categoria do produto</span><br />
                Categoria = RELATED(Produtos[Categoria])
              </div>
              <p className="text-slate-500 text-sm">RELATED só funciona no lado "muitos" do relacionamento. Para o lado "um", use RELATEDTABLE.</p>
            </div>

            {/* Concept 7 */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-yellow-100 text-yellow-700 font-extrabold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">7</span>
                <h2 className="text-2xl font-extrabold text-slate-900">SUMX — funções iteradoras</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-3">
                SUMX percorre cada linha de uma tabela, avalia uma expressão por linha e soma os resultados. É essencial quando você precisa calcular algo em nível de linha antes de agregar — como receita = quantidade × preço.
              </p>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 mb-3">
                <span className="text-slate-400">// Receita = Quantidade × Preço, linha a linha</span><br />
                Receita Total = SUMX(<br />
                &nbsp;&nbsp;Vendas,<br />
                &nbsp;&nbsp;Vendas[Quantidade] * RELATED(Produtos[Preço])<br />
                )
              </div>
              <p className="text-slate-500 text-sm">Outras funções iteradoras: AVERAGEX, COUNTX, MAXX, MINX — todas seguem o mesmo padrão.</p>
            </div>

            {/* Concept 8 */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-yellow-100 text-yellow-700 font-extrabold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">8</span>
                <h2 className="text-2xl font-extrabold text-slate-900">DIVIDE — divisão segura</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-3">
                DIVIDE realiza divisões retornando um valor alternativo (geralmente BLANK ou 0) quando o divisor é zero — evitando erros nos visuais. É sempre preferível ao operador "/" em medidas.
              </p>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 mb-3">
                <span className="text-slate-400">// Margem % com proteção contra divisão por zero</span><br />
                Margem % = DIVIDE(<br />
                &nbsp;&nbsp;[Lucro Bruto],<br />
                &nbsp;&nbsp;[Receita Total],<br />
                &nbsp;&nbsp;0 <span className="text-slate-400">// retorna 0 se Receita for zero</span><br />
                )
              </div>
            </div>

            {/* Concept 9 */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-yellow-100 text-yellow-700 font-extrabold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">9</span>
                <h2 className="text-2xl font-extrabold text-slate-900">VAR — variáveis no DAX</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-3">
                Variáveis armazenam resultados intermediários, tornando as fórmulas mais legíveis e performáticas. Um resultado calculado com VAR é avaliado apenas uma vez, evitando recálculos repetitivos.
              </p>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 mb-3">
                <span className="text-slate-400">// Crescimento YoY com variáveis</span><br />
                Crescimento % = <br />
                VAR VendasAtual = SUM(Vendas[Valor])<br />
                VAR VendasAnoAnterior = CALCULATE(<br />
                &nbsp;&nbsp;SUM(Vendas[Valor]),<br />
                &nbsp;&nbsp;SAMEPERIODLASTYEAR(Calendario[Data])<br />
                )<br />
                RETURN<br />
                DIVIDE(VendasAtual - VendasAnoAnterior, VendasAnoAnterior)
              </div>
            </div>

            {/* Concept 10 */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-yellow-100 text-yellow-700 font-extrabold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">10</span>
                <h2 className="text-2xl font-extrabold text-slate-900">Time Intelligence — inteligência de datas</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-3">
                As funções de Time Intelligence permitem comparações temporais como YTD (acumulado do ano), MTD (mês até hoje), crescimento vs. mesmo período do ano anterior e outras análises de tendência — mas exigem uma tabela de datas dedicada no modelo.
              </p>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 mb-3">
                <span className="text-slate-400">// Acumulado do ano (YTD)</span><br />
                Vendas YTD = TOTALYTD(SUM(Vendas[Valor]), Calendario[Data])<br /><br />
                <span className="text-slate-400">// Mesmo período do ano anterior</span><br />
                Vendas SPLY = CALCULATE(<br />
                &nbsp;&nbsp;SUM(Vendas[Valor]),<br />
                &nbsp;&nbsp;SAMEPERIODLASTYEAR(Calendario[Data])<br />
                )
              </div>
              <p className="text-slate-500 text-sm">Funções principais: TOTALYTD, TOTALMTD, SAMEPERIODLASTYEAR, DATEADD, PREVIOUSMONTH, PREVIOUSYEAR.</p>
            </div>

            {/* Summary table */}
            <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 mb-10">
              <h3 className="text-xl font-extrabold text-slate-900 mb-4">Resumo: os 10 conceitos</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-yellow-200">
                      <th className="text-left py-2 pr-4 font-bold text-slate-700">#</th>
                      <th className="text-left py-2 pr-4 font-bold text-slate-700">Conceito</th>
                      <th className="text-left py-2 font-bold text-slate-700">Para que serve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['1', 'Filter Context', 'Define quais dados são considerados no cálculo'],
                      ['2', 'Row Context', 'Itera linha a linha em colunas e funções X'],
                      ['3', 'CALCULATE', 'Altera o contexto de filtro de uma expressão'],
                      ['4', 'ALL', 'Remove filtros — base para % do total'],
                      ['5', 'FILTER', 'Cria subconjuntos de tabelas com condições'],
                      ['6', 'RELATED', 'Busca valores em tabelas relacionadas'],
                      ['7', 'SUMX', 'Soma expressões avaliadas linha a linha'],
                      ['8', 'DIVIDE', 'Divisão segura (sem erro com divisor zero)'],
                      ['9', 'VAR', 'Armazena resultados intermediários'],
                      ['10', 'Time Intelligence', 'Análises temporais: YTD, MTD, YoY'],
                    ].map(([num, conceito, descricao]) => (
                      <tr key={num} className="border-b border-yellow-100 last:border-0">
                        <td className="py-2 pr-4 font-bold text-yellow-600">{num}</td>
                        <td className="py-2 pr-4 font-mono text-slate-800 font-semibold">{conceito}</td>
                        <td className="py-2 text-slate-600">{descricao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Quer dominar o DAX na prática?</h3>
              <p className="text-slate-600 mb-6">No Power BI – Módulo 1 e Módulo 2 da TREINATECH você aplica todos esses conceitos em projetos reais, com acompanhamento do instrutor MCT.</p>
              <a href="/#cursos" className="inline-block bg-green-700 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-800 transition-colors active:scale-95">
                Ver treinamentos de Power BI
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Artigo 3 — SQL para analistas
  if (articleId === 3) {
    return (
      <article className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-28 pb-16 px-4">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-bold mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
            </button>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 border border-blue-400/20 px-4 py-1.5 rounded-full mb-5">
              SQL
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6">
              SQL para analistas: como escrever queries eficientes do zero
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" />
                <span className="text-white font-semibold">Ivo Amarante</span> · Instrutor MCT
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> 10 mar 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> 10 min de leitura
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
            src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&q=85"
            alt="SQL para analistas"
            className="w-full h-72 object-cover rounded-3xl shadow-2xl"
          />
        </div>

        {/* Conteúdo */}
        <div className="max-w-3xl mx-auto px-4 py-14">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Artigo principal */}
            <div className="flex-1 prose-custom">

              {/* Intro */}
              <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium border-l-4 border-blue-500 pl-5 bg-blue-50 py-4 pr-4 rounded-r-2xl">
                SQL (Structured Query Language) é a linguagem universal para consulta e manipulação de dados em bancos de dados relacionais. Se você trabalha com dados — seja em Excel, Power BI ou qualquer outra ferramenta — aprender SQL vai multiplicar sua capacidade de análise. Neste guia, você vai do zero ao essencial com exemplos baseados na documentação oficial da Microsoft (T-SQL).
              </p>

              {/* Seção 1 */}
              <h2 id="oque-sql" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">O que é SQL e por que aprender</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                SQL é a linguagem padrão para comunicação com bancos de dados relacionais como SQL Server, Azure SQL Database, PostgreSQL e MySQL. Segundo a <a href="https://learn.microsoft.com/pt-br/sql/t-sql/language-reference" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold hover:underline">documentação oficial da Microsoft</a>, T-SQL (Transact-SQL) é a implementação da Microsoft do padrão SQL, com extensões que permitem programação procedural, controle de fluxo e funções avançadas.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Para analistas de dados, dominar SQL significa:
              </p>
              <div className="space-y-2 mb-8">
                {[
                  'Extrair dados diretamente de bancos corporativos sem depender de TI',
                  'Criar consultas personalizadas muito mais rápidas que PROCV e tabelas dinâmicas',
                  'Preparar datasets para Power BI, Excel ou Python com qualidade e eficiência',
                  'Transformar dados brutos em relatórios prontos para análise',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Seção 2 */}
              <h2 id="select-where" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">SELECT e filtragem com WHERE</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                O comando <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-700 font-mono text-sm">SELECT</code> é o ponto de partida de qualquer consulta SQL. Ele define quais colunas você quer retornar de uma tabela. O <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-700 font-mono text-sm">WHERE</code> filtra as linhas com base em condições.
              </p>
              <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm text-blue-300 mb-4 overflow-x-auto">
                <span className="text-slate-500">-- Selecionar todas as colunas de uma tabela</span><br />
                <span className="text-purple-400">SELECT</span> * <span className="text-purple-400">FROM</span> Vendas;<br /><br />
                <span className="text-slate-500">-- Selecionar colunas específicas</span><br />
                <span className="text-purple-400">SELECT</span> ClienteID, Produto, Valor<br />
                <span className="text-purple-400">FROM</span> Vendas;<br /><br />
                <span className="text-slate-500">-- Filtrar vendas acima de R$ 1.000</span><br />
                <span className="text-purple-400">SELECT</span> ClienteID, Produto, Valor<br />
                <span className="text-purple-400">FROM</span> Vendas<br />
                <span className="text-purple-400">WHERE</span> Valor {'>'} 1000;<br /><br />
                <span className="text-slate-500">-- Múltiplas condições com AND / OR</span><br />
                <span className="text-purple-400">SELECT</span> ClienteID, Produto, Valor<br />
                <span className="text-purple-400">FROM</span> Vendas<br />
                <span className="text-purple-400">WHERE</span> Valor {'>'} 1000 <span className="text-purple-400">AND</span> Produto = <span className="text-green-400">'Notebook'</span>;
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Outros operadores úteis no <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-700 font-mono text-sm">WHERE</code>:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800 text-white">
                      <th className="text-left px-5 py-3 font-bold">Operador</th>
                      <th className="text-left px-5 py-3 font-bold">Uso</th>
                      <th className="text-left px-5 py-3 font-bold">Exemplo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['BETWEEN', 'Intervalo de valores', "Valor BETWEEN 500 AND 2000"],
                      ['IN', 'Lista de valores', "Produto IN ('Notebook', 'Monitor')"],
                      ['LIKE', 'Padrão de texto', "Nome LIKE 'Ana%'"],
                      ['IS NULL', 'Valores nulos', 'Email IS NULL'],
                      ['NOT', 'Negação', "Produto NOT IN ('Teclado')"],
                    ].map(([op, uso, ex], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-5 py-3 font-mono text-blue-700 font-semibold">{op}</td>
                        <td className="px-5 py-3 text-slate-600">{uso}</td>
                        <td className="px-5 py-3 font-mono text-xs text-slate-500">{ex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Seção 3 */}
              <h2 id="joins" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">JOINs: cruzando tabelas</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                JOINs permitem combinar dados de duas ou mais tabelas com base em uma coluna em comum — como o <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-700 font-mono text-sm">ClienteID</code> que aparece tanto na tabela de Vendas quanto na tabela de Clientes. Segundo a <a href="https://learn.microsoft.com/pt-br/sql/relational-databases/performance/joins" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold hover:underline">documentação da Microsoft</a>, os tipos principais são:
              </p>
              <div className="space-y-6 mb-6">
                <div>
                  <h3 className="font-extrabold text-slate-800 mb-2 flex items-center gap-2"><span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">INNER JOIN</span> Somente o que existe em ambas as tabelas</h3>
                  <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm text-blue-300 overflow-x-auto">
                    <span className="text-purple-400">SELECT</span> v.Produto, v.Valor, c.Nome<br />
                    <span className="text-purple-400">FROM</span> Vendas v<br />
                    <span className="text-purple-400">INNER JOIN</span> Clientes c <span className="text-purple-400">ON</span> v.ClienteID = c.ClienteID;
                  </div>
                  <p className="text-slate-500 text-sm mt-2">Retorna apenas vendas que possuem um cliente correspondente na tabela Clientes.</p>
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 mb-2 flex items-center gap-2"><span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">LEFT JOIN</span> Todos da esquerda + correspondências da direita</h3>
                  <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm text-blue-300 overflow-x-auto">
                    <span className="text-purple-400">SELECT</span> v.Produto, v.Valor, c.Nome<br />
                    <span className="text-purple-400">FROM</span> Vendas v<br />
                    <span className="text-purple-400">LEFT JOIN</span> Clientes c <span className="text-purple-400">ON</span> v.ClienteID = c.ClienteID;
                  </div>
                  <p className="text-slate-500 text-sm mt-2">Retorna todas as vendas, mesmo que não haja cliente cadastrado (o nome fica NULL).</p>
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 mb-2 flex items-center gap-2"><span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">RIGHT JOIN</span> Todos da direita + correspondências da esquerda</h3>
                  <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm text-blue-300 overflow-x-auto">
                    <span className="text-purple-400">SELECT</span> v.Produto, v.Valor, c.Nome<br />
                    <span className="text-purple-400">FROM</span> Vendas v<br />
                    <span className="text-purple-400">RIGHT JOIN</span> Clientes c <span className="text-purple-400">ON</span> v.ClienteID = c.ClienteID;
                  </div>
                  <p className="text-slate-500 text-sm mt-2">Retorna todos os clientes, mesmo aqueles que ainda não fizeram nenhuma venda.</p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8 text-sm text-slate-700">
                <strong>💡 Dica prática:</strong> Na maioria das consultas de análise de dados você vai usar <code className="bg-blue-100 px-1 rounded font-mono">INNER JOIN</code> ou <code className="bg-blue-100 px-1 rounded font-mono">LEFT JOIN</code>. O RIGHT JOIN pode sempre ser reescrito como LEFT JOIN invertendo as tabelas — prefira LEFT JOIN para manter consistência.
              </div>

              {/* Seção 4 */}
              <h2 id="groupby" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">GROUP BY e funções de agregação</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                O <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-700 font-mono text-sm">GROUP BY</code> agrupa linhas com valores iguais em uma coluna e permite calcular totais, médias e contagens por grupo — como uma tabela dinâmica do Excel, mas em SQL. As funções de agregação mais usadas são:
              </p>
              <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm text-blue-300 mb-4 overflow-x-auto">
                <span className="text-slate-500">-- Total de vendas por produto</span><br />
                <span className="text-purple-400">SELECT</span><br />
                &nbsp;&nbsp;Produto,<br />
                &nbsp;&nbsp;<span className="text-yellow-300">COUNT</span>(*) <span className="text-purple-400">AS</span> Qtd_Pedidos,<br />
                &nbsp;&nbsp;<span className="text-yellow-300">SUM</span>(Valor) <span className="text-purple-400">AS</span> Total_Vendas,<br />
                &nbsp;&nbsp;<span className="text-yellow-300">AVG</span>(Valor) <span className="text-purple-400">AS</span> Ticket_Medio,<br />
                &nbsp;&nbsp;<span className="text-yellow-300">MAX</span>(Valor) <span className="text-purple-400">AS</span> Maior_Venda,<br />
                &nbsp;&nbsp;<span className="text-yellow-300">MIN</span>(Valor) <span className="text-purple-400">AS</span> Menor_Venda<br />
                <span className="text-purple-400">FROM</span> Vendas<br />
                <span className="text-purple-400">GROUP BY</span> Produto<br />
                <span className="text-purple-400">ORDER BY</span> Total_Vendas <span className="text-purple-400">DESC</span>;
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Use <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-700 font-mono text-sm">HAVING</code> para filtrar grupos após a agregação (equivale a um WHERE aplicado depois do GROUP BY):
              </p>
              <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm text-blue-300 mb-8 overflow-x-auto">
                <span className="text-slate-500">-- Apenas produtos com mais de 10 pedidos</span><br />
                <span className="text-purple-400">SELECT</span> Produto, <span className="text-yellow-300">COUNT</span>(*) <span className="text-purple-400">AS</span> Qtd<br />
                <span className="text-purple-400">FROM</span> Vendas<br />
                <span className="text-purple-400">GROUP BY</span> Produto<br />
                <span className="text-purple-400">HAVING</span> <span className="text-yellow-300">COUNT</span>(*) {'>'} 10;
              </div>

              {/* Seção 5 */}
              <h2 id="subqueries-ctes" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">Subqueries e CTEs</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Subqueries são consultas aninhadas dentro de outra consulta. CTEs (Common Table Expressions) — criadas com <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-700 font-mono text-sm">WITH</code> — são a forma moderna e mais legível de criar resultados intermediários. Segundo a <a href="https://learn.microsoft.com/pt-br/sql/t-sql/queries/with-common-table-expression-transact-sql" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold hover:underline">documentação T-SQL da Microsoft</a>, CTEs melhoram a legibilidade e permitem referenciar o resultado múltiplas vezes na mesma query.
              </p>
              <p className="text-slate-600 leading-relaxed mb-3 font-semibold text-slate-800">Subquery no WHERE:</p>
              <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm text-blue-300 mb-5 overflow-x-auto">
                <span className="text-slate-500">-- Clientes que compraram acima da média</span><br />
                <span className="text-purple-400">SELECT</span> ClienteID, Valor<br />
                <span className="text-purple-400">FROM</span> Vendas<br />
                <span className="text-purple-400">WHERE</span> Valor {'>'} (<br />
                &nbsp;&nbsp;<span className="text-purple-400">SELECT</span> <span className="text-yellow-300">AVG</span>(Valor) <span className="text-purple-400">FROM</span> Vendas<br />
                );
              </div>
              <p className="text-slate-600 leading-relaxed mb-3 font-semibold text-slate-800">CTE com WITH:</p>
              <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm text-blue-300 mb-8 overflow-x-auto">
                <span className="text-slate-500">-- CTE que calcula vendas por região</span><br />
                <span className="text-purple-400">WITH</span> VendasPorRegiao <span className="text-purple-400">AS</span> (<br />
                &nbsp;&nbsp;<span className="text-purple-400">SELECT</span> Regiao, <span className="text-yellow-300">SUM</span>(Valor) <span className="text-purple-400">AS</span> Total<br />
                &nbsp;&nbsp;<span className="text-purple-400">FROM</span> Vendas<br />
                &nbsp;&nbsp;<span className="text-purple-400">GROUP BY</span> Regiao<br />
                )<br />
                <span className="text-purple-400">SELECT</span> Regiao, Total<br />
                <span className="text-purple-400">FROM</span> VendasPorRegiao<br />
                <span className="text-purple-400">WHERE</span> Total {'>'} 50000<br />
                <span className="text-purple-400">ORDER BY</span> Total <span className="text-purple-400">DESC</span>;
              </div>

              {/* Seção 6 */}
              <h2 id="performance" className="text-2xl font-extrabold text-slate-900 mt-10 mb-5 scroll-mt-24">Boas práticas de performance</h2>
              <div className="space-y-4 mb-10">
                {[
                  ['Evite SELECT *', 'Especifique apenas as colunas necessárias. SELECT * traz dados desnecessários, aumenta o tráfego de rede e impede o uso eficiente de índices.', 'SELECT Nome, Email FROM Clientes -- ✅'],
                  ['Use WHERE para limitar linhas antes de JOIN', 'Filtrar antes de cruzar tabelas reduz drasticamente o volume de dados processado. O SQL Server otimiza melhor quando há filtros explícitos.', 'WHERE DataVenda >= \'2026-01-01\''],
                  ['Prefira EXISTS a IN para subqueries grandes', 'EXISTS para assim que encontra o primeiro resultado, enquanto IN avalia toda a lista. Para tabelas grandes, EXISTS é significativamente mais rápido.', 'WHERE EXISTS (SELECT 1 FROM ...)'],
                  ['Use índices nas colunas de JOIN e WHERE', 'Colunas usadas frequentemente em JOINs e filtros devem ter índices. Consulte o DBA ou use o Query Analyzer do SQL Server para identificar índices ausentes.', ''],
                  ['Evite funções em colunas indexadas no WHERE', 'Aplicar uma função à coluna filtrada invalida o uso do índice. Compare valores sem transformar a coluna indexada.', 'WHERE YEAR(DataVenda) = 2026 -- ❌\nWHERE DataVenda >= \'2026-01-01\' -- ✅'],
                ].map(([titulo, desc, exemplo], i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <p className="font-extrabold text-slate-800 mb-1 flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-black flex-shrink-0">{i + 1}</span>
                      {titulo}
                    </p>
                    <p className="text-slate-500 text-sm mb-2">{desc}</p>
                    {exemplo && (
                      <div className="bg-slate-900 rounded-lg px-4 py-2 font-mono text-xs text-blue-300 whitespace-pre">{exemplo}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Fontes */}
              <div className="bg-slate-100 rounded-2xl p-5 text-sm text-slate-500 border border-slate-200 mb-10">
                <p className="font-bold text-slate-700 mb-2">📚 Fontes consultadas</p>
                <ul className="space-y-1">
                  <li>
                    <a href="https://learn.microsoft.com/pt-br/sql/t-sql/language-reference" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Microsoft Learn — Referência do T-SQL
                    </a>
                  </li>
                  <li>
                    <a href="https://learn.microsoft.com/pt-br/sql/relational-databases/performance/joins" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Microsoft Learn — Usando JOINs
                    </a>
                  </li>
                  <li>
                    <a href="https://learn.microsoft.com/pt-br/sql/t-sql/queries/with-common-table-expression-transact-sql" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Microsoft Learn — WITH (Common Table Expression)
                    </a>
                  </li>
                  <li>
                    <a href="https://learn.microsoft.com/pt-br/sql/relational-databases/query-processing-architecture-guide" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Microsoft Learn — Guia de arquitetura de processamento de consultas
                    </a>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-3xl p-8 text-white text-center">
                <p className="text-lg font-extrabold mb-2">Quer dominar SQL na prática?</p>
                <p className="text-blue-100 text-sm mb-6">A Treinatech tem trilha completa de SQL para analistas — do SELECT ao T-SQL avançado com projetos reais e certificação MCT.</p>
                <a
                  href="#cursos"
                  onClick={() => { const el = document.getElementById('cursos'); if(el) el.scrollIntoView({behavior:'smooth'}); }}
                  className="inline-block bg-white text-blue-800 font-extrabold px-8 py-3 rounded-2xl hover:bg-blue-50 transition-colors active:scale-95"
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
                    { label: 'O que é SQL e por que aprender', id: 'oque-sql' },
                    { label: 'SELECT e filtragem com WHERE', id: 'select-where' },
                    { label: 'JOINs: cruzando tabelas', id: 'joins' },
                    { label: 'GROUP BY e agregações', id: 'groupby' },
                    { label: 'Subqueries e CTEs', id: 'subqueries-ctes' },
                    { label: 'Boas práticas de performance', id: 'performance' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        const el = document.getElementById(item.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="w-full text-left text-sm text-slate-500 hover:text-blue-700 cursor-pointer transition-colors py-1 border-b border-slate-50 last:border-0"
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
                    { title: 'Excel vs Power BI: Qual ferramenta usar?', id: 1 },
                    { title: 'DAX do zero: os 10 conceitos essenciais', id: 2 },
                    { title: 'Como criar um dashboard profissional em 1 hora', id: 4 },
                  ].map((rel) => (
                    <p key={rel.id} className="text-sm text-slate-700 hover:text-blue-700 cursor-pointer font-semibold leading-snug transition-colors">
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
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-white rounded-3xl p-12 shadow-sm border border-yellow-100 max-w-md">
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
