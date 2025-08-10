
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import { Lock, Mail, Eye, EyeOff, AlertTriangle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [capsLockOn, setCapsLockOn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      setCapsLockOn(e.getModifierState('CapsLock'));
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await login(email);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.error || 'Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-haut-dark flex items-center justify-center px-4 animate-fadeIn">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-haut-accent rounded-full mx-auto mb-4 flex items-center justify-center">
            <Lock className="text-haut-dark" size={36} />
          </div>
          <h2 className="text-3xl font-bold text-white">Fazer Login</h2>
          <p className="text-haut-muted mt-2">Acesse sua conta do Haut Academy Workspace</p>
        </div>

        <div className="bg-haut-surface p-8 rounded-lg shadow-lg border border-haut-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-lg flex items-center gap-2">
                <AlertTriangle size={20} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-haut-muted mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-haut-muted" size={20} />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-haut-muted mb-2">
                Senha
              </label>
              <div className="relative">
                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-haut-muted" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-haut-muted hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {capsLockOn && (
                <p className="text-yellow-400 text-sm mt-2 flex items-center gap-1">
                  <AlertTriangle size={16} />
                  <span>Caps Lock está ativado</span>
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-haut-muted">
                <input type="checkbox" className="w-4 h-4 rounded bg-haut-border border-haut-border text-haut-accent focus:ring-haut-accent" />
                <span className="ml-2 text-sm">Lembrar-me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-haut-accent hover:underline">
                Esqueci minha senha
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <div className="text-center pt-4 border-t border-haut-border">
              <p className="text-haut-muted">
                Não tem uma conta?{' '}
                <Link to="/request-access" className="text-haut-accent hover:underline font-semibold">
                  Solicitar Acesso
                </Link>
              </p>
            </div>
          </form>
        </div>

        <p className="text-center text-haut-muted/70 text-sm mt-6">
          Precisa de ajuda? <a href="mailto:suporte@hautacademy.com" className="text-haut-muted hover:text-white underline">suporte@hautacademy.com</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
