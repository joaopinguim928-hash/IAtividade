import React from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  User,
  LogOut,
  LogIn,
  Award,
  Flame,
  Menu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ toggleSidebar, activeTab, setActiveTab }) {
  const { user, stats, darkMode, toggleDarkMode, setAuthModalOpen, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Left Section: Brand & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                IAtividade
              </span>
              <span className="hidden sm:inline-block ml-1.5 px-2 py-0.5 text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800">
                AI Powered
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Stats, Theme, Profile */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Streak & XP Badges */}
          {user && (
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 text-xs font-bold shadow-xs">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
                <span>{stats.streakDays} dias</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-400 text-xs font-bold shadow-xs">
                <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Nível {stats.level} ({stats.xpPoints} XP)</span>
              </div>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title={darkMode ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* User Auth Info */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {user.role}
                </p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
                title="Sair da Conta"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Entrar / Cadastrar</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
}
