import React, { useState, useEffect } from 'react';
import { HistoricalDestination } from '../types';
import { ThreeTimePortal } from './ThreeTimePortal';
import { X, Sparkles, MapPin, Calendar, ArrowRight, FastForward } from 'lucide-react';

interface TimeJumpModalProps {
  destinations: HistoricalDestination[];
  isOpen: boolean;
  onClose: () => void;
  onExecuteJump: (destination: HistoricalDestination, year: number) => void;
}

export const TimeJumpModal: React.FC<TimeJumpModalProps> = ({
  destinations,
  isOpen,
  onClose,
  onExecuteJump
}) => {
  const [selectedDest, setSelectedDest] = useState<HistoricalDestination>(destinations[0] || null);
  const [selectedYear, setSelectedYear] = useState<number>(1500);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpCountdown, setJumpCountdown] = useState(3);

  useEffect(() => {
    if (selectedDest) {
      setSelectedYear(selectedDest.goldenYear);
    }
  }, [selectedDest]);

  if (!isOpen) return null;

  const handleStartJump = () => {
    setIsJumping(true);
    let count = 2;
    setJumpCountdown(count);

    const interval = setInterval(() => {
      count -= 1;
      setJumpCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        onExecuteJump(selectedDest, selectedYear);
        setIsJumping(false);
      }
    }, 900);
  };

  const handleSkip = () => {
    onExecuteJump(selectedDest, selectedYear);
    setIsJumping(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Cinematic Time Warp Transition Overlay when isJumping */}
      {isJumping ? (
        <div className="relative w-full max-w-2xl h-[520px] bg-[#0c0d14] border border-amber-500/40 rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center p-8 shadow-2xl">
          <div className="absolute inset-0 z-0">
            <ThreeTimePortal intensity={1.8} />
          </div>

          <div className="relative z-10 space-y-4 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              TEMPORAL ACCELERATION ENGAGED
            </div>
            <h2 className="text-3xl font-display font-bold text-white tracking-wider">
              WARPING TO {selectedDest.name.toUpperCase()}
            </h2>
            <p className="text-lg font-mono text-amber-400">
              TARGET ERA: {selectedYear > 0 ? `${selectedYear} AD` : `${Math.abs(selectedYear)} BC`} ({selectedDest.era})
            </p>
            <p className="text-xs text-zinc-400 font-serif italic">
              "Collapsing chronotons... Aligning historical vectors..."
            </p>

            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={handleSkip}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs transition-colors cursor-pointer"
              >
                <FastForward className="w-4 h-4" />
                <span>Skip Warp Animation</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Configuration Screen */
        <div className="relative w-full max-w-2xl bg-[#080809]/95 glass border border-white/15 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs mono uppercase tracking-[0.2em] text-[#F27D26]">
                <Sparkles className="w-4 h-4" />
                CHRONO TIME PORTAL
              </div>
              <h2 className="text-2xl font-normal serif text-white mt-1">
                Configure Your Historical Jump
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded text-[#A1A1A1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Select Destination */}
          <div className="my-5">
            <label className="block text-[10px] mono uppercase tracking-[0.2em] text-[#A1A1A1] mb-2.5">
              SELECT DESTINATION & ERA
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
              {destinations.map(d => {
                const isSelected = selectedDest?.id === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDest(d)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-white/[0.08] border-[#F27D26] shadow-md ring-1 ring-[#F27D26]/40' 
                        : 'glass border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-sm font-bold text-[#E5E5E1] serif">
                      <span>{d.name}</span>
                    </div>
                    <p className="text-[11px] text-[#F27D26] mono uppercase mt-1">
                      ~{d.goldenYear > 0 ? `${d.goldenYear} AD` : `${Math.abs(d.goldenYear)} BC`}
                    </p>
                    <p className="text-[10px] text-[#A1A1A1] truncate mt-0.5">
                      {d.era}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Year Scrubber */}
          {selectedDest && (
            <div className="my-5 p-4 rounded-xl bg-black/50 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs mono">
                <span className="text-[#A1A1A1] flex items-center gap-1.5 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-[#F27D26]" />
                  Temporal Calibration (Year):
                </span>
                <span className="text-sm font-bold text-[#F27D26]">
                  {selectedYear > 0 ? `${selectedYear} AD` : `${Math.abs(selectedYear)} BC`}
                </span>
              </div>
              <input
                type="range"
                min={selectedDest.yearRange[0]}
                max={selectedDest.yearRange[1]}
                value={selectedYear}
                onChange={e => setSelectedYear(parseInt(e.target.value, 10))}
                className="w-full accent-[#F27D26] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#A1A1A1] mono">
                <span>{selectedDest.yearRange[0] > 0 ? `${selectedDest.yearRange[0]} AD` : `${Math.abs(selectedDest.yearRange[0])} BC`}</span>
                <span className="text-[#F27D26]">Zenith: {selectedDest.goldenYear > 0 ? `${selectedDest.goldenYear} AD` : `${Math.abs(selectedDest.goldenYear)} BC`}</span>
                <span>{selectedDest.yearRange[1] > 0 ? `${selectedDest.yearRange[1]} AD` : `${Math.abs(selectedDest.yearRange[1])} BC`}</span>
              </div>
            </div>
          )}

          {/* Destination Preview Tagline */}
          {selectedDest && (
            <p className="text-xs serif italic text-[#A1A1A1] my-4 border-l-2 border-[#F27D26] pl-3 leading-relaxed">
              "{selectedDest.tagline}: {selectedDest.description}"
            </p>
          )}

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-xs mono uppercase tracking-wider text-[#A1A1A1] hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleStartJump}
              className="flex items-center gap-2 px-6 py-3 rounded bg-[#F27D26] hover:bg-[#ff8e38] text-black font-bold uppercase tracking-widest text-xs shadow-lg shadow-[#F27D26]/25 active:scale-95 transition-all cursor-pointer"
            >
              <span>Initiate Time Jump</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
