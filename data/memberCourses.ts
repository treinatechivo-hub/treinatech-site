// ─── Types ────────────────────────────────────────────────────────────────────

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  provider: 'youtube' | 'vimeo' | 'hotmart' | 'direct';
  videoId: string;
  free?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CoursePDF {
  title: string;
  description: string;
  fileUrl: string;
  sizeMB: number;
}

export interface CourseData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  accentColor: string;
  totalLessons: number;
  totalHours: string;
  modules: Module[];
  pdfs: CoursePDF[];
}

// ─── Courses ──────────────────────────────────────────────────────────────────
//
// VÍDEOS DEMO: usando vídeos públicos do canal Hashtag Treinamentos (YouTube).
// Substitua os videoId pelos IDs dos seus vídeos quando publicar.
//
// YouTube:  provider: 'youtube', videoId: 'ID_DO_VIDEO'
// Vimeo:    provider: 'vimeo',   videoId: 'ID_DO_VIDEO'

export const MEMBER_COURSES: CourseData[] = [

  // ─── EXCEL ─────────────────────────────────────────────────────────────────
  {
    id: 'excel',
    title: 'Excel — Básico ao Avançado',
    description: 'Do zero ao domínio completo: fórmulas, dashboards, automação com VBA e análise de dados.',
    icon: '📊',
    color: 'bg-emerald-50',
    accentColor: '#059669',
    totalLessons: 29,
    totalHours: '16h 30min',
    modules: [

      // ── Módulo 1: Básico (YouTube) ──────────────────────────────────────────
      {
        id: 'excel-m1',
        title: 'Módulo 1 — Excel Básico',
        lessons: [
          { id: 'ex-1-1', title: 'Interface e navegação no Excel', duration: '15:00', provider: 'youtube', videoId: 'gLW1Ijfi604', free: true },
          { id: 'ex-1-2', title: 'Células, linhas, colunas e referências', duration: '18:20', provider: 'youtube', videoId: '2kO5xkPl2bo' },
          { id: 'ex-1-3', title: 'Fórmulas: SOMA, MÉDIA, MÁXIMO, MÍNIMO', duration: '20:10', provider: 'youtube', videoId: 'jWckFhoiqQg' },
          { id: 'ex-1-4', title: 'Referências absolutas e relativas', duration: '14:45', provider: 'youtube', videoId: 'HujvzrwNMHQ' },
          { id: 'ex-1-5', title: 'Formatação numérica e estética profissional', duration: '12:30', provider: 'youtube', videoId: 'pnvxeUs6sTg' },
          { id: 'ex-1-6', title: 'Filtros, classificação e validação de dados', duration: '18:15', provider: 'youtube', videoId: 'R0bC0NdYbGY' },
          { id: 'ex-1-7', title: 'PROCV e PROCX — cruzamento entre tabelas', duration: '24:00', provider: 'youtube', videoId: 'dS0HzsL2EJk' },
          { id: 'ex-1-8', title: 'Gráficos e relatórios profissionais', duration: '20:00', provider: 'youtube', videoId: 'EDNulu8DVWg' },
          { id: 'ex-1-9', title: 'Projeto Final — Planilha Profissional Completa', duration: '30:00', provider: 'youtube', videoId: 'EDNulu8DVWg' },
        ],
      },

      // ── Módulo 2: Intermediário (YouTube) ──────────────────────────────────
      {
        id: 'excel-m2',
        title: 'Módulo 2 — Excel Intermediário',
        lessons: [
          { id: 'ex-2-1', title: 'SE e SES — lógica condicional aplicada ao negócio', duration: '18:30', provider: 'youtube', videoId: 'aG_28CLm2a0' },
          { id: 'ex-2-2', title: 'KPIs com formatação condicional e ícones', duration: '22:10', provider: 'youtube', videoId: 'zE5B8gLQLAQ' },
          { id: 'ex-2-3', title: 'DATAM, DATADIF e cálculo de parcelas', duration: '16:45', provider: 'youtube', videoId: '6FIEvdFkcw8' },
          { id: 'ex-2-4', title: 'CONT.SE, SOMASE e SOMARPRODUTO', duration: '21:00', provider: 'youtube', videoId: 'FychSpj92rQ' },
          { id: 'ex-2-5', title: 'PROCV e PROCX avançado com SEERRO', duration: '18:00', provider: 'youtube', videoId: 'bGFAHIe4FLc' },
          { id: 'ex-2-6', title: 'Tabelas Dinâmicas — do básico ao avançado', duration: '35:00', provider: 'youtube', videoId: '45JpMj8kQDU' },
          { id: 'ex-2-7', title: 'Dashboard multi-abas — Projeto International Motors', duration: '35:00', provider: 'youtube', videoId: 'WvZsyF-ywi4' },
          { id: 'ex-2-8', title: 'Segurança em 4 níveis — células, planilha e arquivo', duration: '14:30', provider: 'youtube', videoId: 'R0bC0NdYbGY' },
        ],
      },

      // ── Módulo 3: Avançado (YouTube) ───────────────────────────────────────
      {
        id: 'excel-m3',
        title: 'Módulo 3 — Excel Avançado',
        lessons: [
          { id: 'ex-3-1', title: 'Power Pivot — Modelagem e Análise Avançada', duration: '26:00', provider: 'youtube', videoId: 'px5ij8QkHF8' },
          { id: 'ex-3-2', title: 'Dashboard Profissional no Excel', duration: '22:15', provider: 'youtube', videoId: 'HeX2GTEBbNk' },
          { id: 'ex-3-3', title: 'PROCX Bidimensional — busca produto × mercado', duration: '19:00', provider: 'youtube', videoId: 'dS0HzsL2EJk' },
          { id: 'ex-3-4', title: 'Power Query — ETL e feriados automáticos', duration: '24:00', provider: 'youtube', videoId: 'EDNulu8DVWg' },
          { id: 'ex-3-5', title: 'Macros — absoluta vs. relativa, atalhos e botões', duration: '20:00', provider: 'youtube', videoId: 'fmKp1GRciNo' },
          { id: 'ex-3-6', title: 'VBA — Sub(), Function() e Módulos', duration: '28:00', provider: 'youtube', videoId: 'zE5B8gLQLAQ' },
          { id: 'ex-3-7', title: 'Formulários com caixas de mensagem personalizadas', duration: '22:00', provider: 'youtube', videoId: '6FIEvdFkcw8' },
          { id: 'ex-3-8', title: 'Integração com WhatsApp via HIPERLINK', duration: '14:00', provider: 'youtube', videoId: 'FychSpj92rQ' },
          { id: 'ex-3-9', title: 'Projeto Final — Planilha Profissional Automatizada', duration: '40:00', provider: 'youtube', videoId: 'WvZsyF-ywi4' },
          { id: 'ex-3-10', title: 'Dashboard Executivo — Apresentação Final', duration: '35:00', provider: 'youtube', videoId: 'EDNulu8DVWg' },
        ],
      },
    ],

    pdfs: [
      { title: 'Apostila Excel Básico', description: 'Guia completo com exemplos e exercícios — Módulo 1', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 3.2 },
      { title: 'Apostila Excel Intermediário', description: 'Fórmulas condicionais, dashboards e segurança — Módulo 2', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 4.1 },
      { title: 'Apostila Excel Avançado', description: 'Tabelas Dinâmicas, VBA e automação — Módulo 3', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 4.8 },
      { title: 'Cheat Sheet — 50 Fórmulas Essenciais', description: 'Referência rápida para o dia a dia profissional', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 0.8 },
      { title: 'Projeto — International Motors Dashboard', description: 'Arquivo Excel do projeto completo do Módulo 2', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 2.1 },
    ],
  },

  // ─── POWER BI ───────────────────────────────────────────────────────────────
  {
    id: 'powerbi',
    title: 'Power BI — Módulo 1 e 2',
    description: 'Do dado ao relatório interativo: ETL, modelagem, DAX e governança corporativa.',
    icon: '📈',
    color: 'bg-blue-50',
    accentColor: '#2563eb',
    totalLessons: 30,
    totalHours: '15h 00min',
    modules: [

      // ── Módulo 1: Básico + Intermediário Parte 1 (YouTube) ──────────────────
      {
        id: 'pbi-m1',
        title: 'Módulo 1 — Fundamentos, ETL, Modelagem e DAX',
        lessons: [
          { id: 'pbi-1-1', title: 'O que é Business Intelligence e o papel do Power BI', duration: '15:00', provider: 'youtube', videoId: 'VMSfIaiW54M', free: true },
          { id: 'pbi-1-2', title: 'Power BI Desktop, Service e Mobile — versões e licenças', duration: '12:30', provider: 'youtube', videoId: '37oxzq2pSbI' },
          { id: 'pbi-1-3', title: 'ETL com Power Query — conectando múltiplas fontes', duration: '22:00', provider: 'youtube', videoId: '9JAZ9S_DNGA' },
          { id: 'pbi-1-4', title: 'Transformação e limpeza de dados no Power Query', duration: '25:30', provider: 'youtube', videoId: 'UFGe25gydxo' },
          { id: 'pbi-1-5', title: 'Star Schema — tabela Fato e Dimensão na prática', duration: '20:00', provider: 'youtube', videoId: 'NW1t0JN8068' },
          { id: 'pbi-1-6', title: 'Relacionamentos — tipos e cardinalidade', duration: '18:45', provider: 'youtube', videoId: 'xx3uYFmsqG4' },
          { id: 'pbi-1-7', title: 'DAX — medidas vs. colunas calculadas', duration: '22:15', provider: 'youtube', videoId: 'Hoe9gE1Ej7E' },
          { id: 'pbi-1-8', title: 'Contexto de filtro e avaliação de expressões DAX', duration: '19:00', provider: 'youtube', videoId: 'naCjJ2OWDBQ' },
          { id: 'pbi-1-9', title: 'Drill Down, Tooltip personalizado e relatórios interativos', duration: '24:00', provider: 'youtube', videoId: '0ZlpuB3Hclc' },
          { id: 'pbi-1-10', title: 'UX/UI e Storytelling para dashboards profissionais', duration: '20:00', provider: 'youtube', videoId: 'QnCSgEsIHMA' },
          { id: 'pbi-1-11', title: 'Publicação no Power BI Service e compartilhamento', duration: '16:00', provider: 'youtube', videoId: 'l0sZ1RcrO50' },
          { id: 'pbi-1-12', title: 'PROJETO 1 — Demonstrativo de Vendas', duration: '35:00', provider: 'youtube', videoId: 'IMZa0WrZ74U' },
          { id: 'pbi-1-13', title: 'PROJETO 2 — International Motors (ETL com 12 planilhas)', duration: '40:00', provider: 'youtube', videoId: 'wtpstMZwozs' },
          { id: 'pbi-1-14', title: 'PROJETO 3 — Painel em tempo real', duration: '28:00', provider: 'youtube', videoId: '7cUrsltJbEI' },
          { id: 'pbi-1-15', title: 'PROJETO 4 — Portfólio de Relatórios (menu interativo)', duration: '22:00', provider: 'youtube', videoId: 'NW1t0JN8068' },
        ],
      },

      // ── Módulo 2: Intermediário Parte 2 + Avançado (YouTube) ───────────────
      {
        id: 'pbi-m2',
        title: 'Módulo 2 — DAX Avançado, IA e Governança',
        lessons: [
          { id: 'pbi-2-1', title: 'Power Query avançado — parâmetros e pivotar/unpivotar', duration: '22:00', provider: 'youtube', videoId: '9JAZ9S_DNGA' },
          { id: 'pbi-2-2', title: 'Linguagem M — personalizações avançadas no Power Query', duration: '20:00', provider: 'youtube', videoId: 'UFGe25gydxo' },
          { id: 'pbi-2-3', title: 'Funções iteradoras — SUMX, AVERAGEX', duration: '18:30', provider: 'youtube', videoId: 'Wj71T95grR4' },
          { id: 'pbi-2-4', title: 'Variáveis no DAX — legibilidade e eficiência', duration: '16:00', provider: 'youtube', videoId: 'naCjJ2OWDBQ' },
          { id: 'pbi-2-5', title: 'Time Intelligence — comparação entre períodos', duration: '25:00', provider: 'youtube', videoId: 'z_sFhVU2ByU' },
          { id: 'pbi-2-6', title: 'Grupos de cálculos e Drill Through', duration: '20:00', provider: 'youtube', videoId: 'PEdFcyAAUHA' },
          { id: 'pbi-2-7', title: 'Visuais com IA — insights automáticos e preditivos', duration: '18:00', provider: 'youtube', videoId: 'UPks_2xto7Q' },
          { id: 'pbi-2-8', title: 'Bookmarks, painel de seleção e menu lateral de filtro', duration: '22:00', provider: 'youtube', videoId: 'l0sZ1RcrO50' },
          { id: 'pbi-2-9', title: 'RLS — Segurança em nível de linha avançada', duration: '20:00', provider: 'youtube', videoId: 'Wj71T95grR4' },
          { id: 'pbi-2-10', title: 'Power BI Report Server — publicação on-premises', duration: '18:00', provider: 'youtube', videoId: 'QnCSgEsIHMA' },
          { id: 'pbi-2-11', title: 'Detecção de erros — anomalias, logs e diagnósticos', duration: '16:00', provider: 'youtube', videoId: 'UPks_2xto7Q' },
          { id: 'pbi-2-12', title: 'Fluxo de dados, Datamarts e governança corporativa', duration: '18:00', provider: 'youtube', videoId: 'Wj71T95grR4' },
          { id: 'pbi-2-13', title: 'PROJETO FINAL 1 — Relatório Estratégico Avançado com DAX', duration: '45:00', provider: 'youtube', videoId: 'PEdFcyAAUHA' },
          { id: 'pbi-2-14', title: 'PROJETO FINAL 2 — Dashboard Executivo com IA e Bookmarks', duration: '40:00', provider: 'youtube', videoId: 'z_sFhVU2ByU' },
          { id: 'pbi-2-15', title: 'Conclusão e próximos passos na sua carreira em dados', duration: '12:00', provider: 'youtube', videoId: '7cUrsltJbEI' },
        ],
      },
    ],

    pdfs: [
      { title: 'Apostila Power BI — Módulo 1', description: 'ETL, Modelagem, DAX e projetos práticos', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 5.1 },
      { title: 'Apostila Power BI — Módulo 2', description: 'DAX avançado, IA, segurança e governança', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 4.8 },
      { title: 'Cheat Sheet — 30 Funções DAX Essenciais', description: 'As medidas DAX mais usadas em projetos reais', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 0.9 },
      { title: 'Projeto — International Motors (Power BI)', description: 'Arquivo .pbix do projeto completo do Módulo 1', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 3.2 },
      { title: 'Guia — Star Schema e Modelagem Dimensional', description: 'Referência completa de modelagem para Power BI', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 1.4 },
    ],
  },
];
