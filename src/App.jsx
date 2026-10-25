import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import QuizModule from './components/QuizModule';
import AIEssayModule from './components/AIEssayModule';
import VerbTableModule from './components/VerbTableModule';
import MindMapModule from './components/MindMapModule';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">

        {/* Navbar */}
        <Navbar
          toggleSidebar={toggleSidebar}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Workspace Layout */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">

          {/* Sidebar Navigation */}
          <Sidebar
            isOpen={sidebarOpen}
            onClose={closeSidebar}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Active Tab View Content */}
          <main className="flex-1 min-w-0">
            {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
            {activeTab === 'quizzes' && <QuizModule />}
            {activeTab === 'essays' && <AIEssayModule />}
            {activeTab === 'verbs' && <VerbTableModule />}
            {activeTab === 'mindmaps' && <MindMapModule />}
          </main>

        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} IAtividade — Plataforma Inteligente de Aprendizagem e Quizzes com IA</p>
        </footer>

        {/* Login / Cadastrar Modal */}
        <AuthModal />

      </div>
    </AuthProvider>
  );
}
