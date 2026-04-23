import React from 'react';
import { Table, BarChart3, Database } from 'lucide-react';
import { Course, NavItem } from './types';

export const COLORS = {
  primary: '#008837',   // Treinatech Green
  secondary: '#1e293b', // Slate 800
  accent: '#f8fafc',    // Slate 50
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre Nós', href: '#sobre' },
  { label: 'Cursos', href: '#cursos' },
  { label: 'Blog', href: '#blog' },
];

export const COURSES: Course[] = [
  // ─── EXCEL BÁSICO ───────────────────────────────────────────────────────────
  {
    id: 'excel-basico',
    title: 'Excel Básico',
    description: 'Aprenda a organizar dados, construir planilhas e tomar decisões com clareza — do zero ao relatório profissional.',
    icon: <Table className="w-8 h-8" />,
    topics: ['Fórmulas Essenciais', 'Filtros e Validação', 'PROCV e PROCX', 'Gráficos e Relatórios'],
    fullSyllabus: [
      {
        title: "Parte 1: Fundamentos do Excel",
        items: [
          "Interface e navegação no Excel",
          "Fundamentos de células, linhas e colunas",
          "Fórmulas: SOMA, MÉDIA, MÁXIMO, MÍNIMO",
          "Referências absolutas e relativas",
          "Formatação numérica e estética profissional",
        ]
      },
      {
        title: "Parte 2: Criação de Planilhas",
        items: [
          "Criação de planilha de orçamento do zero",
          "Classificação e filtro de dados",
          "Validação de dados e listas suspensas",
          "Formatação condicional básica",
          "Congelar painéis em bases extensas",
        ]
      },
      {
        title: "Parte 3: Consulta e Cruzamento",
        items: [
          "PROCV: busca e cruzamento entre tabelas",
          "PROCX: evolução do PROCV com mais recursos",
          "SEERRO: eliminar erros em relatórios",
          "Cruzamento de informações entre planilhas",
          "Organização em formato de Tabela (Table)",
        ]
      },
      {
        title: "Parte 4: Visualização e Relatórios",
        items: [
          "Tipos de gráficos e quando usar cada um",
          "Sparklines: mini gráficos dentro da célula",
          "Storytelling visual com dados",
          "Relatórios prontos para impressão e apresentação",
          "Projeto Final: planilha profissional completa",
        ]
      },
    ]
  },

  // ─── EXCEL INTERMEDIÁRIO ─────────────────────────────────────────────────────
  {
    id: 'excel-intermediario',
    title: 'Excel Intermediário',
    description: 'Transforme dados em decisões com fórmulas condicionais, KPIs visuais, consultas avançadas e dashboards interativos.',
    icon: <Table className="w-8 h-8" />,
    topics: ['SE e SES na prática', 'Formatação Condicional', 'PROCV, PROCX e SEERRO', 'Dashboard e Segurança'],
    fullSyllabus: [
      {
        title: "Parte 1: Lógica de Negócio com Fórmulas",
        items: [
          "SE e SES: lógica condicional aplicada ao negócio",
          "Média ponderada e definição de situação por regras",
          "SUBTOTAL com e sem células ocultas",
          "Cálculo de % de ganho: Lucro, Prejuízo e Nulo",
          "Referências e boas práticas para fórmulas auditáveis",
        ]
      },
      {
        title: "Parte 2: Formatação Condicional e Data/Hora",
        items: [
          "KPIs com barras de dados, escalas e ícones (😃/😐/😞)",
          "Alertas automáticos de prazo e vencimento",
          "Contas a Pagar: multa 2% + correção 0,033%/dia",
          "DATAM, DATADIF e cálculo de idade e parcelas",
          "Serviço por hora com horário noturno via MOD()",
          "Power Query: feriados da internet para dias úteis",
          "Integração básica com WhatsApp direto da planilha",
        ]
      },
      {
        title: "Parte 3: Organização, Filtros e Dados",
        items: [
          "Filtro básico, avançado E/OU e com datas",
          "Classificação por múltiplos critérios e cor de célula",
          "CONCATENAR e função TEXTO para relatórios customizados",
          "CONT.SE, SOMASE, SOMASES e SOMARPRODUTO",
          "Validação de dados e Texto para Colunas",
        ]
      },
      {
        title: "Parte 4: Consulta, Dashboard e Segurança",
        items: [
          "PROCV e PROCX lado a lado: quando usar cada um",
          "SEERRO e Combo Box interativo em relatórios",
          "Comparativo de preços com PROCV em múltiplas colunas",
          "Sparklines e gráfico dinâmico por seleção",
          "Dashboard multi-abas com menu de navegação",
          "Segurança em 4 níveis: células, planilha, áreas e arquivo",
          "Projeto Final: International Motors Dashboard",
        ]
      },
    ]
  },

  // ─── EXCEL AVANÇADO ──────────────────────────────────────────────────────────
  {
    id: 'excel-avancado',
    title: 'Excel Avançado',
    description: 'Domine automação, fórmulas matriciais e dashboards interativos para se tornar o especialista em dados da sua equipe.',
    icon: <Table className="w-8 h-8" />,
    topics: ['Fórmulas Matriciais', 'Tabelas Dinâmicas', 'VBA & Macros', 'Dashboards Avançados'],
    fullSyllabus: [
      {
        title: "Parte 1: Fórmulas Avançadas",
        items: [
          "Funções matriciais: FILTRO, ÚNICO, CLASSIFICAR",
          "ÍNDICE e CORRESP: busca avançada e bidirecional",
          "Funções de texto avançadas: TEXTOANTES, TEXTODEPOIS",
          "Auditoria de fórmulas e rastreamento de precedentes",
          "Funções lógicas aninhadas de alta complexidade",
        ]
      },
      {
        title: "Parte 2: Tabelas Dinâmicas e Power Query",
        items: [
          "Tabelas dinâmicas avançadas com segmentação",
          "Linha do tempo e filtros dinâmicos",
          "Gráficos dinâmicos profissionais",
          "Power Query: ETL completo e transformação de dados",
          "Consolidação de múltiplas fontes no Power Query",
        ]
      },
      {
        title: "Parte 3: VBA e Automação",
        items: [
          "Gravação e edição de Macros",
          "Lógica de programação VBA: variáveis e loops",
          "Criação de funções personalizadas (UDF)",
          "Formulários e controles de formulário avançados",
          "Automatização de relatórios recorrentes",
        ]
      },
      {
        title: "Parte 4: Dashboards e Projeto Final",
        items: [
          "UX/UI para dashboards executivos no Excel",
          "Painéis interativos com segmentadores e botões",
          "Integração Excel com Power BI",
          "Boas práticas de performance em arquivos grandes",
          "Projeto Final: Dashboard executivo completo",
        ]
      },
    ]
  },

  // ─── POWER BI ────────────────────────────────────────────────────────────────
  {
    id: 'powerbi',
    title: 'Power BI Professional',
    description: 'Aprenda a criar relatórios dinâmicos e Business Intelligence de alto impacto visual.',
    icon: <BarChart3 className="w-8 h-8" />,
    topics: ['Modelagem de Dados', 'Linguagem DAX', 'ETL com Power Query', 'Publicação Web'],
    fullSyllabus: [
      {
        title: "Módulo 1: Preparação de Dados",
        items: [
          "Conexão com diversas fontes",
          "Transformação no Power Query",
          "Lógica M (Fundamentos)",
          "Limpeza e tipagem de dados",
        ]
      },
      {
        title: "Módulo 2: Modelagem e DAX",
        items: [
          "Relacionamentos e Cardinalidade",
          "Esquema Estrela (Star Schema)",
          "Medidas vs Colunas Calculadas",
          "Time Intelligence e Contexto de Filtro",
        ]
      },
      {
        title: "Módulo 3: Visualização e Governança",
        items: [
          "UX/UI para Dashboards",
          "Storytelling com Dados",
          "RLS (Segurança em nível de linha)",
          "Power BI Service e Gateways",
        ]
      },
    ]
  },

  // ─── SQL ─────────────────────────────────────────────────────────────────────
  {
    id: 'sql',
    title: 'SQL para Dados',
    description: 'Aprenda a manipular grandes volumes de dados nos bancos de dados mais utilizados no mercado.',
    icon: <Database className="w-8 h-8" />,
    topics: ['Selects & Joins', 'Views & Triggers', 'Otimização de Queries', 'PostgreSQL/MySQL'],
    fullSyllabus: [
      {
        title: "Módulo 1: Manipulação de Dados (DML)",
        items: [
          "SELECT, WHERE, ORDER BY",
          "Funções de Agregação (GROUP BY)",
          "Filtragem avançada com HAVING",
          "Subqueries e CTEs",
        ]
      },
      {
        title: "Módulo 2: Relacionamentos",
        items: [
          "INNER, LEFT, RIGHT, FULL JOINS",
          "Trabalhando com UNIONS",
          "Chaves Primárias e Estrangeiras",
          "Integridade Referencial",
        ]
      },
      {
        title: "Módulo 3: Avançado e Performance",
        items: [
          "Views e Stored Procedures",
          "Triggers e Functions",
          "Criação de Índices",
          "Plano de Execução e Otimização",
        ]
      },
    ]
  },
];
