import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Timer,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Globe,
  Dna,
  Calculator,
  Sparkles,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_QUIZZES } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function QuizModule() {
  const { recordQuizResult } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const getSubjectIcon = (iconName) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-indigo-500" />;
      case 'Globe': return <Globe className="w-5 h-5 text-emerald-500" />;
      case 'Dna': return <Dna className="w-5 h-5 text-rose-500" />;
      case 'Calculator': return <Calculator className="w-5 h-5 text-amber-500" />;
      default: return <HelpCircle className="w-5 h-5 text-purple-500" />;
    }
  };

  // Timer effect
  useEffect(() => {
    if (!activeQuiz || quizCompleted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuiz, quizCompleted, timeLeft]);

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizCompleted(false);
    setTimeLeft(quiz.timeLimit);
  };

  const handleSelectOption = (questionId, optionIdx) => {
    if (showExplanation) return; // Prevent changing after revealing
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIdx < activeQuiz.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizCompleted(true);
    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    recordQuizResult(activeQuiz.subject, correctCount, activeQuiz.questions.length);

    if (correctCount === activeQuiz.questions.length) {
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {
        // ignore
      }
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const categories = ['Todos', 'Português', 'História', 'Biologia', 'Matemática'];

  const filteredQuizzes = selectedCategory === 'Todos'
    ? MOCK_QUIZZES
    : MOCK_QUIZZES.filter(q => q.subject === selectedCategory);

  // 1. QUIZ ACTIVE VIEW
  if (activeQuiz && !quizCompleted) {
    const currentQuestion = activeQuiz.questions[currentQuestionIdx];
    const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;
    const selectedOption = selectedAnswers[currentQuestion.id];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-12">
        {/* Header & Progress */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {activeQuiz.subject} • {activeQuiz.category}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                {activeQuiz.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-sm font-bold">
              <Timer className="w-4 h-4 text-amber-500" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold text-slate-500">
              <span>Questão {currentQuestionIdx + 1} de {activeQuiz.questions.length}</span>
              <span>{Math.round(((currentQuestionIdx + 1) / activeQuiz.questions.length) * 100)}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                style={{ width: `${((currentQuestionIdx + 1) / activeQuiz.questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
            {currentQuestion.prompt}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let optionStyle = "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 hover:border-indigo-400";

              if (selectedOption === idx) {
                optionStyle = "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 font-semibold ring-2 ring-indigo-500/30";
              }

              if (showExplanation) {
                if (idx === currentQuestion.correctAnswer) {
                  optionStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold ring-2 ring-emerald-500/30";
                } else if (selectedOption === idx && idx !== currentQuestion.correctAnswer) {
                  optionStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 font-semibold";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQuestion.id, idx)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-2xl border text-sm md:text-base transition-all flex items-start justify-between cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {showExplanation && idx === currentQuestion.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                  {showExplanation && selectedOption === idx && idx !== currentQuestion.correctAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {showExplanation && (
            <div className={`p-5 rounded-2xl border ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm mb-2 text-slate-900 dark:text-slate-100">
                <Lightbulb className={`w-5 h-5 ${isCorrect ? 'text-emerald-600' : 'text-amber-600'}`} />
                <span>Explicação Pedagógica:</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setActiveQuiz(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
            >
              Sair do Quiz
            </button>

            {!showExplanation ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!isAnswered}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer ${
                  isAnswered
                    ? 'bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Confirmar Resposta
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span>{currentQuestionIdx < activeQuiz.questions.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. QUIZ RESULT VIEW
  if (activeQuiz && quizCompleted) {
    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / activeQuiz.questions.length) * 100);

    return (
      <div className="max-w-xl mx-auto space-y-6 pb-12">
        <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-indigo-600 p-1 flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
              <Award className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Quiz Concluído
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
              {activeQuiz.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Excelente esforço! Seu progresso foi gravado no painel.
            </p>
          </div>

          {/* Score Box */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500">Acertos</p>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {correctCount} / {activeQuiz.questions.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Aproveitamento</p>
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {percentage}%
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => startQuiz(activeQuiz)}
              className="w-full sm:w-1/2 py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Refazer Quiz</span>
            </button>
            <button
              onClick={() => setActiveQuiz(null)}
              className="w-full sm:w-1/2 py-3 px-4 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Outros Quizzes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. QUIZ LIST VIEW
  return (
    <div className="space-y-6 pb-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-indigo-600" />
            <span>Quizzes de Múltipla Escolha</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Escolha uma disciplina para praticar com retorno imediato e explicações explicativas.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-200/60 dark:bg-slate-800 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50">
                  {getSubjectIcon(quiz.icon)}
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  quiz.difficulty === 'Fácil' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' :
                  quiz.difficulty === 'Médio' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400' :
                  'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
                }`}>
                  {quiz.difficulty}
                </span>
              </div>

              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {quiz.subject} • {quiz.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {quiz.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Contém {quiz.questions.length} questões objetivas com feedback completo ao final de cada uma.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <Timer className="w-4 h-4 text-slate-400" />
                <span>~{Math.round(quiz.timeLimit / 60)} min</span>
              </div>

              <button
                onClick={() => startQuiz(quiz)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Iniciar Quiz</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
