import React, { useState } from 'react';
import { HistoricalDestination } from '../types';
import { ArrowLeftRight, Clock, MapPin, Sparkles, Building2, Landmark, CheckCircle2 } from 'lucide-react';

interface PastVsPresentViewProps {
  destinations: HistoricalDestination[];
  currentLocation: string;
  onJumpToEra: (location: string, year: number, era: string) => void;
}

export const PastVsPresentView: React.FC<PastVsPresentViewProps> = ({
  destinations,
  currentLocation,
  onJumpToEra
}) => {
  const [selectedDestId, setSelectedDestId] = useState<string>(
    destinations.find(d => d.name.toLowerCase().includes(currentLocation.toLowerCase()))?.id || destinations[0]?.id || 'hampi'
  );
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100

  const dest = destinations.find(d => d.id === selectedDestId) || destinations[0];
  if (!dest) return null;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-6 animate-fadeIn">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs mono uppercase tracking-[0.2em] text-[#F27D26]">
            <ArrowLeftRight className="w-4 h-4" />
            CHRONO COMPARISON
          </div>
          <h2 className="text-2xl md:text-3xl font-normal serif text-white mt-1">
            Past vs. Present Epoch Contrast
          </h2>
          <p className="text-xs text-[#A1A1A1] font-sans mt-0.5">
            Compare modern preserved ruins with archaeological reconstructions of the zenith era.
          </p>
        </div>

        {/* Destination picker */}
        <select
          value={selectedDestId}
          onChange={e => setSelectedDestId(e.target.value)}
          className="glass border border-white/15 text-[#E5E5E1] text-xs mono rounded px-3.5 py-2.5 focus:outline-none focus:border-[#F27D26]"
        >
          {destinations.map(d => (
            <option key={d.id} value={d.id} className="bg-[#080809] text-[#E5E5E1]">
              {d.name} ({d.goldenYear > 0 ? `${d.goldenYear} AD` : `${Math.abs(d.goldenYear)} BC`} vs Today)
            </option>
          ))}
        </select>
      </div>

      {/* Interactive Draggable Split View Box */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black select-none">
        {/* Modern Layer (Right side / Full underlayer) */}
        <div className="absolute inset-0 bg-[#080809] p-8 flex flex-col justify-between">
          <div className="flex justify-end">
            <span className="px-3.5 py-1 rounded-full text-xs mono uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5" />
              MODERN STATE (2026 AD)
            </span>
          </div>
          <div className="max-w-md ml-auto text-right space-y-2">
            <h3 className="text-xl serif font-bold text-white">
              {dest.name} Today
            </h3>
            <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed">
              {dest.pastVsPresent.present || dest.pastVsPresent.modernOverview}
            </p>
            <div className="inline-flex items-center gap-1 text-[11px] mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Protected Heritage Site & Living Community
            </div>
          </div>
        </div>

        {/* Ancient Historical Layer (Left side / Clipped overlayer) */}
        <div 
          className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br from-[#1c120c] via-[#120e0a] to-[#080809] p-8 flex flex-col justify-between border-r-2 border-[#F27D26] shadow-2xl transition-all"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="flex justify-start">
            <span className="px-3.5 py-1 rounded-full text-xs mono uppercase tracking-wider bg-[#F27D26]/20 text-[#F27D26] border border-[#F27D26]/40 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              ZENITH ERA (~{dest.goldenYear > 0 ? `${dest.goldenYear} AD` : `${Math.abs(dest.goldenYear)} BC`})
            </span>
          </div>
          <div className="max-w-md text-left space-y-2">
            <h3 className="text-xl serif font-bold text-[#F27D26]">
              Imperial {dest.name}
            </h3>
            <p className="text-xs md:text-sm text-amber-100/90 serif italic leading-relaxed">
              {dest.pastVsPresent.past || dest.pastVsPresent.pastOverview}
            </p>
            <div className="inline-flex items-center gap-1 text-[11px] mono text-[#F27D26]">
              <Sparkles className="w-3.5 h-3.5" />
              {dest.era}
            </div>
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-[#F27D26] pointer-events-none flex items-center justify-center -ml-0.5"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-[#F27D26] text-black shadow-lg flex items-center justify-center font-bold text-xs">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>

        {/* Native range input overlay for accessible dragging */}
        <input
          type="range"
          min="5"
          max="95"
          value={sliderPos}
          onChange={e => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
          aria-label="Drag to compare past versus present"
        />
      </div>

      <p className="text-center text-xs mono uppercase tracking-wider text-[#A1A1A1]">
        Drag slider left or right to reveal archaeological reconstruction versus modern landscape
      </p>

      {/* Side by Side Detailed Historiographical Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ancient Details */}
        <div className="p-6 rounded-xl glass border-l-2 border-[#F27D26] space-y-3">
          <div className="flex items-center gap-2 text-xs mono uppercase tracking-wider text-[#F27D26]">
            <Clock className="w-4 h-4" />
            HISTORICAL REALITY (~{dest.goldenYear > 0 ? `${dest.goldenYear} AD` : `${Math.abs(dest.goldenYear)} BC`})
          </div>
          <h4 className="text-base font-bold serif text-[#E5E5E1]">
            {dest.era}
          </h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {dest.pastVsPresent.past || dest.pastVsPresent.pastOverview}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onJumpToEra(dest.name, dest.goldenYear, dest.era)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#F27D26] hover:bg-[#ff8e38] text-black text-xs font-bold uppercase tracking-widest transition-transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Chat about {dest.name}
            </button>
          </div>
        </div>

        {/* Modern Details */}
        <div className="p-6 rounded-xl glass border-l-2 border-emerald-500/60 space-y-3">
          <div className="flex items-center gap-2 text-xs mono uppercase tracking-wider text-emerald-400">
            <Landmark className="w-4 h-4" />
            ARCHAEOLOGICAL STATUS TODAY (2026)
          </div>
          <h4 className="text-base font-bold serif text-[#E5E5E1]">
            Present Day {dest.name}
          </h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {dest.pastVsPresent.present || dest.pastVsPresent.modernOverview}
          </p>
          <div className="pt-2">
            <span className="text-xs mono text-[#A1A1A1]">
              Coordinates: {dest.coordinates[0].toFixed(2)}°N, {dest.coordinates[1].toFixed(2)}°E
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
