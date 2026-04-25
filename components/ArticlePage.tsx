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

  // Artigo 4 — Dashboard Power BI em 1 hora
  if (articleId === 4) {
    return (
      <article className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 pt-28 pb-16 px-4">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-bold mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
            </button>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-4 py-1.5 rounded-full mb-5">
              Power BI
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6">
              Como criar um dashboard profissional no Power BI em 1 hora
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" />
                <span className="text-white font-semibold">Ivo Amarante</span> · Instrutor MCT
              </span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 03 mar 2026</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 7 min de leitura</span>
              <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Nível: Iniciante</span>
            </div>
          </div>
        </div>

        {/* Imagem de capa */}
        <div className="max-w-3xl mx-auto px-4 -mt-1">
          <img
            src="https://images.unsplash.com/photo-1599658880436-c61792e70672?w=1200&q=85"
            alt="Dashboard Power BI profissional"
            className="w-full h-72 object-cover rounded-3xl shadow-2xl"
          />
        </div>

        {/* Conteúdo */}
        <div className="max-w-3xl mx-auto px-4 py-14">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Artigo principal */}
            <div className="flex-1 prose-custom">

              {/* Intro */}
              <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium border-l-4 border-amber-500 pl-5 bg-amber-50 py-4 pr-4 rounded-r-2xl">
                Criar um dashboard no Power BI parece complexo na primeira vez — mas com o processo certo você vai da planilha a um relatório interativo e publicado na nuvem em menos de uma hora. Neste guia passo a passo, você vai instalar o Power BI Desktop, conectar dados, modelar, visualizar e publicar — tudo com base na <a href="https://learn.microsoft.com/pt-br/power-bi/fundamentals/desktop-getting-started" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-semibold hover:underline">documentação oficial da Microsoft</a>.
              </p>

              {/* Seção 1 */}
              <h2 id="instalacao" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">Passo 1: instalar o Power BI Desktop</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                O <strong>Power BI Desktop</strong> é gratuito e pode ser baixado diretamente pela <a href="https://www.microsoft.com/pt-br/power-platform/products/power-bi/desktop" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-semibold hover:underline">página oficial da Microsoft</a> ou pela Microsoft Store. Segundo a documentação, ele é o ambiente onde você conecta dados, cria modelos e constrói relatórios antes de publicá-los no serviço na nuvem.
              </p>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6 text-sm text-slate-700">
                <strong>💡 Recomendação Microsoft:</strong> Prefira instalar pela <strong>Microsoft Store</strong> — as atualizações são automáticas e você sempre terá a versão mais recente sem precisar reinstalar.
              </div>
              <p className="text-slate-600 leading-relaxed mb-8">
                Para publicar relatórios na nuvem você precisará de uma conta do <strong>Power BI Service</strong> (app.powerbi.com). Contas Microsoft 365 corporativas já incluem acesso. Se não tiver, cadastre-se gratuitamente com um e-mail corporativo ou de estudante em <a href="https://app.powerbi.com" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-semibold hover:underline">app.powerbi.com</a>.
              </p>

              {/* Seção 2 */}
              <h2 id="conectar-dados" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">Passo 2: conectar aos dados</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Abra o Power BI Desktop e clique em <strong>Obter Dados</strong> na aba Página Inicial. O Power BI suporta mais de 100 fontes de dados — de arquivos Excel e CSV a bancos SQL Server, SharePoint, Azure e APIs REST. Conforme a <a href="https://learn.microsoft.com/pt-br/power-bi/connect-data/desktop-data-sources" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-semibold hover:underline">documentação oficial</a>, as fontes mais comuns para iniciantes são:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800 text-white">
                      <th className="text-left px-5 py-3 font-bold">Fonte</th>
                      <th className="text-left px-5 py-3 font-bold">Quando usar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Excel / CSV', 'Dados exportados de sistemas, planilhas operacionais'],
                      ['SQL Server', 'Bancos corporativos — maior performance e volume'],
                      ['SharePoint Online', 'Listas e planilhas armazenadas no SharePoint da empresa'],
                      ['Web', 'Tabelas de páginas HTML públicas ou APIs'],
                      ['Pasta', 'Consolidar múltiplos arquivos Excel ou CSV de uma vez'],
                    ].map(([fonte, quando], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-5 py-3 font-semibold text-amber-700">{fonte}</td>
                        <td className="px-5 py-3 text-slate-600">{quando}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-slate-600 leading-relaxed mb-8">
                Após selecionar a fonte e confirmar a conexão, o Power BI abrirá o <strong>Editor do Power Query</strong> automaticamente — onde você limpará e transformará os dados antes de carregá-los no modelo.
              </p>

              {/* Seção 3 */}
              <h2 id="power-query" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">Passo 3: transformar dados com o Power Query</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                O Power Query é o motor de ETL (Extração, Transformação e Carga) do Power BI. Segundo a <a href="https://learn.microsoft.com/pt-br/power-bi/transform-model/desktop-query-overview" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-semibold hover:underline">documentação da Microsoft</a>, todas as transformações são registradas como etapas aplicadas — permitindo auditoria completa e fácil manutenção.
              </p>
              <p className="text-slate-600 leading-relaxed mb-3">As transformações mais essenciais para um primeiro dashboard:</p>
              <div className="space-y-3 mb-8">
                {[
                  ['Promover a primeira linha como cabeçalho', 'Quando o arquivo não tem cabeçalhos definidos. Aba Início → "Usar a Primeira Linha como Cabeçalho".'],
                  ['Remover colunas desnecessárias', 'Selecione as colunas que não precisar → clique com o botão direito → Remover. Menos colunas = modelo mais leve.'],
                  ['Alterar tipos de dados', 'Clique no ícone à esquerda do nome de cada coluna e defina o tipo correto: Data, Número Decimal, Texto, etc.'],
                  ['Filtrar linhas inválidas', 'Use os filtros automáticos do cabeçalho para remover linhas em branco, erros ou categorias irrelevantes.'],
                  ['Mesclar ou acrescentar consultas', 'Combine duas tabelas (Mesclar = JOIN horizontal; Acrescentar = UNION vertical). Aba Página Inicial → Combinar.'],
                ].map(([titulo, desc], i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <p className="font-extrabold text-slate-800 mb-1 flex items-center gap-2 text-sm">
                      <span className="bg-amber-100 text-amber-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-black flex-shrink-0">{i + 1}</span>
                      {titulo}
                    </p>
                    <p className="text-slate-500 text-sm">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-8">
                Quando as transformações estiverem prontas, clique em <strong>Fechar e Aplicar</strong> para carregar os dados no modelo do Power BI Desktop.
              </p>

              {/* Seção 4 */}
              <h2 id="modelagem" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">Passo 4: modelar os relacionamentos</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Na aba <strong>Modelo</strong> (ícone de diagrama na barra lateral esquerda), você define como as tabelas se relacionam entre si. A Microsoft recomenda o <strong>modelo estrela (Star Schema)</strong> como padrão para dashboards profissionais: uma tabela fato central conectada a tabelas dimensão ao redor.
              </p>
              <div className="bg-slate-900 rounded-2xl p-6 mb-6 text-sm font-mono">
                <div className="flex flex-wrap items-center gap-2 text-center justify-center">
                  {['dCalendário\n(dimensão)', 'dProdutos\n(dimensão)', 'fVendas\n(fato central)', 'dClientes\n(dimensão)', 'dRegiões\n(dimensão)'].map((step, i, arr) => (
                    <React.Fragment key={i}>
                      {i === 2 ? (
                        <div className="bg-amber-800/50 border-2 border-amber-500/60 rounded-xl px-4 py-2 text-amber-200 text-xs whitespace-pre-line text-center font-bold">{step}</div>
                      ) : (
                        <div className="bg-slate-700/50 border border-slate-600/40 rounded-xl px-3 py-2 text-slate-300 text-xs whitespace-pre-line text-center">{step}</div>
                      )}
                      {i < arr.length - 1 && i !== 1 && <ChevronRight className="w-4 h-4 text-slate-500 hidden sm:block" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Para criar um relacionamento: arraste a coluna chave de uma tabela para a coluna correspondente na outra. O Power BI detecta automaticamente a cardinalidade (1:N, N:1, etc.) conforme a <a href="https://learn.microsoft.com/pt-br/power-bi/transform-model/desktop-create-and-manage-relationships" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-semibold hover:underline">documentação oficial de relacionamentos</a>.
              </p>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 text-sm text-slate-700">
                <strong>⚠️ Ponto de atenção:</strong> Uma tabela de datas dedicada (<code className="bg-amber-100 px-1 rounded font-mono">dCalendário</code>) é obrigatória para usar funções de inteligência de tempo (YTD, comparativos de período). Crie-a via <strong>Nova Tabela</strong> com a função DAX <code className="bg-amber-100 px-1 rounded font-mono">CALENDARAUTO()</code> e marque-a como tabela de datas nas configurações.
              </div>

              {/* Seção 5 */}
              <h2 id="visualizacoes" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">Passo 5: criar as visualizações</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Na aba <strong>Relatório</strong>, arraste campos do painel à direita para a tela em branco. O Power BI sugere automaticamente o tipo de visual mais adequado, mas você pode alterar a qualquer momento. Segundo a <a href="https://learn.microsoft.com/pt-br/power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-semibold hover:underline">documentação de visuais</a>, os mais usados em dashboards profissionais são:
              </p>
              <div className="space-y-3 mb-8">
                {[
                  ['Cartão (Card)', 'KPIs principais: faturamento total, nº de clientes, ticket médio. Arraste uma medida → escolha "Cartão".'],
                  ['Gráfico de Barras/Colunas', 'Comparar categorias: vendas por produto, por região, por mês. Ideal para até 10-12 categorias.'],
                  ['Gráfico de Linhas', 'Tendências ao longo do tempo. Eixo X = data, Eixo Y = valor. Exige tabela de datas configurada.'],
                  ['Tabela / Matriz', 'Detalhar dados com múltiplas dimensões. A Matriz permite hierarquias expansíveis (ano → mês → dia).'],
                  ['Segmentação (Slicer)', 'Filtros interativos visíveis na tela — por período, categoria, região. Arraste a coluna → escolha "Segmentação de Dados".'],
                  ['Gráfico de Rosca', 'Participação percentual de partes no todo. Use com no máximo 5-6 categorias para manter legibilidade.'],
                ].map(([visual, desc], i) => (
                  <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-800 text-sm font-bold">{visual}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Seção 6 */}
              <h2 id="design" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">Passo 6: formatação e design profissional</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Um dashboard tecnicamente correto mas visualmente confuso perde impacto na hora da apresentação. Seguindo as <a href="https://learn.microsoft.com/pt-br/power-bi/create-reports/service-dashboards-design-tips" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-semibold hover:underline">diretrizes de design da Microsoft</a>, aplique esses princípios:
              </p>
              <div className="space-y-3 mb-6">
                {[
                  ['Hierarquia visual', 'KPIs no topo (cartões grandes), gráficos de tendência no meio, detalhes em tabelas na base. O olho percorre de cima para baixo.'],
                  ['Paleta de cores consistente', 'Use no máximo 3 cores principais. Defina um tema global em Exibição → Temas — o Power BI aplicará automaticamente a todos os visuais.'],
                  ['Títulos claros e objetivos', 'Cada visual deve ter um título que responda uma pergunta de negócio: "Faturamento por Mês" é melhor que "Gráfico 1".'],
                  ['Alinhamento e espaçamento', 'Use Ctrl+A → Formatar → Alinhar para alinhar múltiplos visuais. Espaçamento uniforme transmite organização e profissionalismo.'],
                  ['Fundo e borda', 'Adicione um fundo suave (cinza claro ou branco) e bordas arredondadas nos painéis via painel de formatação para dar profundidade aos cartões.'],
                ].map(([titulo, desc], i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <p className="font-extrabold text-slate-800 mb-1 flex items-center gap-2 text-sm">
                      <span className="bg-amber-100 text-amber-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-black flex-shrink-0">{i + 1}</span>
                      {titulo}
                    </p>
                    <p className="text-slate-500 text-sm">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Seção 7 */}
              <h2 id="publicar" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">Passo 7: publicar no Power BI Service</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Com o relatório pronto no Power BI Desktop, clique em <strong>Publicar</strong> na aba Página Inicial. Selecione o workspace de destino e aguarde o upload. Conforme a <a href="https://learn.microsoft.com/pt-br/power-bi/create-reports/desktop-upload-desktop-files" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-semibold hover:underline">documentação oficial de publicação</a>, o processo leva de segundos a poucos minutos dependendo do tamanho do modelo.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">No Power BI Service (app.powerbi.com) você poderá:</p>
              <div className="space-y-2 mb-6">
                {[
                  'Criar um Dashboard fixando os visuais mais importantes do relatório (ícone de pino em cada visual)',
                  'Configurar atualização automática dos dados em Conjuntos de Dados → Atualizar Agora / Agendar Atualização',
                  'Compartilhar o relatório com colegas via link ou por workspace — sem precisar enviar arquivos por e-mail',
                  'Acessar via app Power BI Mobile no celular (iOS e Android) com a mesma conta corporativa',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-10 text-sm text-slate-700">
                <strong>⚠️ Atenção com o compartilhamento:</strong> Cada usuário que acessar um relatório no Power BI Service precisa de uma licença <strong>Power BI Pro</strong> (ou estar em um workspace Premium). Sem licença, o link abrirá apenas para o dono do relatório.
              </div>

              {/* Fontes */}
              <div className="bg-slate-100 rounded-2xl p-5 text-sm text-slate-500 border border-slate-200 mb-10">
                <p className="font-bold text-slate-700 mb-2">📚 Fontes consultadas</p>
                <ul className="space-y-1">
                  <li>
                    <a href="https://learn.microsoft.com/pt-br/power-bi/fundamentals/desktop-getting-started" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Microsoft Learn — Introdução ao Power BI Desktop
                    </a>
                  </li>
                  <li>
                    <a href="https://learn.microsoft.com/pt-br/power-bi/connect-data/desktop-data-sources" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Microsoft Learn — Fontes de dados no Power BI Desktop
                    </a>
                  </li>
                  <li>
                    <a href="https://learn.microsoft.com/pt-br/power-bi/transform-model/desktop-query-overview" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Microsoft Learn — Visão geral de consultas no Power BI Desktop
                    </a>
                  </li>
                  <li>
                    <a href="https://learn.microsoft.com/pt-br/power-bi/transform-model/desktop-create-and-manage-relationships" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Microsoft Learn — Criar e gerenciar relacionamentos
                    </a>
                  </li>
                  <li>
                    <a href="https://learn.microsoft.com/pt-br/power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Microsoft Learn — Tipos de visualização no Power BI
                    </a>
                  </li>
                  <li>
                    <a href="https://learn.microsoft.com/pt-br/power-bi/create-reports/service-dashboards-design-tips" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Microsoft Learn — Dicas de design para dashboards
                    </a>
                  </li>
                  <li>
                    <a href="https://learn.microsoft.com/pt-br/power-bi/create-reports/desktop-upload-desktop-files" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Microsoft Learn — Publicar do Power BI Desktop
                    </a>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-amber-600 to-amber-800 rounded-3xl p-8 text-white text-center">
                <p className="text-lg font-extrabold mb-2">Quer criar dashboards profissionais de verdade?</p>
                <p className="text-amber-100 text-sm mb-6">A Treinatech tem trilha completa de Power BI — do zero ao nível avançado com DAX, modelagem e publicação corporativa, com acompanhamento de instrutor MCT.</p>
                <a
                  href="#cursos"
                  onClick={() => { const el = document.getElementById('cursos'); if(el) el.scrollIntoView({behavior:'smooth'}); }}
                  className="inline-block bg-white text-amber-800 font-extrabold px-8 py-3 rounded-2xl hover:bg-amber-50 transition-colors active:scale-95"
                >
                  Ver trilhas de Power BI →
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
                    { label: 'Instalar o Power BI Desktop', id: 'instalacao' },
                    { label: 'Conectar aos dados', id: 'conectar-dados' },
                    { label: 'Transformar com Power Query', id: 'power-query' },
                    { label: 'Modelar relacionamentos', id: 'modelagem' },
                    { label: 'Criar visualizações', id: 'visualizacoes' },
                    { label: 'Design profissional', id: 'design' },
                    { label: 'Publicar no Power BI Service', id: 'publicar' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        const el = document.getElementById(item.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="w-full text-left text-sm text-slate-500 hover:text-amber-700 cursor-pointer transition-colors py-1 border-b border-slate-50 last:border-0"
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
                    { title: 'Excel vs Power BI: Qual ferramenta usar?', id: 1 },
                  ].map((rel) => (
                    <p key={rel.id} className="text-sm text-slate-700 hover:text-amber-700 cursor-pointer font-semibold leading-snug transition-colors">
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

  // Artigo 6 — Carreira em dados
  if (articleId === 6) {
    return (
      <article className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 pt-28 pb-16 px-4">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-bold mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
            </button>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-400/10 border border-purple-400/20 px-4 py-1.5 rounded-full mb-5">
              Carreira
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6">
              Carreira em dados: o que as empresas realmente esperam de você
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" />
                <span className="text-white font-semibold">Ivo Amarante</span> · Instrutor MCT
              </span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 15 fev 2026</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 5 min de leitura</span>
              <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Nível: Todos os níveis</span>
            </div>
          </div>
        </div>

        {/* Imagem de capa */}
        <div className="max-w-3xl mx-auto px-4 -mt-1">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85"
            alt="Carreira em dados"
            className="w-full h-72 object-cover rounded-3xl shadow-2xl"
          />
        </div>

        {/* Conteúdo */}
        <div className="max-w-3xl mx-auto px-4 py-14">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Artigo principal */}
            <div className="flex-1 prose-custom">

              {/* Intro */}
              <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium border-l-4 border-purple-500 pl-5 bg-purple-50 py-4 pr-4 rounded-r-2xl">
                Analisamos mais de 50 vagas reais de analista de dados publicadas no LinkedIn, Glassdoor e portais corporativos brasileiros. O resultado mostra uma lacuna clara: a maioria dos candidatos domina ferramentas, mas poucas pessoas combinam habilidades técnicas com raciocínio de negócio — e é exatamente isso que as empresas mais pagam para encontrar.
              </p>

              {/* Seção 1 */}
              <h2 id="mercado" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">O mercado de dados no Brasil e no mundo</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                O Fórum Econômico Mundial projeta, no relatório <a href="https://www.weforum.org/publications/the-future-of-jobs-report-2025/" target="_blank" rel="noopener noreferrer" className="text-purple-700 font-semibold hover:underline">Future of Jobs 2025</a>, que analistas e cientistas de dados estarão entre as cinco profissões de maior crescimento global até 2030 — com expectativa de 1 milhão de novas vagas líquidas somente nessa categoria. No Brasil, a demanda cresce em ritmo acelerado: segundo o <a href="https://www.linkedin.com/business/talent/blog/talent-strategy/fastest-growing-jobs" target="_blank" rel="noopener noreferrer" className="text-purple-700 font-semibold hover:underline">LinkedIn Talent Insights</a>, vagas com "análise de dados" no título cresceram mais de 40% entre 2022 e 2024 no país.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Ao mesmo tempo, o <a href="https://survey.stackoverflow.co/2024/" target="_blank" rel="noopener noreferrer" className="text-purple-700 font-semibold hover:underline">Stack Overflow Developer Survey 2024</a> aponta que profissionais de dados estão entre os mais bem remunerados da área de tecnologia globalmente — com salários medianos acima da média do setor em todas as regiões pesquisadas.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {[
                  { valor: '+1 milhão', desc: 'novas vagas de dados previstas até 2030 (WEF, 2025)' },
                  { valor: '+40%', desc: 'crescimento de vagas de analista no Brasil (LinkedIn, 2024)' },
                  { valor: 'Top 5', desc: 'profissões mais demandadas globalmente para a próxima década' },
                ].map(({ valor, desc }, i) => (
                  <div key={i} className="bg-purple-50 border border-purple-100 rounded-2xl p-5 text-center">
                    <p className="text-3xl font-extrabold text-purple-700 mb-1">{valor}</p>
                    <p className="text-xs text-slate-500 leading-snug">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Seção 2 */}
              <h2 id="hard-skills" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">As habilidades técnicas mais cobradas nas vagas</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Cruzamos as exigências das vagas com dados do <a href="https://survey.stackoverflow.co/2024/" target="_blank" rel="noopener noreferrer" className="text-purple-700 font-semibold hover:underline">Stack Overflow Developer Survey 2024</a> e do <a href="https://www.glassdoor.com/research/data-scientist-job-description/" target="_blank" rel="noopener noreferrer" className="text-purple-700 font-semibold hover:underline">Glassdoor Job & Salary Research</a>. As ferramentas e tecnologias abaixo aparecem com maior frequência nas descrições de vagas de analista de dados no Brasil:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800 text-white">
                      <th className="text-left px-5 py-3 font-bold">Habilidade</th>
                      <th className="text-left px-5 py-3 font-bold">Frequência nas vagas</th>
                      <th className="text-left px-5 py-3 font-bold">Por que as empresas exigem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['SQL', 'Muito alta (~85% das vagas)', 'Extração de dados de bancos corporativos sem depender de TI'],
                      ['Excel / Power Query', 'Muito alta (~80% das vagas)', 'Análises rápidas, relatórios operacionais e automação de rotinas'],
                      ['Power BI ou Tableau', 'Alta (~70% das vagas)', 'Dashboards interativos para gestores e diretoria'],
                      ['Python (pandas, matplotlib)', 'Média-alta (~55% das vagas)', 'Automação, análise estatística e manipulação de grandes volumes'],
                      ['Google Analytics / GA4', 'Média (~40% das vagas)', 'Análise de comportamento digital em empresas com e-commerce ou marketing'],
                      ['Azure / AWS / GCP', 'Crescente (~30% das vagas)', 'Ambientes de dados modernos na nuvem — tendência acelerada pós-2023'],
                    ].map(([skill, freq, motivo], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-5 py-3 font-bold text-purple-700">{skill}</td>
                        <td className="px-5 py-3 text-slate-600 text-xs">{freq}</td>
                        <td className="px-5 py-3 text-slate-500 text-xs">{motivo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 mb-8 text-sm text-slate-700">
                <strong>💡 Ponto de atenção:</strong> SQL continua sendo a habilidade número 1 — presente em mais vagas do que Python ou Power BI. Dominar SQL antes de qualquer outra ferramenta é o caminho mais direto para entrar no mercado de dados.
              </div>

              {/* Seção 3 */}
              <h2 id="soft-skills" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">As soft skills que as empresas realmente valorizam</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Segundo o relatório <a href="https://www.weforum.org/publications/the-future-of-jobs-report-2025/" target="_blank" rel="noopener noreferrer" className="text-purple-700 font-semibold hover:underline">Future of Jobs 2025 do WEF</a>, pensamento analítico e criatividade lideram a lista de competências mais valorizadas para a próxima década — acima de qualquer habilidade técnica específica. A <a href="https://hbr.org/2012/10/data-scientist-the-sexiest-job-of-the-21st-century" target="_blank" rel="noopener noreferrer" className="text-purple-700 font-semibold hover:underline">Harvard Business Review</a> reforça que o diferencial do bom analista está em transformar dados em decisões — não apenas em gerar gráficos.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  ['Comunicação de resultados', 'Apresentar análises para pessoas não técnicas — gestores, diretores, clientes — de forma clara e acionável. Quem não sabe comunicar, não influencia decisões.'],
                  ['Raciocínio de negócio', 'Entender o contexto por trás dos dados: qual problema a empresa está tentando resolver? Qual decisão essa análise vai embasar?'],
                  ['Pensamento crítico', 'Questionar a qualidade dos dados, identificar vieses, reconhecer quando um resultado "bom demais" precisa ser investigado antes de ser apresentado.'],
                  ['Autonomia e proatividade', 'Trazer análises que ninguém pediu mas que geram valor. Empresas querem analistas que resolvem problemas, não apenas que executam tarefas.'],
                  ['Colaboração multidisciplinar', 'Trabalhar com times de TI, Marketing, Financeiro e Operações ao mesmo tempo — traduzindo necessidades de negócio em consultas e relatórios.'],
                ].map(([titulo, desc], i) => (
                  <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-800 text-sm font-bold">{titulo}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Seção 4 */}
              <h2 id="diferencial" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">O que separa um analista mediano de um excelente</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                A <a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-data-driven-enterprise-of-2025" target="_blank" rel="noopener noreferrer" className="text-purple-700 font-semibold hover:underline">McKinsey Global Institute</a> identificou que empresas orientadas por dados têm 23 vezes mais chances de adquirir clientes e 6 vezes mais chances de reter clientes — mas apenas quando as análises são convertidas em ações concretas. Isso exige um perfil que vai além do técnico:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800 text-white">
                      <th className="text-left px-5 py-3 font-bold">Analista mediano</th>
                      <th className="text-left px-5 py-3 font-bold">Analista excelente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Responde o que foi pedido', 'Antecipa perguntas que ainda não foram feitas'],
                      ['Entrega gráficos bonitos', 'Entrega uma recomendação com os dados como evidência'],
                      ['Domina uma ferramenta', 'Escolhe a ferramenta certa para cada problema'],
                      ['Usa dados históricos', 'Conecta passado, presente e tendências'],
                      ['Trabalha isolado', 'Constrói confiança com as áreas de negócio'],
                      ['Mostra o número', 'Explica o que o número significa para o negócio'],
                    ].map(([mediano, excelente], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-5 py-3 text-slate-500 text-sm flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />{mediano}
                        </td>
                        <td className="px-5 py-3 text-slate-700 text-sm font-semibold">
                          <span className="text-green-600 mr-1">✓</span>{excelente}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Seção 5 */}
              <h2 id="preparacao" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">O caminho prático para se preparar</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Com base no perfil das vagas e nas competências mapeadas, este é o caminho mais eficiente para quem quer entrar ou se destacar na área de dados:
              </p>
              <div className="space-y-4 mb-8">
                {[
                  {
                    passo: '1',
                    titulo: 'Fundamentos de Excel e Power Query',
                    desc: 'Excel ainda está em 80% das vagas. Dominar tabelas dinâmicas, Power Query e funções de busca é o pré-requisito básico — e o diferencial em empresas que ainda não adotaram BI.',
                    cor: 'bg-green-50 border-green-100',
                    badge: 'bg-green-100 text-green-700',
                  },
                  {
                    passo: '2',
                    titulo: 'SQL do básico ao intermediário',
                    desc: 'SELECT, JOIN, GROUP BY, subqueries e CTEs. Suficiente para resolver 90% das demandas de análise de dados no dia a dia corporativo.',
                    cor: 'bg-blue-50 border-blue-100',
                    badge: 'bg-blue-100 text-blue-700',
                  },
                  {
                    passo: '3',
                    titulo: 'Power BI: modelagem e visualização',
                    desc: 'Criar dashboards interativos com DAX básico, relacionamentos e publicação no Power BI Service. Esta combinação (SQL + Power BI) abre as portas para a maioria das vagas de analista.',
                    cor: 'bg-yellow-50 border-yellow-100',
                    badge: 'bg-yellow-100 text-yellow-700',
                  },
                  {
                    passo: '4',
                    titulo: 'Python para dados (diferencial)',
                    desc: 'Pandas, matplotlib e automação de relatórios. Não é exigido em todas as vagas, mas aumenta significativamente o salário pretendido e abre portas para cientista de dados.',
                    cor: 'bg-purple-50 border-purple-100',
                    badge: 'bg-purple-100 text-purple-700',
                  },
                  {
                    passo: '5',
                    titulo: 'Portfólio com projetos reais',
                    desc: 'Um projeto público no GitHub ou no LinkedIn com dados reais vale mais que qualquer certificado isolado. Analise dados abertos do IBGE, DATASUS ou Kaggle e publique suas conclusões.',
                    cor: 'bg-slate-50 border-slate-200',
                    badge: 'bg-slate-100 text-slate-700',
                  },
                ].map(({ passo, titulo, desc, cor, badge }) => (
                  <div key={passo} className={`border rounded-2xl p-5 ${cor}`}>
                    <p className="font-extrabold text-slate-800 mb-1 flex items-center gap-2 text-sm">
                      <span className={`rounded-full w-6 h-6 flex items-center justify-center text-xs font-black flex-shrink-0 ${badge}`}>{passo}</span>
                      {titulo}
                    </p>
                    <p className="text-slate-500 text-sm">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Seção 6 */}
              <h2 id="salarios" className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 scroll-mt-24">Referências salariais no Brasil</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Segundo levantamentos do <a href="https://www.glassdoor.com.br/Sal%C3%A1rios/analista-de-dados-sal%C3%A1rio-SRCH_KO0,17.htm" target="_blank" rel="noopener noreferrer" className="text-purple-700 font-semibold hover:underline">Glassdoor Brasil</a> e da <a href="https://www.catho.com.br/salario/analista-de-dados/" target="_blank" rel="noopener noreferrer" className="text-purple-700 font-semibold hover:underline">Catho</a>, as faixas salariais para profissionais de dados no Brasil em 2025 são:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800 text-white">
                      <th className="text-left px-5 py-3 font-bold">Nível</th>
                      <th className="text-left px-5 py-3 font-bold">Perfil</th>
                      <th className="text-left px-5 py-3 font-bold">Faixa salarial (CLT)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Júnior', 'Excel + SQL básico, 0–2 anos de experiência', 'R$ 2.500 – R$ 4.500'],
                      ['Pleno', 'SQL + Power BI + Python básico, 2–5 anos', 'R$ 5.000 – R$ 8.000'],
                      ['Sênior', 'Stack completa + liderança técnica, 5+ anos', 'R$ 9.000 – R$ 15.000'],
                      ['Especialista / Lead', 'Arquitetura de dados, cloud, gestão de times', 'R$ 15.000 – R$ 25.000+'],
                    ].map(([nivel, perfil, salario], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-5 py-3 font-bold text-purple-700">{nivel}</td>
                        <td className="px-5 py-3 text-slate-600 text-xs">{perfil}</td>
                        <td className="px-5 py-3 font-bold text-slate-800">{salario}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-slate-500 text-xs mb-10 italic">* Valores médios de mercado em 2025. Fintechs, consultorias e empresas de tecnologia tendem a pagar 20–40% acima da média.</p>

              {/* Fontes */}
              <div className="bg-slate-100 rounded-2xl p-5 text-sm text-slate-500 border border-slate-200 mb-10">
                <p className="font-bold text-slate-700 mb-2">📚 Fontes consultadas</p>
                <ul className="space-y-1">
                  <li>
                    <a href="https://www.weforum.org/publications/the-future-of-jobs-report-2025/" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> World Economic Forum — Future of Jobs Report 2025
                    </a>
                  </li>
                  <li>
                    <a href="https://survey.stackoverflow.co/2024/" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Stack Overflow — Developer Survey 2024
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/business/talent/blog/talent-strategy/fastest-growing-jobs" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> LinkedIn Talent Insights — Fastest Growing Jobs
                    </a>
                  </li>
                  <li>
                    <a href="https://hbr.org/2012/10/data-scientist-the-sexiest-job-of-the-21st-century" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Harvard Business Review — Data Scientist: The Sexiest Job
                    </a>
                  </li>
                  <li>
                    <a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-data-driven-enterprise-of-2025" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> McKinsey Global Institute — The Data-Driven Enterprise
                    </a>
                  </li>
                  <li>
                    <a href="https://www.glassdoor.com.br/Sal%C3%A1rios/analista-de-dados-sal%C3%A1rio-SRCH_KO0,17.htm" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Glassdoor Brasil — Salários de Analista de Dados
                    </a>
                  </li>
                  <li>
                    <a href="https://www.catho.com.br/salario/analista-de-dados/" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Catho — Pesquisa salarial: Analista de Dados
                    </a>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-3xl p-8 text-white text-center">
                <p className="text-lg font-extrabold mb-2">Pronto para entrar no mercado de dados?</p>
                <p className="text-purple-100 text-sm mb-6">A Treinatech tem trilhas completas que cobrem exatamente o que o mercado exige: Excel, SQL, Power BI e muito mais — com certificação MCT e suporte de instrutor.</p>
                <a
                  href="#cursos"
                  onClick={() => { const el = document.getElementById('cursos'); if(el) el.scrollIntoView({behavior:'smooth'}); }}
                  className="inline-block bg-white text-purple-800 font-extrabold px-8 py-3 rounded-2xl hover:bg-purple-50 transition-colors active:scale-95"
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
                    { label: 'O mercado de dados', id: 'mercado' },
                    { label: 'Habilidades técnicas exigidas', id: 'hard-skills' },
                    { label: 'Soft skills valorizadas', id: 'soft-skills' },
                    { label: 'Mediano vs. excelente', id: 'diferencial' },
                    { label: 'Como se preparar', id: 'preparacao' },
                    { label: 'Referências salariais', id: 'salarios' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        const el = document.getElementById(item.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="w-full text-left text-sm text-slate-500 hover:text-purple-700 cursor-pointer transition-colors py-1 border-b border-slate-50 last:border-0"
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
                    { title: 'SQL para analistas: do zero ao essencial', id: 3 },
                    { title: 'Como criar um dashboard Power BI em 1 hora', id: 4 },
                    { title: 'Excel vs Power BI: Qual ferramenta usar?', id: 1 },
                  ].map((rel) => (
                    <p key={rel.id} className="text-sm text-slate-700 hover:text-purple-700 cursor-pointer font-semibold leading-snug transition-colors">
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
