// ─── Types ────────────────────────────────────────────────────────────────────

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  provider: 'youtube' | 'vimeo' | 'hotmart' | 'direct' | 'onedrive';
  videoId: string;
  free?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseMaterial {
  title: string;
  description: string;
  fileUrl: string;
  sizeMB: number;
  type?: 'pdf' | 'docx' | 'xlsx' | 'pptx'; // default: pdf
}

export interface CourseData {
  id: string;
  family?: string; // agrupa cursos relacionados: 'excel' | 'powerbi'
  title: string;
  description: string;
  icon: string;
  color: string;
  accentColor: string;
  totalLessons: number;
  totalHours: string;
  modules: Module[];
  materials: CourseMaterial[];
}

// ─── Courses ──────────────────────────────────────────────────────────────────

export const MEMBER_COURSES: CourseData[] = [

  // ─── INTRODUÇÃO À IA COM FOCO NO CLAUDE — GRATUITO ────────────────────────
  {
    id: 'intro-ia-claude',
    title: 'Introdução à IA com Foco no Claude',
    description: 'Aprenda Inteligência Artificial na prática com foco no Claude. Curso gratuito e direto ao ponto.',
    icon: '🤖',
    color: 'bg-violet-50',
    accentColor: '#7c3aed',
    totalLessons: 8,
    totalHours: '1h 30min',
    modules: [
      {
        id: 'ia-m1',
        title: 'Módulo 1 — Fundamentos',
        lessons: [
          { id: 'ia-1-1', title: 'IA Gratuita — Aula 1', duration: '10:04', provider: 'youtube', videoId: 'mE5hqXAXMhM', free: true },
          { id: 'ia-1-2', title: 'IA Gratuita — Aula 2', duration: '10:19', provider: 'youtube', videoId: 'zKTp947bZ-U' },
          { id: 'ia-1-3', title: 'IA Gratuita — Aula 3', duration: '10:23', provider: 'youtube', videoId: 'LnmpamSUlog' },
          { id: 'ia-1-4', title: 'IA Gratuita — Aula 4', duration: '11:05', provider: 'youtube', videoId: 'PclzQrjoZ5s' },
          { id: 'ia-1-5', title: 'Aula 5 — [em breve]', duration: '00:00', provider: 'youtube', videoId: 'PLACEHOLDER' },
          { id: 'ia-1-6', title: 'Aula 6 — [em breve]', duration: '00:00', provider: 'youtube', videoId: 'PLACEHOLDER' },
          { id: 'ia-1-7', title: 'Aula 7 — [em breve]', duration: '00:00', provider: 'youtube', videoId: 'PLACEHOLDER' },
          { id: 'ia-1-8', title: 'Aula 8 — [em breve]', duration: '00:00', provider: 'youtube', videoId: 'PLACEHOLDER' },
        ],
      },
    ],
    materials: [
      { title: 'Material — Aula 1', description: 'Apostila da Aula 1: O que é IA e como ela funciona', fileUrl: '/Materiais/Aula01_Aluno.pdf', sizeMB: 3.8, type: 'pdf' },
      { title: 'Material — Aula 2', description: 'Apostila da Aula 2', fileUrl: '/Materiais/Aula02_Aluno.pdf', sizeMB: 3.8, type: 'pdf' },
      { title: 'Material — Aula 3', description: 'Apostila da Aula 3', fileUrl: '/Materiais/Aula03_Aluno.pdf', sizeMB: 3.8, type: 'pdf' },
      { title: 'Material — Aula 4', description: 'Apostila da Aula 4', fileUrl: '/Materiais/Aula04_Aluno.pdf', sizeMB: 3.8, type: 'pdf' },
    ],
  },

  // ─── EXCEL BÁSICO ──────────────────────────────────────────────────────────
  {
    id: 'excel-basico',
    family: 'excel',
    title: 'Excel Básico',
    description: 'Fundamentos essenciais do Excel: navegação, fórmulas, formatação e os primeiros relatórios profissionais.',
    icon: '📊',
    color: 'bg-emerald-50',
    accentColor: '#059669',
    totalLessons: 9,
    totalHours: '5h 30min',
    modules: [
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
    ],
    materials: [
      { title: 'Apostila Excel Básico', description: 'Guia completo com exemplos e exercícios — Módulo 1', fileUrl: 'PLACEHOLDER_URL', sizeMB: 3.2, type: 'pdf' },
      { title: 'Planilha de Exercícios — Básico', description: 'Arquivo Excel para praticar os exercícios do módulo', fileUrl: 'PLACEHOLDER_URL', sizeMB: 1.1, type: 'xlsx' },
      { title: 'Cheat Sheet — Fórmulas Básicas', description: 'As 20 fórmulas mais usadas no dia a dia', fileUrl: 'PLACEHOLDER_URL', sizeMB: 0.4, type: 'pdf' },
    ],
  },

  // ─── EXCEL INTERMEDIÁRIO ───────────────────────────────────────────────────
  {
    id: 'excel-intermediario',
    family: 'excel',
    title: 'Excel Intermediário',
    description: 'Fórmulas condicionais, KPIs, Tabelas Dinâmicas e dashboards profissionais multi-abas.',
    icon: '📊',
    color: 'bg-emerald-50',
    accentColor: '#059669',
    totalLessons: 8,
    totalHours: '5h 30min',
    modules: [
      {
        id: 'excel-m2',
        title: 'Módulo 2 — Excel Intermediário',
        lessons: [
          { id: 'ex-2-1', title: 'SE e SES — lógica condicional aplicada ao negócio', duration: '18:30', provider: 'youtube', videoId: 'aG_28CLm2a0', free: true },
          { id: 'ex-2-2', title: 'KPIs com formatação condicional e ícones', duration: '22:10', provider: 'youtube', videoId: 'zE5B8gLQLAQ' },
          { id: 'ex-2-3', title: 'DATAM, DATADIF e cálculo de parcelas', duration: '16:45', provider: 'youtube', videoId: '6FIEvdFkcw8' },
          { id: 'ex-2-4', title: 'CONT.SE, SOMASE e SOMARPRODUTO', duration: '21:00', provider: 'youtube', videoId: 'FychSpj92rQ' },
          { id: 'ex-2-5', title: 'PROCV e PROCX avançado com SEERRO', duration: '18:00', provider: 'youtube', videoId: 'bGFAHIe4FLc' },
          { id: 'ex-2-6', title: 'Tabelas Dinâmicas — do básico ao avançado', duration: '35:00', provider: 'youtube', videoId: '45JpMj8kQDU' },
          { id: 'ex-2-7', title: 'Dashboard multi-abas — Projeto International Motors', duration: '35:00', provider: 'youtube', videoId: 'WvZsyF-ywi4' },
          { id: 'ex-2-8', title: 'Segurança em 4 níveis — células, planilha e arquivo', duration: '14:30', provider: 'youtube', videoId: 'R0bC0NdYbGY' },
        ],
      },
    ],
    materials: [
      { title: 'Apostila Excel Intermediário', description: 'Fórmulas condicionais, dashboards e segurança', fileUrl: 'PLACEHOLDER_URL', sizeMB: 4.1, type: 'pdf' },
      { title: 'Projeto International Motors', description: 'Arquivo Excel completo do projeto de dashboard', fileUrl: 'PLACEHOLDER_URL', sizeMB: 2.1, type: 'xlsx' },
      { title: 'Slide — Tabelas Dinâmicas', description: 'Apresentação de apoio para o módulo', fileUrl: 'PLACEHOLDER_URL', sizeMB: 3.2, type: 'pptx' },
      { title: 'Cheat Sheet — 50 Fórmulas Essenciais', description: 'Referência rápida para o dia a dia profissional', fileUrl: 'PLACEHOLDER_URL', sizeMB: 0.8, type: 'pdf' },
    ],
  },

  // ─── EXCEL AVANÇADO ────────────────────────────────────────────────────────
  {
    id: 'excel-avancado',
    family: 'excel',
    title: 'Excel Avançado',
    description: 'Power Query, Power Pivot, Macros, VBA e automação completa de planilhas corporativas.',
    icon: '📊',
    color: 'bg-emerald-50',
    accentColor: '#059669',
    totalLessons: 10,
    totalHours: '5h 30min',
    modules: [
      {
        id: 'excel-m3',
        title: 'Módulo 3 — Excel Avançado',
        lessons: [
          { id: 'ex-3-1', title: 'Power Pivot — Modelagem e Análise Avançada', duration: '26:00', provider: 'youtube', videoId: 'px5ij8QkHF8', free: true },
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
    materials: [
      { title: 'Apostila Excel Avançado', description: 'Tabelas Dinâmicas, VBA e automação', fileUrl: 'PLACEHOLDER_URL', sizeMB: 4.8, type: 'pdf' },
      { title: 'Projeto Final — Planilha Automatizada', description: 'Arquivo Excel com macros e VBA do projeto final', fileUrl: 'PLACEHOLDER_URL', sizeMB: 3.5, type: 'xlsx' },
      { title: 'Manual VBA — Referência Rápida', description: 'Guia de sintaxe e exemplos de VBA', fileUrl: 'PLACEHOLDER_URL', sizeMB: 1.2, type: 'docx' },
    ],
  },

  // ─── POWER BI — MÓDULO 1 ───────────────────────────────────────────────────
  {
    id: 'powerbi-m1',
    family: 'powerbi',
    title: 'Power BI — Módulo 1',
    description: 'Fundamentos, ETL com Power Query, modelagem Star Schema, DAX essencial e projetos práticos.',
    icon: '📈',
    color: 'bg-blue-50',
    accentColor: '#2563eb',
    totalLessons: 15,
    totalHours: '8h 00min',
    modules: [
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
    ],
    materials: [
      { title: 'Apostila Power BI — Módulo 1', description: 'ETL, Modelagem, DAX e projetos práticos', fileUrl: 'PLACEHOLDER_URL', sizeMB: 5.1, type: 'pdf' },
      { title: 'Projeto International Motors (.pbix)', description: 'Arquivo Power BI do projeto completo', fileUrl: 'PLACEHOLDER_URL', sizeMB: 3.2, type: 'xlsx' },
      { title: 'Guia — Star Schema e Modelagem Dimensional', description: 'Referência completa de modelagem para Power BI', fileUrl: 'PLACEHOLDER_URL', sizeMB: 1.4, type: 'docx' },
      { title: 'Slide — Fundamentos Power BI', description: 'Apresentação do módulo 1', fileUrl: 'PLACEHOLDER_URL', sizeMB: 4.8, type: 'pptx' },
    ],
  },

  // ─── POWER BI — MÓDULO 2 ───────────────────────────────────────────────────
  {
    id: 'powerbi-m2',
    family: 'powerbi',
    title: 'Power BI — Módulo 2',
    description: 'DAX avançado, Time Intelligence, IA preditiva, RLS, governança corporativa e projetos executivos.',
    icon: '📈',
    color: 'bg-blue-50',
    accentColor: '#2563eb',
    totalLessons: 15,
    totalHours: '7h 00min',
    modules: [
      {
        id: 'pbi-m2',
        title: 'Módulo 2 — DAX Avançado, IA e Governança',
        lessons: [
          { id: 'pbi-2-1', title: 'Power Query avançado — parâmetros e pivotar/unpivotar', duration: '22:00', provider: 'youtube', videoId: '9JAZ9S_DNGA', free: true },
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
    materials: [
      { title: 'Apostila Power BI — Módulo 2', description: 'DAX avançado, IA, segurança e governança', fileUrl: 'PLACEHOLDER_URL', sizeMB: 4.8, type: 'pdf' },
      { title: 'Cheat Sheet — 30 Funções DAX Essenciais', description: 'As medidas DAX mais usadas em projetos reais', fileUrl: 'PLACEHOLDER_URL', sizeMB: 0.9, type: 'pdf' },
      { title: 'Slide — DAX Avançado e Time Intelligence', description: 'Apresentação do módulo 2', fileUrl: 'PLACEHOLDER_URL', sizeMB: 5.2, type: 'pptx' },
    ],
  },

  // ─── SQL PARA DADOS ────────────────────────────────────────────────────────
  {
    id: 'sql-dados',
    title: 'SQL para Dados',
    description: 'Do SELECT ao avançado: manipulação, relacionamentos, views, stored procedures e otimização de consultas.',
    icon: '🗃️',
    color: 'bg-orange-50',
    accentColor: '#ea580c',
    totalLessons: 12,
    totalHours: '8h 00min',
    modules: [
      {
        id: 'sql-m1',
        title: 'Módulo 1 — Manipulação de Dados (DML)',
        lessons: [
          { id: 'sql-1-1', title: 'Introdução ao SQL e ambientes de banco de dados', duration: '14:00', provider: 'youtube', videoId: 'ncgEQBONI_w', free: true },
          { id: 'sql-1-2', title: 'SELECT, WHERE, ORDER BY — filtros e ordenação', duration: '20:00', provider: 'youtube', videoId: 'HXV3zeQKqGY' },
          { id: 'sql-1-3', title: 'Funções de Agregação — COUNT, SUM, AVG, MAX, MIN', duration: '18:00', provider: 'youtube', videoId: '7S_tz1z_5bA' },
          { id: 'sql-1-4', title: 'GROUP BY, HAVING — filtragem de grupos', duration: '16:00', provider: 'youtube', videoId: 'ZhuHCtR3xq8' },
          { id: 'sql-1-5', title: 'Subqueries e CTEs — consultas aninhadas e reutilizáveis', duration: '22:00', provider: 'youtube', videoId: 'nWeW3sCmD2k' },
        ],
      },
      {
        id: 'sql-m2',
        title: 'Módulo 2 — Relacionamentos',
        lessons: [
          { id: 'sql-2-1', title: 'INNER, LEFT, RIGHT e FULL JOINs na prática', duration: '25:00', provider: 'youtube', videoId: '9yeOJ0ZMUYw' },
          { id: 'sql-2-2', title: 'Trabalhando com UNIONS e INTERSECT', duration: '16:00', provider: 'youtube', videoId: 'Vy2KhyJ1ChM' },
          { id: 'sql-2-3', title: 'Chaves Primárias, Estrangeiras e Integridade Referencial', duration: '20:00', provider: 'youtube', videoId: 'a-hFbr2vjMA' },
          { id: 'sql-2-4', title: 'Projeto — Banco de dados relacional completo', duration: '35:00', provider: 'youtube', videoId: 'ztHopE5bZTk' },
        ],
      },
      {
        id: 'sql-m3',
        title: 'Módulo 3 — Avançado e Performance',
        lessons: [
          { id: 'sql-3-1', title: 'Views e Stored Procedures — reutilização e encapsulamento', duration: '22:00', provider: 'youtube', videoId: 'Sggdhot-MoM' },
          { id: 'sql-3-2', title: 'Triggers e Functions — automação no banco', duration: '20:00', provider: 'youtube', videoId: 'ULMnTCrpNMI' },
          { id: 'sql-3-3', title: 'Criação de Índices e otimização de consultas', duration: '18:00', provider: 'youtube', videoId: 'fsG1XaZEa78' },
          { id: 'sql-3-4', title: 'Plano de Execução — análise e diagnóstico de performance', duration: '20:00', provider: 'youtube', videoId: 'BHwzDmr6d7s' },
        ],
      },
    ],
    materials: [
      { title: 'Apostila SQL para Dados', description: 'Guia completo com todos os módulos e exercícios', fileUrl: 'PLACEHOLDER_URL', sizeMB: 4.5, type: 'pdf' },
      { title: 'Scripts SQL — Exercícios Práticos', description: 'Arquivo com todos os scripts utilizados nas aulas', fileUrl: 'PLACEHOLDER_URL', sizeMB: 0.3, type: 'docx' },
      { title: 'Cheat Sheet — SQL Essencial', description: 'Referência rápida dos principais comandos SQL', fileUrl: 'PLACEHOLDER_URL', sizeMB: 0.5, type: 'pdf' },
      { title: 'Slide — SQL para Dados', description: 'Apresentação completa do curso', fileUrl: 'PLACEHOLDER_URL', sizeMB: 6.1, type: 'pptx' },
    ],
  },

];
