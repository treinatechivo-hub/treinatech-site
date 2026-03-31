// ─── Types ────────────────────────────────────────────────────────────────────

export interface Lesson {
  id: string;
  title: string;
  duration: string; // ex: "18:32"
  /**
   * Suporte a múltiplos provedores de vídeo.
   * provider: 'youtube' | 'vimeo' | 'hotmart' | 'direct'
   * videoId: ID do vídeo no provedor (para YouTube/Vimeo)
   *          ou URL completa (para direct/Hotmart)
   */
  provider: 'youtube' | 'vimeo' | 'hotmart' | 'direct';
  videoId: string;
  free?: boolean; // aula liberada como preview
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CoursePDF {
  title: string;
  description: string;
  fileUrl: string; // URL do PDF (Google Drive, S3, etc.)
  sizeMB: number;
}

export interface CourseData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;       // Tailwind bg class
  accentColor: string; // hex
  totalLessons: number;
  totalHours: string;
  modules: Module[];
  pdfs: CoursePDF[];
}

// ─── Courses ──────────────────────────────────────────────────────────────────

/**
 * COMO ADICIONAR SEUS VÍDEOS:
 * ────────────────────────────
 * YouTube:  provider: 'youtube', videoId: 'dQw4w9WgXcQ'
 * Vimeo:    provider: 'vimeo',   videoId: '123456789'
 * Hotmart:  provider: 'hotmart', videoId: 'https://player.hotmart.com/embed/...'
 * Direto:   provider: 'direct',  videoId: 'https://seudominio.com/video.mp4'
 *
 * Os PDFs devem ser links públicos (Google Drive "qualquer pessoa com o link",
 * AWS S3 com ACL public-read, ou semelhante).
 */

export const MEMBER_COURSES: CourseData[] = [
  {
    id: 'excel',
    title: 'Excel Avançado',
    description: 'Domine planilhas, automação e dashboards interativos.',
    icon: '📊',
    color: 'bg-emerald-50',
    accentColor: '#059669',
    totalLessons: 32,
    totalHours: '14h 20min',
    modules: [
      {
        id: 'excel-m1',
        title: 'Módulo 1 — Fundamentos Avançados',
        lessons: [
          { id: 'ex-1-1', title: 'Lógica de funções aninhadas', duration: '22:10', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID', free: true },
          { id: 'ex-1-2', title: 'PROCX e ÍNDICE/CORRESP', duration: '18:45', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'ex-1-3', title: 'Tratamento de erros com SEERRO', duration: '12:30', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'ex-1-4', title: 'Auditoria de fórmulas', duration: '15:00', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
        ],
      },
      {
        id: 'excel-m2',
        title: 'Módulo 2 — Inteligência de Negócio',
        lessons: [
          { id: 'ex-2-1', title: 'Tabelas dinâmicas avançadas', duration: '28:00', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'ex-2-2', title: 'Segmentação de dados e Timeline', duration: '14:20', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'ex-2-3', title: 'Gráficos dinâmicos profissionais', duration: '20:15', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
        ],
      },
      {
        id: 'excel-m3',
        title: 'Módulo 3 — Automação com VBA',
        lessons: [
          { id: 'ex-3-1', title: 'Introdução ao Power Query', duration: '25:40', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'ex-3-2', title: 'Gravação e edição de macros', duration: '19:00', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'ex-3-3', title: 'Lógica de programação VBA', duration: '30:10', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'ex-3-4', title: 'Criação de funções personalizadas', duration: '22:50', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
        ],
      },
    ],
    pdfs: [
      { title: 'Apostila Excel Avançado', description: 'Guia completo com exemplos e exercícios resolvidos', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 4.2 },
      { title: 'Cheat Sheet — Fórmulas Essenciais', description: 'Referência rápida com as 50 fórmulas mais usadas', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 0.8 },
      { title: 'Projeto Final — Template Dashboard', description: 'Arquivo Excel do projeto do módulo 2', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 1.5 },
    ],
  },
  {
    id: 'powerbi',
    title: 'Power BI Professional',
    description: 'Relatórios dinâmicos e BI de alto impacto visual.',
    icon: '📈',
    color: 'bg-blue-50',
    accentColor: '#2563eb',
    totalLessons: 28,
    totalHours: '12h 45min',
    modules: [
      {
        id: 'pbi-m1',
        title: 'Módulo 1 — Preparação de Dados',
        lessons: [
          { id: 'pbi-1-1', title: 'Conexão com múltiplas fontes', duration: '20:00', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID', free: true },
          { id: 'pbi-1-2', title: 'Transformação no Power Query', duration: '25:30', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'pbi-1-3', title: 'Lógica M — fundamentos', duration: '18:00', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
        ],
      },
      {
        id: 'pbi-m2',
        title: 'Módulo 2 — Modelagem e DAX',
        lessons: [
          { id: 'pbi-2-1', title: 'Relacionamentos e Cardinalidade', duration: '22:15', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'pbi-2-2', title: 'Star Schema na prática', duration: '16:40', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'pbi-2-3', title: 'Medidas vs Colunas Calculadas', duration: '19:00', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'pbi-2-4', title: 'Time Intelligence no DAX', duration: '28:30', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
        ],
      },
      {
        id: 'pbi-m3',
        title: 'Módulo 3 — Visualização e Governança',
        lessons: [
          { id: 'pbi-3-1', title: 'UX/UI para Dashboards', duration: '24:00', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'pbi-3-2', title: 'Storytelling com Dados', duration: '20:10', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'pbi-3-3', title: 'RLS — Segurança por linha', duration: '15:45', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'pbi-3-4', title: 'Power BI Service e Gateways', duration: '22:00', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
        ],
      },
    ],
    pdfs: [
      { title: 'Apostila Power BI Professional', description: 'Material completo com casos reais de BI corporativo', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 5.1 },
      { title: 'Cheat Sheet — Funções DAX', description: 'As 30 medidas DAX mais usadas em projetos reais', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 0.9 },
    ],
  },
  {
    id: 'sql',
    title: 'SQL para Dados',
    description: 'Manipule grandes volumes de dados com confiança.',
    icon: '🗄️',
    color: 'bg-amber-50',
    accentColor: '#d97706',
    totalLessons: 24,
    totalHours: '10h 30min',
    modules: [
      {
        id: 'sql-m1',
        title: 'Módulo 1 — Manipulação de Dados',
        lessons: [
          { id: 'sql-1-1', title: 'SELECT, WHERE, ORDER BY', duration: '18:00', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID', free: true },
          { id: 'sql-1-2', title: 'Funções de Agregação', duration: '20:30', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'sql-1-3', title: 'Filtragem avançada com HAVING', duration: '14:15', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'sql-1-4', title: 'Subqueries e CTEs', duration: '25:00', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
        ],
      },
      {
        id: 'sql-m2',
        title: 'Módulo 2 — Relacionamentos',
        lessons: [
          { id: 'sql-2-1', title: 'INNER, LEFT, RIGHT, FULL JOINS', duration: '28:00', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'sql-2-2', title: 'Trabalhando com UNIONs', duration: '16:20', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
          { id: 'sql-2-3', title: 'Chaves e Integridade Referencial', duration: '19:45', provider: 'youtube', videoId: 'PLACEHOLDER_YT_ID' },
        ],
      },
    ],
    pdfs: [
      { title: 'Apostila SQL para Dados', description: 'Do SELECT ao Stored Procedure — guia completo', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 3.8 },
      { title: 'Exercícios Práticos SQL', description: '50 exercícios com gabarito para praticar', fileUrl: 'PLACEHOLDER_PDF_URL', sizeMB: 1.2 },
    ],
  },
];
