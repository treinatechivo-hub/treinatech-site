import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  ForumCategory,
  ForumTopic,
  ForumReply,
  getCategories,
  getTopicsByCategory,
  getTopic,
  createTopic,
  createReply,
  subscribeToReplies,
  toggleTopicLike,
  toggleReplyLike,
  markReplyAsSolution,
  incrementTopicViews,
} from '../services/forum';
import { Timestamp } from 'firebase/firestore';
import {
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Heart,
  CheckCircle2,
  PlusCircle,
  Send,
  Home,
  Loader2,
  Pin,
  Eye,
  Clock,
  AlertCircle,
  LogOut,
} from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ts: Timestamp | undefined | null): string {
  if (!ts) return '';
  const d = ts.toDate();
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'agora mesmo';
  if (mins < 60) return `há ${mins}min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `há ${days}d`;
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function Avatar({ name, photo, size = 32 }: { name: string; photo: string | null; size?: number }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        style={{ width: size, height: size }}
        className="rounded-full ring-2 ring-green-100 flex-shrink-0 object-cover"
      />
    );
  }
  const initials = name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      className="rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center flex-shrink-0"
    >
      {initials}
    </div>
  );
}

// ─── View: Categories ─────────────────────────────────────────────────────────

const CategoriesView: React.FC<{
  onSelectCategory: (cat: ForumCategory) => void;
  onBack: () => void;
}> = ({ onSelectCategory, onBack }) => {
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setError('Erro ao carregar categorias. Verifique as regras do Firestore.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors"
        >
          <Home size={14} /> Site
        </button>
        <ChevronRight size={14} className="text-slate-300" />
        <span className="text-sm font-bold text-slate-800">Fórum</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Fórum da Comunidade</h1>
        <p className="text-slate-500 text-sm mt-1">Tire dúvidas, compartilhe conhecimento e conecte-se com outros alunos.</p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={28} className="animate-spin text-green-600" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-3">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-700">Erro ao carregar</p>
            <p className="text-xs text-red-500 mt-1">{error}</p>
            <p className="text-xs text-slate-500 mt-2">
              Verifique as <strong>Regras do Firestore</strong> no Firebase Console e permita leitura/escrita para usuários autenticados.
            </p>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat)}
              className="w-full bg-white border border-slate-200 hover:border-green-300 hover:shadow-sm rounded-2xl p-5 text-left transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-green-50 transition-colors">
                  {cat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-slate-800 group-hover:text-green-700 transition-colors">{cat.name}</h3>
                    <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400 flex-shrink-0">
                      <span className="flex items-center gap-1">
                        <MessageSquare size={12} /> {cat.topicsCount} tópicos
                      </span>
                      <span>{cat.postsCount} posts</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5 truncate">{cat.description}</p>
                  {cat.lastPost && (
                    <p className="text-xs text-slate-400 mt-1.5">
                      Último post: <span className="text-slate-600 font-medium">{cat.lastPost.authorName}</span>
                      {' · '}{formatDate(cat.lastPost.createdAt)}
                    </p>
                  )}
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-green-500 flex-shrink-0 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── View: Topics List ────────────────────────────────────────────────────────

const TopicsView: React.FC<{
  category: ForumCategory;
  onSelectTopic: (topic: ForumTopic) => void;
  onNewTopic: () => void;
  onBack: () => void;
}> = ({ category, onSelectTopic, onNewTopic, onBack }) => {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopicsByCategory(category.id)
      .then(setTopics)
      .finally(() => setLoading(false));
  }, [category.id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-xs text-slate-400">
        <button onClick={onBack} className="hover:text-slate-700 flex items-center gap-1 transition-colors">
          <Home size={12} /> Site
        </button>
        <ChevronRight size={12} className="text-slate-300" />
        <button onClick={() => window.location.hash = '#forum'} className="hover:text-slate-700 transition-colors">
          Fórum
        </button>
        <ChevronRight size={12} className="text-slate-300" />
        <span className="text-slate-700 font-semibold">{category.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{category.icon}</span>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">{category.name}</h1>
            <p className="text-slate-500 text-sm">{category.description}</p>
          </div>
        </div>
        <button
          onClick={onNewTopic}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all active:scale-95 flex-shrink-0"
        >
          <PlusCircle size={16} /> Novo tópico
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={28} className="animate-spin text-green-600" />
        </div>
      )}

      {!loading && topics.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
          <MessageSquare size={36} className="text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Nenhum tópico ainda.</p>
          <p className="text-slate-400 text-sm mt-1">Seja o primeiro a postar!</p>
          <button
            onClick={onNewTopic}
            className="mt-4 inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
          >
            <PlusCircle size={15} /> Criar primeiro tópico
          </button>
        </div>
      )}

      {!loading && topics.length > 0 && (
        <div className="space-y-2">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic)}
              className="w-full bg-white border border-slate-200 hover:border-green-300 hover:shadow-sm rounded-2xl p-4 text-left transition-all group"
            >
              <div className="flex items-start gap-3">
                <Avatar name={topic.authorName} photo={topic.authorPhoto} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {topic.pinned && <Pin size={12} className="text-green-600 flex-shrink-0" />}
                    {topic.solved && (
                      <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        ✔ Resolvido
                      </span>
                    )}
                    <h3 className="font-semibold text-slate-800 group-hover:text-green-700 transition-colors text-sm leading-tight">
                      {topic.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{topic.content}</p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                    <span className="font-medium text-slate-600">{topic.authorName}</span>
                    <span className="flex items-center gap-1"><Clock size={10} />{formatDate(topic.createdAt)}</span>
                    <span className="flex items-center gap-1"><MessageSquare size={10} />{topic.repliesCount}</span>
                    <span className="flex items-center gap-1"><Eye size={10} />{topic.views}</span>
                    <span className="flex items-center gap-1"><Heart size={10} />{topic.likes.length}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── View: Topic Detail ───────────────────────────────────────────────────────

const TopicView: React.FC<{
  topicId: string;
  categoryId: string;
  onBack: () => void;
  onBackToForum: () => void;
}> = ({ topicId, categoryId, onBack, onBackToForum }) => {
  const { user } = useAuth();
  const [topic, setTopic] = useState<ForumTopic | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTopic(topicId).then((t) => {
      setTopic(t);
      setLoading(false);
    });
    incrementTopicViews(topicId).catch(() => {});
  }, [topicId]);

  useEffect(() => {
    const unsub = subscribeToReplies(topicId, setReplies);
    return unsub;
  }, [topicId]);

  const handleLikeTopic = async () => {
    if (!topic || !user) return;
    const liked = topic.likes.includes(user.uid);
    setTopic((prev) => prev ? {
      ...prev,
      likes: liked ? prev.likes.filter((id) => id !== user.uid) : [...prev.likes, user.uid],
    } : prev);
    await toggleTopicLike(topicId, user.uid, liked);
  };

  const handleLikeReply = async (reply: ForumReply) => {
    if (!user) return;
    const liked = reply.likes.includes(user.uid);
    await toggleReplyLike(reply.id, user.uid, liked);
  };

  const handleMarkSolution = async (reply: ForumReply) => {
    if (!user || !topic) return;
    if (user.uid !== topic.authorUid && !user.isAdmin) return;
    await markReplyAsSolution(reply.id, topicId, !reply.isSolution);
    getTopic(topicId).then(setTopic);
  };

  const handleSubmitReply = async () => {
    if (!user || !replyText.trim()) return;
    setSubmitting(true);
    try {
      await createReply({
        topicId,
        categoryId,
        content: replyText.trim(),
        authorUid: user.uid,
        authorName: user.name,
        authorPhoto: user.photoURL,
      });
      setReplyText('');
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 300);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={28} className="animate-spin text-green-600" />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Tópico não encontrado.</p>
        <button onClick={onBack} className="mt-4 text-sm text-green-700 underline">Voltar</button>
      </div>
    );
  }

  const isAuthor = user?.uid === topic.authorUid;
  const topicLiked = user ? topic.likes.includes(user.uid) : false;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-xs text-slate-400">
        <button onClick={onBackToForum} className="hover:text-slate-700 flex items-center gap-1 transition-colors">
          <Home size={12} /> Site
        </button>
        <ChevronRight size={12} className="text-slate-300" />
        <button onClick={() => window.location.hash = '#forum'} className="hover:text-slate-700 transition-colors">
          Fórum
        </button>
        <ChevronRight size={12} className="text-slate-300" />
        <button onClick={onBack} className="hover:text-slate-700 transition-colors">Categoria</button>
        <ChevronRight size={12} className="text-slate-300" />
        <span className="text-slate-700 font-semibold truncate max-w-[200px]">{topic.title}</span>
      </div>

      {/* Original Post */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-4">
        <div className="p-6">
          <div className="flex items-start gap-2 mb-4 flex-wrap">
            {topic.pinned && (
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Pin size={9} /> Fixado
              </span>
            )}
            {topic.solved && (
              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 size={9} /> Resolvido
              </span>
            )}
          </div>

          <h1 className="text-xl font-extrabold text-slate-900 mb-5">{topic.title}</h1>

          <div className="flex items-start gap-4">
            <Avatar name={topic.authorName} photo={topic.authorPhoto} size={44} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-semibold text-slate-800 text-sm">{topic.authorName}</span>
                <span className="text-xs text-slate-400">{formatDate(topic.createdAt)}</span>
                <span className="text-xs text-slate-400 flex items-center gap-1"><Eye size={10} /> {topic.views}</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{topic.content}</p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={handleLikeTopic}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                    topicLiked
                      ? 'bg-red-50 border-red-200 text-red-500'
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-400'
                  }`}
                >
                  <Heart size={12} className={topicLiked ? 'fill-red-400' : ''} />
                  {topic.likes.length > 0 && topic.likes.length}
                  {topicLiked ? ' Curtido' : ' Curtir'}
                </button>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MessageSquare size={11} /> {replies.length} {replies.length === 1 ? 'resposta' : 'respostas'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Replies */}
      {replies.length > 0 && (
        <div className="space-y-3 mb-4">
          {replies.map((reply) => {
            const replyLiked = user ? reply.likes.includes(user.uid) : false;
            const canMarkSolution = isAuthor || user?.isAdmin;
            return (
              <div
                key={reply.id}
                className={`bg-white border rounded-2xl overflow-hidden transition-all ${
                  reply.isSolution ? 'border-green-300 shadow-sm shadow-green-100' : 'border-slate-200'
                }`}
              >
                {reply.isSolution && (
                  <div className="bg-green-50 border-b border-green-200 px-5 py-2 flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-green-600" />
                    <span className="text-xs font-bold text-green-700">Melhor resposta</span>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <Avatar name={reply.authorName} photo={reply.authorPhoto} size={36} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-slate-800 text-sm">{reply.authorName}</span>
                        <span className="text-xs text-slate-400">{formatDate(reply.createdAt)}</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{reply.content}</p>
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleLikeReply(reply)}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                            replyLiked
                              ? 'bg-red-50 border-red-200 text-red-500'
                              : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-400'
                          }`}
                        >
                          <Heart size={11} className={replyLiked ? 'fill-red-400' : ''} />
                          {reply.likes.length > 0 && reply.likes.length}
                          {replyLiked ? ' Curtido' : ' Curtir'}
                        </button>
                        {canMarkSolution && (
                          <button
                            onClick={() => handleMarkSolution(reply)}
                            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                              reply.isSolution
                                ? 'bg-green-100 border-green-300 text-green-700'
                                : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-green-300 hover:text-green-600'
                            }`}
                          >
                            <CheckCircle2 size={11} />
                            {reply.isSolution ? 'Solução marcada' : 'Marcar como solução'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div ref={bottomRef} />

      {/* Reply Box */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-slate-50">
          <MessageSquare size={13} className="text-slate-500" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Sua Resposta</span>
        </div>
        <div className="p-4">
          <div className="flex items-start gap-3">
            {user && <Avatar name={user.name} photo={user.photoURL} size={36} />}
            <div className="flex-1">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Escreva sua resposta..."
                rows={4}
                className="w-full text-sm text-slate-700 placeholder-slate-300 border border-slate-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200 transition-all leading-relaxed"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-400">{replyText.length} caracteres</span>
                <button
                  onClick={handleSubmitReply}
                  disabled={!replyText.trim() || submitting}
                  className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  Responder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── View: New Topic ──────────────────────────────────────────────────────────

const NewTopicView: React.FC<{
  category: ForumCategory;
  onSuccess: (topicId: string) => void;
  onCancel: () => void;
}> = ({ category, onSuccess, onCancel }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!user || !title.trim() || !content.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const id = await createTopic({
        categoryId: category.id,
        title: title.trim(),
        content: content.trim(),
        authorUid: user.uid,
        authorName: user.name,
        authorPhoto: user.photoURL,
      });
      onSuccess(id);
    } catch (e) {
      setError('Erro ao criar tópico. Tente novamente.');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors"
        >
          <ChevronLeft size={14} /> Voltar
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
          <span className="text-xl">{category.icon}</span>
          <div>
            <h2 className="font-bold text-slate-800">Novo tópico</h2>
            <p className="text-xs text-slate-400">em {category.name}</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
              Título *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Descreva brevemente o assunto..."
              maxLength={200}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200 transition-all"
            />
            <p className="text-[11px] text-slate-400 mt-1 text-right">{title.length}/200</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
              Conteúdo *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Detalhe sua dúvida, ideia ou comentário. Quanto mais contexto, melhor!"
              rows={8}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-300 resize-none focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200 transition-all leading-relaxed"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
              <AlertCircle size={14} className="text-red-500" />
              <span className="text-xs text-red-600">{error}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={!title.trim() || !content.trim() || submitting}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              Publicar tópico
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Forum Page ───────────────────────────────────────────────────────────

type ForumView =
  | { type: 'categories' }
  | { type: 'topics'; category: ForumCategory }
  | { type: 'topic'; topicId: string; categoryId: string; category: ForumCategory }
  | { type: 'new-topic'; category: ForumCategory };

export const ForumPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { user, signOut } = useAuth();
  const [view, setView] = useState<ForumView>({ type: 'categories' });

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top Nav */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <Home size={16} />
            <span className="hidden sm:block text-xs font-medium">Site</span>
          </button>
          <span className="text-slate-300">/</span>
          <button
            onClick={() => setView({ type: 'categories' })}
            className="text-xs font-bold text-green-700 hover:text-green-800 transition-colors"
          >
            💬 Fórum
          </button>
          {view.type === 'topics' && (
            <>
              <span className="text-slate-300 hidden sm:block">/</span>
              <span className="text-xs text-slate-600 font-semibold hidden sm:block truncate max-w-[180px]">
                {view.category.icon} {view.category.name}
              </span>
            </>
          )}
          {(view.type === 'topic' || view.type === 'new-topic') && (
            <>
              <span className="text-slate-300 hidden sm:block">/</span>
              <span className="text-xs text-slate-600 font-semibold hidden sm:block truncate max-w-[200px]">
                {view.category?.icon} {view.category?.name}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col leading-tight text-right">
            <span className="text-xs font-medium text-slate-700">{user.name}</span>
            <span className="text-[10px] text-slate-400">{user.email}</span>
          </div>
          {user.photoURL && (
            <img src={user.photoURL} alt={user.name} className="w-8 h-8 rounded-full ring-2 ring-green-100" />
          )}
          <button
            onClick={signOut}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50"
          >
            <LogOut size={14} />
            <span className="hidden sm:block">Sair</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <div>
        {view.type === 'categories' && (
          <CategoriesView
            onSelectCategory={(cat) => setView({ type: 'topics', category: cat })}
            onBack={onBack}
          />
        )}

        {view.type === 'topics' && (
          <TopicsView
            category={view.category}
            onSelectTopic={(topic) =>
              setView({ type: 'topic', topicId: topic.id, categoryId: topic.categoryId, category: view.category })
            }
            onNewTopic={() => setView({ type: 'new-topic', category: view.category })}
            onBack={onBack}
          />
        )}

        {view.type === 'topic' && (
          <TopicView
            topicId={view.topicId}
            categoryId={view.categoryId}
            onBack={() => {
              const cat = view.category;
              setView({ type: 'topics', category: cat });
            }}
            onBackToForum={onBack}
          />
        )}

        {view.type === 'new-topic' && (
          <NewTopicView
            category={view.category}
            onSuccess={(topicId) =>
              setView({ type: 'topic', topicId, categoryId: view.category.id, category: view.category })
            }
            onCancel={() => setView({ type: 'topics', category: view.category })}
          />
        )}
      </div>
    </div>
  );
};
