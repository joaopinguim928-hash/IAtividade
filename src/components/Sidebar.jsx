import React from 'react';
import {
  LayoutDashboard,
  HelpCircle,
  FileText,
  Table,
  Network,
  Sparkles,
  X,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose, activeTab, setActiveTab }) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Painel & Gráficos',
      icon: LayoutDashboard,
      badge: 'Geral',
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/50'
    },
    {
      id: 'quizzes',
      label: 'Quizzes Interativos',
      icon: HelpCircle,
      badge: 'Prática',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/50'
    },
    {
      id: 'essays',
      label: 'Redação com IA',
      icon: FileText,
      badge: 'IA Feedback',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/50'
    },
    {
      id: 'verbs',
      label: 'Tabelas de Verbos',
      icon: Table,
      badge: 'Gramática',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/50'
    },
    {
      id: 'mindmaps',
      label: 'Mapas Mentais',
      icon: Network,
      badge: 'Visual',
      color: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/50'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-auto flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 md:hidden">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>Navegação</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Módulos de Estudo
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : `${item.bgColor} ${item.color}`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${
                      isActive ? 'opacity-100 translate-x-0' : ''
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </nav>

        {/* AI Banner Card */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white shadow-md relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-pink-500/20 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold mb-1">
              <Sparkles className="w-4 h-4 text-pink-400 animate-spin-slow" />
              <span>IAtividade Tutor v2.0</span>
            </div>
            <p className="text-xs text-slate-200 mb-3 leading-relaxed">
              Respostas e correções detalhadas em segundos com Inteligência Artificial.
            </p>
            <button
              onClick={() => setActiveTab('essays')}
              className="w-full py-1.5 px-3 bg-white text-indigo-950 font-semibold text-xs rounded-lg hover:bg-indigo-50 transition-colors shadow-xs"
            >
              Testar Redação com IA
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
