import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { NAV_ITEMS } from '../constants';

interface NavbarProps {
  darkBg?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ darkBg = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // Rotas de página inteira (blog, alunos)
    if (href === '#blog' || href === '#alunos') {
      window.location.hash = href;
      setIsOpen(false);
      return;
    }

    const currentHash = window.location.hash;

    // Se estiver em outra página (blog, alunos, artigo ou demo), volta para home primeiro
    if (
      currentHash === '#blog' ||
      currentHash === '#alunos' ||
      currentHash.startsWith('#artigo-') ||
      currentHash === '#demo'
    ) {
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById(href.replace('#', ''));
        if (el) {
          const offset = 80;
          window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
        }
      }, 100);
      setIsOpen(false);
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Links brancos apenas em páginas de fundo escuro (blog, artigo) sem scroll
  const linkColor = darkBg && !scrolled
    ? 'text-white hover:text-green-300'
    : 'text-slate-800 hover:text-green-700';

  // Homepage: navbar sempre com fundo branco (não transparente)
  const navBg = darkBg
    ? scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
    : 'bg-white/95 backdrop-blur-md shadow-sm py-3';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a
            href="#inicio"
            onClick={(e) => handleLinkClick(e, '#inicio')}
            className="flex items-center transition-opacity hover:opacity-90"
          >
            <Logo className="h-10" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`text-sm font-bold transition-colors uppercase tracking-widest ${linkColor}`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#alunos"
              onClick={(e) => handleLinkClick(e, '#alunos')}
              className={`px-6 py-3 rounded-full text-sm font-black transition-all border-2 uppercase tracking-widest ${
                darkBg && !scrolled
                  ? 'border-white text-white hover:bg-white/10'
                  : 'border-slate-300 text-slate-700 hover:border-green-600 hover:text-green-700'
              }`}
            >
              Área do Aluno
            </a>
            <a
              href="#contato"
              onClick={(e) => handleLinkClick(e, '#contato')}
              className="bg-green-700 text-white px-8 py-3 rounded-full text-sm font-black hover:bg-green-800 transition-all shadow-lg hover:shadow-green-900/20 active:scale-95 uppercase tracking-widest"
            >
              Fale Conosco
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${darkBg && !scrolled ? 'text-white bg-white/20' : 'text-slate-800 bg-slate-100'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-500 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-10 px-6">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-4 text-slate-400"
          >
            <X size={32} />
          </button>

          <Logo className="h-16 mb-4" />

          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="text-3xl font-black text-slate-900 hover:text-green-700 uppercase tracking-tighter"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#alunos"
            onClick={(e) => handleLinkClick(e, '#alunos')}
            className="w-full border-2 border-slate-300 text-slate-700 text-center py-5 rounded-2xl text-xl font-black uppercase tracking-widest hover:border-green-600 hover:text-green-700 transition-all"
          >
            Área do Aluno
          </a>

          <a
            href="#contato"
            onClick={(e) => handleLinkClick(e, '#contato')}
            className="w-full bg-green-700 text-white text-center py-5 rounded-2xl text-xl font-black shadow-2xl uppercase tracking-widest"
          >
            Fale Conosco
          </a>
        </div>
      </div>
    </nav>
  );
};
