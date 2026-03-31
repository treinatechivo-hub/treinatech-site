import React from 'react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { LoginPage } from '../../pages/LoginPage';
import { MemberDashboard } from '../../pages/MemberDashboard';
import { AdminDashboard } from '../../pages/AdminDashboard';
import { Loader2 } from 'lucide-react';

/**
 * Auth guard: mostra loading → login → dashboard conforme estado.
 * Admin (treinatechivo@gmail.com) é redirecionado para o painel admin.
 */
const AuthGate: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
            <Loader2 size={24} className="animate-spin text-green-700" />
          </div>
          <p className="text-sm text-slate-400 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) return <LoginPage />;
  if (user.isAdmin) return <AdminDashboard />;
  return <MemberDashboard />;
};

/**
 * MembersArea — componente raiz da área de membros.
 *
 * USO NO App.tsx:
 * ──────────────
 * import { MembersArea } from './components/members/MembersArea';
 *
 * Opção A — rota dedicada (com React Router):
 *   <Route path="/alunos" element={<MembersArea />} />
 *
 * Opção B — sem router (toggle por estado):
 *   const [showMembers, setShowMembers] = useState(false);
 *   return showMembers ? <MembersArea /> : <LandingPage />;
 *
 * Opção C — link direto no navbar:
 *   <a href="/alunos">Área do Aluno</a>
 *   (requer configuração de SPA no Vercel: vercel.json com rewrites)
 */
export const MembersArea: React.FC = () => (
  <AuthProvider>
    <AuthGate />
  </AuthProvider>
);
