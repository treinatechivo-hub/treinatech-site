import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Courses } from './components/Courses';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { MembersArea } from './components/members/MembersArea';
import { Blog } from './components/Blog';
import { ArticlePage } from './components/ArticlePage';
import { DemoPage } from './pages/DemoPage';

type Page = 'home' | 'members' | 'blog' | 'article' | 'demo';

const WA_SVG = (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const WhatsAppButton: React.FC = () => (
  <a
    href="https://wa.me/5541991832100"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 group border-4 border-white"
  >
    {WA_SVG}
  </a>
);

const App: React.FC = () => {
  const getInitialPage = (): Page => {
    if (window.location.hash === '#alunos') return 'members';
    if (window.location.hash === '#blog') return 'blog';
    if (window.location.hash === '#demo') return 'demo';
    return 'home';
  };

  const [page, setPage] = useState<Page>(getInitialPage);
  const [articleId, setArticleId] = useState<number>(1);

  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#alunos') setPage('members');
      else if (hash === '#blog') setPage('blog');
      else if (hash === '#demo') setPage('demo');
      else if (hash.startsWith('#artigo-')) {
        setArticleId(Number(hash.replace('#artigo-', '')));
        setPage('article');
      } else setPage('home');
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenArticle = (id: number) => {
    setArticleId(id);
    setPage('article');
    window.location.hash = `#artigo-${id}`;
  };

  const handleBackToBlog = () => {
    setPage('blog');
    window.location.hash = '#blog';
  };

  if (page === 'members') {
    return <MembersArea />;
  }

  if (page === 'article') {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar darkBg />
        <ArticlePage articleId={articleId} onBack={handleBackToBlog} />
        <Footer />
        <ChatBot />
        <WhatsAppButton />
      </div>
    );
  }

  if (page === 'blog') {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar darkBg />
        <Blog onArticleOpen={handleOpenArticle} />
        <Footer />
        <ChatBot />
        <WhatsAppButton />
      </div>
    );
  }

  if (page === 'demo') {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar darkBg />
        <DemoPage />
        <Footer />
        <ChatBot />
        <WhatsAppButton />
      </div>
    );
  }

  // Landing page principal
  return (
    <div className="min-h-screen bg-slate-900 selection:bg-green-900 selection:text-green-100">
      <Navbar />

      <main>
        {/* Hero */}
        <Hero />

        {/* Parceiros */}
        <div className="bg-slate-800/60 py-12 border-y border-slate-700 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-center text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 mb-8">
              Treinamentos realizados em grandes cooperativas
            </p>
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32">
              <div className="group flex flex-col items-center gap-1 transition-all">
                <span className="text-3xl font-black tracking-tighter text-slate-300 group-hover:text-[#005aab] transition-colors duration-500 uppercase italic">
                  Frísia
                </span>
                <div className="h-0.5 w-0 group-hover:w-full bg-[#005aab] transition-all duration-500"></div>
              </div>
              <div className="group flex flex-col items-center gap-1 transition-all">
                <span className="text-3xl font-black tracking-tighter text-slate-300 group-hover:text-[#007c41] transition-colors duration-500 uppercase">
                  Agrária
                </span>
                <div className="h-0.5 w-0 group-hover:w-full bg-[#007c41] transition-all duration-500"></div>
              </div>
              <div className="group flex flex-col items-center gap-1 transition-all">
                <span className="text-3xl font-black tracking-tighter text-slate-300 group-hover:text-[#003641] transition-colors duration-500 uppercase">
                  Sicoob
                </span>
                <div className="h-0.5 w-0 group-hover:w-full bg-[#003641] transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sobre */}
        <About />

        {/* Cursos */}
        <Courses />

        {/* Depoimentos */}
        <Testimonials />

        {/* Preços */}
        <Pricing />

        {/* CTA Banner */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-green-700 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-10 -left-10 w-40 h-40 border-8 border-white rounded-full"></div>
                <div className="absolute -bottom-10 -right-10 w-60 h-60 border-8 border-white rounded-full"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 relative z-10">
                Pronto para transformar dados em inteligência?
              </h2>
              <p className="text-green-100 text-xl mb-10 max-w-2xl mx-auto relative z-10">
                Capacite sua equipe com quem entende a realidade do agronegócio e do cooperativismo.
              </p>
              <a
                href="#contato"
                className="inline-block px-10 py-5 bg-white text-green-800 font-bold rounded-2xl shadow-xl hover:bg-slate-50 transform hover:-translate-y-1 transition-all active:scale-95 relative z-10"
              >
                Solicitar Orçamento
              </a>
            </div>
          </div>
        </section>

        {/* Contato */}
        <Contact />
      </main>

      <Footer />

      <ChatBot />

      {/* WhatsApp flutuante */}
      <a
        href="https://wa.me/5541991832100"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 group border-4 border-white"
      >
        {WA_SVG}
        <span className="absolute right-full mr-4 bg-white text-slate-800 px-3 py-1.5 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
          Falar com consultor
        </span>
      </a>
    </div>
  );
};

export default App;
