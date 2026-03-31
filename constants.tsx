
import React from 'react';
import { Table, BarChart3, Database } from 'lucide-react';
import { Course, NavItem } from './types';

export const COLORS = {
  primary: '#008837', // Treinatech Green
  secondary: '#1e293b', // Slate 800
  accent: '#f8fafc', // Slate 50
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre Nós', href: '#sobre' },
  { label: 'Cursos', href: '#cursos' },
  { label: 'Blog', href: '#blog' },
];

export const COURSES: Course[] = [
  {
    id: 'excel',
    title: 'Excel Avançado',
    description: 'Domine planilhas, automação e dashboards interativos para transformar dados em decisões.',
    icon: <Table className="w-8 h-8" />,
    topics: ['Fórmulas Complexas', 'Tabelas Dinâmicas', 'VBA & Macros', 'Dashboards'],
    fullSyllabus: [
      {
        title: "Módulo 1: Fundamentos Avançados",
        items: ["Lógica de funções aninhadas", "Procura e Referência (Índice/Corresp)", "Tratamento de erros", "Auditoria de fórmulas"]
      },
      {
        title: "Módulo 2: Inteligência de Negócio",
        items: ["Tabelas dinâmicas avançadas", "Segmentação de dados e Linha do tempo", "Gráficos dinâmicos profissionais", "Consolidação de dados"]
      },
      {
        title: "Módulo 3: Automação",
        items: ["Introdução ao Power Query no Excel", "Gravação de Macros", "Lógica de programação VBA", "Criação de funções personalizadas"]
      }
    ]
  },
  {
    id: 'powerbi',
    title: 'Power BI Professional',
    description: 'Aprenda a criar relatórios dinâmicos e Business Intelligence de alto impacto visual.',
    icon: <BarChart3 className="w-8 h-8" />,
    topics: ['Modelagem de Dados', 'Linguagem DAX', 'ETL com Power Query', 'Publicação Web'],
    fullSyllabus: [
      {
        title: "Módulo 1: Preparação de Dados",
        items: ["Conexão com diversas fontes", "Transformação no Power Query", "Lógica M (Fundamentos)", "Limpeza e tipagem de dados"]
      },
      {
        title: "Módulo 2: Modelagem e DAX",
        items: ["Relacionamentos e Cardinalidade", "Esquema Estrela (Star Schema)", "Medidas vs Colunas Calculadas", "Time Intelligence e Contexto de Filtro"]
      },
      {
        title: "Módulo 3: Visualização e Governança",
        items: ["UX/UI para Dashboards", "Storytelling com Dados", "RLS (Segurança em nível de linha)", "Power BI Service e Gateways"]
      }
    ]
  },
  {
    id: 'sql',
    title: 'SQL para Dados',
    description: 'Aprenda a manipular grandes volumes de dados nos bancos de dados mais utilizados no mercado.',
    icon: <Database className="w-8 h-8" />,
    topics: ['Selects & Joins', 'Views & Triggers', 'Otimização de Queries', 'PostgreSQL/MySQL'],
    fullSyllabus: [
      {
        title: "Módulo 1: Manipulação de Dados (DML)",
        items: ["SELECT, WHERE, ORDER BY", "Funções de Agregação (GROUP BY)", "Filtragem avançada com HAVING", "Subqueries e CTEs"]
      },
      {
        title: "Módulo 2: Relacionamentos",
        items: ["INNER, LEFT, RIGHT, FULL JOINS", "Trabalhando com UNIONS", "Chaves Primárias e Estrangeiras", "Integridade Referencial"]
      },
      {
        title: "Módulo 3: Avançado e Performance",
        items: ["Views e Stored Procedures", "Triggers e Functions", "Criação de Índices", "Plano de Execução e Otimização"]
      }
    ]
  },
];
