import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">

        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative">
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold">
            {isRegister ? 'Criar Conta no IAtividade' : 'Bem-vindo de Volta!'}
          </h2>
          <p className="text-indigo-100 text-xs mt-1">
            {isRegister
              ? 'Cadastre-se para acompanhar seu progresso e praticar com IA.'
              : 'Acesse seus quizzes, redações e estatísticas de estudos.'
            }
          </p>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nome Completo
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 outline-hidden"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Senha
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{isRegister ? 'Criar minha conta' : 'Entrar na Plataforma'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
            {isRegister ? (
              <p>
                Já tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Faça login
                </button>
              </p>
            ) : (
              <p>
                Ainda não possui conta?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Cadastre-se grátis
                </button>
              </p>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}
