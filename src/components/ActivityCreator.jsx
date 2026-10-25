import React, { useState } from 'react';
import {
  Plus,
  HelpCircle,
  FileText,
  Network,
  Trash2,
  Sparkles,
  CheckCircle2,
  Key,
  Save,
  Bot,
  Wand2,
  ListPlus,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { generateAIActivity } from '../utils/aiGenerator';

export default function ActivityCreator({ setActiveTab }) {
  const { addCustomQuiz, addCustomEssay, addCustomMindMap, apiKey, setApiKey } = useAuth();

  const [creatorMode, setCreatorMode] = useState('ai'); // 'ai' | 'manual'
  const [creatorType, setCreatorType] = useState('quiz'); // 'quiz' | 'essay' | 'mindmap'
  const [successMessage, setSuccessMessage] = useState('');

  // AI Prompt Form State
  const [aiTopic, setAiTopic] = useState('');
  const [aiSourceText, setAiSourceText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Manual Forms State
  const [quizTitle, setQuizTitle] = useState('');
  const [quizSubject, setQuizSubject] = useState('Português');
  const [quizCategory, setQuizCategory] = useState('Gramática');
  const [quizDifficulty, setQuizDifficulty] = useState('Médio');
  const [quizTimeLimit, setQuizTimeLimit] = useState(300);
  const [questions, setQuestions] = useState([
    {
      id: 'q-init-1',
      prompt: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    }
  ]);

  const [essayTitle, setEssayTitle] = useState('');
  const [essaySubject, setEssaySubject] = useState('Português / Redação');
  const [essayTheme, setEssayTheme] = useState('Atualidades');
  const [essayMinWords, setEssayMinWords] = useState(50);
  const [essayContext, setEssayContext] = useState('');

  const [mapTitle, setMapTitle] = useState('');
  const [mapSubject, setMapSubject] = useState('Português');
  const [mapCategory, setMapCategory] = useState('Sintaxe');
  const [mapDescription, setMapDescription] = useState('');

  // AI Generator Handler
  const handleGenerateAI = async (e) => {
    e.preventDefault();
    if (!aiTopic) return;

    setIsGenerating(true);

    try {
      const generated = await generateAIActivity({
        type: creatorType,
        topic: aiTopic,
        textContext: aiSourceText,
        apiKey: apiKey
      });

      if (generated) {
        if (creatorType === 'quiz') {
          addCustomQuiz(generated);
          showNotification('Quiz gerado com Sucesso pela Inteligência Artificial!');
          setTimeout(() => setActiveTab('quizzes'), 1200);
        } else if (creatorType === 'essay') {
          addCustomEssay(generated);
          showNotification('Proposta de Redação gerada com Sucesso pela IA!');
          setTimeout(() => setActiveTab('essays'), 1200);
        } else if (creatorType === 'mindmap') {
          addCustomMindMap(generated);
          showNotification('Mapa Mental gerado com Sucesso pela IA!');
          setTimeout(() => setActiveTab('mindmaps'), 1200);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Manual Handlers
  const handleAddQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        id: 'q-' + Date.now(),
        prompt: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      }
    ]);
  };

  const handleRemoveQuestion = (idx) => {
    if (questions.length <= 1) return;
    setQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleQuestionChange = (idx, field, value) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    setQuestions(prev => {
      const updated = [...prev];
      const newOptions = [...updated[qIdx].options];
      newOptions[optIdx] = value;
      updated[qIdx] = { ...updated[qIdx], options: newOptions };
      return updated;
    });
  };

  const handleSaveQuizManual = (e) => {
    e.preventDefault();
    if (!quizTitle || questions.some(q => !q.prompt)) return;

    addCustomQuiz({
      title: quizTitle,
      subject: quizSubject,
      category: quizCategory,
      difficulty: quizDifficulty,
      icon: 'BookOpen',
      timeLimit: parseInt(quizTimeLimit, 10),
      questions: questions
    });

    showNotification('Quiz manual criado e salvo com sucesso!');
    setTimeout(() => setActiveTab('quizzes'), 1200);
  };

  const handleSaveEssayManual = (e) => {
    e.preventDefault();
    if (!essayTitle || !essayContext) return;

    addCustomEssay({
      title: essayTitle,
      subject: essaySubject,
      theme: essayTheme,
      minWords: parseInt(essayMinWords, 10),
      sampleContext: essayContext,
      suggestedStructure: [
        'Introdução com tese',
        'Desenvolvimento com argumentos',
        'Conclusão com proposta de intervenção'
      ]
    });

    showNotification('Proposta de Redação criada manualmente!');
    setTimeout(() => setActiveTab('essays'), 1200);
  };

  const handleSaveMindMapManual = (e) => {
    e.preventDefault();
    if (!mapTitle) return;

    addCustomMindMap({
      title: mapTitle,
      subject: mapSubject,
      category: mapCategory,
      description: mapDescription || 'Mapa mental personalizado.',
      nodes: [
        {
          id: 'n1',
          title: mapTitle,
          color: 'bg-indigo-600 text-white',
          x: 0,
          y: 0,
          type: 'root',
          description: mapDescription || 'Conceito central.'
        },
        {
          id: 'n2',
          title: 'Primeira Ramificação',
          color: 'bg-blue-500 text-white',
          parentId: 'n1',
          x: -180,
          y: 120,
          description: 'Sub-tópico explicativo.'
        }
      ]
    });

    showNotification('Mapa Mental criado!');
    setTimeout(() => setActiveTab('mindmaps'), 1200);
  };

  const showNotification = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="space-y-6 pb-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-indigo-600" />
            <span>Gerador e Criador de Atividades com IA</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Digite qualquer tema ou cole um texto base para a IA criar o Quiz, Redação ou Mapa Mental completo em segundos.
          </p>
        </div>

        {/* Creator Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-200/60 dark:bg-slate-800">
          <button
            onClick={() => setCreatorMode('ai')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              creatorMode === 'ai'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Wand2 className="w-4 h-4 text-amber-300" />
            <span>Gerar com IA</span>
          </button>

          <button
            onClick={() => setCreatorMode('manual')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              creatorMode === 'manual'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <ListPlus className="w-4 h-4" />
            <span>Criar Manualmente</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* API Key Modal / Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Key className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Integração com Chave de API de IA (Opcional)
            </p>
            <p className="text-[11px] text-slate-500">
              Se tiver uma chave OpenRouter ou OpenAI, adicione para acionar modelos LLM de ponta.
            </p>
          </div>
        </div>

        <input
          type="password"
          placeholder="sk-or-v1-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 outline-hidden w-full sm:w-56"
        />
      </div>

      {/* MODE 1: AI GENERATOR */}
      {creatorMode === 'ai' && (
        <form onSubmit={handleGenerateAI} className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 rounded-3xl shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Geração Automática de Atividades
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                O que você quer ensinar ou praticar hoje?
              </h2>
            </div>

            {/* Select Activity Type to Generate */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setCreatorType('quiz')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  creatorType === 'quiz' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                Quiz
              </button>
              <button
                type="button"
                onClick={() => setCreatorType('essay')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  creatorType === 'essay' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                Redação
              </button>
              <button
                type="button"
                onClick={() => setCreatorType('mindmap')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  creatorType === 'mindmap' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                Mapa Mental
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                Tema / Assunto da Atividade *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Guerra Fria, Crase e Regência, Leis de Newton, Funções Quadráticas..."
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 outline-hidden font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                Texto de Apoio ou Conteúdo Didático (Opcional)
              </label>
              <textarea
                rows={5}
                placeholder="Cole um resumo, artigo ou capítulo de livro para a IA extrair os conceitos e questões..."
                value={aiSourceText}
                onChange={(e) => setAiSourceText(e.target.value)}
                className="w-full p-4 text-xs bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 outline-hidden resize-y"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              A IA formulará enunciado, opções com gabarito explicativo e cadastrará no app.
            </p>

            <button
              type="submit"
              disabled={!aiTopic || isGenerating}
              className={`px-8 py-3 rounded-2xl text-sm font-bold text-white shadow-lg flex items-center gap-2 transition-all cursor-pointer ${
                aiTopic && !isGenerating
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 shadow-indigo-500/25'
                  : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Criando Atividade com IA...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 text-amber-300" />
                  <span>Gerar {creatorType.toUpperCase()} com IA</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* MODE 2: MANUAL CREATOR */}
      {creatorMode === 'manual' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCreatorType('quiz')}
              className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${creatorType === 'quiz' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}
            >
              Quiz Manual
            </button>
            <button
              onClick={() => setCreatorType('essay')}
              className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${creatorType === 'essay' ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-700'}`}
            >
              Redação Manual
            </button>
            <button
              onClick={() => setCreatorType('mindmap')}
              className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${creatorType === 'mindmap' ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-700'}`}
            >
              Mapa Mental Manual
            </button>
          </div>

          {creatorType === 'quiz' && (
            <form onSubmit={handleSaveQuizManual} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Criar Quiz Manual</h3>
              <input
                type="text"
                required
                placeholder="Título do Quiz"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
              {questions.map((q, qIdx) => (
                <div key={q.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl space-y-2">
                  <input
                    type="text"
                    required
                    placeholder={`Pergunta ${qIdx + 1}`}
                    value={q.prompt}
                    onChange={(e) => handleQuestionChange(qIdx, 'prompt', e.target.value)}
                    className="w-full p-2 text-xs bg-white dark:bg-slate-900 border rounded-xl"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => (
                      <input
                        key={optIdx}
                        type="text"
                        required
                        placeholder={`Opção ${String.fromCharCode(65 + optIdx)}`}
                        value={opt}
                        onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                        className="p-2 text-xs bg-white dark:bg-slate-900 border rounded-xl"
                      />
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <button type="button" onClick={handleAddQuestion} className="text-xs font-bold text-indigo-600">+ Questão</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl">Salvar Quiz</button>
              </div>
            </form>
          )}

          {creatorType === 'essay' && (
            <form onSubmit={handleSaveEssayManual} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Criar Proposta de Redação Manual</h3>
              <input
                type="text"
                required
                placeholder="Título do Tema"
                value={essayTitle}
                onChange={(e) => setEssayTitle(e.target.value)}
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
              <textarea
                rows={4}
                required
                placeholder="Texto Motivador"
                value={essayContext}
                onChange={(e) => setEssayContext(e.target.value)}
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
              <button type="submit" className="px-5 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl">Salvar Redação</button>
            </form>
          )}

          {creatorType === 'mindmap' && (
            <form onSubmit={handleSaveMindMapManual} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Criar Mapa Mental Manual</h3>
              <input
                type="text"
                required
                placeholder="Título do Mapa Mental"
                value={mapTitle}
                onChange={(e) => setMapTitle(e.target.value)}
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
              <button type="submit" className="px-5 py-2 bg-cyan-600 text-white text-xs font-bold rounded-xl">Salvar Mapa Mental</button>
            </form>
          )}
        </div>
      )}

    </div>
  );
}
