import React from 'react';

const PARCEIROS = [
  { name: 'Frísia',              logo: 'https://www.frisia.coop.br/assets/images/menu-logo.png',                                                                                                                url: 'https://www.frisia.coop.br',                dark: false, square: false },
  { name: 'Agrária',             logo: 'https://www.agraria.com.br/img/logo-agraria.svg',                                                                                                                       url: 'https://www.agraria.com.br',                dark: false, square: false },
  { name: 'Sicoob',              logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Logotipo_do_Sicoob.svg/250px-Logotipo_do_Sicoob.svg.png',                                                     url: 'https://www.sicoob.com.br',                 dark: false, square: false },
  { name: 'Sistema Ocepar',      logo: 'https://www.paranacooperativo.coop.br/images/Logo/logo-sistemaocepar.svg',                                                                                               url: 'https://www.paranacooperativo.coop.br',     dark: false, square: false },
  { name: 'Coonagro',            logo: 'https://coonagro.coop.br/wp-content/uploads/2024/06/image-15-Traced.png',                                                                                               url: 'https://coonagro.coop.br',                  dark: true,  square: false },
  { name: 'Castrolanda',         logo: 'https://www.castrolanda.coop.br/wp-content/uploads/2026/01/Castrolanda_75anos.png',                                                                                     url: 'https://www.castrolanda.coop.br',           dark: false, square: false },
  { name: 'Bracell',             logo: 'https://www.bracell.com/wp-content/uploads/2019/04/bracell_logo_FA.png',                                                                                                url: 'https://www.bracell.com',                   dark: false, square: false },
  { name: 'Construtora Greenwood', logo: 'https://static.wixstatic.com/media/4a8932_44f4dee7a33f445f81f2b5078176756d~mv2.png/v1/fill/w_300,h_300,al_c,q_90,enc_avif,quality_auto/Logo_transparente.png',       url: 'https://www.construtoragreenwood.com.br',   dark: true,  square: true  },
];

export const ParceirosBanner: React.FC = () => (
  <div className="bg-slate-800/60 py-12 border-y border-slate-700 overflow-hidden">
    <p className="text-center text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 mb-8">
      Empresas e cooperativas que já treinaram com a Treinatech
    </p>
    <style>{`
      @keyframes marquee {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .marquee-track {
        display: flex;
        width: max-content;
        animation: marquee 30s linear infinite;
      }
      .marquee-track:hover { animation-play-state: paused; }
    `}</style>
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
        style={{ background: 'linear-gradient(to right, #1a2236cc, transparent)' }} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
        style={{ background: 'linear-gradient(to left, #1a2236cc, transparent)' }} />
      <div className="marquee-track">
        {[...PARCEIROS, ...PARCEIROS].map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`mx-8 flex items-center justify-center rounded-xl hover:scale-105 transition-all duration-300 shadow-sm ${item.square ? 'px-3 py-3' : 'px-6 py-3'} ${item.dark ? 'bg-[#0f172a]' : 'bg-white'}`}
          >
            <img src={item.logo} alt={item.name} className={`w-auto object-contain ${item.square ? 'h-16' : 'h-10'}`} />
          </a>
        ))}
      </div>
    </div>
  </div>
);
