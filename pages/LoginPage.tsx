import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowLeft, User } from 'lucide-react';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

type Mode = 'login' | 'signup';

export const LoginPage: React.FC = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    window.location.hash = '';
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch {
      setError('Login com Google ainda não disponível. Use e-mail e senha.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    if (mode === 'signup' && !name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(name, email, password);
      }
    } catch {
      setError(mode === 'login' ? 'E-mail ou senha incorretos.' : 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative">

      {/* Back button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-700 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        Voltar para o site
      </button>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 w-full max-w-md p-8">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#1a5c35"/>
              <rect x="8" y="10" width="24" height="20" rx="2.5" stroke="white" strokeWidth="1.8" fill="none"/>
              <line x1="8" y1="16.5" x2="32" y2="16.5" stroke="white" strokeWidth="1.8"/>
              <line x1="20" y1="10" x2="20" y2="30" stroke="white" strokeWidth="1.8"/>
              <rect x="9.5" y="11.5" width="9" height="3.5" rx="1" fill="white" fillOpacity="0.95"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">
            {mode === 'login' ? 'Área do Aluno' : 'Criar conta'}
          </h1>
          <p className="text-slate-500 text-sm">
            {mode === 'login'
              ? 'Acesse seus treinamentos exclusivos e materiais complementares.'
              : 'Crie sua conta e comece a aprender hoje mesmo.'}
          </p>
        </div>

        {/* Mode tabs */}
        <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
          {(['login', 'signup'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {m === 'login' ? 'Entrar' : 'Cadastrar'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                required
                className="w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
          )}

          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu E-mail"
              required
              className="w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua Senha"
              required
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

          {mode === 'login' && (
            <div className="text-right">
              <button type="button" className="text-xs text-green-700 hover:underline font-medium">
                Esqueceu a senha?
              </button>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? 'Aguarde...' : mode === 'login' ? 'Entrar Agora' : 'Criar Conta'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">ou continue com</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3.5 rounded-xl font-semibold text-slate-700 text-sm transition-all"
        >
          <GoogleIcon />
          Google
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-6">
          {mode === 'login' ? (
            <>Não tem uma conta?{' '}
              <button onClick={() => switchMode('signup')} className="text-green-700 font-semibold hover:underline">
                Cadastre-se aqui
              </button>
            </>
          ) : (
            <>Já tem uma conta?{' '}
              <button onClick={() => switchMode('login')} className="text-green-700 font-semibold hover:underline">
                Entrar
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
