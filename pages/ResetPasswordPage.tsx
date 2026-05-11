import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Logo } from '../components/Logo';

interface ResetPasswordPageProps {
  oobCode: string;
}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ oobCode }) => {
  const { confirmReset } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      await confirmReset(oobCode, password);
      setSuccess(true);
    } catch (err: any) {
      if (err?.code === 'auth/invalid-action-code' || err?.code === 'auth/expired-action-code') {
        setError('Este link de redefinição expirou ou já foi utilizado. Solicite um novo na tela de login.');
      } else {
        setError('Ocorreu um erro. Tente novamente ou solicite um novo link.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <a href="/" className="mb-8">
        <Logo className="h-10" textColor="text-[#16a34a]" />
      </a>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {success ? (
          <div className="text-center py-4">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-extrabold text-slate-800 mb-2">Senha redefinida!</h2>
            <p className="text-slate-500 text-sm mb-6">
              Sua senha foi alterada com sucesso. Agora você pode fazer login normalmente.
            </p>
            <a
              href="/#alunos"
              className="inline-block w-full py-3.5 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition-all text-sm text-center"
            >
              Ir para o Login
            </a>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold text-slate-800 mb-1">Redefinir senha</h1>
            <p className="text-slate-500 text-sm mb-6">
              para acesso à Área do Aluno Treinatech
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nova senha"
                  required
                  autoComplete="new-password"
                  className="w-full pl-11 pr-11 py-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirmar nova senha"
                  required
                  autoComplete="new-password"
                  className="w-full pl-11 pr-11 py-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                {loading ? 'Salvando...' : 'Salvar nova senha'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
