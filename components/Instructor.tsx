
import React from 'react';
import { Linkedin, BadgeCheck } from 'lucide-react';

const certifications = [
  {
    code: 'MCT',
    name: 'Microsoft Certified Trainer',
    bg: 'bg-[#0078d4]',
    dark: false,
  },
  {
    code: 'PL-300',
    name: 'Power BI Data Analyst',
    bg: 'bg-[#f2c811]',
    dark: true,
  },
  {
    code: 'MOS',
    name: 'Excel Associate',
    bg: 'bg-[#217346]',
    dark: false,
  },
  {
    code: 'AZ-900',
    name: 'Azure Fundamentals',
    bg: 'bg-[#0089d6]',
    dark: false,
  },
  {
    code: 'IA',
    name: 'IA Generativa',
    bg: 'bg-slate-700',
    dark: false,
  },
];

const stats = [
  { value: '+10 anos', label: 'de experiência corporativa' },
  { value: '+5.000', label: 'profissionais capacitados' },
  { value: '+30', label: 'grandes empresas atendidas' },
];

export const Instructor: React.FC = () => {
  return (
    <section id="instrutor" className="py-24 bg-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-green-400 font-bold text-xs uppercase tracking-[0.3em] mb-3">Seu Instrutor</p>
          <h2 className="text-4xl font-bold text-white mb-4">Quem vai te ensinar</h2>
          <p className="text-lg text-slate-400">Formação técnica sólida. Experiência corporativa real.</p>
        </div>

        {/* Card principal */}
        <div className="bg-slate-800 rounded-[2.5rem] border border-slate-700 overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-5">
            {/* Coluna esquerda — foto */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-700 to-slate-800 p-10 flex flex-col items-center justify-center text-center gap-6">
              <div className="w-44 h-44 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <img
                  src="/ivo.png"
                  alt="Ivo Amarante Jr."
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white mb-1">Ivo Amarante Jr.</h3>
                <p className="text-green-400 font-bold text-sm uppercase tracking-widest">Diretor & Instrutor</p>
                <p className="text-slate-400 text-sm mt-1">Curitiba, PR</p>
              </div>
              <a
                href="https://linkedin.com/in/iamarante"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a66c2] text-white rounded-xl font-bold text-sm hover:bg-[#004182] transition-colors shadow-lg"
              >
                <Linkedin size={16} />
                Ver perfil no LinkedIn
              </a>
            </div>

            {/* Coluna direita — bio + certs */}
            <div className="md:col-span-3 p-8 sm:p-10 lg:p-14 flex flex-col justify-center gap-8">
              <div className="space-y-4 text-slate-300 leading-relaxed text-[1.05rem]">
                <p>
                  Instrutor com mais de{' '}
                  <strong className="text-white">10 anos de experiência</strong> em treinamentos
                  corporativos de tecnologia e análise de dados. Fundou a Treinatech em 2012 e desde
                  então treinou centenas de profissionais em grandes cooperativas do{' '}
                  <strong className="text-white">Sistema OCB (Sescoop)</strong> — Frísia,
                  Castrolanda, Coonagro e Agrária — além de empresas como Telefônica, Bradesco, Unimed
                  Curitiba, BHS Corrugated, Construtora Greenwood e Lavitta Engenharia.
                </p>
                <p>
                  Possui as principais certificações Microsoft na área, incluindo o{' '}
                  <strong className="text-white">MCT (Microsoft Certified Trainer)</strong> — título
                  concedido diretamente pela Microsoft a instrutores com domínio técnico e didático
                  comprovados — garantindo que cada conteúdo ensinado segue os padrões oficiais.
                </p>
              </div>

              {/* Badges de certificação */}
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.code}
                    className={`${cert.bg} rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shadow-sm`}
                  >
                    <BadgeCheck
                      size={16}
                      className={cert.dark ? 'text-slate-900' : 'text-white'}
                    />
                    <div>
                      <p
                        className={`text-xs font-black uppercase tracking-widest leading-none ${
                          cert.dark ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {cert.code}
                      </p>
                      <p
                        className={`text-[10px] leading-tight mt-0.5 ${
                          cert.dark ? 'text-slate-700' : 'text-white/70'
                        }`}
                      >
                        {cert.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="border-t border-slate-700 grid grid-cols-3 divide-x divide-slate-700">
            {stats.map((stat) => (
              <div key={stat.label} className="py-8 text-center">
                <p className="text-3xl font-extrabold text-green-400 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
