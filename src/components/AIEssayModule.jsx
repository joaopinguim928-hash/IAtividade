import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Send,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Bot,
  Award,
  RotateCcw,
  ListChecks,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { MOCK_ESSAY_PROMPTS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function AIEssayModule() {
  const { recordEssayResult } = useAuth();

  const [selectedPrompt, setSelectedPrompt] = useState(MOCK_ESSAY_PROMPTS[0]);
  const [essayText, setEssayText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;

  const handleEvaluate = () => {
    if (wordCount < selectedPrompt.minWords) return;

    setIsEvaluating(true);
    setEvaluation(null);

    setTimeout(() => {
      // Simulate AI analysis based on text length, structure, and vocabulary
      const baseGrade = 750;
      const lengthBonus = Math.min(150, Math.round(wordCount * 1.5));
      const randomVar = Math.floor(Math.random() * 80);
      const totalGrade = Math.min(1000, baseGrade + lengthBonus + randomVar);

      const aiResult = {
        grade: totalGrade,
        c1Grammar: {
          score: Math.min(200, Math.round(totalGrade * 0.2)),
          feedback: 'Excelente norma-padrão da língua portuguesa. Poucos desvios pontuais de pontuação ou regência.'
        },
        c2Theme: {
          score: Math.min(200, Math.round(totalGrade * 0.2)),
          feedback: 'Compreensão ampla da proposta. Argumentação bem fundamentada no repertório sociocultural exigido.'
        },
        c3Structure: {
          score: Math.min(200, Math.round(totalGrade * 0.2)),
          feedback: 'Evolução coerente dos parágrafos com tese, desenvolvimento articulado e fechamento conclusivo.'
        },
        c4Cohesion: {
          score: Math.min(200, Math.round(totalGrade * 0.2)),
          feedback: 'Ótimo uso de conectivos interparágrafos ("Além disso", "Portanto", "Em suma").'
        },
        c5Proposal: {
          score: Math.min(200, Math.round(totalGrade * 0.2)),
          feedback: 'Proposta detalhada contendo agente, ação, meio/modo e detalhamento prático do impacto social.'
        },
        strengths: [
          'Domínio satisfatório da norma culta e vocabulário formal.',
          'Conexão direta com a tese apresentada no primeiro parágrafo.',
          'Proposta de intervenção completa com agente e finalidade.'
        ],
        improvements: [
          'Pode enriquecer o desenvolvimento citando dados de órgãos oficiais ou pensadores contemporâneos.',
          'Varie mais os conectivos no início dos parágrafos para evitar repetições.'
        ]
      };

      setEvaluation(aiResult);
      setIsEvaluating(false);

      recordEssayResult(selectedPrompt.title, totalGrade);
    }, 2000);
  };

  const handleReset = () => {
    setEssayText('');
    setEvaluation(null);
  };

  return (
    <div className="space-y-6 pb-12">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-purple-600" />
          <span>Questões Dissertativas & Redação com IA</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Escreva suas respostas e receba uma correção completa em segundos por nossa inteligência artificial pedagógica.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Prompts List & Selected Context */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Selecione uma Temática
          </h2>

          <div className="space-y-3">
            {MOCK_ESSAY_PROMPTS.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => {
                  setSelectedPrompt(prompt);
                  setEvaluation(null);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedPrompt.id === prompt.id
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/50 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
                    {prompt.subject}
                  </span>
                  <span className="text-xs text-slate-400">Min. {prompt.minWords} palavras</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {prompt.title}
                </h3>
              </button>
            ))}
          </div>

          {/* Context Card */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>Contexto Motivador</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              "{selectedPrompt.sampleContext}"
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 mb-1.5">
                <ListChecks className="w-3.5 h-3.5 text-purple-600" />
                <span>Roteiro Sugerido:</span>
              </span>
              <ul className="text-[11px] text-slate-500 space-y-1 pl-4 list-disc">
                {selectedPrompt.suggestedStructure.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Text Editor or AI Evaluation */}
        <div className="lg:col-span-2 space-y-6">

          {/* Editor Container */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {selectedPrompt.title}
                </h3>
                <p className="text-xs text-slate-500">Escreva seu texto dissertativo abaixo</p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  wordCount >= selectedPrompt.minWords
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                }`}>
                  {wordCount} / {selectedPrompt.minWords} palavras
                </span>

                {essayText && (
                  <button
                    onClick={handleReset}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    title="Limpar texto"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Textarea */}
            <textarea
              rows={12}
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              placeholder="Digite aqui o seu texto dissertativo completo..."
              className="w-full p-4 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 leading-relaxed outline-hidden resize-y"
            />

            {/* Action Row */}
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-slate-400">
                A IA analisará gramática, coesão, coerência e proposta de solução.
              </p>

              <button
                onClick={handleEvaluate}
                disabled={wordCount < selectedPrompt.minWords || isEvaluating}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2 transition-all cursor-pointer ${
                  wordCount >= selectedPrompt.minWords && !isEvaluating
                    ? 'bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-500/20'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                {isEvaluating ? (
                  <>
                    <Bot className="w-4 h-4 animate-spin" />
                    <span>Analisando com IA...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Avaliar com IA</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Evaluation Results Card */}
          {evaluation && (
            <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 rounded-3xl shadow-lg space-y-6 animate-fade-in">

              {/* Score Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-400">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                      Resultado da Avaliação IA
                    </span>
                    <h3 className="text-2xl font-black">
                      Nota Estimada: {evaluation.grade} <span className="text-sm font-normal text-slate-300">/ 1000</span>
                    </h3>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-xs font-semibold text-purple-200">
                  Desempenho Excelente ✨
                </div>
              </div>

              {/* Criteria Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300">C1: Norma Culta</span>
                    <span className="text-purple-600 dark:text-purple-400">{evaluation.c1Grammar.score} / 200 pts</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">{evaluation.c1Grammar.feedback}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300">C2: Domínio do Tema</span>
                    <span className="text-purple-600 dark:text-purple-400">{evaluation.c2Theme.score} / 200 pts</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">{evaluation.c2Theme.feedback}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300">C3: Estrutura & Tese</span>
                    <span className="text-purple-600 dark:text-purple-400">{evaluation.c3Structure.score} / 200 pts</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">{evaluation.c3Structure.feedback}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300">C4: Coesão Linguística</span>
                    <span className="text-purple-600 dark:text-purple-400">{evaluation.c4Cohesion.score} / 200 pts</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">{evaluation.c4Cohesion.feedback}</p>
                </div>

              </div>

              {/* Strengths and Points to Improve */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Pontos Fortes</span>
                  </h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pl-4 list-disc">
                    {evaluation.strengths.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-2">
                  <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Sugestões de Melhoria</span>
                  </h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pl-4 list-disc">
                    {evaluation.improvements.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
