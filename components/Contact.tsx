import React, { useState, useRef, useEffect } from 'react';
import { Send, Mail, Loader2 } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = 'service_ah6lm8a';
const EMAILJS_TEMPLATE_ID = 'template_79r5ang';
const EMAILJS_PUBLIC_KEY  = 'XeePO6lYgHbFUMjwf';
const WA_NUMBER           = '5541991832100';

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Pré-preenche a mensagem se o aluno clicou em um plano
  useEffect(() => {
    const prefill = sessionStorage.getItem('contact_prefill');
    if (prefill && messageRef.current) {
      messageRef.current.value = prefill;
      sessionStorage.removeItem('contact_prefill');
    }
  }, []);

  const buildWhatsAppUrl = () => {
    if (!formRef.current) return `https://wa.me/${WA_NUMBER}`;
    const data = new FormData(formRef.current);
    const nome  = data.get('name')        || '';
    const email = data.get('email')       || '';
    const curso = data.get('treinamento') || '';
    const msg   = data.get('message')     || '';
    const text  = encodeURIComponent(
      `Olá! Meu nome é ${nome} (${email}).
Tenho interesse em: ${curso}.
${msg}`
    );
    return `https://wa.me/${WA_NUMBER}?text=${text}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');
    const waUrl = buildWhatsAppUrl();

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setStatus('success');
      formRef.current.reset();
      // Abre WhatsApp com os dados preenchidos
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-bold mb-8 transition-all duration-700">Vamos dar o próximo passo?</h2>
            <p className="text-slate-400 text-lg mb-12">
              Seja para um treinamento individual ou corporativo para sua equipe, estamos prontos para ajudar sua empresa a se tornar data-driven.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <a
                  href="https://wa.me/5541991832100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-green-700/20 rounded-xl flex items-center justify-center text-green-500 shrink-0 group-hover:bg-green-700/40 transition-colors"
                >
                  <WhatsAppIcon />
                </a>
                <div>
                  <h4 className="font-bold text-lg">WhatsApp</h4>
                  <p className="text-slate-400 group-hover:text-slate-200 transition-colors">41 99183-2100</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-green-700/20 rounded-xl flex items-center justify-center text-green-500 shrink-0 group-hover:bg-green-700/40 transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">E-mail</h4>
                  <a href="mailto:contato@treinatech.com.br" className="text-slate-400 group-hover:text-slate-200 transition-colors hover:text-green-400">contato@treinatech.com.br</a>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-slate-800/50 rounded-3xl border border-slate-800">
              <p className="text-sm text-slate-400 italic">
                "Atendemos empresas em todo o Brasil com treinamentos presenciais e remotos customizados para sua necessidade."
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Mensagem Enviada!</h3>
                <p className="text-slate-600">Entraremos em contato com você o mais rápido possível.</p>
                <p className="text-slate-400 text-sm mt-2">O WhatsApp foi aberto com seus dados para atendimento imediato.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-green-700 font-bold hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <div className="relative">
                {/* Overlay durante o envio */}
                {status === 'sending' && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-xl">
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3 bg-green-100 rounded-full">
                        <Loader2 className="animate-spin text-green-700" size={32} />
                      </div>
                      <span className="text-green-800 font-bold text-sm tracking-wide">Enviando...</span>
                    </div>
                  </div>
                )}

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className={`space-y-6 transition-all duration-300 ${status === 'sending' ? 'grayscale-[0.5] opacity-50' : ''}`}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nome</label>
                      <input
                        required
                        disabled={status === 'sending'}
                        type="text"
                        name="name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all disabled:cursor-not-allowed"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">E-mail</label>
                      <input
                        required
                        disabled={status === 'sending'}
                        type="email"
                        name="email"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all disabled:cursor-not-allowed"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Treinamento de Interesse</label>
                    <select
                      disabled={status === 'sending'}
                      name="treinamento"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all disabled:cursor-not-allowed"
                    >
                      <option>Excel Básico</option>
                      <option>Excel Intermediário</option>
                      <option>Excel Avançado</option>
                      <option>Power BI Módulo 1</option>
                      <option>Power BI Módulo 2</option>
                      <option>SQL para Dados</option>
                      <option>Claude na Prática – Free</option>
                      <option>Claude na Prática – Pro</option>
                      <option>Trilha Completa (Excel + Power BI + SQL)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Mensagem</label>
                    <textarea
                      required
                      disabled={status === 'sending'}
                      rows={4}
                      name="message"
                      ref={messageRef}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none disabled:cursor-not-allowed"
                      placeholder="Como podemos ajudar?"
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm text-center">
                      Ops! Não foi possível enviar por e-mail.{' '}
                      <a
                        href={`https://wa.me/${WA_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-red-700 underline hover:no-underline"
                      >
                        envie pelo WhatsApp
                      </a>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-green-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
