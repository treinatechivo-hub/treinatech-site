import React, { useState } from 'react';
import { Loader2, Mail, Lock, Eye, EyeOff, User, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Logo } from '../components/Logo';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleBack = () => {
    window.location.hash = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/register-free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Erro ao criar conta. Tente novamente.');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.hash = '#alunos';
      }, 3000);
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative">

      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-green-400 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        Voltar para o site
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 w-full max-w-md p-8">

        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            🤖 Curso Gratuito
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">
            Introdução à IA com Claude
          </h1>
          <p className="text-slate-500 text-sm">
            Crie sua conta gratuita e comece a aprender agora. Acesso válido por 30 dias.
          </p>
        </div>

        {success ? (
          <div className="text-center py-6">
            <div className="flex justify-center mb-4">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Cadastro realizado!</h2>
            <p className="text-slate-500 text-sm">
              Verifique seu e-mail com os dados de acesso. Redirecionando para login...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
                required
                className="w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>

            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
                required
                className="w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha (mín. 6 caracteres)"
                required
                className="w-full pl-11 pr-11 py-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar senha"
                required
                className="w-full pl-11 pr-11 py-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
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
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              {loading ? 'Criando conta...' : 'Criar conta gratuita'}
            </button>

            <p className="text-center text-sm text-slate-500">
              Já tem conta?{' '}
              <a
                href="#alunos"
                className="text-green-700 font-semibold hover:underline"
              >
                Entrar na Área do Aluno
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
