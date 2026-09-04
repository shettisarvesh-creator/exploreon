import React from 'react';
import { Citation } from '../types';
import { X, BookOpen, ExternalLink, ShieldCheck, Calendar, MapPin, CheckCircle } from 'lucide-react';

interface CitationModalProps {
  citation: Citation | null;
  onClose: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({ citation, onClose }) => {
  if (!citation) return null;

  const yearRange = citation.yearStart === citation.yearEnd 
    ? (citation.yearStart > 0 ? `${citation.yearStart} AD` : `${Math.abs(citation.yearStart)} BC`)
    : `${citation.yearStart > 0 ? citation.yearStart + ' AD' : Math.abs(citation.yearStart) + ' BC'} – ${citation.yearEnd > 0 ? citation.yearEnd + ' AD' : Math.abs(citation.yearEnd) + ' BC'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl glass bg-[#080809]/95 border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#F27D26]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F27D26]/15 border border-[#F27D26]/30 flex items-center justify-center text-[#F27D26]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] mono uppercase tracking-[0.2em] text-[#F27D26]">
                SUPPORTING CITATION [{citation.index}]
              </span>
              <h3 className="text-lg font-normal serif text-[#E5E5E1] line-clamp-2 mt-0.5">
                {citation.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded text-[#A1A1A1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metadata badges */}
        <div className="flex flex-wrap items-center gap-2 my-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs mono uppercase tracking-wider bg-white/5 border border-white/10 text-[#E5E5E1]">
            <MapPin className="w-3.5 h-3.5 text-[#F27D26]" />
            {citation.location}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs mono uppercase tracking-wider bg-white/5 border border-white/10 text-[#E5E5E1]">
            <Calendar className="w-3.5 h-3.5 text-[#F27D26]" />
            {yearRange}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs mono uppercase tracking-wider border border-[#F27D26]/40 text-[#F27D26]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F27D26]" />
            {citation.sourceType}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs mono uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CheckCircle className="w-3 h-3" />
            {citation.reliability === 'high' ? 'High Reliability' : 'Medium Reliability'}
          </span>
        </div>

        {/* Snippet / Passage */}
        <div className="my-4">
          <label className="block text-[10px] mono uppercase tracking-[0.2em] text-[#A1A1A1] mb-1.5">
            HISTORICAL EXCERPT & EVIDENCE
          </label>
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 serif italic text-sm leading-relaxed text-[#E5E5E1]">
            "{citation.snippet}"
          </div>
        </div>

        {/* Why it supports */}
        {citation.whyItSupports && (
          <div className="my-4">
            <label className="block text-[10px] mono uppercase tracking-[0.2em] text-[#A1A1A1] mb-1">
              GROUNDING RATIONALE
            </label>
            <p className="text-xs text-zinc-300 font-sans leading-normal">
              {citation.whyItSupports}
            </p>
          </div>
        )}

        {/* Source citation string */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#A1A1A1]">
          <span className="truncate pr-4 mono text-[11px]">
            Archive: <strong className="text-[#E5E5E1] font-sans">{citation.source}</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded bg-[#F27D26] hover:bg-[#ff8e38] text-black font-bold uppercase tracking-widest text-xs transition-transform active:scale-95 shrink-0"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
