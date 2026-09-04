import React, { useState, useEffect } from 'react';
import { GraphNode, GraphEdge } from '../types';
import { Network, Search, Filter, Sparkles, ArrowRight, ShieldCheck, Calendar, MapPin } from 'lucide-react';

interface KnowledgeGraphViewProps {
  currentLocation: string;
  onSelectEntityForChat: (entityName: string, location: string) => void;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({
  currentLocation,
  onSelectEntityForChat
}) => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/graph')
      .then(res => res.json())
      .then(data => {
        setNodes(data.nodes || []);
        setEdges(data.edges || []);
        if (data.nodes && data.nodes.length > 0) {
          // Pre-select an entity matching current location if possible
          const match = data.nodes.find((n: GraphNode) => 
            n.location.toLowerCase().includes(currentLocation.toLowerCase())
          );
          setSelectedNode(match || data.nodes[0]);
        }
      })
      .catch(err => console.error('Failed to load graph data:', err))
      .finally(() => setLoading(false));
  }, [currentLocation]);

  const filteredNodes = nodes.filter(n => {
    const matchesFilter = filterType === 'all' || n.type.toLowerCase() === filterType.toLowerCase();
    const matchesSearch = !searchQuery || 
      n.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      n.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate connected edges for the selected node
  const connectedEdges = selectedNode ? edges.filter(e => 
    e.source === selectedNode.id || e.target === selectedNode.id
  ) : [];

  const entityTypeColors: Record<string, string> = {
    Ruler: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    Dynasty: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    Place: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    Building: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    Practice: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    Artifact: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-6 animate-fadeIn">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs mono uppercase tracking-[0.2em] text-[#F27D26]">
            <Network className="w-4 h-4" />
            ONTOLOGICAL ARCHIVE
          </div>
          <h2 className="text-2xl md:text-3xl font-normal serif text-white mt-1">
            Historical Knowledge Graph
          </h2>
          <p className="text-xs text-[#A1A1A1] font-sans mt-0.5">
            Explicitly model rulers, dynasties, buildings, trade routes, and archaeological evidence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs mono text-[#A1A1A1]">
            {nodes.length} Entities • {edges.length} Relational Edges
          </span>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#A1A1A1] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search rulers, dynasties, monuments, scholars..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded glass border border-white/10 text-xs text-[#E5E5E1] placeholder:text-white/30 focus:outline-none focus:border-[#F27D26]"
          />
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['all', 'Ruler', 'Dynasty', 'Place', 'Building', 'Practice', 'Artifact'].map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded text-xs mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                filterType === t 
                  ? 'bg-[#F27D26] text-black font-bold' 
                  : 'glass border border-white/10 text-[#A1A1A1] hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Entity Browser (Left) + Relational Detail Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Node Catalog */}
        <div className="lg:col-span-7 glass border border-white/10 rounded-2xl p-5 md:p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs mono uppercase tracking-wider text-[#A1A1A1] pb-2 border-b border-white/10">
            <span>Historical Entities ({filteredNodes.length})</span>
            <span className="text-[10px]">Select to inspect</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
            {filteredNodes.map(node => {
              const isSelected = selectedNode?.id === node.id;

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected 
                      ? 'bg-white/[0.08] border-[#F27D26] shadow-md ring-1 ring-[#F27D26]/40' 
                      : 'glass border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] mono uppercase tracking-wider px-2 py-0.5 rounded border border-[#F27D26]/40 text-[#F27D26]">
                        {node.type}
                      </span>
                      <span className="text-[10px] mono text-[#A1A1A1]">
                        {node.location}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold serif text-[#E5E5E1]">
                      {node.name}
                    </h4>
                    <p className="text-[11px] text-[#A1A1A1] line-clamp-2 mt-1 leading-relaxed">
                      {node.details}
                    </p>
                  </div>
                  <span className="text-[10px] text-[#F27D26] mono uppercase tracking-wider mt-2.5 block">
                    Period: {node.period}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Node Inspector & Graph Relations */}
        <div className="lg:col-span-5 glass border border-white/10 rounded-2xl p-6 md:p-7 shadow-xl flex flex-col justify-between space-y-5">
          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <span className="text-xs mono uppercase tracking-wider px-2.5 py-1 rounded border border-[#F27D26]/40 text-[#F27D26]">
                  {selectedNode.type}
                </span>
                <h3 className="text-2xl font-normal serif text-white mt-2">
                  {selectedNode.name}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs mono text-[#A1A1A1] mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#F27D26]" />
                    {selectedNode.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#F27D26]" />
                    {selectedNode.period}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed mt-3 p-3.5 rounded-xl bg-black/40 border border-white/5">
                  {selectedNode.details}
                </p>
              </div>

              {/* Connected Edges */}
              <div>
                <h4 className="text-xs mono uppercase tracking-[0.2em] text-[#F27D26] mb-2 flex items-center gap-2">
                  <Network className="w-3.5 h-3.5" />
                  Knowledge Graph Relationships ({connectedEdges.length})
                </h4>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {connectedEdges.length > 0 ? (
                    connectedEdges.map(edge => {
                      const isSource = edge.source === selectedNode.id;
                      const otherNodeId = isSource ? edge.target : edge.source;
                      const otherNode = nodes.find(n => n.id === otherNodeId);

                      return (
                        <div key={edge.id} className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="mono text-[#F27D26] font-semibold text-[11px]">
                              {isSource ? `—[ ${edge.relationship} ]→` : `←[ ${edge.relationship} ]—`}
                            </span>
                            <span className="text-[10px] text-[#A1A1A1] mono">
                              {edge.period || 'Historical'}
                            </span>
                          </div>
                          <div className="font-medium serif text-white">
                            {otherNode ? otherNode.name : otherNodeId}
                          </div>
                          {edge.evidence && (
                            <div className="text-[10px] text-[#A1A1A1] italic">
                              Evidence: {edge.evidence}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-[#A1A1A1] mono">No direct graph connections indexed yet.</p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectEntityForChat(selectedNode.name, selectedNode.location)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded bg-[#F27D26] hover:bg-[#ff8e38] text-black text-xs font-bold uppercase tracking-widest transition-all active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Inquire about {selectedNode.name}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#A1A1A1] mono text-xs">
              Select an entity from the left to inspect its historical relationships.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
