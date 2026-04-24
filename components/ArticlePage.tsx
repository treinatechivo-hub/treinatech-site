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
      <div className="min-h-screen bg-yellow-50">
        {/* Header */}
        <div className="bg-amber-100 border-b border-amber-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">
            <button onClick={onBack} className="flex items-center gap-2 bg-green-100 text-green-700 hover:bg-green-200 font-bold px-4 py-2.5 rounded-xl text-sm mb-8 transition-colors active:scale-95">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Blog
            </button>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-yellow-200">Power BI</span>
              <span className="text-slate-400 text-sm flex items-center gap-1"><Clock className="w-4 h-4" />8 min de leitura</span>
              <span className="text-slate-400 text-sm flex items-center gap-1"><Calendar className="w-4 h-4" />18 mar 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
              DAX do zero: os 10 conceitos que todo analista precisa dominar
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              CALCULATE, FILTER, ALL, RELATED... Veja os 10 conceitos de DAX mais cobrados no mercado e como aplicá-los em situações reais.
            </p>
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
