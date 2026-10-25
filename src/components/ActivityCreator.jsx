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
  Layers,
  Save,
  Bot,
  Wand2,
  ListPlus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ActivityCreator({ setActiveTab }) {
  const { addCustomQuiz, addCustomEssay, addCustomMindMap, apiKey, setApiKey } = useAuth();

  const [creatorType, setCreatorType] = useState('quiz'); // 'quiz' | 'essay' | 'mindmap'
  const [successMessage, setSuccessMessage] = useState('');

  // 1. QUIZ CREATOR FORM STATE
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

  // 2. ESSAY CREATOR FORM STATE
  const [essayTitle, setEssayTitle] = useState('');
  const [essaySubject, setEssaySubject] = useState('Português / Redação');
  const [essayTheme, setEssayTheme] = useState('Atualidades');
  const [essayMinWords, setEssayMinWords] = useState(50);
  const [essayContext, setEssayContext] = useState('');
  const [essayStructure, setEssayStructure] = useState([
    'Introdução com tese',
    'Desenvolvimento 1 com argumentos',
    'Conclusão com proposta de intervenção'
  ]);

  // 3. MIND MAP CREATOR FORM STATE
  const [mapTitle, setMapTitle] = useState('');
  const [mapSubject, setMapSubject] = useState('Português');
  const [mapCategory, setMapCategory] = useState('Sintaxe');
  const [mapDescription, setMapDescription] = useState('');
  const [mapNodes, setMapNodes] = useState([
    {
      id: 'n1',
      title: 'Tópico Principal',
      color: 'bg-indigo-600 text-white',
      x: 0,
      y: 0,
      type: 'root',
      description: 'Conceito central do mapa mental.'
    },
    {
      id: 'n2',
      title: 'Subtópico A',
      color: 'bg-blue-500 text-white',
      parentId: 'n1',
      x: -180,
      y: 120,
      description: 'Detalhamento da primeira ramificação.'
    },
    {
      id: 'n3',
      title: 'Subtópico B',
      color: 'bg-emerald-500 text-white',
      parentId: 'n1',
      x: 180,
      y: 120,
      description: 'Detalhamento da segunda ramificação.'
    }
  ]);

  // Quiz Form Helpers
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

  // AI Assistant Auto-Generator
  const handleAIGenerateQuiz = () => {
    setQuizTitle('Quiz sobre Figuras de Linguagem');
    setQuizSubject('Português');
    setQuizCategory('Literatura e Estilística');
    setQuizDifficulty('Médio');
    setQuestions([
      {
        id: 'q-ai-1',
        prompt: 'Qual figura de linguagem consiste em atribuir características humanas a seres inanimados?',
        options: ['Metáfora', 'Prosopopeia (Personificação)', 'Hipérbole', 'Metonímia'],
        correctAnswer: 1,
        explanation: 'A Prosopopeia ou Personificação atribui qualidades, ações ou sentimentos humanos a objetos inanimados ou animais.'
      },
      {
        id: 'q-ai-2',
        prompt: 'Na frase "Choveu tanto que quase me afoguei no caminho", qual figura sobressai?',
        options: ['Eufemismo', 'Ironia', 'Hipérbole', 'Antítese'],
        correctAnswer: 2,
        explanation: 'A Hipérbole é a figura de linguagem que expressa uma ideia com exagero intencional.'
      }
    ]);
    showNotification('Quiz preenchido com IA com sucesso!');
  };

  const handleSaveQuiz = (e) => {
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

    showNotification('Quiz criado e adicionado à biblioteca!');
    setTimeout(() => setActiveTab('quizzes'), 1200);
  };

  const handleSaveEssay = (e) => {
    e.preventDefault();
    if (!essayTitle || !essayContext) return;

    addCustomEssay({
      title: essayTitle,
      subject: essaySubject,
      theme: essayTheme,
      minWords: parseInt(essayMinWords, 10),
      sampleContext: essayContext,
      suggestedStructure: essayStructure
    });

    showNotification('Proposta de Redação criada e salva!');
    setTimeout(() => setActiveTab('essays'), 1200);
  };

  const handleSaveMindMap = (e) => {
    e.preventDefault();
    if (!mapTitle) return;

    addCustomMindMap({
      title: mapTitle,
      subject: mapSubject,
      category: mapCategory,
      description: mapDescription || 'Mapa mental personalizado.',
      nodes: mapNodes
    });

    showNotification('Mapa Mental interativo criado!');
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
            <ListPlus className="w-7 h-7 text-indigo-600" />
            <span>Criador de Atividades Pedagógicas</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Crie novos Quizzes, Propostas de Redação ou Mapas Mentais que funcionam de verdade no aplicativo.
          </p>
        </div>

        {/* Creator Type Selector */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-200/60 dark:bg-slate-800">
          <button
            onClick={() => setCreatorType('quiz')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              creatorType === 'quiz'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Quiz</span>
          </button>
          <button
            onClick={() => setCreatorType('essay')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              creatorType === 'essay'
                ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Redação</span>
          </button>
          <button
            onClick={() => setCreatorType('mindmap')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              creatorType === 'mindmap'
                ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Mapa Mental</span>
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* API Key Modal / Card Option */}
      <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Key className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Integração com Chave de API de IA (Opcional)
            </p>
            <p className="text-[11px] text-slate-500">
              Caso possua uma chave da OpenRouter ou OpenAI, adicione abaixo para geração assistida.
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

      {/* FORM TYPE 1: CREATE QUIZ */}
      {creatorType === 'quiz' && (
        <form onSubmit={handleSaveQuiz} className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <span>Criar Novo Quiz de Múltipla Escolha</span>
            </h2>

            <button
              type="button"
              onClick={handleAIGenerateQuiz}
              className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Wand2 className="w-4 h-4 text-amber-300" />
              <span>Gerar Modelo com IA</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Título do Quiz *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Concordância Verbal e Nominal"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Disciplina
              </label>
              <select
                value={quizSubject}
                onChange={(e) => setQuizSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 outline-hidden"
              >
                <option value="Português">Português</option>
                <option value="História">História</option>
                <option value="Biologia">Biologia</option>
                <option value="Matemática">Matemática</option>
                <option value="Geografia">Geografia</option>
                <option value="Química">Química</option>
                <option value="Física">Física</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Categoria / Tópico
              </label>
              <input
                type="text"
                placeholder="Ex: Gramática"
                value={quizCategory}
                onChange={(e) => setQuizCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Dificuldade
              </label>
              <select
                value={quizDifficulty}
                onChange={(e) => setQuizDifficulty(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 outline-hidden"
              >
                <option value="Fácil">Fácil</option>
                <option value="Médio">Médio</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>
          </div>

          {/* Question Builder List */}
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Questões do Quiz ({questions.length})
              </h3>

              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded-xl hover:bg-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Questão</span>
              </button>
            </div>

            {questions.map((q, qIdx) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    Questão {qIdx + 1}
                  </span>

                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(qIdx)}
                      className="p-1 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/40 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Enunciado da Questão *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Digite a pergunta da questão..."
                    value={q.prompt}
                    onChange={(e) => handleQuestionChange(qIdx, 'prompt', e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 outline-hidden"
                  />
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${q.id}`}
                        checked={q.correctAnswer === optIdx}
                        onChange={() => handleQuestionChange(qIdx, 'correctAnswer', optIdx)}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <input
                        type="text"
                        required
                        placeholder={`Opção ${String.fromCharCode(65 + optIdx)}`}
                        value={opt}
                        onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 outline-hidden"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Explicação Pedagógica
                  </label>
                  <input
                    type="text"
                    placeholder="Explicação do porquê a opção está correta..."
                    value={q.explanation}
                    onChange={(e) => handleQuestionChange(qIdx, 'explanation', e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 outline-hidden"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Salvar e Publicar Quiz</span>
            </button>
          </div>
        </form>
      )}

      {/* FORM TYPE 2: CREATE ESSAY */}
      {creatorType === 'essay' && (
        <form onSubmit={handleSaveEssay} className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <span>Criar Nova Proposta de Redação com IA</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Título do Tema *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Impactos da Automação no Mercado de Trabalho"
                value={essayTitle}
                onChange={(e) => setEssayTitle(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-slate-100 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mínimo de Palavras
              </label>
              <input
                type="number"
                value={essayMinWords}
                onChange={(e) => setEssayMinWords(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-slate-100 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Texto / Contexto Motivador *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Digite o texto motivador com dados e contexto para o estudante..."
              value={essayContext}
              onChange={(e) => setEssayContext(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-slate-100 outline-hidden resize-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl shadow-md shadow-purple-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Proposta de Redação</span>
            </button>
          </div>
        </form>
      )}

      {/* FORM TYPE 3: CREATE MIND MAP */}
      {creatorType === 'mindmap' && (
        <form onSubmit={handleSaveMindMap} className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Network className="w-5 h-5 text-cyan-600" />
              <span>Criar Novo Mapa Mental Interativo</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Título do Mapa Mental *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Tabela Periódica e Ligações Químicas"
                value={mapTitle}
                onChange={(e) => setMapTitle(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-slate-100 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Descrição do Tópico
              </label>
              <input
                type="text"
                placeholder="Ex: Resumo geral das propriedades periódicas"
                value={mapDescription}
                onChange={(e) => setMapDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-slate-100 outline-hidden"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm rounded-xl shadow-md shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Criar e Publicar Mapa Mental</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
