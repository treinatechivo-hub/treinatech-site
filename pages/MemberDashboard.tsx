import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MEMBER_COURSES, CourseData, Lesson } from '../data/memberCourses';
import {
  LogOut, PlayCircle, FileText, ChevronDown, ChevronRight,
  CheckCircle2, Download, BookOpen, Award, Clock, PenLine, Save,
  ChevronLeft, SkipForward, Heart, Star, ToggleLeft, ToggleRight,
  Home,
} from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildVideoSrc(lesson: Lesson): string {
  switch (lesson.provider) {
    case 'youtube':
      return `https://www.youtube.com/embed/${lesson.videoId}?rel=0&modestbranding=1&color=white`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${lesson.videoId}?title=0&byline=0&portrait=0&color=008837`;
    case 'hotmart':
      return lesson.videoId;
    case 'direct':
      return lesson.videoId;
    case 'onedrive':
      return lesson.videoId.includes('action=embedview')
        ? lesson.videoId
        : `${lesson.videoId}&action=embedview`;
    default:
      return '';
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const VideoPlayer: React.FC<{ lesson: Lesson | null }> = ({ lesson }) => {
  if (!lesson) {
    return (
      <div className="w-full aspect-video bg-slate-900 flex flex-col items-center justify-center gap-4">
        <PlayCircle size={56} className="text-white/20" />
        <p className="text-white/40 text-sm font-medium">Selecione uma aula para começar</p>
      </div>
    );
  }

  if (lesson.provider === 'direct') {
    return (
      <div className="w-full aspect-video bg-black">
        <video
          src={lesson.videoId}
          controls
          className="w-full h-full"
          title={lesson.title}
        />
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black">
      <iframe
        key={lesson.id}
        src={buildVideoSrc(lesson)}
        title={lesson.title}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    </div>
  );
};

const ProgressRing: React.FC<{ percent: number; size?: number; stroke?: number }> = ({
  percent, size = 48, stroke = 4,
}) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#008837" strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
    </svg>
  );
};

const StarRating: React.FC<{ lessonId: string }> = ({ lessonId }) => {
  const [rating, setRating] = useState<number>(() => {
    try { return Number(localStorage.getItem(`rating_${lessonId}`)) || 0; } catch { return 0; }
  });
  const [hover, setHover] = useState(0);

  const handleRate = (val: number) => {
    setRating(val);
    try { localStorage.setItem(`rating_${lessonId}`, String(val)); } catch {}
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRate(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={18}
            className={`transition-colors ${
              star <= (hover || rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
            }`}
          />
        </button>
      ))}
      {rating > 0 && <span className="text-xs text-slate-400 ml-1">Avaliado</span>}
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export const MemberDashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  const enrolledCourses = useMemo(
    () => MEMBER_COURSES.filter((c) => user?.enrolledCourses.includes(c.id)),
    [user]
  );

  const [activeCourse, setActiveCourse]     = useState<CourseData | undefined>(enrolledCourses[0]);
  const [activeLesson, setActiveLesson]     = useState<Lesson | null>(null);
  const [activeTab, setActiveTab]           = useState<'aulas' | 'materiais'>('aulas');
  const [autoplay, setAutoplay]             = useState(false);
  const [sidebarOpen, setSidebarOpen]       = useState(true);
  const [favorites, setFavorites]           = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem('treinatech_favs') || '[]')); } catch { return new Set(); }
  });
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set([enrolledCourses[0]?.modules?.[0]?.id])
  );
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(['ex-1-1', 'ex-1-2', 'pbi-1-1'])
  );
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try { return JSON.parse(localStorage.getItem('treinatech_notes') || '{}'); } catch { return {}; }
  });
  const [noteSaved, setNoteSaved] = useState(false);

  // Persist notes
  useEffect(() => {
    try { localStorage.setItem('treinatech_notes', JSON.stringify(notes)); } catch {}
  }, [notes]);

  // Persist favorites
  useEffect(() => {
    try { localStorage.setItem('treinatech_favs', JSON.stringify([...favorites])); } catch {}
  }, [favorites]);

  const handleNoteChange = useCallback((lessonId: string, value: string) => {
    setNotes((prev) => ({ ...prev, [lessonId]: value }));
    setNoteSaved(false);
  }, []);

  const saveNote = useCallback(() => {
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  }, []);

  const toggleFavorite = (lessonId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(lessonId) ? next.delete(lessonId) : next.add(lessonId);
      return next;
    });
  };

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Flat list of all lessons in active course
  const allLessons = useMemo(
    () => activeCourse?.modules.flatMap((m) => m.lessons) ?? [],
    [activeCourse]
  );

  const currentLessonIndex = activeLesson
    ? allLessons.findIndex((l) => l.id === activeLesson.id)
    : -1;

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex >= 0 && currentLessonIndex < allLessons.length - 1
    ? allLessons[currentLessonIndex + 1]
    : null;

  // Find which module a lesson belongs to
  const activeLessonModule = useMemo(() => {
    if (!activeLesson || !activeCourse) return null;
    return activeCourse.modules.find((m) => m.lessons.some((l) => l.id === activeLesson.id)) ?? null;
  }, [activeLesson, activeCourse]);

  const markComplete = (lessonId: string) => {
    setCompletedLessons((prev) => new Set([...prev, lessonId]));
    if (autoplay && nextLesson) {
      setTimeout(() => selectLesson(nextLesson), 400);
    }
  };

  const selectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setActiveTab('aulas');
    // Auto-expand module containing this lesson
    const mod = activeCourse?.modules.find((m) => m.lessons.some((l) => l.id === lesson.id));
    if (mod) setExpandedModules((prev) => new Set([...prev, mod.id]));
  };

  const switchCourse = (course: CourseData) => {
    setActiveCourse(course);
    setActiveLesson(null);
    setExpandedModules(new Set([course.modules[0]?.id]));
  };

  // Progress
  const totalLessons       = allLessons.length;
  const completedInCourse  = allLessons.filter((l) => completedLessons.has(l.id)).length;
  const progressPct        = totalLessons > 0 ? Math.round((completedInCourse / totalLessons) * 100) : 0;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* ── Top Nav ── */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">

        {/* Left: logo + breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => { window.location.hash = ''; }}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors flex-shrink-0"
          >
            <Home size={16} />
            <span className="hidden sm:block text-xs font-medium">Site</span>
          </button>
          <span className="text-slate-300 hidden sm:block">/</span>
          <span className="text-xs text-slate-500 font-medium hidden sm:block truncate max-w-[120px]">
            {activeCourse?.title}
          </span>
          {activeLesson && activeLessonModule && (
            <>
              <span className="text-slate-300 hidden md:block">/</span>
              <span className="text-xs text-slate-400 hidden md:block truncate max-w-[100px]">
                {activeLessonModule.title.replace(/Módulo \d+ — /, '')}
              </span>
              <span className="text-slate-300 hidden lg:block">/</span>
              <span className="text-xs font-semibold text-green-700 hidden lg:block truncate max-w-[180px]">
                {activeLesson.title}
              </span>
            </>
          )}
        </div>

        {/* Center: course switcher */}
        <div className="flex items-center gap-2 mx-2">
          {enrolledCourses.map((c) => (
            <button
              key={c.id}
              onClick={() => switchCourse(c)}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCourse?.id === c.id
                  ? 'bg-green-100 text-green-800'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <span>{c.icon}</span>
              <span className="max-w-[140px] truncate">{c.title}</span>
            </button>
          ))}
        </div>

        {/* Right: autoplay + user */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Autoplay toggle */}
          <button
            onClick={() => setAutoplay((v) => !v)}
            className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-lg transition-colors ${
              autoplay ? 'text-green-700 bg-green-50' : 'text-slate-400 hover:text-slate-600'
            }`}
            title="Avançar automaticamente para a próxima aula"
          >
            {autoplay ? <ToggleRight size={18} className="text-green-600" /> : <ToggleLeft size={18} />}
            Autoplay
          </button>

          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-slate-100"
            title="Mostrar/ocultar lista de aulas"
          >
            <BookOpen size={16} />
          </button>

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

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        {sidebarOpen && (
          <aside className="w-72 xl:w-80 bg-white border-r border-slate-200 flex flex-col overflow-hidden flex-shrink-0">

            {/* Course header */}
            {activeCourse && (
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{activeCourse.icon}</span>
                  <div className="min-w-0">
                    <h2 className="font-bold text-slate-900 text-sm leading-tight truncate">{activeCourse.title}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">{activeCourse.totalHours} · {activeCourse.totalLessons} aulas</p>
                  </div>
                </div>
                {/* Progress */}
                <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                  <div className="relative flex-shrink-0">
                    <ProgressRing percent={progressPct} />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-green-700">
                      {progressPct}%
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-700">
                      {completedInCourse} de {totalLessons} aulas
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1.5">
                      <div className="h-full bg-green-600 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="flex border-b border-slate-100">
              {(['aulas', 'materiais'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wide transition-colors ${
                    activeTab === tab
                      ? 'text-green-700 border-b-2 border-green-600'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab === 'aulas'
                    ? <span className="flex items-center justify-center gap-1.5"><PlayCircle size={13} /> Aulas</span>
                    : <span className="flex items-center justify-center gap-1.5"><FileText size={13} /> Materiais</span>}
                </button>
              ))}
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'aulas' ? (
                <div className="py-2">
                  {activeCourse?.modules.map((mod) => {
                    const isExpanded   = expandedModules.has(mod.id);
                    const modCompleted = mod.lessons.filter((l) => completedLessons.has(l.id)).length;
                    const isActiveModule = mod.lessons.some((l) => l.id === activeLesson?.id);
                    return (
                      <div key={mod.id}>
                        <button
                          onClick={() => toggleModule(mod.id)}
                          className={`w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors text-left ${isActiveModule ? 'bg-green-50/50' : ''}`}
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-700">{mod.title}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{modCompleted}/{mod.lessons.length} aulas</p>
                          </div>
                          {isExpanded
                            ? <ChevronDown size={14} className="text-slate-400 flex-shrink-0" />
                            : <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />}
                        </button>

                        {isExpanded && (
                          <div className="border-l-2 border-slate-100 ml-4">
                            {mod.lessons.map((lesson) => {
                              const done     = completedLessons.has(lesson.id);
                              const isActive = activeLesson?.id === lesson.id;
                              const isFav    = favorites.has(lesson.id);
                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => selectLesson(lesson)}
                                  className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-all group ${
                                    isActive ? 'bg-green-50 border-r-2 border-green-600' : 'hover:bg-slate-50'
                                  }`}
                                >
                                  <div className="flex-shrink-0 mt-0.5">
                                    {done
                                      ? <CheckCircle2 size={15} className="text-green-600" />
                                      : <div className={`w-4 h-4 rounded-full border-2 ${isActive ? 'border-green-500' : 'border-slate-300'}`} />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-xs font-medium leading-tight ${isActive ? 'text-green-800' : 'text-slate-700'}`}>
                                      {lesson.title}
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                                      <Clock size={9} /> {lesson.duration}
                                      {lesson.free && <span className="text-green-600 font-semibold">Preview</span>}
                                      {isFav && <Heart size={9} className="text-red-400 fill-red-400" />}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {activeCourse?.pdfs.map((pdf, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:border-green-200 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FileText size={16} className="text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 leading-tight">{pdf.title}</p>
                          <p className="text-[10px] text-slate-500 mt-1">{pdf.description}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{pdf.sizeMB} MB</p>
                        </div>
                      </div>
                      <a
                        href={pdf.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 w-full flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:border-green-300 hover:bg-green-50 text-xs font-semibold text-slate-700 hover:text-green-700 py-2 rounded-xl transition-all"
                      >
                        <Download size={12} /> Baixar PDF
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        )}

        {/* ── Main content (full width) ── */}
        <main className="flex-1 overflow-y-auto flex flex-col min-w-0">

          {/* ── Video player (full width, no constraints) ── */}
          <div className="w-full bg-black">
            <VideoPlayer lesson={activeLesson} />
          </div>

          {/* ── Below video ── */}
          <div className="flex-1 p-4 lg:p-6 space-y-4">

            {/* Lesson title row + actions */}
            {activeLesson && (
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                {/* Title + meta */}
                <div className="min-w-0">
                  <h1 className="text-lg font-bold text-slate-900 leading-tight">{activeLesson.title}</h1>
                  <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
                    <Clock size={12} /> {activeLesson.duration}
                    <span className="text-slate-300">·</span>
                    <BookOpen size={12} /> {activeCourse?.title}
                    {activeLesson.free && (
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        Preview
                      </span>
                    )}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Favorite */}
                  <button
                    onClick={() => toggleFavorite(activeLesson.id)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-all ${
                      favorites.has(activeLesson.id)
                        ? 'bg-red-50 border-red-200 text-red-500'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-400'
                    }`}
                  >
                    <Heart size={13} className={favorites.has(activeLesson.id) ? 'fill-red-400' : ''} />
                    {favorites.has(activeLesson.id) ? 'Favorita' : 'Favoritar'}
                  </button>

                  {/* Mark complete */}
                  {!completedLessons.has(activeLesson.id) ? (
                    <button
                      onClick={() => markComplete(activeLesson.id)}
                      className="flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all active:scale-95"
                    >
                      <CheckCircle2 size={13} />
                      Marcar como concluída
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-green-700 text-xs font-semibold bg-green-50 px-4 py-2 rounded-xl border border-green-200">
                      <CheckCircle2 size={13} />
                      Concluída
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Prev / Next navigation ── */}
            {activeLesson && (
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => prevLesson && selectLesson(prevLesson)}
                  disabled={!prevLesson}
                  className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-green-300 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={14} />
                  <span className="hidden sm:block">Aula anterior</span>
                </button>

                {/* Lesson counter */}
                <span className="text-xs text-slate-400 font-medium">
                  Aula {currentLessonIndex + 1} de {allLessons.length}
                </span>

                <button
                  onClick={() => nextLesson && selectLesson(nextLesson)}
                  disabled={!nextLesson}
                  className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-green-700 text-white hover:bg-green-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  <span className="hidden sm:block">Próxima aula</span>
                  <SkipForward size={14} />
                </button>
              </div>
            )}

            {/* ── Rating ── */}
            {activeLesson && (
              <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 py-3">
                <span className="text-xs font-semibold text-slate-600">Avalie esta aula:</span>
                <StarRating lessonId={activeLesson.id} />
              </div>
            )}

            {/* ── Notes ── */}
            {activeLesson && (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <PenLine size={13} className="text-slate-500" />
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Minhas Anotações</span>
                  </div>
                  <button
                    onClick={saveNote}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                      noteSaved ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600 hover:bg-green-50 hover:text-green-700'
                    }`}
                  >
                    <Save size={11} />
                    {noteSaved ? 'Salvo!' : 'Salvar'}
                  </button>
                </div>
                <textarea
                  value={notes[activeLesson.id] || ''}
                  onChange={(e) => handleNoteChange(activeLesson.id, e.target.value)}
                  placeholder="Escreva suas anotações sobre esta aula... Dicas, pontos importantes, dúvidas."
                  className="w-full h-32 px-4 py-3 text-sm text-slate-700 placeholder-slate-300 resize-none focus:outline-none leading-relaxed"
                />
                {notes[activeLesson.id] && (
                  <div className="px-4 py-2 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400">{notes[activeLesson.id].length} caracteres</span>
                    <button
                      onClick={() => handleNoteChange(activeLesson.id, '')}
                      className="text-[10px] text-slate-400 hover:text-red-400 transition-colors"
                    >
                      Limpar
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ── Welcome card (no lesson selected) ── */}
            {!activeLesson && activeCourse && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
                    {activeCourse.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{activeCourse.title}</h2>
                    <p className="text-slate-500 text-sm">{activeCourse.totalHours} · {activeCourse.totalLessons} aulas</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: <PlayCircle size={18} />, label: 'Aulas', value: `${activeCourse.totalLessons}` },
                    { icon: <Clock size={18} />, label: 'Carga horária', value: activeCourse.totalHours },
                    { icon: <Award size={18} />, label: 'Certificado', value: 'MCT' },
                  ].map((s) => (
                    <div key={s.label} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                      <div className="flex justify-center text-green-600 mb-2">{s.icon}</div>
                      <div className="font-bold text-slate-900 text-sm">{s.value}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">{activeCourse.description}</p>
                <button
                  onClick={() => {
                    const first = activeCourse.modules[0]?.lessons[0];
                    if (first) selectLesson(first);
                  }}
                  className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl transition-all active:scale-95"
                >
                  <PlayCircle size={18} />
                  Começar primeira aula
                </button>
              </div>
            )}

            {/* ── Mobile course switcher ── */}
            <div className="flex md:hidden gap-2 flex-wrap pt-2">
              {enrolledCourses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => switchCourse(c)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeCourse?.id === c.id ? 'bg-green-100 text-green-800' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {c.icon} {c.title}
                </button>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
