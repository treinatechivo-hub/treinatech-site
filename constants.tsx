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
  { label: 'Treinamentos', href: '#cursos' },
  { label: 'Instrutor', href: '#instrutor' },
  { label: 'Blog', href: '#blog' },
];

export const COURSES: Course[] = [
  // ─── EXCEL BÁSICO ───────────────────────────────────────────────────────────
  {
    id: 'excel-basico',
    title: 'Excel Básico',
    description: 'Aprenda a organizar dados, construir planilhas e tomar decisões com clareza — do zero ao relatório profissional.',
    modalDescription: 'Ideal para quem está começando do zero ou quer consolidar os fundamentos. Você vai aprender a criar planilhas organizadas, aplicar fórmulas essenciais, usar PROCV e PROCX para cruzar dados e construir relatórios e gráficos com visual profissional. Ao final, você terá autonomia para resolver as tarefas mais comuns do Excel no dia a dia corporativo.',
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
    modalDescription: 'Para quem já conhece o básico e quer ir além. Neste treinamento você aprende lógica condicional aplicada ao negócio, KPIs com formatação condicional e ícones, cálculos de datas e parcelas, filtros avançados, PROCV e PROCX na prática e finaliza com um Dashboard multi-abas completo — o projeto International Motors. Inclui também integração com WhatsApp direto da planilha.',
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
    description: 'Domine automação, fórmulas matriciais, VBA e análise de dados — a base completa para dominar o Excel em qualquer contexto profissional.',
    modalDescription: 'O treinamento mais completo para quem quer dominar o Excel de ponta a ponta. Você vai trabalhar com Tabelas Dinâmicas avançadas, fórmulas matriciais, funções de banco de dados, automação com Macros e programação em VBA — criando sistemas automatizados do zero. É também a base obrigatória para as especializações em Dashboards, BI com Excel e Análise Financeira.',
    icon: <Table className="w-8 h-8" />,
    topics: ['Tabelas Dinâmicas', 'Fórmulas Matriciais', 'Macros & VBA', 'Integração WhatsApp'],
    fullSyllabus: [
      {
        title: "Parte 1: Tabelas Dinâmicas Avançadas",
        items: [
          "Criação, layout e campos calculados",
          "Agrupamentos, slicers e detalhamento de dados",
          "Gráficos dinâmicos e modelo de dados",
          "Tabelas Dinâmicas com múltiplas consultas",
        ]
      },
      {
        title: "Parte 2: Fórmulas e Dados Avançados",
        items: [
          "Fórmulas Matriciais: SOMA(SE()), CONT.SES(), SOMASES()",
          "PROCX() Bidimensional: busca produto × mercado",
          "Funções de Banco de Dados: BDSOMA, BDMÉDIA, BDMÁX, BDMÍN",
          "Filtro Avançado E/OU + FILTRAR, CLASSIFICAR, ÚNICO",
          "Formatação Condicional Avançada com fórmulas",
          "Imagens dinâmicas por lista validada",
          "Integração com WhatsApp via HIPERLINK",
        ]
      },
      {
        title: "Parte 3: Macros e VBA",
        items: [
          "Macros: absoluta vs. relativa, atalhos e botões",
          "Automação de fórmulas, gráficos e Sparklines",
          "VBA: Sub(), Function() e Módulos",
          "Formulários com caixas de mensagem personalizadas",
          "Projeto Final: planilha profissional automatizada",
        ]
      },
    ]
  },

  // ─── EXCEL AVANÇADO + DASHBOARDS ─────────────────────────────────────────────
  {
    id: 'excel-avancado-dashboards',
    title: 'Excel Avançado + Dashboards',
    description: 'Construa painéis executivos completos com imagens dinâmicas, slicers interativos e layout profissional — do dado ao relatório visual.',
    modalDescription: 'Combina todo o conteúdo do Excel Avançado com uma especialização focada na construção de dashboards executivos de alto impacto. Você vai criar painéis com imagens dinâmicas por seleção, slicers conectados a múltiplos gráficos, KPIs visuais e design profissional seguindo boas práticas de UX/UI. O resultado é um Dashboard interativo completo pronto para apresentar à diretoria.',
    icon: <Table className="w-8 h-8" />,
    topics: ['Dashboard Completo', 'Imagens Dinâmicas', 'Slicers & KPIs', 'Design Executivo'],
    fullSyllabus: [
      {
        title: "Base Técnica: Excel Avançado",
        items: [
          "Inclui todo o conteúdo do Excel Avançado",
          "Tabelas Dinâmicas, Fórmulas Matriciais, Macros e VBA",
          "Pré-requisito integrado ao treinamento",
        ]
      },
      {
        title: "Especialização: Dashboard Profissional",
        items: [
          "Análise de banco de dados para construção do painel",
          "Tabelas Dinâmicas nomeadas e conectadas ao Dashboard",
          "Planilhas auxiliares com imagens dinâmicas (lojas e vendedores)",
          "Layout e design profissional do Dashboard",
          "Cartões com KPIs e imagens dinâmicas por seleção",
          "Slicers conectados a múltiplos gráficos e tabelas",
          "Gráfico dinâmico com seleção por célula validada",
          "Sparklines integrados ao painel",
          "UX/UI: boas práticas de design para relatórios executivos",
          "Projeto Final: Dashboard executivo interativo completo",
        ]
      },
    ]
  },

  // ─── EXCEL AVANÇADO + BI COM EXCEL ───────────────────────────────────────────
  {
    id: 'excel-avancado-bi',
    title: 'Excel Avançado + BI com Excel',
    description: 'Transforme o Excel em uma ferramenta de BI com Power Query, Power Pivot e DAX — o caminho natural para o Power BI.',
    modalDescription: 'Combina o Excel Avançado com uma especialização em Business Intelligence usando o próprio Excel. Você aprende ETL com Power Query, modelagem dimensional com Star Schema, Power Pivot e as primeiras medidas em DAX — transformando o Excel em uma ferramenta de BI robusta. É também o caminho natural e recomendado para quem planeja migrar para o Power BI.',
    icon: <Table className="w-8 h-8" />,
    topics: ['ETL com Power Query', 'Power Pivot & DAX', 'Star Schema', 'Relatórios Profissionais'],
    fullSyllabus: [
      {
        title: "Base Técnica: Excel Avançado",
        items: [
          "Inclui todo o conteúdo do Excel Avançado",
          "Tabelas Dinâmicas, Fórmulas Matriciais, Macros e VBA",
          "Pré-requisito integrado ao treinamento",
        ]
      },
      {
        title: "Especialização: Business Intelligence com Excel",
        items: [
          "Introdução ao processo de Business Intelligence",
          "ETL com Power Query: conexão com CSV, Web e banco de dados",
          "Tratamento e limpeza de dados no Power Query",
          "Star Schema (modelo dimensional) na prática",
          "Modelagem de dados com Power Pivot",
          "Relacionamentos entre tabelas",
          "Cálculos DAX: medidas e colunas calculadas",
          "Tabelas Dinâmicas conectadas ao modelo de dados",
          "Gráficos e mapas para relatórios profissionais",
          "Projeto Final: modelo de dados completo com relatório",
        ]
      },
    ]
  },

  // ─── EXCEL AVANÇADO + ANÁLISE FINANCEIRA ─────────────────────────────────────
  {
    id: 'excel-avancado-financeiro',
    title: 'Excel Avançado + Análise Financeira',
    description: 'Modelagem financeira, análise de investimentos, fluxo de caixa e sistemas de amortização — Excel aplicado às decisões do negócio.',
    modalDescription: 'Combina o Excel Avançado com uma especialização voltada a profissionais das áreas financeira, contábil e de controladoria. Você vai trabalhar com funções financeiras nativas do Excel, análise de viabilidade (VPL, TIR, Payback), simulações com SOLVER e Tabela de Dados, tabelas Price e SAC, e fluxo de caixa projetado — aplicando o Excel diretamente nas decisões estratégicas do negócio.',
    icon: <Table className="w-8 h-8" />,
    topics: ['Funções Financeiras', 'VPL, TIR e Payback', 'Fluxo de Caixa', 'Amortização Price & SAC'],
    fullSyllabus: [
      {
        title: "Base Técnica: Excel Avançado",
        items: [
          "Inclui todo o conteúdo do Excel Avançado",
          "Tabelas Dinâmicas, Fórmulas Matriciais, Macros e VBA",
          "Pré-requisito integrado ao treinamento",
        ]
      },
      {
        title: "Especialização: Modelagem Financeira",
        items: [
          "Funções financeiras: VP(), VF(), PGTO(), TAXA(), NPER(), IPGTO(), PPGTO()",
          "Juros simples e compostos com gráfico dinâmico por período",
          "Atingir Meta: análise de margem de lucro (manual e automático)",
          "Tabela de Dados: simulação financeira com duas variáveis",
          "Gestão de Cenários: receita e lucro líquido",
          "SOLVER: estimativa de faturamento e otimização de recursos",
          "VPL(), TIR() e TMA: análise de viabilidade de projetos",
          "Payback Simples e Descontado",
          "Tabela Price e SAC: simulação de financiamentos",
          "Fluxo de caixa projetado e descontado",
          "Projeções de receitas, custos e resultados",
          "Projeto Final: modelo financeiro completo com simuladores",
        ]
      },
    ]
  },

  // ─── POWER BI MÓDULO 1 ───────────────────────────────────────────────────────
  {
    id: 'powerbi-modulo1',
    title: 'Power BI – Módulo 1',
    description: 'Do dado ao relatório interativo: ETL com Power Query, modelagem, DAX e publicação com 5 projetos reais.',
    modalDescription: 'O treinamento começa com a base conceitual de Business Intelligence: o que é BI, o processo tradicional (ETL → Data Warehouse → Modelo de Dados → Relatório), as plataformas modernas de Self-Service BI e o papel do Power BI nesse ecossistema. Você entende a diferença entre Power BI Desktop, Service e Mobile, as versões e licenças, e como funciona o fluxo completo de dados. Na parte técnica, percorre ETL com Power Query, modelagem dimensional (Esquema Estrela, tabelas Fato e Dimensão, relacionamentos e cardinalidade), DAX e contexto de avaliação — finalizando com a criação e publicação de relatórios interativos em 5 projetos reais.',
    icon: <BarChart3 className="w-8 h-8" />,
    topics: ['ETL com Power Query', 'Modelagem e DAX', 'Relatórios Interativos', '5 Projetos Reais'],
    fullSyllabus: [
      {
        title: "Parte 1: Conceitos e Fundamentos de BI",
        items: [
          "Business Intelligence: conceito e aplicações no mercado",
          "Processo tradicional de BI e sua evolução",
          "O Power BI: versões Desktop e Service",
          "Interfaces e política de licenças",
          "Visão geral do fluxo de trabalho no Power BI",
        ]
      },
      {
        title: "Parte 2: Processo ETL e Power Query",
        items: [
          "O processo ETL (Extract, Transform, Load)",
          "Conectando a múltiplas fontes de dados",
          "Transformação e limpeza de dados no Power Query",
          "Aplicação de tipos, filtros e colunas calculadas",
          "Boas práticas de organização de queries",
        ]
      },
      {
        title: "Parte 3: Modelagem de Dados",
        items: [
          "Banco de dados dimensional: conceito e estrutura",
          "Relacionamentos entre tabelas: tipos e cardinalidade",
          "Esquema Estrela (Star Schema) na prática",
          "Funções e cálculos DAX: medidas vs colunas calculadas",
          "Contexto de filtro e avaliação de expressões DAX",
        ]
      },
      {
        title: "Parte 4: Visualização, Publicação e Projetos",
        items: [
          "Drill Down: multicamadas de dados em gráficos",
          "Tooltip padrão, personalizado básico e avançado (com visual)",
          "Relatórios interativos com segmentadores",
          "UX/UI e Storytelling para dashboards profissionais",
          "Publicação no Power BI Service e compartilhamento",
          "PROJETO 1 – Demonstrativo de Vendas",
          "PROJETO 2 – International Motors (ETL com 12 planilhas)",
          "PROJETO 3 – Pedidos: Vendas / Vendedor / Clientes / Produtos (DAX)",
          "PROJETO 4 – Painel Covid: web scrapping em tempo real",
          "PROJETO 5 – Portfólio de Projetos (menu de relatórios)",
        ]
      },
    ]
  },

  // ─── POWER BI MÓDULO 2 ───────────────────────────────────────────────────────
  {
    id: 'powerbi-modulo2',
    title: 'Power BI – Módulo 2',
    description: 'DAX avançado, Power Query com linguagem M, visualizações com IA e segurança corporativa — nível profissional.',
    modalDescription: 'Para quem já domina o Módulo 1 e quer alcançar o nível profissional. Aqui você aprofunda o DAX com funções iteradoras, Time Intelligence e grupos de cálculos, domina a linguagem M no Power Query, cria visuais com IA e implementa segurança em nível de linha (RLS). A publicação dos relatórios segue dois caminhos conforme a realidade da empresa: Power BI Service (nuvem) para acesso completo via navegador e app mobile, ou Power BI Report Server para ambientes corporativos que mantêm os dados localmente — neste caso o app mobile também acessa os relatórios, desde que o servidor esteja disponível na rede (VPN ou Wi-Fi corporativa) e os arquivos sejam compatíveis com o Report Server. O treinamento finaliza com 2 projetos de alto nível.',
    icon: <BarChart3 className="w-8 h-8" />,
    topics: ['DAX Avançado & Time Intelligence', 'Power Query + Linguagem M', 'Visuais com IA', 'Segurança & Report Server'],
    fullSyllabus: [
      {
        title: "Parte 1: Revisão e Power Query Avançado",
        items: [
          "Revisão: modelagem, relações e medidas calculadas",
          "Transformação avançada de dados no Power Query",
          "Criação de parâmetros para consultas dinâmicas",
          "Pivotar e Unpivotar: reorganizando estruturas de dados",
          "Linguagem M: personalizações avançadas",
        ]
      },
      {
        title: "Parte 2: DAX Profissional",
        items: [
          "Trabalhando com grandes bases de dados e performance",
          "Relacionamentos especiais: many-to-many e bidirecionais",
          "Funções iteradoras: SUMX, AVERAGEX e de relação",
          "Variáveis no DAX: legibilidade e eficiência",
          "Avançando no uso da função CALCULATE",
          "Time Intelligence: comparação entre períodos",
          "Grupos de cálculos e Drill Through",
        ]
      },
      {
        title: "Parte 3: Visualizações Avançadas e Design",
        items: [
          "Formatação condicional com medidas, visuais e ícones",
          "Visuais com IA: insights automáticos e preditivos",
          "Parâmetros em gráfico com botão de opção",
          "Bookmarks, painel de seleção e menu lateral de filtro",
          "Recursos visuais, planos de fundo e hierarquia visual",
        ]
      },
      {
        title: "Parte 4: Publicação, Segurança e Governança",
        items: [
          "Power BI Service: publicação, integração e compartilhamento estratégico",
          "Power BI Report Server: publicação on-premises sem nuvem (para ambientes corporativos com restrição de acesso à internet)",
          "Fluxo de dados e Datamarts",
          "Detecção de erros: anomalias, logs, diagnósticos e monitoramento",
          "Segurança em nível de linha (RLS) avançada e colaboração segura",
        ]
      },
      {
        title: "Projetos do Módulo 2",
        items: [
          "Diferente do Módulo 1, neste módulo são desenvolvidos apenas 2 projetos finais. Todo o conteúdo programático são as partes detalhadas que constroem esses dois entregáveis:",
          "PROJETO 1 – Relatório Completo: análise estratégica avançada com DAX profissional, Power Query e Storytelling",
          "PROJETO 2 – Dashboard Executivo: painel interativo com IA, bookmarks, menu de filtro e publicação no Power BI Service",
        ]
      },
    ]
  },

  // ─── SQL ─────────────────────────────────────────────────────────────────────
  {
    id: 'sql',
    title: 'SQL para Dados',
    description: 'Aprenda a manipular grandes volumes de dados nos bancos de dados mais utilizados no mercado.',
    modalDescription: 'Treinamento completo de SQL voltado para analistas de dados, desenvolvedores e profissionais que precisam extrair e manipular dados em bancos relacionais. Você vai do SELECT básico até otimização de queries com índices e plano de execução — passando por JOINs, Subqueries, CTEs, Views, Stored Procedures e Triggers. Compatível com SQL Server, PostgreSQL e MySQL.',
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
