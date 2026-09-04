import React, { useState } from 'react';
import { HistoricalDestination } from '../types';
import { Calendar, ChevronRight, FastForward, Sparkles, MapPin } from 'lucide-react';

interface TimelineBarProps {
  destinations: HistoricalDestination[];
  currentYear: number;
  currentLocation: string;
  onSelectTimeEpoch: (location: string, year: number, era: string) => void;
  onOpenTimeJump: () => void;
}

export const TimelineBar: React.FC<TimelineBarProps> = ({
  destinations,
  currentYear,
  currentLocation,
  onSelectTimeEpoch,
  onOpenTimeJump
}) => {
  // Key timeline epochs across human history
  const timelineMilestones = [
    { label: '250 BC', year: -250, location: 'Alexandria', era: 'Hellenistic Era' },
    { label: '115 AD', year: 115, location: 'Rome', era: 'Pax Romana' },
    { label: '830 AD', year: 830, location: 'Baghdad', era: 'Abbasid Golden Age' },
    { label: '1500 AD', year: 1500, location: 'Hampi', era: 'Vijayanagara Empire' },
    { label: '1688 AD', year: 1688, location: 'Kyoto', era: 'Edo Period' },
    { label: '1890 AD', year: 1890, location: 'London', era: 'Victorian Era' },
    { label: 'TODAY', year: 2026, location: 'Modern World', era: 'Contemporary Era' }
  ];

  return (
    <div className="w-full bg-[#080809] border-y border-white/10 px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Current Temporal Anchor */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-7 h-7 rounded-full bg-[#F27D26]/10 border border-[#F27D26]/40 flex items-center justify-center text-[#F27D26]">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] mono uppercase tracking-[0.2em] text-[#A1A1A1] block">
              Temporal Anchor
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E5E5E1] mono">
              <span className="text-[#F27D26]">{currentLocation.toUpperCase()}</span>
              <span className="text-white/20">•</span>
              <span>{currentYear > 0 ? `${currentYear} AD` : `${Math.abs(currentYear)} BC`}</span>
            </div>
          </div>
        </div>

        {/* Physical Cinematic Interactive Timeline Track */}
        <div className="flex-1 w-full max-w-3xl overflow-x-auto py-1 scrollbar-none">
          <div className="relative flex items-center justify-between min-w-[560px] px-6">
            {/* Background connecting rail line with timeline gradient */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#F27D26] to-transparent opacity-40" />

            {timelineMilestones.map((m, idx) => {
              const isActive = Math.abs(m.year - currentYear) < 100 && (m.location.toLowerCase() === currentLocation.toLowerCase() || currentLocation === 'Modern World');

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectTimeEpoch(m.location, m.year, m.era)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer"
                >
                  <div 
                    className={`transition-all duration-200 flex items-center justify-center ${
                      isActive 
                        ? 'w-3.5 h-3.5 rounded-full border-2 border-[#F27D26] bg-black shadow-[0_0_10px_#F27D26] scale-110' 
                        : 'w-2 h-2 rounded-full border border-white/50 bg-black opacity-30 group-hover:opacity-100 group-hover:border-[#F27D26]'
                    }`}
                  >
                    {isActive && <div className="w-1 h-1 rounded-full bg-[#F27D26]" />}
                  </div>
                  <span className={`text-[10px] mono uppercase tracking-wider mt-2 transition-colors whitespace-nowrap ${
                    isActive ? 'text-[#F27D26] font-bold' : 'text-[#E5E5E1] opacity-40 group-hover:opacity-100'
                  }`}>
                    {m.label}
                  </span>
                  <span className="text-[9px] mono uppercase tracking-tight text-zinc-500 hidden sm:block truncate max-w-[80px]">
                    {m.location}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Jump button */}
        <button
          type="button"
          onClick={onOpenTimeJump}
          className="flex items-center gap-2 px-4 py-1.5 glass rounded text-[#E5E5E1] hover:text-white hover:border-[#F27D26]/50 text-xs mono uppercase tracking-wider transition-all active:scale-95 shrink-0 group"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F27D26] group-hover:scale-110 transition-transform" />
          <span>Epoch Select</span>
        </button>
      </div>
    </div>
  );
};
