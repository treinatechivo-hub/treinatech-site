import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MEMBER_COURSES, CourseData, Lesson } from '../data/memberCourses';
import {
  LogOut, PlayCircle, FileText, ChevronDown, ChevronRight,
  CheckCircle2, Lock, Download, BookOpen, Award, Clock,
} from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Builds the iframe src based on the video provider */
function buildVideoSrc(lesson: Lesson): string {
  switch (lesson.provider) {
    case 'youtube':
      return `https://www.youtube.com/embed/${lesson.videoId}?rel=0&modestbranding=1`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${lesson.videoId}?title=0&byline=0`;
    case 'hotmart':
      return lesson.videoId; // already a full URL
    case 'direct':
      return lesson.videoId;
    default:
      return '';
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const VideoPlayer: React.FC<{ lesson: Lesson | null }> = ({ lesson }) => {
  if (!lesson) {
    return (
      <div className="aspect-video bg-slate-900 rounded-2xl flex flex-col items-center justify-center gap-4">
        <PlayCircle size={56} className="text-white/20" />
        <p className="text-white/40 text-sm font-medium">Selecione uma aula para começar</p>
      </div>
    );
  }

  if (lesson.provider === 'direct') {
    return (
      <div className="aspect-video bg-black rounded-2xl overflow-hidden">
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
    <div className="aspect-video bg-black rounded-2xl overflow-hidden">
      <iframe
        src={buildVideoSrc(lesson)}
        title={lesson.title}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

const ProgressRing: React.FC<{ percent: number; size?: number; stroke?: number; color?: string }> = ({
  percent, size = 48, stroke = 4, color = '#008837',
}) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
    </svg>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export const MemberDashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  // Filter only enrolled courses
  const enrolledCourses = useMemo(
    () => MEMBER_COURSES.filter((c) => user?.enrolledCourses.includes(c.id)),
    [user]
  );

  const [activeCourse, setActiveCourse] = useState<CourseData>(enrolledCourses[0]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<'aulas' | 'materiais'>('aulas');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set([activeCourse?.modules[0]?.id])
  );
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(['ex-1-1', 'ex-1-2', 'pbi-1-1']) // demo: some completed
  );

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const markComplete = (lessonId: string) => {
    setCompletedLessons((prev) => new Set([...prev, lessonId]));
  };

  const selectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setActiveTab('aulas');
  };

  const switchCourse = (course: CourseData) => {
    setActiveCourse(course);
    setActiveLesson(null);
    setExpandedModules(new Set([course.modules[0]?.id]));
  };

  // Progress for current course
  const totalLessons = activeCourse.modules.flatMap((m) => m.lessons).length;
  const completedInCourse = activeCourse.modules
    .flatMap((m) => m.lessons)
    .filter((l) => completedLessons.has(l.id)).length;
  const progressPct = Math.round((completedInCourse / totalLessons) * 100);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* ── Top nav ── */}
      <header className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Logo inline */}
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="#1a5c35"/>
            <rect x="8" y="10" width="24" height="20" rx="2.5" stroke="white" strokeWidth="1.8" fill="none"/>
            <line x1="8" y1="16.5" x2="32" y2="16.5" stroke="white" strokeWidth="1.8"/>
            <line x1="20" y1="10" x2="20" y2="30" stroke="white" strokeWidth="1.8"/>
            <rect x="9.5" y="11.5" width="9" height="3.5" rx="1" fill="white" fillOpacity="0.95"/>
          </svg>
          <span className="text-[#1a5c35] font-bold text-lg lowercase hidden sm:block">treinatech</span>
          <span className="text-slate-300 hidden sm:block">|</span>
          <span className="text-slate-500 text-sm hidden sm:block">Área do Aluno</span>
        </div>

        {/* Course switcher */}
        <div className="flex items-center gap-2">
          {enrolledCourses.map((c) => (
            <button
              key={c.id}
              onClick={() => switchCourse(c)}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCourse.id === c.id
                  ? 'bg-green-100 text-green-800'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <span>{c.icon}</span> {c.title}
            </button>
          ))}
        </div>

        {/* User menu */}
        <div className="flex items-center gap-3">
          {user.photoURL && (
            <img src={user.photoURL} alt={user.name} className="w-8 h-8 rounded-full ring-2 ring-green-100" />
          )}
          <span className="text-sm font-medium text-slate-700 hidden sm:block">{user.name.split(' ')[0]}</span>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-500 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50"
          >
            <LogOut size={14} /> Sair
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <aside className="w-72 xl:w-80 bg-white border-r border-slate-100 flex flex-col overflow-hidden hidden md:flex">

          {/* Course header */}
          <div className="p-5 border-b border-slate-100">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">{activeCourse.icon}</span>
              <div>
                <h2 className="font-bold text-slate-900 text-sm leading-tight">{activeCourse.title}</h2>
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
              <div>
                <div className="text-xs font-semibold text-slate-700">
                  {completedInCourse} de {totalLessons} aulas concluídas
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1.5">
                  <div
                    className="h-full bg-green-600 rounded-full transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

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
                {tab === 'aulas' ? (
                  <span className="flex items-center justify-center gap-1.5"><PlayCircle size={13} /> Aulas</span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5"><FileText size={13} /> Materiais</span>
                )}
              </button>
            ))}
          </div>

          {/* Content list */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'aulas' ? (
              <div className="py-2">
                {activeCourse.modules.map((mod) => {
                  const isExpanded = expandedModules.has(mod.id);
                  const modCompleted = mod.lessons.filter((l) => completedLessons.has(l.id)).length;
                  return (
                    <div key={mod.id}>
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-700">{mod.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {modCompleted}/{mod.lessons.length} aulas
                          </p>
                        </div>
                        {isExpanded ? (
                          <ChevronDown size={14} className="text-slate-400 flex-shrink-0" />
                        ) : (
                          <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="border-l-2 border-slate-100 ml-4">
                          {mod.lessons.map((lesson) => {
                            const done = completedLessons.has(lesson.id);
                            const isActive = activeLesson?.id === lesson.id;
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => selectLesson(lesson)}
                                className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-all ${
                                  isActive
                                    ? 'bg-green-50 border-r-2 border-green-600'
                                    : 'hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex-shrink-0 mt-0.5">
                                  {done ? (
                                    <CheckCircle2 size={16} className="text-green-600" />
                                  ) : (
                                    <div className={`w-4 h-4 rounded-full border-2 ${isActive ? 'border-green-500' : 'border-slate-300'}`} />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-xs font-medium leading-tight truncate ${isActive ? 'text-green-800' : 'text-slate-700'}`}>
                                    {lesson.title}
                                  </p>
                                  <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                                    <Clock size={9} /> {lesson.duration}
                                    {lesson.free && <span className="ml-1 text-green-600 font-semibold">Preview</span>}
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
              /* PDFs Tab */
              <div className="p-4 space-y-3">
                {activeCourse.pdfs.map((pdf, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:border-green-200 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText size={18} className="text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 leading-tight">{pdf.title}</p>
                        <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{pdf.description}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{pdf.sizeMB} MB</p>
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

        {/* ── Main content ── */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">

          {/* Video area */}
          <div className="max-w-4xl">
            <VideoPlayer lesson={activeLesson} />

            {activeLesson && (
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">{activeLesson.title}</h1>
                  <p className="text-sm text-slate-400 mt-1 flex items-center gap-1.5">
                    <Clock size={13} /> {activeLesson.duration}
                    <span className="mx-1">·</span>
                    <BookOpen size={13} /> {activeCourse.title}
                  </p>
                </div>

                {!completedLessons.has(activeLesson.id) && (
                  <button
                    onClick={() => markComplete(activeLesson.id)}
                    className="flex-shrink-0 flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all active:scale-95"
                  >
                    <CheckCircle2 size={15} />
                    Marcar como concluída
                  </button>
                )}
                {completedLessons.has(activeLesson.id) && (
                  <div className="flex items-center gap-2 text-green-700 text-sm font-semibold bg-green-50 px-4 py-2.5 rounded-xl border border-green-200">
                    <CheckCircle2 size={15} />
                    Concluída
                  </div>
                )}
              </div>
            )}

            {/* Welcome card (when no lesson selected) */}
            {!activeLesson && (
              <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-8">
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

                <p className="text-slate-600 text-sm leading-relaxed mb-4">{activeCourse.description}</p>
                <button
                  onClick={() => {
                    const firstLesson = activeCourse.modules[0]?.lessons[0];
                    if (firstLesson) selectLesson(firstLesson);
                  }}
                  className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl transition-all active:scale-95"
                >
                  <PlayCircle size={18} />
                  Começar primeira aula
                </button>
              </div>
            )}

            {/* Mobile: course switcher */}
            <div className="mt-6 flex md:hidden gap-2 flex-wrap">
              {enrolledCourses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => switchCourse(c)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeCourse.id === c.id ? 'bg-green-100 text-green-800' : 'bg-white text-slate-600 border border-slate-200'
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
