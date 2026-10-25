import React, { useState, useEffect } from 'react';
import {
  Network,
  Plus,
  Trash2,
  Info,
  Sparkles,
  UserCheck,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MindMapModule() {
  const { allMindMaps, deleteCustomMindMap } = useAuth();

  const [selectedMap, setSelectedMap] = useState(allMindMaps[0]);
  const [selectedNode, setSelectedNode] = useState(allMindMaps[0]?.nodes[0]);
  const [isAddNodeOpen, setIsAddNodeOpen] = useState(false);
  const [newNodeTitle, setNewNodeTitle] = useState('');
  const [newNodeDesc, setNewNodeDesc] = useState('');
  const [newNodeColor, setNewNodeColor] = useState('bg-indigo-100 text-indigo-900 border border-indigo-300');

  useEffect(() => {
    if (allMindMaps.length > 0 && (!selectedMap || !allMindMaps.find(m => m.id === selectedMap.id))) {
      setSelectedMap(allMindMaps[0]);
      setSelectedNode(allMindMaps[0]?.nodes[0]);
    }
  }, [allMindMaps, selectedMap]);

  const handleSelectNode = (node) => {
    setSelectedNode(node);
  };

  const handleAddNode = (e) => {
    e.preventDefault();
    if (!newNodeTitle || !selectedNode || !selectedMap) return;

    const newNode = {
      id: 'node-' + Date.now(),
      title: newNodeTitle,
      description: newNodeDesc || 'Conceito adicionado pelo estudante.',
      color: newNodeColor,
      parentId: selectedNode.id,
      x: selectedNode.x + (Math.random() > 0.5 ? 120 : -120),
      y: selectedNode.y + 120
    };

    const updatedMap = {
      ...selectedMap,
      nodes: [...selectedMap.nodes, newNode]
    };

    setSelectedMap(updatedMap);
    setSelectedNode(newNode);
    setNewNodeTitle('');
    setNewNodeDesc('');
    setIsAddNodeOpen(false);
  };

  const handleDeleteNode = (nodeId) => {
    if (selectedNode?.type === 'root' || !selectedMap) return;

    const updatedNodes = selectedMap.nodes.filter(n => n.id !== nodeId && n.parentId !== nodeId);
    const updatedMap = {
      ...selectedMap,
      nodes: updatedNodes
    };

    setSelectedMap(updatedMap);
    setSelectedNode(updatedNodes[0]);
  };

  if (!selectedMap) return null;

  return (
    <div className="space-y-6 pb-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Network className="w-7 h-7 text-cyan-600" />
            <span>Mapas Mentais Interativos</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Navegue por mapas conceituais hierárquicos e adicione novas ramificações de estudos.
          </p>
        </div>

        {/* Map Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {allMindMaps.map((m) => (
            <div key={m.id} className="flex items-center gap-1">
              <button
                onClick={() => {
                  setSelectedMap(m);
                  setSelectedNode(m.nodes[0]);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedMap?.id === m.id
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-400'
                }`}
              >
                {m.isCustom && <UserCheck className="w-3.5 h-3.5 text-indigo-300" />}
                <span>{m.subject}: {m.title}</span>
              </button>

              {m.isCustom && (
                <button
                  onClick={() => deleteCustomMindMap(m.id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/40 rounded-xl cursor-pointer"
                  title="Excluir Mapa Mental"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Visual Mind Map Canvas (2 Columns) */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs space-y-4 flex flex-col justify-between min-h-[500px]">

          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                {selectedMap.subject} • {selectedMap.category}
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {selectedMap.title}
              </h2>
            </div>

            <button
              onClick={() => setIsAddNodeOpen(true)}
              className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Nó</span>
            </button>
          </div>

          {/* Interactive Mind Map Visual Area */}
          <div className="relative flex-1 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-8 flex flex-col items-center justify-center overflow-auto min-h-[380px] select-none">

            {/* SVG Connecting Lines Background */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {selectedMap.nodes.map((node) => {
                if (!node.parentId) return null;
                const parent = selectedMap.nodes.find(n => n.id === node.parentId);
                if (!parent) return null;

                return (
                  <line
                    key={`line-${node.id}`}
                    x1={`calc(50% + ${parent.x}px)`}
                    y1={`calc(20% + ${parent.y}px)`}
                    x2={`calc(50% + ${node.x}px)`}
                    y2={`calc(20% + ${node.y}px)`}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />
                );
              })}
            </svg>

            {/* Nodes Rendered with Relative/Absolute layout simulation */}
            <div className="relative w-full h-full flex items-center justify-center min-h-[320px]">
              {selectedMap.nodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;

                return (
                  <div
                    key={node.id}
                    onClick={() => handleSelectNode(node)}
                    style={{
                      transform: `translate(${node.x}px, ${node.y - 80}px)`
                    }}
                    className={`absolute z-10 px-4 py-2.5 rounded-2xl cursor-pointer text-xs font-bold transition-all shadow-md transform hover:scale-105 ${node.color} ${
                      isSelected ? 'ring-4 ring-cyan-500 ring-offset-2 dark:ring-offset-slate-900 scale-105' : ''
                    }`}
                  >
                    {node.title}
                  </div>
                );
              })}
            </div>

          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Clique em qualquer nó do mapa para ver os detalhes do conceito ou adicionar sub-ramificações.
          </p>
        </div>

        {/* Right Column: Node Details & Node Creator Panel */}
        <div className="space-y-6">

          {/* Selected Node Detail Card */}
          {selectedNode && (
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  <span>Detalhes do Conceito</span>
                </span>

                {selectedNode.type !== 'root' && (
                  <button
                    onClick={() => handleDeleteNode(selectedNode.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                    title="Excluir este nó"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  {selectedNode.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Pai: {selectedMap.nodes.find(n => n.id === selectedNode.parentId)?.title || 'Raiz'}
                </span>

                <button
                  onClick={() => setIsAddNodeOpen(true)}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ramificar</span>
                </button>
              </div>
            </div>
          )}

          {/* Add Sub-Node Modal / Card */}
          {isAddNodeOpen && (
            <div className="p-6 bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800/80 rounded-3xl shadow-lg space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-500" />
                  <span>Novo Sub-Nó de {selectedNode.title}</span>
                </h3>
                <button
                  onClick={() => setIsAddNodeOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddNode} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Título do Conceito
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Predicado Nominal"
                    value={newNodeTitle}
                    onChange={(e) => setNewNodeTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-slate-100 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Explicação / Resumo
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Resumo explicativo do tópico..."
                    value={newNodeDesc}
                    onChange={(e) => setNewNodeDesc(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-slate-100 outline-hidden resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddNodeOpen(false)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Salvar Nó
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
