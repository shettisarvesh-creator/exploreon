import React, { useState } from 'react';
import { AgentActivityStep } from '../types';
import { CheckCircle2, Circle, Loader2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface AgentActivityProps {
  steps: AgentActivityStep[];
  isComplete: boolean;
}

export const AgentActivity: React.FC<AgentActivityProps> = ({ steps, isComplete }) => {
  const [isExpanded, setIsExpanded] = useState(!isComplete);

  if (!steps || steps.length === 0) return null;

  return (
    <div className="my-3 rounded-xl border border-amber-500/20 bg-[#12141c]/90 shadow-lg backdrop-blur-md overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping absolute" />
            <span className="h-2 w-2 rounded-full bg-amber-500 relative" />
          </div>
          <span className="text-xs font-mono font-medium tracking-wider uppercase text-amber-300/90 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            CHRONO Intelligence Pipeline
          </span>
          {isComplete && (
            <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
              Complete
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
          <span>{isExpanded ? 'Collapse' : 'Inspect routing'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-3.5 pt-1 space-y-2 border-t border-white/[0.05]">
          {steps.map((s, idx) => {
            const isFinished = s.status === 'completed';
            const isInProgress = s.status === 'in_progress';

            return (
              <div key={idx} className="flex items-start gap-2.5 text-xs">
                <div className="mt-0.5 flex-shrink-0">
                  {isFinished ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isInProgress ? (
                    <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-zinc-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${isFinished ? 'text-zinc-300' : isInProgress ? 'text-amber-200' : 'text-zinc-500'}`}>
                      {s.label}
                    </span>
                    {isInProgress && (
                      <span className="text-[10px] text-amber-400 font-mono animate-pulse">
                        Active
                      </span>
                    )}
                  </div>
                  {s.details && (
                    <p className="text-[11px] text-zinc-400 font-mono mt-0.5 truncate">
                      {s.details}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
