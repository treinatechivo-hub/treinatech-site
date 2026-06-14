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
  deleteTopic,
  deleteReply,
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
  BookOpen,
  Trash2,
} from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────

const ADMIN_EMAIL = 'treinatechivo@gmail.com';
const ADMIN_ONLY_CATEGORIES = ['Anúncios e Novidades'];

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

function getTopicStatus(topic: ForumTopic): 'aberto' | 'em-andamento' | 'resolvido' {
  if (topic.solved) return 'resolvido';
  if (topic.repliesCount > 0) return 'em-andamento';
  return 'aberto';
}

const STATUS_STYLE = {
  aberto: { label: 'Aberto', cls: 'text-red-400 bg-red-400/10' },
  'em-andamento': { label: 'Em andamento', cls: 'text-amber-400 bg-amber-400/10' },
  resolvido: { label: 'Resolvido', cls: 'text-green-400 bg-green-400/10' },
};

function StatusBadge({ topic }: { topic: ForumTopic }) {
  const status = getTopicStatus(topic);
  const { label, cls } = STATUS_STYLE[status];
  const Icon = status === 'resolvido' ? CheckCircle2 : status === 'em-andamento' ? Clock : AlertCircle;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${cls}`}>
      <Icon size={9} /> {label}
    </span>
  );
}

function Avatar({ name, photo, size = 32 }: { name: string; photo: string | null; size?: number }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        style={{ width: size, height: size }}
        className="rounded-full ring-2 ring-green-700/40 flex-shrink-0 object-cover"
      />
    );
  }
  const initials = name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      className="rounded-full bg-green-800 text-green-300 font-bold flex items-center justify-center flex-shrink-0"
    >
      {initials}
    </div>
  );
}

// ─── View: Categories ─────────────────────────────────────────────────────────

const CategoriesView: React.FC<{
  onSelectCategory: (cat: ForumCategory) => void;
  onBack: () => void;
}> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then((cats) => {
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">💬</span>
          <div>
            <h1 className="text-2xl font-bold text-white">Fórum da Comunidade</h1>
            <p className="text-slate-400 text-sm">Compartilhe, aprenda e conecte-se com outros alunos</p>
          </div>
        </div>
      </div>

      {/* Categories grid */}
      <div className="grid gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat)}
            className="w-full text-left bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 hover:bg-slate-700 hover:border-slate-600 transition-all group"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl flex-shrink-0">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-white text-base group-hover:text-green-400 transition-colors truncate">
                    {cat.name}
                  </h3>
                  <ChevronRight size={16} className="text-slate-500 flex-shrink-0" />
                </div>
                <p className="text-slate-400 text-sm mt-0.5 truncate">{cat.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-slate-500">
                    <span className="text-slate-300 font-semibold">{cat.topicsCount}</span> tópicos
                  </span>
                  <span className="text-xs text-slate-500">
                    <span className="text-slate-300 font-semibold">{cat.postsCount}</span> posts
                  </span>
                  {cat.lastPost && (
                    <span className="text-xs text-slate-500 truncate hidden sm:block">
                      último: <span className="text-slate-400">{cat.lastPost.authorName}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── View: Topics ─────────────────────────────────────────────────────────────

type TopicTab = 'todos' | 'populares' | 'sem-resposta';

const TopicsView: React.FC<{
  category: ForumCategory;
  onSelectTopic: (topic: ForumTopic) => void;
  onNewTopic: () => void;
  onBack: () => void;
}> = ({ category, onSelectTopic, onNewTopic, onBack }) => {
  const { user } = useAuth();
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TopicTab>('todos');
  const isAdmin = user?.email === ADMIN_EMAIL;
  const canPost = isAdmin || !ADMIN_ONLY_CATEGORIES.includes(category.name);

  useEffect(() => {
    setLoading(true);
    getTopicsByCategory(category.id)
      .then((t) => setTopics(t))
      .catch(() => setTopics([]))
      .finally(() => setLoading(false));
  }, [category.id]);

  const filteredTopics = topics.filter((t) => {
    if (tab === 'populares') return t.likes.length > 0 || t.repliesCount > 2;
    if (tab === 'sem-resposta') return t.repliesCount === 0;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white transition-colors"
        >
          Fórum
        </button>
        <ChevronRight size={14} className="text-slate-600" />
        <span className="text-white font-semibold">
          {category.icon} {category.name}
        </span>
      </div>

      {/* Title + New Topic */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">{category.name}</h2>
          <p className="text-slate-400 text-sm mt-0.5">{category.description}</p>
        </div>
        {canPost && (
          <button
            onClick={onNewTopic}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all active:scale-95"
          >
            <PlusCircle size={16} />
            <span className="hidden sm:inline">Novo tópico</span>
            <span className="sm:hidden">Novo</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4 border-b border-slate-700">
        {([
          { key: 'todos', label: 'Todos' },
          { key: 'populares', label: 'Populares' },
          { key: 'sem-resposta', label: 'Sem resposta' },
        ] as { key: TopicTab; label: string }[]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              tab === key
                ? 'border-green-500 text-green-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Topic list */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={24} className="animate-spin text-green-500" />
        </div>
      ) : filteredTopics.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare size={40} className="text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 font-medium">
            {tab === 'sem-resposta' ? 'Todos os tópicos têm resposta!' :
             tab === 'populares' ? 'Nenhum tópico popular ainda.' :
             'Seja o primeiro a criar um tópico!'}
          </p>
          {tab === 'todos' && canPost && (
            <button
              onClick={onNewTopic}
              className="mt-4 text-sm text-green-500 hover:text-green-400 font-semibold transition-colors"
            >
              Criar primeiro tópico →
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-slate-700/50">
          {filteredTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic)}
              className="w-full text-left py-4 hover:bg-slate-800/50 rounded-xl px-3 -mx-3 transition-colors group"
            >
              <div className="flex items-start gap-3">
                {/* Stats column */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0 w-14 pt-1">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-slate-300">{topic.repliesCount}</span>
                    <span className="text-[10px] text-slate-500">respostas</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-slate-400">{topic.likes.length}</span>
                    <span className="text-[10px] text-slate-500">curtidas</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    {topic.pinned && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                        <Pin size={9} /> Fixado
                      </span>
                    )}
                    <StatusBadge topic={topic} />
                  </div>
                  <h3 className="font-semibold text-slate-100 group-hover:text-green-400 transition-colors mt-1 leading-snug">
                    {topic.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Avatar name={topic.authorName} photo={topic.authorPhoto} size={20} />
                      <span className="text-xs text-slate-400">{topic.authorName}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock size={11} />
                      {formatDate(topic.updatedAt)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Eye size={11} />
                      {topic.views}
                    </span>
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
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTopic(topicId).then(setTopic);
    incrementTopicViews(topicId);
  }, [topicId]);

  useEffect(() => {
    const unsub = subscribeToReplies(topicId, setReplies);
    return unsub;
  }, [topicId]);

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
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTopicLike = async () => {
    if (!user || !topic) return;
    const liked = topic.likes.includes(user.uid);
    await toggleTopicLike(topicId, user.uid, liked);
    setTopic((prev) =>
      prev
        ? {
            ...prev,
            likes: liked
              ? prev.likes.filter((id) => id !== user.uid)
              : [...prev.likes, user.uid],
          }
        : null
    );
  };

  const handleReplyLike = async (reply: ForumReply) => {
    if (!user) return;
    const liked = reply.likes.includes(user.uid);
    await toggleReplyLike(reply.id, user.uid, liked);
    setReplies((prev) =>
      prev.map((r) =>
        r.id === reply.id
          ? {
              ...r,
              likes: liked
                ? r.likes.filter((id) => id !== user.uid)
                : [...r.likes, user.uid],
            }
          : r
      )
    );
  };

  const handleMarkSolution = async (reply: ForumReply) => {
    if (!user || !topic || user.uid !== topic.authorUid) return;
    await markReplyAsSolution(reply.id, topicId, !reply.isSolution);
    setReplies((prev) =>
      prev.map((r) => ({ ...r, isSolution: r.id === reply.id ? !reply.isSolution : false }))
    );
    setTopic((prev) => (prev ? { ...prev, solved: !reply.isSolution } : null));
  };

  const handleDeleteTopic = async () => {
    if (!window.confirm('Excluir este tópico e todas as suas respostas? Esta ação é irreversível.')) return;
    await deleteTopic(topicId, categoryId);
    onBack();
  };

  const handleDeleteReply = async (replyId: string) => {
    if (!window.confirm('Excluir esta resposta?')) return;
    await deleteReply(replyId, topicId, categoryId);
    setReplies((prev) => prev.filter((r) => r.id !== replyId));
    setTopic((prev) => prev ? { ...prev, repliesCount: Math.max(0, prev.repliesCount - 1) } : null);
  };

  if (!topic) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-green-500" />
      </div>
    );
  }

  const isAuthor = user?.uid === topic.authorUid;
  const isAdmin = user?.email === ADMIN_EMAIL;
  const topicLiked = user ? topic.likes.includes(user.uid) : false;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button onClick={onBackToForum} className="text-slate-400 hover:text-white transition-colors">
          Fórum
        </button>
        <ChevronRight size={14} className="text-slate-600" />
        <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors truncate max-w-[120px]">
          Categoria
        </button>
        <ChevronRight size={14} className="text-slate-600" />
        <span className="text-white font-semibold truncate max-w-[200px]">{topic.title}</span>
      </div>

      {/* Topic card */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-700">
          <div className="flex items-start gap-2 flex-wrap mb-2">
            {topic.pinned && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                <Pin size={9} /> Fixado
              </span>
            )}
            <StatusBadge topic={topic} />
          </div>
          <h1 className="text-xl font-bold text-white leading-snug">{topic.title}</h1>
          <div className="flex items-center gap-4 mt-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Avatar name={topic.authorName} photo={topic.authorPhoto} size={28} />
              <span className="text-sm font-medium text-slate-300">{topic.authorName}</span>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock size={12} />
              {formatDate(topic.createdAt)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <Eye size={12} />
              {topic.views} visualizações
            </span>
          </div>
        </div>

        <div className="px-6 py-5">
          <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{topic.content}</p>
        </div>

        <div className="px-6 py-4 border-t border-slate-700 flex items-center gap-3">
          <button
            onClick={handleTopicLike}
            className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
              topicLiked
                ? 'text-red-400 bg-red-400/10 hover:bg-red-400/20'
                : 'text-slate-400 hover:text-red-400 hover:bg-red-400/10'
            }`}
          >
            <Heart size={15} className={topicLiked ? 'fill-current' : ''} />
            {topic.likes.length}
          </button>
          <span className="flex items-center gap-2 text-sm text-slate-500">
            <MessageSquare size={15} />
            {replies.length} {replies.length === 1 ? 'resposta' : 'respostas'}
          </span>
          {isAdmin && (
            <button
              onClick={handleDeleteTopic}
              className="ml-auto flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
            >
              <Trash2 size={13} />
              Excluir tópico
            </button>
          )}
        </div>
      </div>

      {/* Replies */}
      {replies.map((reply) => {
        const replyLiked = user ? reply.likes.includes(user.uid) : false;
        return (
          <div
            key={reply.id}
            className={`bg-slate-800 border rounded-2xl overflow-hidden ${
              reply.isSolution ? 'border-green-600' : 'border-slate-700'
            }`}
          >
            {reply.isSolution && (
              <div className="px-5 py-2 bg-green-900/30 border-b border-green-700/40 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-green-400" />
                <span className="text-xs font-bold text-green-400 uppercase tracking-wide">Melhor Resposta</span>
              </div>
            )}
            <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Avatar name={reply.authorName} photo={reply.authorPhoto} size={28} />
                <span className="text-sm font-medium text-slate-300">{reply.authorName}</span>
                <span className="text-xs text-slate-500">{formatDate(reply.createdAt)}</span>
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{reply.content}</p>
            </div>
            <div className="px-5 py-3 border-t border-slate-700 flex items-center gap-3">
              <button
                onClick={() => handleReplyLike(reply)}
                className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
                  replyLiked
                    ? 'text-red-400 bg-red-400/10 hover:bg-red-400/20'
                    : 'text-slate-400 hover:text-red-400 hover:bg-red-400/10'
                }`}
              >
                <Heart size={13} className={replyLiked ? 'fill-current' : ''} />
                {reply.likes.length}
              </button>
              {isAuthor && (
                <button
                  onClick={() => handleMarkSolution(reply)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    reply.isSolution
                      ? 'text-green-400 bg-green-400/10 hover:bg-green-400/20'
                      : 'text-slate-400 hover:text-green-400 hover:bg-green-400/10'
                  }`}
                >
                  <CheckCircle2 size={13} />
                  {reply.isSolution ? 'Desmarcar solução' : 'Marcar como solução'}
                </button>
              )}
              {isAdmin && (
                <button
                  onClick={() => handleDeleteReply(reply.id)}
                  className="ml-auto flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <Trash2 size={13} />
                  Excluir
                </button>
              )}
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />

      {/* Reply Box */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700 bg-slate-800/80">
          <MessageSquare size={13} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Sua Resposta</span>
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
                className="w-full text-sm text-slate-200 placeholder-slate-500 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all leading-relaxed"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-500">{replyText.length} caracteres</span>
                <button
                  onClick={handleSubmitReply}
                  disabled={!replyText.trim() || submitting}
                  className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
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
    } catch {
      setError('Erro ao criar tópico. Tente novamente.');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft size={14} /> Voltar
        </button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700 bg-slate-800 flex items-center gap-3">
          <span className="text-xl">{category.icon}</span>
          <div>
            <h2 className="font-bold text-white">Novo tópico</h2>
            <p className="text-xs text-slate-400">em {category.name}</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">
              Título *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Descreva brevemente o assunto..."
              maxLength={200}
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all"
            />
            <p className="text-[11px] text-slate-500 mt-1 text-right">{title.length}/200</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">
              Conteúdo *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Detalhe sua dúvida, ideia ou comentário. Quanto mais contexto, melhor!"
              rows={8}
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all leading-relaxed"
            />
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-xl px-4 py-3 flex items-center gap-2">
              <AlertCircle size={14} className="text-red-400" />
              <span className="text-xs text-red-400">{error}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 text-sm font-semibold text-slate-400 hover:text-white border border-slate-600 rounded-xl hover:bg-slate-700 transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={!title.trim() || !content.trim() || submitting}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
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

  const goToCourses = () => {
    window.location.assign(window.location.pathname + '#alunos');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Top Nav */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          {/* Back to courses button */}
          <button
            onClick={goToCourses}
            className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-slate-800"
            title="Voltar à área de cursos"
          >
            <BookOpen size={16} />
            <span className="hidden sm:block text-xs font-medium">Área de Cursos</span>
          </button>
          <span className="text-slate-700">/</span>
          <button
            onClick={() => setView({ type: 'categories' })}
            className="text-xs font-bold text-green-500 hover:text-green-400 transition-colors"
          >
            💬 Fórum
          </button>
          {view.type === 'topics' && (
            <>
              <span className="text-slate-700 hidden sm:block">/</span>
              <span className="text-xs text-slate-400 font-semibold hidden sm:block truncate max-w-[180px]">
                {view.category.icon} {view.category.name}
              </span>
            </>
          )}
          {(view.type === 'topic' || view.type === 'new-topic') && (
            <>
              <span className="text-slate-700 hidden sm:block">/</span>
              <span className="text-xs text-slate-400 font-semibold hidden sm:block truncate max-w-[200px]">
                {view.category?.icon} {view.category?.name}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col leading-tight text-right">
            <span className="text-xs font-medium text-slate-300">{user.name}</span>
            <span className="text-[10px] text-slate-500">{user.email}</span>
          </div>
          {user.photoURL && (
            <img src={user.photoURL} alt={user.name} className="w-8 h-8 rounded-full ring-2 ring-green-700/40" />
          )}
          <button
            onClick={signOut}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-slate-800"
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
            onBack={goToCourses}
          />
        )}

        {view.type === 'topics' && (
          <TopicsView
            category={view.category}
            onSelectTopic={(topic) =>
              setView({ type: 'topic', topicId: topic.id, categoryId: topic.categoryId, category: view.category })
            }
            onNewTopic={() => setView({ type: 'new-topic', category: view.category })}
            onBack={() => setView({ type: 'categories' })}
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
            onBackToForum={() => setView({ type: 'categories' })}
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
