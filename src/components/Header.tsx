import React from 'react';
import { 
  Hourglass, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Clock, 
  ArrowLeftRight, 
  Compass, 
  Network, 
  Users, 
  BookOpen, 
  Sparkles, 
  Menu,
  X,
  Box
} from 'lucide-react';
import { HistoricalTimeContext } from '../types';

interface HeaderProps {
  currentContext: HistoricalTimeContext;
  currentTab: 'chat' | 'timeline' | 'past-vs-present' | 'map' | 'graph' | 'personas' | 'relics';
  onSelectTab: (tab: 'chat' | 'timeline' | 'past-vs-present' | 'map' | 'graph' | 'personas' | 'relics') => void;
  onOpenTimeJump: () => void;
  onOpenKnowledgeBase: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentContext,
  currentTab,
  onSelectTab,
  onOpenTimeJump,
  onOpenKnowledgeBase,
  isSidebarOpen,
  onToggleSidebar
}) => {
  const tabs = [
    { id: 'chat', label: 'Time Chat', icon: MessageSquare },
    { id: 'relics', label: '3D Relics', icon: Box },
    { id: 'past-vs-present', label: 'Past vs Present', icon: ArrowLeftRight },
    { id: 'map', label: 'Cartography', icon: Compass },
    { id: 'graph', label: 'Knowledge Graph', icon: Network },
    { id: 'personas', label: 'Characters', icon: Users },
  ] as const;

  const yearDisplay = currentContext.year > 0 
    ? `${currentContext.year} AD` 
    : `${Math.abs(currentContext.year)} BC`;

  return (
    <header className="w-full bg-[#050506] border-b border-white/10 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand & Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-zinc-400 hover:text-[#E5E5E1] hover:bg-white/5 transition-colors lg:hidden"
            aria-label="Toggle navigation drawer"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div 
            onClick={() => onSelectTab('chat')} 
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-full bg-[#F27D26]/10 border border-[#F27D26]/40 flex items-center justify-center text-[#F27D26] group-hover:scale-105 transition-transform">
              <Hourglass className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="serif text-2xl font-bold tracking-tighter text-[#F27D26] accent-glow">
                  ⏳ CHRONO
                </span>
              </div>
              <p className="text-[10px] text-[#A1A1A1] mono uppercase tracking-[0.2em] hidden sm:block">
                HISTORICAL TEMPORAL ENGINE
              </p>
            </div>
          </div>
        </div>

        {/* Center: Navigation Tabs (Bold uppercase tracking-widest design) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-widest transition-all rounded-md ${
                  isActive 
                    ? 'text-[#F27D26] font-bold bg-[#F27D26]/10 border border-[#F27D26]/30' 
                    : 'text-[#E5E5E1] opacity-60 hover:opacity-100 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Temporal Link Status & Temporal Anchor Chip */}
        <div className="flex items-center space-x-3">
          {/* Status Indicator from design */}
          <div className="hidden lg:flex px-3.5 py-1.5 glass rounded-full items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="mono text-[10px] uppercase tracking-wider text-emerald-400">Link: Stable</span>
          </div>

          {/* Clickable Active Time Anchor Chip */}
          <button
            type="button"
            onClick={onOpenTimeJump}
            title="Click to change destination or year"
            className="flex items-center gap-2 px-3.5 py-1.5 glass rounded-full hover:border-[#F27D26]/50 text-[#E5E5E1] font-mono text-xs transition-all group cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#F27D26] group-hover:scale-110 transition-transform" />
            <span className="font-bold tracking-wider">{currentContext.location.toUpperCase()}</span>
            <span className="text-white/20">|</span>
            <span className="text-[#F27D26]">{yearDisplay}</span>
          </button>

          {/* Sources / Evidence Library Button */}
          <button
            type="button"
            onClick={onOpenKnowledgeBase}
            title="Evidence Archive & Documents"
            className="p-2 glass rounded-full text-zinc-300 hover:text-[#F27D26] hover:border-[#F27D26]/40 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Time Jump button */}
          <button
            type="button"
            onClick={onOpenTimeJump}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-[#F27D26] text-black text-xs font-bold uppercase tracking-widest rounded transition-transform active:scale-95 hover:bg-[#ff8e38] shadow-md shadow-[#F27D26]/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>JUMP</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="flex md:hidden items-center justify-around px-2 py-2 bg-[#080809] border-t border-white/10 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded text-[10px] mono uppercase tracking-wider transition-colors ${
                isActive ? 'text-[#F27D26] font-bold' : 'text-zinc-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
