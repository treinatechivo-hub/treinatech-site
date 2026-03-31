import React from 'react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { LoginPage } from '../../pages/LoginPage';
import { MemberDashboard } from '../../pages/MemberDashboard';
import { AdminDashboard } from '../../pages/AdminDashboard';
import { Loader2 } from 'lucide-react';

// ─── Error Boundary ───────────────────────────────────────────────────────────

interface ErrorBoundaryState { error: Error | null }

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow border border-red-100 p-8 max-w-md w-full text-center">
            <p className="text-red-500 font-bold text-lg mb-2">Erro ao carregar</p>
            <p className="text-slate-500 text-sm mb-4">{this.state.error.message}</p>
            <button
              onClick={() => { window.location.hash = ''; }}
              className="px-5 py-2.5 bg-green-700 text-white rounded-xl text-sm font-semibold hover:bg-green-800"
            >
              Voltar ao site
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Auth Gate ────────────────────────────────────────────────────────────────

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

// ─── Export ───────────────────────────────────────────────────────────────────

export const MembersArea: React.FC = () => (
  <ErrorBoundary>
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  </ErrorBoundary>
);
