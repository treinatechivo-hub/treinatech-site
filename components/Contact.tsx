import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Mail, Loader2 } from 'lucide-react';
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
      `Olá! Meu nome é ${nome} (${email}).\nTenho interesse em: ${curso}.\n${msg}`
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
                  <Phone size={24} />
                </a>
                <div>
                  <h4 className="font-bold text-lg">Telefone / WhatsApp</h4>
                  <p className="text-slate-400 group-hover:text-slate-200 transition-colors">41 99183-2100</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-green-700/20 rounded-xl flex items-center justify-center text-green-500 shrink-0 group-hover:bg-green-700/40 transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">E-mail</h4>
                  <p className="text-slate-400 group-hover:text-slate-200 transition-colors">contato@treinatech.com.br</p>
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
                      <option>Excel Avançado</option>
                      <option>Power BI Professional</option>
                      <option>SQL para Dados</option>
                      <option>Treinamento Corporativo</option>
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
                        className="font-bold underline"
                      >
                        Clique aqui para falar no WhatsApp.
                      </a>
                    </p>
                  )}

                  <button
                    disabled={status === 'sending'}
                    type="submit"
                    className="w-full bg-green-700 text-white font-bold py-4 rounded-xl hover:bg-green-800 transition-all flex items-center justify-center gap-3 shadow-lg disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Solicitar Orçamento
                        <Send size={18} className="transition-transform group-hover:translate-x-1" />
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
