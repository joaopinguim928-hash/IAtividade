import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Trophy,
  Target,
  Clock,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  BookOpen,
  ArrowUpRight,
  Flame,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard({ setActiveTab }) {
  const { user, stats } = useAuth();

  const accuracyPercentage = stats.totalQuestionsTotal > 0
    ? Math.round((stats.correctAnswersTotal / stats.totalQuestionsTotal) * 100)
    : 0;

  const pieData = [
    { name: 'Acertos', value: stats.correctAnswersTotal, color: '#10b981' },
    { name: 'Erros', value: stats.totalQuestionsTotal - stats.correctAnswersTotal, color: '#f43f5e' }
  ];

  return (
    <div className="space-y-6 pb-12">

      {/* Welcome Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/10 backdrop-blur-3xl rounded-l-full pointer-events-none transform translate-x-1/2" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Plataforma Inteligente de Estudos</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Olá, {user ? user.name : 'Estudante'}! 👋
            </h1>
            <p className="text-indigo-100 text-sm mt-2 leading-relaxed">
              Você já completou {stats.totalQuizzesTaken} quizzes e enviou {stats.essaysSubmitted} redações nesta semana. Continue praticando para elevar seu nível!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('quizzes')}
              className="px-5 py-2.5 bg-white text-indigo-950 font-bold text-sm rounded-2xl hover:bg-indigo-50 shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Fazer Quiz Agora
            </button>
            <button
              onClick={() => setActiveTab('essays')}
              className="px-5 py-2.5 bg-black/20 hover:bg-black/30 border border-white/20 text-white font-semibold text-sm rounded-2xl transition-all cursor-pointer"
            >
              Corrigir Redação
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Nível & XP</p>
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Nível {stats.level}
            </p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
              {stats.xpPoints} / {stats.nextLevelXp} XP
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Taxa de Acerto</p>
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {accuracyPercentage}%
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
              {stats.correctAnswersTotal} de {stats.totalQuestionsTotal} questões
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Média Redações</p>
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {stats.averageEssayGrade} pts
            </p>
            <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-0.5">
              {stats.essaysSubmitted} redações corrigidas
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tempo de Estudo</p>
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {stats.studyTimeHours} horas
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-0.5 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>{stats.streakDays} dias seguidos</span>
            </p>
          </div>
        </div>

      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Weekly Activity Bar Chart */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <span>Atividade Semanal de Estudos</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Quizzes realizados e horas dedicadas por dia da semana
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Últimos 7 dias
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.weeklyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="quizzes" name="Quizzes Feitos" fill="#6366f1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="hours" name="Horas de Estudo" fill="#a855f7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Mastery Radar Chart */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <span>Domínio por Matéria</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Desempenho relativo entre as disciplinas
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={stats.subjectMastery}>
                <PolarGrid stroke="#334155" opacity={0.3} />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" fontSize={10} />
                <Radar name="Domínio %" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Accuracy & Recent Activities Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Pie Chart: Accuracy Breakdown */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Proporção de Respostas</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Análise de acertos e erros acumulados
            </p>
          </div>

          <div className="h-48 w-full my-2 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-900 dark:text-slate-100">
                {accuracyPercentage}%
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Precisão</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {stats.correctAnswersTotal} Acertos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {stats.totalQuestionsTotal - stats.correctAnswersTotal} Erros
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Atividades Recentes
            </h2>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer hover:underline">
              Ver histórico completo
            </span>
          </div>

          <div className="space-y-3">
            {stats.recentActivities.map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:bg-slate-100/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl text-white ${
                    act.type === 'quiz' ? 'bg-indigo-600' :
                    act.type === 'essay' ? 'bg-purple-600' : 'bg-amber-600'
                  }`}>
                    {act.type === 'quiz' && <Target className="w-4 h-4" />}
                    {act.type === 'essay' && <Sparkles className="w-4 h-4" />}
                    {act.type === 'verb' && <BookOpen className="w-4 h-4" />}
                    {act.type === 'mindmap' && <TrendingUp className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {act.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {act.result}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">
                    {act.date}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
