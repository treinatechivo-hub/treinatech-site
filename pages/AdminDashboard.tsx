import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  getAllStudents, addStudent, updateStudent, deleteStudent,
  StudentRecord,
} from '../services/firestore';
import {
  LogOut, Plus, Trash2, Edit3, Search, Users, BookOpen,
  CheckCircle2, X, Save, BarChart3, Shield, ChevronDown, Loader2,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

const ALL_COURSES = [
  { id: 'excel', label: 'Excel' },
  { id: 'powerbi', label: 'Power BI' },
  { id: 'sql', label: 'SQL' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const CourseTag: React.FC<{ courseId: string }> = ({ courseId }) => {
  const colors: Record<string, string> = {
    excel: 'bg-emerald-100 text-emerald-700',
    powerbi: 'bg-amber-100 text-amber-700',
    sql: 'bg-blue-100 text-blue-700',
  };
  const labels: Record<string, string> = { excel: 'Excel', powerbi: 'Power BI', sql: 'SQL' };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold ${colors[courseId] ?? 'bg-slate-100 text-slate-600'}`}>
      {labels[courseId] ?? courseId}
    </span>
  );
};

interface StudentModalProps {
  student?: StudentRecord | null;
  onSave: (s: Omit<StudentRecord, 'id'>) => void;
  onClose: () => void;
}

const StudentModal: React.FC<StudentModalProps> = ({ student, onSave, onClose }) => {
  const [name, setName] = useState(student?.name ?? '');
  const [email, setEmail] = useState(student?.email ?? '');
  const [courses, setCourses] = useState<string[]>(student?.enrolledCourses ?? []);
  const [active, setActive] = useState(student?.active ?? true);

  const toggleCourse = (id: string) => {
    setCourses((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
  };

  const handleSave = () => {
    if (!name.trim() || !email.trim()) return;
    onSave({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      enrolledCourses: courses,
      active,
      createdAt: student?.createdAt ?? new Date().toISOString().split('T')[0],
      uid: student?.uid,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            {student ? 'Editar Aluno' : 'Adicionar Aluno'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Nome completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: João da Silva"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aluno@email.com"
              disabled={!!student}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 disabled:bg-slate-50 disabled:text-slate-400"
            />
            {!student && (
              <p className="text-xs text-slate-400 mt-1">O aluno usará este e-mail para se cadastrar e acessar os cursos.</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Cursos liberados</label>
            <div className="flex gap-2 flex-wrap">
              {ALL_COURSES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleCourse(c.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                    courses.includes(c.id)
                      ? 'bg-green-600 border-green-600 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-green-300'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActive((v) => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors ${active ? 'bg-green-600' : 'bg-slate-200'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${active ? 'left-6' : 'left-1'}`} />
            </button>
            <span className="text-sm text-slate-600 font-medium">{active ? 'Acesso ativo' : 'Acesso suspenso'}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || !email.trim()}
            className="flex-1 py-2.5 rounded-xl bg-green-700 text-white text-sm font-semibold hover:bg-green-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={15} /> Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main AdminDashboard ──────────────────────────────────────────────────────

export const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [modal, setModal] = useState<{ open: boolean; student?: StudentRecord | null }>({ open: false });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAllStudents()
      .then((data) => setStudents(data))
      .catch((err) => console.error('Erro ao carregar alunos:', err))
      .finally(() => setLoadingData(false));
  }, []);

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchCourse = filterCourse === 'all' || s.enrolledCourses.includes(filterCourse);
    return matchSearch && matchCourse;
  });

  const stats = {
    total: students.length,
    active: students.filter((s) => s.active).length,
    byExcel: students.filter((s) => s.enrolledCourses.includes('excel')).length,
    byPBI: students.filter((s) => s.enrolledCourses.includes('powerbi')).length,
    bySQL: students.filter((s) => s.enrolledCourses.includes('sql')).length,
  };

  const handleSaveStudent = async (data: Omit<StudentRecord, 'id'>) => {
    setSaving(true);
    try {
      if (modal.student) {
        await updateStudent(modal.student.id, data);
        setStudents((prev) => prev.map((s) => s.id === modal.student!.id ? { ...s, ...data } : s));
      } else {
        const newStudent = await addStudent(data);
        setStudents((prev) => [newStudent, ...prev]);
      }
    } finally {
      setSaving(false);
      setModal({ open: false });
    }
  };

  const handleDelete = async (id: string) => {
    await deleteStudent(id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setDeleteId(null);
  };

  const handleToggleActive = async (student: StudentRecord) => {
    const updated = { ...student, active: !student.active };
    await updateStudent(student.id, { active: updated.active });
    setStudents((prev) => prev.map((s) => s.id === student.id ? updated : s));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="#1a5c35"/>
            <rect x="8" y="10" width="24" height="20" rx="2.5" stroke="white" strokeWidth="1.8" fill="none"/>
            <line x1="8" y1="16.5" x2="32" y2="16.5" stroke="white" strokeWidth="1.8"/>
            <line x1="20" y1="10" x2="20" y2="30" stroke="white" strokeWidth="1.8"/>
            <rect x="9.5" y="11.5" width="9" height="3.5" rx="1" fill="white" fillOpacity="0.95"/>
          </svg>
          <span className="text-[#1a5c35] font-bold text-lg lowercase hidden sm:block">treinatech</span>
          <span className="text-slate-300 hidden sm:block">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-500 text-sm">
            <Shield size={14} className="text-amber-500" />
            <span className="font-semibold text-amber-600">Painel Administrativo</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user.photoURL && (
            <img src={user.photoURL} alt={user.name} className="w-8 h-8 rounded-full ring-2 ring-amber-200" />
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { icon: <Users size={18} />, label: 'Total de Alunos', value: stats.total, color: 'bg-blue-50 text-blue-600' },
            { icon: <CheckCircle2 size={18} />, label: 'Ativos', value: stats.active, color: 'bg-green-50 text-green-600' },
            { icon: <BarChart3 size={18} />, label: 'Excel', value: stats.byExcel, color: 'bg-emerald-50 text-emerald-600' },
            { icon: <BarChart3 size={18} />, label: 'Power BI', value: stats.byPBI, color: 'bg-amber-50 text-amber-600' },
            { icon: <BookOpen size={18} />, label: 'SQL', value: stats.bySQL, color: 'bg-indigo-50 text-indigo-600' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                {s.icon}
              </div>
              <div className="text-2xl font-black text-slate-900">{s.value}</div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Tabela ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex gap-3 flex-1 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nome ou e-mail..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div className="relative">
                <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-green-500 bg-white"
                >
                  <option value="all">Todos os cursos</option>
                  {ALL_COURSES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <button
              onClick={() => setModal({ open: true, student: null })}
              className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors whitespace-nowrap"
            >
              <Plus size={16} /> Adicionar Aluno
            </button>
          </div>

          {loadingData ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={24} className="animate-spin text-green-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Aluno</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">E-mail</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Cursos</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Cadastro</th>
                    <th className="text-right px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-slate-400 text-sm">
                        Nenhum aluno encontrado.
                      </td>
                    </tr>
                  )}
                  {filtered.map((student) => (
                    <tr key={student.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs flex-shrink-0">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-slate-900 text-sm">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{student.email}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {student.enrolledCourses.length === 0
                            ? <span className="text-slate-300 text-xs">—</span>
                            : student.enrolledCourses.map((c) => <CourseTag key={c} courseId={c} />)
                          }
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleActive(student)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            student.active
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${student.active ? 'bg-green-500' : 'bg-slate-400'}`} />
                          {student.active ? 'Ativo' : 'Suspenso'}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{student.createdAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setModal({ open: true, student })}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Editar"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteId(student.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Excluir"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loadingData && filtered.length > 0 && (
            <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-400">
              Exibindo {filtered.length} de {students.length} alunos
            </div>
          )}
        </div>
      </div>

      {/* ── Modal ── */}
      {modal.open && (
        <StudentModal
          student={modal.student}
          onSave={handleSaveStudent}
          onClose={() => !saving && setModal({ open: false })}
        />
      )}

      {/* ── Confirmar exclusão ── */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">Excluir aluno?</h3>
            <p className="text-sm text-slate-500 mb-6">Esta ação é irreversível. O aluno perderá o acesso à plataforma.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
