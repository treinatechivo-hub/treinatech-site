import React, { useState } from 'react';
import { Search, Tag, ArrowRight, Calendar, Clock, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Excel vs Power BI: Qual ferramenta usar em cada situação?',
    excerpt: 'Entenda as diferenças entre Excel e Power BI e saiba exatamente quando usar cada um para maximizar sua produtividade na análise de dados.',
    category: 'Excel & Power BI',
    categoryColor: 'bg-green-100 text-green-800',
    date: '25 mar 2026',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'DAX do zero: os 10 conceitos que todo analista precisa dominar',
    excerpt: 'CALCULATE, FILTER, ALL, RELATED… Veja os 10 conceitos de DAX mais cobrados no mercado e como aplicá-los em situações reais.',
    category: 'Power BI',
    categoryColor: 'bg-yellow-100 text-yellow-800',
    date: '18 mar 2026',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    id: 3,
    title: 'SQL para analistas: como escrever queries eficientes do zero',
    excerpt: 'Um guia prático para quem quer começar a escrever SQL sem enrolação: SELECT, JOIN, GROUP BY e muito mais.',
    category: 'SQL',
    categoryColor: 'bg-blue-100 text-blue-800',
    date: '10 mar 2026',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
  },
  {
    id: 4,
    title: 'Como criar um dashboard profissional no Power BI em 1 hora',
    excerpt: 'Passo a passo completo: da conexão dos dados à publicação de um relatório bonito, funcional e impressionante para sua diretoria.',
    category: 'Power BI',
    categoryColor: 'bg-yellow-100 text-yellow-800',
    date: '03 mar 2026',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    id: 5,
    title: 'VBA no Excel: automatize tarefas repetitivas e economize horas por semana',
    excerpt: 'Macros, loops e funções personalizadas: aprenda como o VBA pode transformar planilhas manuais em máquinas de produtividade.',
    category: 'Excel & Power BI',
    categoryColor: 'bg-green-100 text-green-800',
    date: '24 fev 2026',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
  },
  {
    id: 6,
    title: 'Carreira em dados: o que as empresas realmente esperam de você',
    excerpt: 'Pesquisamos +50 vagas para analistas de dados e encontramos as habilidades mais exigidas. Veja se você está preparado.',
    category: 'Carreira',
    categoryColor: 'bg-purple-100 text-purple-800',
    date: '15 fev 2026',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  },
  {
    id: 7,
    title: 'Power Query: o segredo dos analistas de dados mais rápidos do mercado',
    excerpt: 'Aprenda a transformar, limpar e combinar dados de múltiplas fontes sem escrever uma linha de código com o Power Query.',
    category: 'Power BI',
    categoryColor: 'bg-yellow-100 text-yellow-800',
    date: '05 fev 2026',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
  },
  {
    id: 8,
    title: 'Tabelas dinâmicas avançadas: recursos que 90% dos usuários não conhecem',
    excerpt: 'Segmentações, linha do tempo, campos calculados e consolidação de dados — vá além do básico e impressione em qualquer reunião.',
    category: 'Excel & Power BI',
    categoryColor: 'bg-green-100 text-green-800',
    date: '28 jan 2026',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80',
  },
];

const CATEGORIES = ['Todos', 'Excel & Power BI', 'Power BI', 'SQL', 'Carreira'];

interface BlogProps {
  onArticleOpen?: (id: number) => void;
}

export const Blog: React.FC<BlogProps> = ({ onArticleOpen }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleOpenArticle = (id: number) => {
    if (onArticleOpen) onArticleOpen(id);
  };

  const filtered = POSTS.filter((p) => {
    const matchCat = activeCategory === 'Todos' || p.category === activeCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="blog" className="min-h-screen bg-slate-900">
      {/* Hero do Blog */}
      <div className="bg-gradient-to-br from-slate-900 via-green-950 to-slate-900 pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-400 bg-green-400/10 border border-green-400/20 px-4 py-1.5 rounded-full mb-6">
            Blog Treinatech
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Conteúdo que transforma{' '}
            <span className="text-green-400">dados em carreira.</span>
          </h1>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            Artigos práticos sobre Excel, Power BI e SQL escritos por instrutores certificados MCT para você evoluir de verdade.
          </p>

          {/* Busca */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por palavra-chave..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white text-slate-800 placeholder-slate-400 text-base shadow-xl outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Filtro por categoria */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-green-700 text-white shadow-lg shadow-green-700/20'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-green-500 hover:text-green-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Posts */}
          <div className="flex-1">
            {/* Post em destaque */}
            {featured && (
              <div onClick={() => handleOpenArticle(featured.id)} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 mb-8 group cursor-pointer hover:shadow-xl transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/2 overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${featured.categoryColor}`}>
                        {featured.category}
                      </span>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        ★ Destaque
                      </span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-3 leading-tight group-hover:text-green-700 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {featured.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {featured.readTime} de leitura
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-sm font-bold text-green-700">
                        Ler artigo <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid de posts */}
            {rest.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rest.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => handleOpenArticle(post.id)}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="overflow-hidden h-48">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${post.categoryColor}`}>
                        {post.category}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 mb-2 leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 text-xs mb-4 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.readTime}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : !featured ? (
              <div className="text-center py-20 text-slate-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-semibold">Nenhum artigo encontrado.</p>
                <p className="text-sm mt-1">Tente outra palavra-chave ou categoria.</p>
              </div>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0 space-y-8">
            {/* Newsletter */}
            <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-6 text-white shadow-xl">
              <h3 className="text-lg font-extrabold mb-2">📩 Fique por dentro!</h3>
              <p className="text-green-100 text-sm mb-5">
                Receba artigos exclusivos sobre Excel, Power BI e SQL direto no seu e-mail. Sem spam.
              </p>
              {subscribed ? (
                <div className="bg-white/20 rounded-2xl p-4 text-center text-sm font-bold animate-in">
                  ✅ Inscrito com sucesso! Boas-vindas à comunidade Treinatech.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-green-200 text-sm outline-none focus:bg-white/20 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-green-800 font-extrabold py-3 rounded-xl text-sm hover:bg-green-50 transition-colors active:scale-95"
                  >
                    Quero receber conteúdo grátis →
                  </button>
                </form>
              )}
            </div>

            {/* Tópicos */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2">
                <Tag className="w-4 h-4 text-green-600" /> Explorar Tópicos
              </h3>
              <div className="flex flex-col gap-2">
                {CATEGORIES.filter((c) => c !== 'Todos').map((cat) => {
                  const count = POSTS.filter((p) => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        activeCategory === cat
                          ? 'bg-green-700 text-white'
                          : 'bg-slate-50 text-slate-700 hover:bg-green-50 hover:text-green-700'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Posts recentes */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-5">
                📌 Mais Lidos
              </h3>
              <div className="flex flex-col gap-4">
                {POSTS.slice(0, 4).map((post, i) => (
                  <div key={post.id} className="flex items-start gap-3 group cursor-pointer">
                    <span className="text-2xl font-black text-slate-100 leading-none w-8 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
                        {post.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{post.readTime} de leitura</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
