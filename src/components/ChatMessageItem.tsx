import React, { useState } from 'react';
import { ChatMessage, Citation } from '../types';
import { AgentActivity } from './AgentActivity';
import { 
  User, 
  Hourglass, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  Compass, 
  Network,
  Share2,
  Copy,
  Check
} from 'lucide-react';

interface ChatMessageItemProps {
  message: ChatMessage;
  onSelectCitation: (citation: Citation) => void;
  onSelectSuggestedQuestion?: (question: string) => void;
  onSelectEntity?: (entityName: string) => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onSelectCitation,
  onSelectSuggestedQuestion,
  onSelectEntity
}) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <div className="flex justify-end my-6 animate-fadeIn">
        <div className="max-w-2xl glass border border-white/10 text-[#E5E5E1] rounded-2xl rounded-tr-none px-6 py-4 shadow-lg">
          <p className="serif italic text-base md:text-lg leading-relaxed whitespace-pre-wrap">
            "{message.content}"
          </p>
          <span className="block text-right text-[10px] text-[#A1A1A1] mono uppercase tracking-wider mt-2">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    );
  }

  // Certainty visual styling
  const certainty = message.certainty || 'VERIFIED';
  const certaintyBadge = {
    VERIFIED: {
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      label: '● VERIFIED FACT',
      desc: 'Corroborated by archaeological or primary chronicle evidence'
    },
    RECONSTRUCTION: {
      color: 'bg-[#F27D26]/10 text-[#F27D26] border-[#F27D26]/30',
      label: '● HISTORICAL RECONSTRUCTION',
      desc: 'Plausible experiential synthesis based on period material culture'
    },
    SIMULATION: {
      color: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      label: '● FIRST-PERSON SIMULATION',
      desc: 'First-person historical persona roleplay grounded in RAG'
    }
  }[certainty];

  // Render markdown-like text with clickable citations
  const renderFormattedContent = (content: string) => {
    // Split by citation brackets [1], [2], [3]
    const parts = content.split(/(\[\d+\])/g);

    return parts.map((part, i) => {
      const match = part.match(/^\[(\d+)\]$/);
      if (match) {
        const citeIndex = parseInt(match[1], 10);
        const cite = message.citations?.find(c => c.index === citeIndex);

        return (
          <button
            key={i}
            type="button"
            onClick={() => cite && onSelectCitation(cite)}
            className="inline-flex items-center px-1.5 py-0.5 mx-0.5 text-xs mono font-bold rounded bg-[#F27D26]/20 hover:bg-[#F27D26]/40 text-[#F27D26] border border-[#F27D26]/40 transition-transform active:scale-95 cursor-pointer shadow-sm align-baseline"
            title={cite ? `${cite.title} (${cite.sourceType})` : `Citation ${citeIndex}`}
          >
            [{citeIndex}]
          </button>
        );
      }

      // Handle simple markdown headings or bolding within non-citation segments
      return <span key={i}>{formatInlineMarkdown(part)}</span>;
    });
  };

  const formatInlineMarkdown = (text: string) => {
    // Process markdown headers and lists
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-lg md:text-xl font-bold text-[#F27D26] mt-5 mb-2.5 serif">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('#### ')) {
        return (
          <h4 key={idx} className="text-base font-semibold text-[#E5E5E1] mt-4 mb-2 serif">
            {line.replace('#### ', '')}
          </h4>
        );
      }
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-sm md:text-base text-zinc-300 my-1 leading-relaxed">
            {line.replace(/^[•-]\s+/, '')}
          </li>
        );
      }

      // Handle bold text **text**
      const boldParts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={idx} className="block mb-2.5 text-sm md:text-base leading-relaxed text-[#E5E5E1]">
          {boldParts.map((bp, bidx) => {
            if (bp.startsWith('**') && bp.endsWith('**')) {
              return <strong key={bidx} className="font-bold text-white">{bp.slice(2, -2)}</strong>;
            }
            return bp;
          })}
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col my-6 max-w-3xl animate-fadeIn">
      {/* Bot Identity Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#F27D26] text-black font-bold flex items-center justify-center mono text-xs shadow-md">
            CH
          </div>
          <div>
            <span className="text-sm font-bold text-[#E5E5E1] serif tracking-wide">
              {message.characterPersona ? message.characterPersona.name : 'CHRONO Engine'}
            </span>
            {message.characterPersona && (
              <span className="text-[11px] text-[#F27D26] mono ml-2">
                ({message.characterPersona.role})
              </span>
            )}
          </div>
        </div>

        {/* Temporal chip & Certainty tag */}
        <div className="flex items-center gap-2">
          {message.timeContext && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] mono glass border-white/10 text-[#E5E5E1]">
              <MapPin className="w-3 h-3 text-[#F27D26]" />
              <span className="font-bold">{message.timeContext.location.toUpperCase()}</span>
              <span className="text-white/20">|</span>
              <span className="text-[#F27D26]">{message.timeContext.year > 0 ? `${message.timeContext.year} AD` : `${Math.abs(message.timeContext.year)} BC`}</span>
            </div>
          )}

          <div 
            className={`px-3 py-1 rounded-full text-[10px] mono font-medium border ${certaintyBadge.color}`}
            title={certaintyBadge.desc}
          >
            {certaintyBadge.label}
          </div>
        </div>
      </div>

      {/* Agent Activity Steps Accordion */}
      {message.agentSteps && message.agentSteps.length > 0 && (
        <AgentActivity 
          steps={message.agentSteps} 
          isComplete={!message.isStreaming} 
        />
      )}

      {/* Main Message Card with Bold Typography and left accent border */}
      <div className="relative glass border border-white/10 border-l-2 border-l-[#F27D26] rounded-2xl rounded-tl-none p-6 md:p-8 shadow-xl">
        <div className="prose prose-invert max-w-none text-[#E5E5E1]">
          {renderFormattedContent(message.content)}
        </div>

        {/* Supporting Citations Bar */}
        {message.citations && message.citations.length > 0 && (
          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs mono uppercase tracking-[0.2em] text-[#F27D26] flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Historical Evidence & Sources ({message.citations.length})
              </span>
              <span className="text-[10px] text-[#A1A1A1] mono">
                Click excerpt to verify
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
              {message.citations.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onSelectCitation(c)}
                  className="flex items-start gap-2.5 p-3 rounded glass border-white/10 hover:border-[#F27D26]/50 text-left transition-colors group cursor-pointer"
                >
                  <span className="text-xs mono font-bold text-[#F27D26] bg-[#F27D26]/10 border border-[#F27D26]/30 px-1.5 py-0.5 rounded shrink-0">
                    [{c.index}]
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#E5E5E1] truncate group-hover:text-[#F27D26] serif">
                      {c.title}
                    </p>
                    <p className="text-[10px] text-[#A1A1A1] mono truncate mt-0.5">
                      {c.sourceType} • {c.location}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Knowledge Graph Entity Tags */}
        {message.graphEntities && message.graphEntities.length > 0 && (
          <div className="mt-5 pt-3 border-t border-white/5 flex flex-wrap items-center gap-2">
            <span className="text-[11px] mono uppercase tracking-wider text-[#A1A1A1] flex items-center gap-1.5 mr-1">
              <Network className="w-3.5 h-3.5 text-[#F27D26]" />
              Entities:
            </span>
            {message.graphEntities.map((e, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectEntity?.(e.name)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] mono bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/25 hover:bg-[#F27D26]/20 transition-colors"
                title={e.relationship}
              >
                {e.name}
              </button>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-5 pt-3 flex items-center justify-between text-[11px] text-[#A1A1A1] border-t border-white/5">
          <span className="mono">
            {message.certaintyExplanation || 'Grounded in historiographical records'}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded glass hover:border-[#F27D26]/40 text-[#E5E5E1] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="mono text-[10px] uppercase">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Suggested Follow-up Prompts */}
      {message.suggestedQuestions && message.suggestedQuestions.length > 0 && !message.isStreaming && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] mono uppercase tracking-wider text-[#A1A1A1] flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#F27D26]" />
            Explore Further:
          </span>
          {message.suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSuggestedQuestion?.(q)}
              className="px-3.5 py-2 rounded glass hover:border-[#F27D26]/50 text-xs text-[#E5E5E1] hover:text-[#F27D26] transition-all text-left flex items-center gap-2"
            >
              <span>{q}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#F27D26]/70" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
