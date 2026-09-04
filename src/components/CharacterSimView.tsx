import React, { useState } from 'react';
import { HistoricalDestination, CharacterPersona } from '../types';
import { Users, Sparkles, MessageSquare, ShieldAlert, BookOpen, ArrowRight } from 'lucide-react';

interface CharacterSimViewProps {
  destinations: HistoricalDestination[];
  onStartPersonaChat: (persona: CharacterPersona) => void;
}

export const CharacterSimView: React.FC<CharacterSimViewProps> = ({
  destinations,
  onStartPersonaChat
}) => {
  // Collect all available personas across destinations plus curated figures
  const allPersonas: CharacterPersona[] = [];
  destinations.forEach(d => {
    d.characters.forEach(c => allPersonas.push(c));
  });

  const [selectedPersona, setSelectedPersona] = useState<CharacterPersona>(allPersonas[0]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-6 animate-fadeIn">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs mono uppercase tracking-[0.2em] text-[#F27D26]">
            <Users className="w-4 h-4" />
            PERSONA ARCHIVE
          </div>
          <h2 className="text-2xl md:text-3xl font-normal serif text-white mt-1">
            Historical Personas & Witnesses
          </h2>
          <p className="text-xs text-[#A1A1A1] font-sans mt-0.5">
            Engage with chroniclers, merchants, architects, and rulers constrained strictly by period worldview.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs mono text-[#A1A1A1]">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>Epistemic Period Guard Active</span>
        </div>
      </div>

      {/* Grid of Personas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allPersonas.map(persona => {
          const isSelected = selectedPersona?.id === persona.id;

          return (
            <div
              key={persona.id}
              onClick={() => setSelectedPersona(persona)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected 
                  ? 'glass border-[#F27D26] shadow-xl ring-1 ring-[#F27D26]/40' 
                  : 'glass border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] mono uppercase tracking-wider px-2 py-0.5 rounded border border-[#F27D26]/40 text-[#F27D26]">
                    {persona.location} • ~{persona.year > 0 ? `${persona.year} AD` : `${Math.abs(persona.year)} BC`}
                  </span>
                  <span className="text-[10px] mono uppercase tracking-wider text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded">
                    Simulated
                  </span>
                </div>

                <h3 className="text-xl serif font-normal text-white mt-2">
                  {persona.name}
                </h3>
                <p className="text-xs mono uppercase tracking-wider text-[#F27D26] mt-0.5">
                  {persona.role}
                </p>

                <p className="text-xs text-[#A1A1A1] font-sans mt-3 line-clamp-3 leading-relaxed">
                  {persona.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="text-[11px] serif italic text-[#A1A1A1]">
                  "{persona.sampleGreeting.substring(0, 80)}..."
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartPersonaChat(persona);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded bg-[#F27D26] hover:bg-[#ff8e38] text-black text-xs font-bold uppercase tracking-widest transition-transform active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Converse with {persona.name}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
