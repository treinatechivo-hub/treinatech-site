import React, { useState } from 'react';
import { Check, X, Zap, User, Building2, ArrowRight, HelpCircle } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number | null;
  priceLabel?: string;
  period: string;
  icon: React.ReactNode;
  badge?: string;
  featured?: boolean;
  comingSoon?: boolean;
  ctaLabel: string;
  ctaHref: string;
  accentColor: string;
  features: Feature[];
}

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQS = [
  {
    question: 'Recebo certificado ao concluir?',
    answer:
      'Sim! Todos os planos incluem certificado de conclusão. Os planos Trilha e Corporativo emitem certificados com chancela MCT (Microsoft Certified Trainer), amplamente reconhecido pelo mercado.',
  },
  {
    question: 'Os cursos têm prazo de acesso?',
    answer:
      'No plano Individual o acesso é de 6 meses. Na Trilha Completa, 12 meses com renovação disponível. No plano Corporativo o prazo é acordado em contrato.',
  },
  {
    question: 'Os treinamentos são ao vivo ou gravados?',
    answer:
      'Os módulos são gravados para você estudar no seu ritmo. A Trilha Completa inclui 4 encontros ao vivo por mês para tirar dúvidas em tempo real com o instrutor.',
  },
  {
    question: 'Posso parcelar o investimento?',
    answer:
      'Sim, aceitamos cartão de crédito em até 12× sem juros. Para planos corporativos, trabalhamos com boleto e nota fiscal.',
  },
];

// ─── Plans data ───────────────────────────────────────────────────────────────

const PLANS: Plan[] = [
  {
    id: 'individual',
    comingSoon: true,
    name: 'Individual',
    description: 'Para profissionais que querem evoluir em uma ferramenta específica.',
    price: 497,
    period: 'por curso',
    icon: <User className="w-5 h-5" />,
    ctaLabel: 'Começar agora',
    ctaHref: '#contato',
    accentColor: 'border-slate-200',
    features: [
      { text: 'Acesso a 1 curso completo', included: true },
      { text: '6 meses de acesso ao conteúdo', included: true },
      { text: 'Material de apoio em PDF', included: true },
      { text: 'Certificado de conclusão', included: true },
      { text: 'Suporte por e-mail por 30 dias', included: true },
      { text: 'Sessões ao vivo mensais', included: false },
      { text: 'Certificado MCT', included: false },
      { text: 'Suporte prioritário', included: false },
    ],
  },
  {
    id: 'trilha',
    comingSoon: true,
    name: 'Trilha Completa',
    description: 'Excel + Power BI + SQL — do zero ao especialista em dados.',
    price: 997,
    period: 'nos 3 cursos',
    icon: <Zap className="w-5 h-5" />,
    badge: '⭐ Mais popular',
    featured: true,
    ctaLabel: 'Quero a trilha completa',
    ctaHref: '#contato',
    accentColor: 'border-green-500',
    features: [
      { text: 'Acesso aos 3 cursos completos', included: true, highlight: true },
      { text: '12 meses de acesso ao conteúdo', included: true, highlight: true },
      { text: 'Material de apoio completo', included: true },
      { text: 'Certificados MCT (3 cursos)', included: true, highlight: true },
      { text: 'Suporte prioritário por 90 dias', included: true },
      { text: '4 sessões ao vivo por mês', included: true, highlight: true },
      { text: 'Comunidade exclusiva de alunos', included: true },
      { text: 'Desconto em futuras turmas', included: true },
    ],
  },
  {
    id: 'corporativo',
    comingSoon: true,
    name: 'Corporativo',
    description: 'Treinamento in-company para equipes de 5 a 500 pessoas.',
    price: null,
    priceLabel: 'Sob consulta',
    period: 'por equipe',
    icon: <Building2 className="w-5 h-5" />,
    ctaLabel: 'Solicitar orçamento',
    ctaHref: '#contato',
    accentColor: 'border-slate-200',
    features: [
      { text: 'Conteúdo 100% personalizado', included: true },
      { text: 'Diagnóstico de maturidade digital', included: true },
      { text: 'Instrutor presencial ou remoto', included: true },
      { text: 'Certificados MCT para toda equipe', included: true },
      { text: 'Relatório de evolução por colaborador', included: true },
      { text: 'Suporte dedicado por 1 ano', included: true },
      { text: 'Nota fiscal e parcelamento B2B', included: true },
      { text: 'Integração com plataforma LMS', included: true },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const FeatureItem: React.FC<{ feature: Feature }> = ({ feature }) => (
  <li className="flex items-start gap-3">
    <span
      className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
        feature.included
          ? 'bg-green-100 text-green-700'
          : 'bg-slate-100 text-slate-400'
      }`}
    >
      {feature.included ? (
        <Check className="w-3 h-3 stroke-[2.5]" />
      ) : (
        <X className="w-3 h-3 stroke-[2.5]" />
      )}
    </span>
    <span
      className={`text-sm leading-relaxed ${
        feature.included
          ? feature.highlight
            ? 'font-semibold text-slate-800'
            : 'text-slate-700'
          : 'text-slate-400 line-through'
      }`}
    >
      {feature.text}
    </span>
  </li>
);

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => (
  <div
    className={`relative flex flex-col rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
      plan.featured
        ? 'border-green-500 bg-white shadow-xl shadow-green-900/10'
        : 'border-slate-200 bg-white shadow-sm hover:border-green-200'
    }`}
  >
    {/* Badge */}
    {plan.badge && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-green-700 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg">
        {plan.badge}
      </div>
    )}

    {/* EM BREVE banner */}
    {plan.comingSoon && (
      <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
        EM BREVE!
      </div>
    )}

    {/* Header */}
    <div className="mb-6">
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-bold mb-4 ${
          plan.featured
            ? 'bg-green-100 text-green-700'
            : 'bg-slate-100 text-slate-600'
        }`}
      >
        {plan.icon}
        {plan.name}
      </div>
      <p className="text-sm text-slate-500 leading-relaxed">{plan.description}</p>
    </div>

    {/* Price */}
    <div className="mb-8 pb-8 border-b border-slate-100">
      {plan.price !== null ? (
        <>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-medium text-slate-500">R$</span>
            <span
              className={`text-5xl font-black tracking-tight ${
                plan.featured ? 'text-green-700' : 'text-slate-900'
              }`}
            >
              {plan.price.toLocaleString('pt-BR')}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium uppercase tracking-wide">
            {plan.period}
          </p>
          {plan.id === 'trilha' && (
            <div className="mt-3 inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-100">
              <Zap className="w-3 h-3" />
              Economia de R$ 494 vs individual
            </div>
          )}
        </>
      ) : (
        <>
          <div className="text-4xl font-black text-slate-900 tracking-tight">
            {plan.priceLabel}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium uppercase tracking-wide">
            {plan.period}
          </p>
        </>
      )}
    </div>

    {/* Features */}
    <ul className="flex flex-col gap-3.5 flex-1 mb-8">
      {plan.features.map((feature, idx) => (
        <FeatureItem key={idx} feature={feature} />
      ))}
    </ul>

    {/* CTA */}
    <a
      href={plan.ctaHref}
      onClick={() => {
        const prefillMap: Record<string, string> = {
          individual: 'Tenho interesse no plano Individual.',
          trilha: 'Tenho interesse na Trilha Completa (Excel + Power BI + SQL).',
          corporativo: 'Tenho interesse no plano Corporativo para minha equipe.',
        };
        if (prefillMap[plan.id]) {
          sessionStorage.setItem('contact_prefill', prefillMap[plan.id]);
        }
      }}
      className={`group flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-95 ${
        plan.featured
          ? 'bg-green-700 text-white hover:bg-green-800 shadow-lg shadow-green-900/20'
          : 'bg-slate-900 text-white hover:bg-slate-800'
      }`}
    >
      {plan.ctaLabel}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </a>
  </div>
);

const FaqItem: React.FC<{ faq: (typeof FAQS)[0] }> = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-700 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-800 transition-colors"
      >
        <span className="font-semibold text-slate-100 text-sm">{faq.question}</span>
        <HelpCircle
          className={`w-5 h-5 flex-shrink-0 transition-colors ${
            open ? 'text-green-400' : 'text-slate-500'
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const Pricing: React.FC = () => {
  return (
    <section id="precos" className="py-24 bg-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest text-green-400 bg-green-900/40 rounded-full">
            Investimento
          </span>
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Planos para cada etapa da sua jornada
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Do profissional que quer evoluir ao time corporativo que precisa se transformar —
            temos o plano certo para você.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start mb-20">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Trust bar */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 mb-20 shadow-sm">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { emoji: '🔒', label: 'Pagamento seguro', sub: 'SSL + gateways certificados' },
              { emoji: '💳', label: 'Até 12× sem juros', sub: 'No cartão de crédito' },
              { emoji: '🏆', label: 'Certificação MCT', sub: 'Microsoft reconhecida' },
              { emoji: '💬', label: 'Suporte real', sub: 'Via WhatsApp e e-mail' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{item.emoji}</span>
                <span className="font-bold text-slate-800 text-sm">{item.label}</span>
                <span className="text-xs text-slate-500">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-10">
            Perguntas frequentes
          </h3>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, idx) => (
              <FaqItem key={idx} faq={faq} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 bg-green-700 rounded-3xl p-10 text-center text-white">
            <h4 className="text-2xl font-extrabold mb-3">Ainda tem dúvidas?</h4>
            <p className="text-green-100 mb-7 text-base leading-relaxed">
              Fale com um consultor e descubra qual plano faz mais sentido para o seu momento.
            </p>
            <a
              href="https://wa.me/5541991832100"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-green-800 font-bold px-8 py-4 rounded-2xl hover:bg-green-50 transition-all active:scale-95 shadow-lg"
            >
              {/* WhatsApp icon */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-green-700">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Fale conosco
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
