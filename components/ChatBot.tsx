import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// ─── System prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Você é o assistente virtual da Treinatech, empresa líder em treinamentos de tecnologia e análise de dados no Brasil.
Informações da empresa:
- Especialidades: Excel Avançado (VBA, Macros, Dashboards, Tabelas Dinâmicas), Power BI (DAX, Modelagem, Power Query, ETL), SQL (Banco de dados, Joins, Stored Procedures, Otimização)
- WhatsApp: 41 99183-2100
- E-mail: contato@treinatech.com.br
- Modalidades: treinamentos in-company (presencial ou remoto) e individual online
- Atendemos todo o Brasil
- Instrutores com certificação MCT (Microsoft Certified Trainer)
- Nota média: 4.9/5 | +5.000 alunos formados | +15.000 horas de aula
Diretrizes:
- Seja prestativo, profissional e simpático
- Respostas concisas (máximo 2-3 parágrafos curtos)
- Para perguntas de preço: informe que varia conforme modalidade e sugira preencher o formulário de contato ou chamar no WhatsApp
- Use emojis de forma discreta e profissional
- Foque sempre em como a Treinatech pode resolver o problema do usuário
- Nunca invente informações — se não souber, sugira o contato direto`;

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
    'Olá! Sou o assistente virtual da Treinatech. Como posso te ajudar hoje com nossos treinamentos de Excel, Power BI ou SQL? 😊',
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
              placeholder="Pergunte sobre cursos, SQL..."
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
