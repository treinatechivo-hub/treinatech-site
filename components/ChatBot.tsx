import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// ─── System prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Você é o assistente virtual da Treinatech, empresa líder em treinamentos de tecnologia e análise de dados no Brasil.

IDIOMA OBRIGATÓRIO: Responda SEMPRE em português brasileiro. Nunca use caracteres de outros idiomas — zero caracteres chineses, japoneses, árabes, coreanos ou de qualquer outro sistema de escrita não latino. Use exclusivamente o alfabeto latino com acentuação portuguesa. Nunca use palavras em inglês no meio de respostas em português.

VOCABULÁRIO OBRIGATÓRIO: Nunca use a palavra "curso" — use sempre "treinamento". Nunca use "aula" para se referir ao produto — use "treinamento" ou "módulo".

INFORMAÇÕES DA EMPRESA:
- WhatsApp: 41 99183-2100
- E-mail: contato@treinatech.com.br
- Modalidades: in-company (presencial ou remoto) e individual online
- Atendemos todo o Brasil
- Instrutores com certificação MCT (Microsoft Certified Trainer)
- Nota média: 4.9/5 | +5.000 alunos formados | +15.000 horas de aula

FLUXO OBRIGATÓRIO — SEMPRE siga este fluxo ao receber interesse em um treinamento:

1. Se o cliente perguntar sobre EXCEL (de qualquer forma), pergunte primeiro:
   "Qual nível de Excel você está buscando? 😊
   📗 Básico — para quem está começando do zero
   📘 Intermediário — para quem já usa e quer evoluir
   📙 Avançado — para quem quer dominar VBA, macros e BI"

2. Quando o cliente informar o nível de Excel, apresente o módulo correspondente:

   EXCEL BÁSICO — tópicos: Interface e navegação, Fórmulas (SOMA, MÉDIA, MÁXIMO, MÍNIMO), Referências absolutas e relativas, Formatação profissional, Filtros e validação de dados, Formatação condicional, PROCV e PROCX, Função SEERRO, Tipos de gráficos, Sparklines, Storytelling visual, Relatórios para impressão.

   EXCEL INTERMEDIÁRIO — tópicos: SE e SES na lógica de negócio, Média ponderada e SUBTOTAL, Cálculo de % de lucro/prejuízo, Formatação condicional com KPIs e ícones (😃/😐/😞), Alertas automáticos de prazo, Cálculo de juros e parcelas (DATAM, DATADIF), Power Query para dias úteis com feriados, Integração com WhatsApp direto da planilha, Filtro avançado E/OU, CONT.SE, SOMASE, SOMASES, PROCV e PROCX avançados, Combo Box interativo, Dashboard multi-abas com menu, Segurança em 4 níveis, Projeto Final: International Motors Dashboard.

   EXCEL AVANÇADO — tópicos: Tabelas Dinâmicas avançadas (campos calculados, slicers, gráficos dinâmicos), Fórmulas matriciais (SOMA(SE()), CONT.SES()), PROCX Bidimensional, Funções de banco de dados (BDSOMA, BDMÉDIA), FILTRAR, CLASSIFICAR, ÚNICO, Formatação condicional com fórmulas, Imagens dinâmicas, Integração WhatsApp via HIPERLINK, Macros (absoluta e relativa), Automação com VBA (Sub, Function, Formulários), Projeto Final: planilha profissional automatizada.
   Além do Avançado base, há especializações disponíveis:
   • Excel Avançado + Dashboards — painel executivo completo com slicers, KPIs, imagens dinâmicas e design UX/UI
   • Excel Avançado + BI com Excel — Power Query, Power Pivot, DAX e Star Schema (ponte para o Power BI)
   • Excel Avançado + Análise Financeira — VPL, TIR, Payback, Fluxo de Caixa, Tabela Price e SAC, SOLVER

3. Se o cliente perguntar sobre POWER BI, pergunte:
   "A Treinatech oferece 2 módulos de Power BI. Qual é o seu momento atual? 📊
   📘 Módulo 1 — para quem está começando no Power BI (ETL, modelagem, DAX básico, 5 projetos reais)
   📙 Módulo 2 — para quem já conhece o básico e quer o nível profissional (DAX avançado, linguagem M, IA, RLS, Report Server)"

4. Quando o cliente informar o módulo de Power BI, apresente:

   POWER BI MÓDULO 1 — tópicos: Conceitos de BI, Power Query (ETL), Transformação e limpeza de dados, Modelagem dimensional (Star Schema), DAX (medidas e colunas calculadas), Contexto de filtro, Drill Down, Tooltips avançados, Relatórios interativos com segmentadores, Publicação no Power BI Service, 5 Projetos: Vendas, International Motors, Pedidos com DAX, Painel Covid (web scrapping), Portfólio de relatórios.

   POWER BI MÓDULO 2 — tópicos: Power Query avançado com linguagem M, Parâmetros e consultas dinâmicas, Pivotar e Unpivotar, DAX profissional (SUMX, AVERAGEX, CALCULATE, Time Intelligence), Relacionamentos many-to-many, Variáveis no DAX, Grupos de cálculos, Drill Through, Formatação condicional avançada, Visuais com IA, Bookmarks, Segurança em nível de linha (RLS) avançada, Power BI Report Server (on-premises), 2 Projetos finais: Relatório Estratégico e Dashboard Executivo.

5. Se o cliente perguntar sobre SQL, apresente diretamente (só existe 1 treinamento por enquanto):
   SQL PARA DADOS — tópicos: SELECT, WHERE, ORDER BY, Funções de agregação (GROUP BY, HAVING), Subqueries e CTEs, INNER / LEFT / RIGHT / FULL JOINs, UNIONS, Chaves primárias e estrangeiras, Integridade referencial, Views e Stored Procedures, Triggers e Functions, Criação de índices, Plano de execução e otimização de queries. Compatível com PostgreSQL e MySQL.

6. Se o cliente perguntar sobre CLAUDE IA (ou inteligência artificial / Claude / IA da Anthropic), informe que a Treinatech está lançando em breve uma trilha completa de treinamentos sobre Claude:

   INTRODUÇÃO À IA COM FOCO NO CLAUDE — Em breve! Treinamento GRATUITO, duração de 1h30. Ideal para quem quer entender o cenário atual da IA e sair do zero com resultados práticos no mesmo dia — sem nenhum conhecimento prévio. Tópicos: Principais IAs: ChatGPT, Gemini, Copilot e Claude, Por que o Claude se destaca no mercado, A fórmula do prompt que gera resultados reais, 3 usos práticos no mesmo dia: escrita, análise e organização.

   CLAUDE NA PRÁTICA – FREE — Em breve! Domínio completo dos recursos da versão gratuita do Claude. Duração: 4 a 5 horas com aulas curtas e objetivas. Tópicos: Prompts avançados por resultado real, Escrita, revisão e análise de documentos, Projects e Memory na prática, Web Search e casos corporativos reais.

   CLAUDE NA PRÁTICA – PRO — Em breve! Tudo do treinamento Free mais os recursos exclusivos do plano Pro. Duração: 8 a 9 horas. Tópicos: Extended Thinking e Research avançado, Google Workspace e Microsoft 365 integrados, Artifacts: HTML, React e visualizações, Cowork: automação de tarefas no desktop.

   Ao final de respostas sobre Claude, sempre encerre com: "Qual desses treinamentos combina com o seu momento atual? 😊"

CURIOSIDADE SOBRE A TREINATECH — compartilhe naturalmente quando o contexto permitir ou quando alguém perguntar sobre o site, tecnologia usada ou Claude:
Este site foi 100% projetado, desenvolvido e publicado com o auxílio do Claude — o assistente de IA da Anthropic. Todo o código, o design, os textos e até a publicação no domínio treinatech.com.br foram feitos usando o Claude, sem nenhum custo adicional de desenvolvimento. É a prova prática de que dominar o Claude transforma o que você consegue realizar — e é exatamente isso que a Treinatech ensina nos seus treinamentos.

DIRETRIZES GERAIS:
- Seja prestativo, profissional e simpático — como um consultor que realmente quer ajudar a pessoa a evoluir
- Adapte o tamanho da resposta ao momento: respostas curtas para perguntas simples, respostas completas quando o cliente quer detalhes ou está comparando opções
- Faça perguntas de qualificação para entender o perfil do cliente: nível atual, área de atuação, objetivo (promoção, carreira nova, empresa própria, etc.)
- Se o cliente demonstrar dúvida entre treinamentos, ajude a comparar e indique o mais adequado ao perfil dele
- Mantenha o fio da conversa — faça referência ao que o cliente disse antes para mostrar que está acompanhando
- Ao final de respostas sobre treinamentos (exceto Claude), termine com uma pergunta aberta que avance a conversa, como "Você já usa [ferramenta] no trabalho hoje?" ou "Qual é o seu principal objetivo com esse treinamento?"
- Para preço: informe que varia conforme modalidade e número de participantes, e convide a falar pelo WhatsApp (41 99183-2100) ou preencher o formulário de contato no site
- Use emojis de forma discreta e profissional
- Nunca invente informações — se não souber, encaminhe para o contato direto
- Foque sempre em como a Treinatech resolve o problema do cliente`;

// ─── API call (via serverless function para evitar CORS) ───────────────────────
async function askClaude(messages: Message[]): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text ?? 'Desculpe, não consegui processar sua mensagem. Tente novamente.';
}

// ─── Component ────────────────────────────────────────────────────────────────
const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    'Olá! Sou o assistente virtual da Treinatech. Como posso te ajudar hoje com nossos treinamentos de Excel, Power BI, SQL ou Claude IA? 😊',
};

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const nextMessages = [...messages, userMsg];
    setInput('');
    setMessages(nextMessages);
    setLoading(true);

    try {
      const historyForApi = nextMessages.filter((_, i) => i > 0 || nextMessages[0].role === 'user');
      const reply = await askClaude(historyForApi);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('ChatBot error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Ops! Tive um pequeno problema técnico. Pode tentar novamente? 🙏 Ou fale diretamente pelo WhatsApp: 41 99183-2100.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSend(e as unknown as React.FormEvent);
    }
  };

  return (
    <>
      {/* ── Toggle button (bottom-left, fiel ao print) ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fechar chat' : 'Abrir chat de suporte'}
        className={`
          fixed bottom-8 left-8 z-50
          w-16 h-16 rounded-full
          flex items-center justify-center
          shadow-2xl border-4 border-white
          transition-all duration-200
          hover:scale-110 active:scale-95
          ${isOpen ? 'bg-slate-800 text-white' : 'bg-green-700 text-white'}
        `}
      >
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-5 w-5 rounded-full bg-green-500 border-2 border-white items-center justify-center text-[9px] font-bold">
              1
            </span>
          </span>
        )}
      </button>

      {/* ── Chat window ── */}
      <div
        className={`
          fixed bottom-28 left-8 z-50
          w-[calc(100vw-4rem)] sm:w-96
          bg-white rounded-3xl
          shadow-2xl border border-slate-100
          flex flex-col
          transition-all duration-300 origin-bottom-left
          ${isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-90 translate-y-6 pointer-events-none'}
        `}
        style={{ height: '520px', maxHeight: 'calc(100vh - 12rem)' }}
        aria-hidden={!isOpen}
      >
        {/* Header — verde, idêntico ao print */}
        <div className="px-5 py-4 bg-green-700 rounded-t-3xl flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Bot avatar */}
            <div className="w-10 h-10 rounded-full bg-white/20 ring-2 ring-white/20 flex items-center justify-center">
              <Bot size={22} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none mb-1">IA Treinatech</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                <span className="text-[9px] text-green-100 uppercase font-bold tracking-widest">
                  Assistente Ativo
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white transition-colors p-1"
            aria-label="Fechar chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/60">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[85%] px-4 py-3 text-sm leading-relaxed shadow-sm
                  ${msg.role === 'user'
                    ? 'bg-green-700 text-white rounded-2xl rounded-br-sm'
                    : 'bg-white text-slate-700 rounded-2xl rounded-bl-sm border border-slate-200/60'}
                `}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200/60 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2 shadow-sm">
                <Loader2 size={14} className="animate-spin text-green-700" />
                <span className="text-xs text-slate-400">Digitando...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form
          onSubmit={handleSend}
          className="p-4 bg-white rounded-b-3xl border-t border-slate-100 flex-shrink-0"
        >
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte sobre Excel, Power BI, SQL, Claude IA..."
              disabled={loading}
              className="
                flex-1 bg-slate-100 rounded-2xl
                px-4 py-2.5 text-sm text-slate-900
                placeholder:text-slate-400
                focus:outline-none focus:ring-2 focus:ring-green-500/50
                disabled:opacity-60
                transition-all
              "
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Enviar mensagem"
              className="
                w-10 h-10 flex-shrink-0
                bg-green-700 text-white rounded-xl
                flex items-center justify-center
                hover:bg-green-800
                disabled:bg-slate-200 disabled:text-slate-400
                active:scale-95 transition-all
                shadow-md
              "
            >
              <Send size={16} />
            </button>
          </div>
          {/* Powered by */}
          <p className="text-center mt-2.5 text-[9px] font-bold uppercase tracking-widest text-slate-300 select-none">
            Powered by Claude AI
          </p>
        </form>
      </div>
    </>
  );
};
