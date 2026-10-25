import React, { useState } from 'react';
import {
  Table,
  Search,
  Filter,
  BookOpen,
  CheckCircle2,
  XCircle,
  Lightbulb,
  RotateCcw,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { MOCK_VERBS } from '../data/mockData';

export default function VerbTableModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Todos');
  const [activeVerb, setActiveVerb] = useState(MOCK_VERBS[0]);
  const [selectedTense, setSelectedTense] = useState('presente');
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState({});
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);

  const tenses = [
    { id: 'presente', label: 'Presente do Indicativo' },
    { id: 'preteritoPerfeito', label: 'Pretérito Perfeito' },
    { id: 'preteritoImperfeito', label: 'Pretérito Imperfeito' },
    { id: 'futuroPresente', label: 'Futuro do Presente' },
    { id: 'subjuntivoPresente', label: 'Presente do Subjuntivo' }
  ];

  const pronouns = [
    { key: 'eu', label: 'Eu' },
    { key: 'tu', label: 'Tu' },
    { key: 'ele', label: 'Ele / Ela' },
    { key: 'nos', label: 'Nós' },
    { key: 'vos', label: 'Vós' },
    { key: 'eles', label: 'Eles / Elas' }
  ];

  const filteredVerbs = MOCK_VERBS.filter((v) => {
    const matchesSearch = v.verb.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.english.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Todos' || v.type.includes(selectedType);
    return matchesSearch && matchesType;
  });

  const handlePracticeChange = (pronounKey, val) => {
    setPracticeAnswers(prev => ({ ...prev, [pronounKey]: val }));
  };

  const handleCheckPractice = () => {
    setPracticeSubmitted(true);
  };

  const resetPractice = () => {
    setPracticeAnswers({});
    setPracticeSubmitted(false);
  };

  return (
    <div className="space-y-6 pb-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Table className="w-7 h-7 text-amber-600" />
            <span>Tabelas de Conjugação Verbal Interativas</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Consulte a conjugação completa de verbos regulares e irregulares e treine seu conhecimento com o Modo Prática.
          </p>
        </div>

        {/* Practice Mode Toggle Button */}
        <button
          onClick={() => {
            setPracticeMode(prev => !prev);
            resetPractice();
          }}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
            practiceMode
              ? 'bg-amber-600 text-white shadow-amber-500/20'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{practiceMode ? 'Modo Consulta' : 'Ativar Modo Prática'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Search & Verbs List */}
        <div className="space-y-4">

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Buscar verbo (ex: Fazer, Ter, Ir)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-amber-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-hidden"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['Todos', 'Regular', 'Irregular'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                  selectedType === type
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Verbs List */}
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {filteredVerbs.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setActiveVerb(v);
                  resetPractice();
                }}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                  activeVerb.id === v.id
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/50 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {v.verb}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      v.type.includes('Irregular')
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                    }`}>
                      {v.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{v.group} • {v.english}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Conjugation Table & Practice Workspace */}
        <div className="lg:col-span-2 space-y-6">

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs space-y-6">

            {/* Verb Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  {activeVerb.group} • {activeVerb.type}
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-0.5">
                  Verbo <span className="text-amber-600 dark:text-amber-400">{activeVerb.verb}</span>
                </h2>
                <p className="text-xs text-slate-500">Tradução: {activeVerb.english}</p>
              </div>

              {/* Tense Selector */}
              <select
                value={selectedTense}
                onChange={(e) => {
                  setSelectedTense(e.target.value);
                  resetPractice();
                }}
                className="px-3.5 py-2 text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 outline-hidden"
              >
                {tenses.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Main Content Grid: Consultation or Practice Mode */}
            {!practiceMode ? (

              /* CONSULTATION MODE */
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Tabela de Conjugação — {tenses.find(t => t.id === selectedTense)?.label}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pronouns.map((p) => {
                    const conjugatedValue = activeVerb.conjugations[selectedTense]?.[p.key] || '—';
                    return (
                      <div
                        key={p.key}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                      >
                        <span className="text-xs font-bold text-slate-500">{p.label}</span>
                        <span className="text-sm font-black text-amber-700 dark:text-amber-300 font-mono">
                          {conjugatedValue}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            ) : (

              /* PRACTICE MODE */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    <span>Complete as conjugações no {tenses.find(t => t.id === selectedTense)?.label}</span>
                  </h3>

                  {practiceSubmitted && (
                    <button
                      onClick={resetPractice}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Limpar</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pronouns.map((p) => {
                    const expectedVal = activeVerb.conjugations[selectedTense]?.[p.key] || '';
                    const userVal = practiceAnswers[p.key] || '';
                    const isCorrect = userVal.trim().toLowerCase() === expectedVal.trim().toLowerCase();

                    return (
                      <div
                        key={p.key}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                            {p.label}
                          </label>
                          {practiceSubmitted && (
                            isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-600" />
                            )
                          )}
                        </div>

                        <input
                          type="text"
                          disabled={practiceSubmitted}
                          placeholder="Digite a conjugação..."
                          value={userVal}
                          onChange={(e) => handlePracticeChange(p.key, e.target.value)}
                          className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-hidden font-mono ${
                            practiceSubmitted
                              ? isCorrect
                                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                                : 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200 font-bold'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-amber-500'
                          }`}
                        />

                        {practiceSubmitted && !isCorrect && (
                          <p className="text-[10px] text-rose-600 font-semibold mt-1">
                            Correto: <span className="font-bold underline">{expectedVal}</span>
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleCheckPractice}
                    disabled={practiceSubmitted}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all cursor-pointer ${
                      !practiceSubmitted
                        ? 'bg-amber-600 hover:bg-amber-700 shadow-md shadow-amber-500/20'
                        : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Verificar Respostas
                  </button>
                </div>
              </div>

            )}

            {/* Dica Gramatical Banner */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-xs text-amber-800 dark:text-amber-300">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Dica Gramatical e Macete:</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeVerb.tips}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
