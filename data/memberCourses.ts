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
 *
 * VÍDEOS DEMO: os videoId marcados com "DEMO_" são placeholders para teste.
 * Substitua pelo ID real do seu vídeo quando publicar.
 */

export const MEMBER_COURSES: CourseData[] = [

  // ─── EXCEL ─────────────────────────────────────────────────────────────────
  {
    id: 'excel',
    title: 'Excel — Básico ao Avançado',
    description: 'Do zero ao domínio completo: fórmulas, dashboards, automação com VBA e análise de dados.',
    icon: '📊',
    color: 'bg-emerald-50',
    accentColor: '#059669',
    totalLessons: 34,
    totalHours: '16h 30min',
    modules: [

      // ── Módulo 1: Básico (YouTube) ──────────────────────────────────────────
      {
        id: 'excel-m1',
        title: 'Módulo 1 — Excel Básico',
        lessons: [
          {
            id: 'ex-1-1',
            title: 'Interface e navegação no Excel',
            duration: '15:00',
            provider: 'youtube',
            videoId: 'rwbho8C9F4M', // DEMO — substituir pelo seu vídeo
            free: true,
          },
          {
            id: 'ex-1-2',
            title: 'Células, linhas, colunas e referências',
            duration: '18:20',
            provider: 'youtube',
            videoId: 'rwbho8C9F4M',
          },
          {
            id: 'ex-1-3',
            title: 'Fórmulas: SOMA, MÉDIA, MÁXIMO, MÍNIMO',
            duration: '20:10',
            provider: 'youtube',
            videoId: 'rwbho8C9F4M',
          },
          {
            id: 'ex-1-4',
            title: 'Referências absolutas e relativas',
            duration: '14:45',
            provider: 'youtube',
            videoId: 'rwbho8C9F4M',
          },
          {
            id: 'ex-1-5',
            title: 'Formatação numérica e estética profissional',
            duration: '12:30',
            provider: 'youtube',
            videoId: 'rwbho8C9F4M',
          },
          {
            id: 'ex-1-6',
            title: 'Planilha de orçamento do zero',
            duration: '22:00',
            provider: 'youtube',
            videoId: 'rwbho8C9F4M',
          },
          {
            id: 'ex-1-7',
            title: 'Filtros, classificação e validação de dados',
            duration: '18:15',
            provider: 'youtube',
            videoId: 'rwbho8C9F4M',
          },
          {
            id: 'ex-1-8',
            title: 'PROCV e PROCX — cruzamento entre tabelas',
            duration: '24:00',
            provider: 'youtube',
            videoId: 'rwbho8C9F4M',
          },
          {
            id: 'ex-1-9',
            title: 'Gráficos e relatórios profissionais',
            duration: '20:00',
            provider: 'youtube',
            videoId: 'rwbho8C9F4M',
          },
          {
            id: 'ex-1-10',
            title: 'Projeto Final — Planilha Profissional Completa',
            duration: '30:00',
            provider: 'youtube',
            videoId: 'rwbho8C9F4M',
          },
        ],
      },

      // ── Módulo 2: Intermediário (Vimeo) ────────────────────────────────────
      {
        id: 'excel-m2',
        title: 'Módulo 2 — Excel Intermediário',
        lessons: [
          {
            id: 'ex-2-1',
            title: 'SE e SES — lógica condicional aplicada ao negócio',
            duration: '18:30',
            provider: 'vimeo',
            videoId: '148751763', // DEMO — substituir pelo seu vídeo no Vimeo
          },
          {
            id: 'ex-2-2',
            title: 'KPIs com formatação condicional e ícones',
            duration: '22:10',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-2-3',
            title: 'Contas a Pagar — multa, correção e vencimento',
            duration: '20:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-2-4',
            title: 'DATAM, DATADIF e cálculo de parcelas',
            duration: '16:45',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-2-5',
            title: 'Power Query — feriados e dias úteis',
            duration: '19:20',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-2-6',
            title: 'CONT.SE, SOMASE e SOMARPRODUTO',
            duration: '21:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-2-7',
            title: 'PROCV e PROCX avançado com SEERRO',
            duration: '18:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-2-8',
            title: 'Dashboard multi-abas — Projeto International Motors',
            duration: '35:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-2-9',
            title: 'Segurança em 4 níveis — células, planilha, áreas e arquivo',
            duration: '14:30',
            provider: 'vimeo',
            videoId: '148751763',
          },
        ],
      },

      // ── Módulo 3: Avançado (Vimeo) ─────────────────────────────────────────
      {
        id: 'excel-m3',
        title: 'Módulo 3 — Excel Avançado',
        lessons: [
          {
            id: 'ex-3-1',
            title: 'Tabelas Dinâmicas avançadas e campos calculados',
            duration: '26:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-3-2',
            title: 'Slicers e detalhamento de dados (Drill Down)',
            duration: '18:40',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-3-3',
            title: 'Fórmulas Matriciais — SOMA(SE()), SOMASES()',
            duration: '22:15',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-3-4',
            title: 'PROCX Bidimensional — busca produto × mercado',
            duration: '19:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-3-5',
            title: 'Funções de Banco de Dados — BDSOMA, BDMÉDIA',
            duration: '16:30',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-3-6',
            title: 'Imagens dinâmicas por lista validada',
            duration: '14:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-3-7',
            title: 'Macros — absoluta vs. relativa, atalhos e botões',
            duration: '20:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-3-8',
            title: 'VBA — Sub(), Function() e Módulos',
            duration: '28:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-3-9',
            title: 'Formulários com caixas de mensagem personalizadas',
            duration: '22:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'ex-3-10',
            title: 'Projeto Final — Planilha Profissional Automatizada',
            duration: '40:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
        ],
      },
    ],

    pdfs: [
      {
        title: 'Apostila Excel Básico',
        description: 'Guia completo com exemplos e exercícios — Módulo 1',
        fileUrl: 'PLACEHOLDER_PDF_URL',
        sizeMB: 3.2,
      },
      {
        title: 'Apostila Excel Intermediário',
        description: 'Fórmulas condicionais, dashboards e segurança — Módulo 2',
        fileUrl: 'PLACEHOLDER_PDF_URL',
        sizeMB: 4.1,
      },
      {
        title: 'Apostila Excel Avançado',
        description: 'Tabelas Dinâmicas, VBA e automação — Módulo 3',
        fileUrl: 'PLACEHOLDER_PDF_URL',
        sizeMB: 4.8,
      },
      {
        title: 'Cheat Sheet — 50 Fórmulas Essenciais',
        description: 'Referência rápida para o dia a dia profissional',
        fileUrl: 'PLACEHOLDER_PDF_URL',
        sizeMB: 0.8,
      },
      {
        title: 'Projeto — International Motors Dashboard',
        description: 'Arquivo Excel do projeto completo do Módulo 2',
        fileUrl: 'PLACEHOLDER_PDF_URL',
        sizeMB: 2.1,
      },
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

      // ── Módulo 1: Básico + Intermediário Parte 1 ────────────────────────────
      {
        id: 'pbi-m1',
        title: 'Módulo 1 — Fundamentos, ETL, Modelagem e DAX',
        lessons: [
          {
            id: 'pbi-1-1',
            title: 'Business Intelligence — conceito e ecossistema',
            duration: '15:00',
            provider: 'youtube',
            videoId: 'AGrl-H87pRU', // DEMO — substituir pelo seu vídeo
            free: true,
          },
          {
            id: 'pbi-1-2',
            title: 'Power BI Desktop, Service e Mobile — versões e licenças',
            duration: '12:30',
            provider: 'youtube',
            videoId: 'AGrl-H87pRU',
          },
          {
            id: 'pbi-1-3',
            title: 'ETL com Power Query — conectando múltiplas fontes',
            duration: '22:00',
            provider: 'youtube',
            videoId: 'AGrl-H87pRU',
          },
          {
            id: 'pbi-1-4',
            title: 'Transformação e limpeza de dados no Power Query',
            duration: '25:30',
            provider: 'youtube',
            videoId: 'AGrl-H87pRU',
          },
          {
            id: 'pbi-1-5',
            title: 'Star Schema — tabela Fato e Dimensão na prática',
            duration: '20:00',
            provider: 'youtube',
            videoId: 'AGrl-H87pRU',
          },
          {
            id: 'pbi-1-6',
            title: 'Relacionamentos — tipos e cardinalidade',
            duration: '18:45',
            provider: 'youtube',
            videoId: 'AGrl-H87pRU',
          },
          {
            id: 'pbi-1-7',
            title: 'DAX — medidas vs. colunas calculadas',
            duration: '22:15',
            provider: 'youtube',
            videoId: 'AGrl-H87pRU',
          },
          {
            id: 'pbi-1-8',
            title: 'Contexto de filtro e avaliação de expressões DAX',
            duration: '19:00',
            provider: 'youtube',
            videoId: 'AGrl-H87pRU',
          },
          {
            id: 'pbi-1-9',
            title: 'Drill Down, Tooltip e relatórios interativos',
            duration: '24:00',
            provider: 'youtube',
            videoId: 'AGrl-H87pRU',
          },
          {
            id: 'pbi-1-10',
            title: 'UX/UI e Storytelling para dashboards profissionais',
            duration: '20:00',
            provider: 'youtube',
            videoId: 'AGrl-H87pRU',
          },
          {
            id: 'pbi-1-11',
            title: 'Publicação no Power BI Service e compartilhamento',
            duration: '16:00',
            provider: 'youtube',
            videoId: 'AGrl-H87pRU',
          },
          {
            id: 'pbi-1-12',
            title: 'PROJETO 1 — Demonstrativo de Vendas',
            duration: '35:00',
            provider: 'youtube',
            videoId: 'AGrl-H87pRU',
          },
          {
            id: 'pbi-1-13',
            title: 'PROJETO 2 — International Motors (ETL com 12 planilhas)',
            duration: '40:00',
            provider: 'youtube',
            videoId: 'AGrl-H87pRU',
          },
          {
            id: 'pbi-1-14',
            title: 'PROJETO 3 — Painel Covid (web scrapping em tempo real)',
            duration: '28:00',
            provider: 'youtube',
            videoId: 'AGrl-H87pRU',
          },
          {
            id: 'pbi-1-15',
            title: 'PROJETO 4 — Portfólio de Projetos (menu de relatórios)',
            duration: '22:00',
            provider: 'youtube',
            videoId: 'AGrl-H87pRU',
          },
        ],
      },

      // ── Módulo 2: Intermediário Parte 2 + Avançado (Vimeo) ─────────────────
      {
        id: 'pbi-m2',
        title: 'Módulo 2 — DAX Avançado, IA e Governança',
        lessons: [
          {
            id: 'pbi-2-1',
            title: 'Power Query avançado — parâmetros e pivotar/unpivotar',
            duration: '22:00',
            provider: 'vimeo',
            videoId: '148751763', // DEMO — substituir pelo seu vídeo no Vimeo
          },
          {
            id: 'pbi-2-2',
            title: 'Linguagem M — personalizações avançadas',
            duration: '20:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'pbi-2-3',
            title: 'Funções iteradoras — SUMX, AVERAGEX',
            duration: '18:30',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'pbi-2-4',
            title: 'Variáveis no DAX — legibilidade e eficiência',
            duration: '16:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'pbi-2-5',
            title: 'Time Intelligence — comparação entre períodos',
            duration: '25:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'pbi-2-6',
            title: 'Grupos de cálculos e Drill Through',
            duration: '20:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'pbi-2-7',
            title: 'Visuais com IA — insights automáticos e preditivos',
            duration: '18:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'pbi-2-8',
            title: 'Bookmarks, painel de seleção e menu lateral de filtro',
            duration: '22:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'pbi-2-9',
            title: 'RLS — Segurança em nível de linha avançada',
            duration: '20:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'pbi-2-10',
            title: 'Power BI Report Server — publicação on-premises',
            duration: '18:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'pbi-2-11',
            title: 'PROJETO FINAL 1 — Relatório Estratégico Avançado',
            duration: '45:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'pbi-2-12',
            title: 'PROJETO FINAL 2 — Dashboard Executivo com IA',
            duration: '40:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'pbi-2-13',
            title: 'Detecção de erros — anomalias, logs e diagnósticos',
            duration: '16:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'pbi-2-14',
            title: 'Fluxo de dados, Datamarts e governança',
            duration: '18:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
          {
            id: 'pbi-2-15',
            title: 'Conclusão e próximos passos na sua carreira em dados',
            duration: '12:00',
            provider: 'vimeo',
            videoId: '148751763',
          },
        ],
      },
    ],

    pdfs: [
      {
        title: 'Apostila Power BI — Módulo 1',
        description: 'ETL, Modelagem, DAX e projetos práticos',
        fileUrl: 'PLACEHOLDER_PDF_URL',
        sizeMB: 5.1,
      },
      {
        title: 'Apostila Power BI — Módulo 2',
        description: 'DAX avançado, IA, segurança e governança',
        fileUrl: 'PLACEHOLDER_PDF_URL',
        sizeMB: 4.8,
      },
      {
        title: 'Cheat Sheet — 30 Funções DAX Essenciais',
        description: 'As medidas DAX mais usadas em projetos reais',
        fileUrl: 'PLACEHOLDER_PDF_URL',
        sizeMB: 0.9,
      },
      {
        title: 'Projeto — International Motors (Power BI)',
        description: 'Arquivo .pbix do projeto completo do Módulo 1',
        fileUrl: 'PLACEHOLDER_PDF_URL',
        sizeMB: 3.2,
      },
      {
        title: 'Guia — Star Schema e Modelagem Dimensional',
        description: 'Referência completa de modelagem para Power BI',
        fileUrl: 'PLACEHOLDER_PDF_URL',
        sizeMB: 1.4,
      },
    ],
  },
];
