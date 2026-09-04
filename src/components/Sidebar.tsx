import React from 'react';
import { 
  Plus, 
  Trash2, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Compass, 
  BookOpen, 
  ChevronRight, 
  Hourglass,
  Users,
  ShieldCheck,
  Box
} from 'lucide-react';
import { HistoricalDestination, Journey, CharacterPersona } from '../types';

interface SidebarProps {
  destinations: HistoricalDestination[];
  journeys: Journey[];
  currentJourneyId: string;
  activePersona: CharacterPersona | null;
  onSelectJourney: (id: string) => void;
  onNewJourney: (destination?: HistoricalDestination) => void;
  onClearPersona: () => void;
  onOpenKnowledgeBase: () => void;
  onOpenTimeJump: () => void;
  onSelectTab?: (tab: 'chat' | 'timeline' | 'past-vs-present' | 'map' | 'graph' | 'personas' | 'relics') => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  destinations,
  journeys,
  currentJourneyId,
  activePersona,
  onSelectJourney,
  onNewJourney,
  onClearPersona,
  onOpenKnowledgeBase,
  onOpenTimeJump,
  onSelectTab,
  isOpen,
  onClose
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static top-16 bottom-0 left-0 z-40 w-72 bg-[#080809] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: New Journey Button & Journey History */}
        <div className="p-4 space-y-5 overflow-y-auto flex-1">
          <button
            type="button"
            onClick={() => {
              onNewJourney();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded bg-[#F27D26] hover:bg-[#ff8e38] text-black text-xs font-bold uppercase tracking-widest transition-transform active:scale-95 shadow-md shadow-[#F27D26]/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Journey</span>
          </button>

          {/* Active Persona Banner (if persona chat active) */}
          {activePersona && (
            <div className="p-3.5 glass rounded-xl border-l-2 border-[#F27D26] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] mono uppercase text-[#F27D26] font-bold flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Active Simulation
                </span>
                <button
                  type="button"
                  onClick={onClearPersona}
                  className="text-[10px] text-zinc-400 hover:text-white underline mono"
                >
                  Exit
                </button>
              </div>
              <div className="text-sm font-bold text-[#E5E5E1] serif">
                {activePersona.name}
              </div>
              <div className="text-[10px] text-[#A1A1A1] mono">
                {activePersona.role} • {activePersona.location}
              </div>
            </div>
          )}

          {/* Previous Journeys List */}
          <div>
            <span className="mono text-[10px] uppercase tracking-[0.25em] text-[#A1A1A1] px-1 mb-2.5 block">
              Time Journeys ({journeys.length})
            </span>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {journeys.map(j => {
                const isSelected = j.id === currentJourneyId;
                return (
                  <button
                    key={j.id}
                    type="button"
                    onClick={() => {
                      onSelectJourney(j.id);
                      onClose();
                    }}
                    className={`w-full p-3 rounded border text-left transition-colors flex items-center justify-between ${
                      isSelected 
                        ? 'bg-[#F27D26]/10 border-[#F27D26]/40 text-[#F27D26]' 
                        : 'glass border-white/5 text-[#E5E5E1] opacity-70 hover:opacity-100 hover:border-white/20'
                    }`}
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="text-xs font-medium truncate serif">
                        {j.title}
                      </div>
                      <div className="text-[10px] text-[#A1A1A1] mono truncate">
                        {j.timeContext.location} ({j.timeContext.year > 0 ? `${j.timeContext.year} AD` : `${Math.abs(j.timeContext.year)} BC`})
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Historical Epoch Dest Catalog */}
          <div>
            <span className="mono text-[10px] uppercase tracking-[0.25em] text-[#A1A1A1] px-1 mb-2.5 block">
              Featured Horizons
            </span>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {destinations.map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    onNewJourney(d);
                    onClose();
                  }}
                  className="w-full p-2.5 rounded glass border-white/5 hover:border-[#F27D26]/40 hover:bg-white/[0.06] text-left transition-colors group flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#E5E5E1] group-hover:text-[#F27D26] serif">
                      {d.name}
                    </div>
                    <div className="text-[10px] text-[#A1A1A1] mono">
                      ~{d.goldenYear > 0 ? `${d.goldenYear} AD` : `${Math.abs(d.goldenYear)} BC`} • {d.era}
                    </div>
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#F27D26] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom System Status & Quick Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-[#050506]">
          {onSelectTab && (
            <button
              type="button"
              onClick={() => {
                onSelectTab('relics');
                onClose();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-gradient-to-r from-[#F27D26]/15 to-transparent border border-[#F27D26]/30 hover:border-[#F27D26]/60 text-xs mono uppercase tracking-wider text-[#F27D26] transition-all group"
            >
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-[#F27D26] group-hover:rotate-12 transition-transform" />
                <span className="font-bold">3D Relic Vault</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#F27D26]/60 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          <button
            type="button"
            onClick={onOpenKnowledgeBase}
            className="w-full flex items-center gap-2 p-2 rounded text-xs mono uppercase tracking-wider text-[#A1A1A1] hover:text-[#E5E5E1] hover:bg-white/5 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-[#F27D26]" />
            <span>Document Library</span>
          </button>

          <div className="w-full p-3 glass rounded-xl flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full border border-[#F27D26]/30 flex items-center justify-center mb-1.5">
              <span className="text-[#F27D26] text-sm">⚙</span>
            </div>
            <p className="text-[10px] uppercase tracking-tighter opacity-60">Temporal Engine Active</p>
            <div className="w-full h-[1px] bg-white/10 my-2"></div>
            <p className="text-[10px] mono text-[#F27D26] font-bold">LATENCY: 42ms • RAG ONLINE</p>
          </div>
        </div>
      </aside>
    </>
  );
};
