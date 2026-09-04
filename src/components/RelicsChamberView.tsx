import React, { useState } from 'react';
import { 
  Box, 
  RotateCcw, 
  Play, 
  Pause, 
  Sparkles, 
  Eye, 
  EyeOff,
  Compass, 
  Layers, 
  ChevronRight, 
  Info, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Maximize2,
  X,
  ListFilter
} from 'lucide-react';
import { HISTORICAL_RELICS, Historical3DRelic, RelicHotspot } from '../data/relicsData';
import { ThreeRelicCanvas, RenderMode } from './ThreeRelicCanvas';
import { HistoricalDestination } from '../types';

interface RelicsChamberViewProps {
  destinations: HistoricalDestination[];
  currentLocation?: string;
  onTimeJumpToRelic: (location: string, year: number, era: string, prompt?: string) => void;
}

export const RelicsChamberView: React.FC<RelicsChamberViewProps> = ({
  destinations,
  currentLocation,
  onTimeJumpToRelic,
}) => {
  // Find initial relic based on current location if possible, otherwise default to first
  const initialRelic = HISTORICAL_RELICS.find(
    (r) => r.location.toLowerCase() === currentLocation?.toLowerCase()
  ) || HISTORICAL_RELICS[0];

  const [selectedRelic, setSelectedRelic] = useState<Historical3DRelic>(initialRelic);
  const [renderMode, setRenderMode] = useState<RenderMode>('material');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.0);
  const [selectedHotspot, setSelectedHotspot] = useState<RelicHotspot | null>(
    selectedRelic.hotspots[0] || null
  );
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(true);
  // Default to side guide open and canvas pins disabled so the 3D sculpture view is 100% unobstructed
  const [showSideGuide, setShowSideGuide] = useState<boolean>(true);
  const [showCanvasPins, setShowCanvasPins] = useState<boolean>(false);

  const handleSelectRelic = (relic: Historical3DRelic) => {
    setSelectedRelic(relic);
    setSelectedHotspot(relic.hotspots[0] || null);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#050506] overflow-hidden text-[#E5E5E1]">
      {/* Top Header Bar */}
      <div className="border-b border-white/10 px-4 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 bg-[#080809]/90 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F27D26]/10 border border-[#F27D26]/30 flex items-center justify-center text-[#F27D26]">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold serif tracking-tight text-white">
                3D HISTORICAL RELIC VAULT
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] mono uppercase bg-[#F27D26]/20 text-[#F27D26] border border-[#F27D26]/40">
                Interactive Three.js
              </span>
            </div>
            <p className="text-xs text-[#A1A1A1] mono">
              Procedural architectural reconstructions & mechanical simulations across eras
            </p>
          </div>
        </div>

        {/* Action button to jump directly to this era in chat */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() =>
              onTimeJumpToRelic(
                selectedRelic.location,
                selectedRelic.year,
                selectedRelic.era,
                selectedRelic.suggestedPrompt
              )
            }
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F27D26] hover:bg-[#ff8e38] text-black text-xs font-bold uppercase tracking-wider transition-transform active:scale-95 shadow-md shadow-[#F27D26]/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Time Travel to this Era</span>
          </button>
        </div>
      </div>

      {/* Relic Selection Ribbon */}
      <div className="border-b border-white/10 bg-[#09090b] px-4 md:px-8 py-2.5 overflow-x-auto shrink-0 flex items-center gap-2 scrollbar-none">
        <span className="text-[11px] mono uppercase tracking-wider text-zinc-400 mr-2 shrink-0 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#F27D26]" />
          Select Relic:
        </span>
        {HISTORICAL_RELICS.map((relic) => {
          const isSelected = selectedRelic.id === relic.id;
          return (
            <button
              key={relic.id}
              type="button"
              onClick={() => handleSelectRelic(relic)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 border ${
                isSelected
                  ? 'bg-white/10 text-white border-[#F27D26] shadow-sm'
                  : 'bg-white/5 text-zinc-300 border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: relic.accentColor }}
              />
              <span className="font-semibold">{relic.name}</span>
              <span className="text-[10px] text-zinc-400 opacity-80">({relic.yearDisplay})</span>
            </button>
          );
        })}
      </div>

      {/* Main Relic Inspection Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden relative">
        {/* 3D Canvas Stage */}
        <div className="flex-1 min-h-[380px] lg:min-h-0 relative flex flex-col bg-radial from-[#121216] via-[#08080a] to-[#040405] overflow-hidden">
          {/* 3D Render Controls Bar (Floating at top of stage) */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2.5 pointer-events-none">
            {/* Left Controls: Render Mode Switcher & Side Guide Toggle */}
            <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md shadow-lg">
                {(
                  [
                    { id: 'material', label: 'Material Reality', icon: Eye },
                    { id: 'hologram', label: 'Temporal Hologram', icon: Sparkles },
                    { id: 'xray', label: 'Architectural X-Ray', icon: Layers },
                  ] as const
                ).map((mode) => {
                  const Icon = mode.icon;
                  const isActive = renderMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setRenderMode(mode.id)}
                      className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        isActive
                          ? 'bg-[#F27D26] text-black font-bold shadow-md'
                          : 'text-zinc-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{mode.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Toggle Side Anatomy Guide */}
              <button
                type="button"
                onClick={() => setShowSideGuide(!showSideGuide)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all border backdrop-blur-md shadow-lg ${
                  showSideGuide
                    ? 'bg-[#F27D26]/15 border-[#F27D26]/50 text-[#F27D26] font-bold'
                    : 'bg-black/75 border-white/10 text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
                title="Toggle Side Identification Guide (shows numbered parts safely on the side)"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Side Guide</span>
              </button>

              {/* View Clarity Mode Toggle: 100% Unobstructed Sight vs Subtle Pins */}
              <button
                type="button"
                onClick={() => setShowCanvasPins(!showCanvasPins)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all border backdrop-blur-md shadow-lg ${
                  !showCanvasPins
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold'
                    : 'bg-black/75 border-white/10 text-zinc-300 hover:text-white'
                }`}
                title={
                  !showCanvasPins
                    ? 'Sight is 100% Unobstructed (Zero letters or markers covering the sculpture)'
                    : 'Showing subtle number badges on 3D coordinates'
                }
              >
                {!showCanvasPins ? (
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-zinc-400" />
                )}
                <span className="hidden sm:inline">
                  {!showCanvasPins ? 'Clean Sight (Unobstructed)' : 'Pins Enabled'}
                </span>
              </button>
            </div>

            {/* Right Controls: Rotation & Animation Controls */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md shadow-lg pointer-events-auto">
              <button
                type="button"
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  autoRotate
                    ? 'bg-white/15 text-[#F27D26] font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title={autoRotate ? 'Pause Rotation' : 'Resume Auto-Rotation'}
              >
                {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{autoRotate ? 'Rotating' : 'Paused'}</span>
              </button>

              <div className="flex items-center gap-1 px-2 border-l border-white/10 text-xs font-mono text-zinc-400">
                <span className="text-[10px]">Speed:</span>
                {[0.5, 1.0, 2.0].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRotationSpeed(s)}
                    className={`px-1.5 py-0.5 rounded text-[10px] ${
                      rotationSpeed === s
                        ? 'bg-[#F27D26] text-black font-bold'
                        : 'hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsDossierOpen(!isDossierOpen)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/10 lg:hidden"
                title="Toggle Archaeological Dossier"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Three.js Canvas with Unobstructed View */}
          <div className="flex-1 w-full h-full relative">
            <ThreeRelicCanvas
              relic={selectedRelic}
              renderMode={renderMode}
              autoRotate={autoRotate}
              rotationSpeed={rotationSpeed}
              selectedHotspotId={selectedHotspot?.id}
              onSelectHotspot={(h) => setSelectedHotspot(h)}
              showCanvasMarkers={showCanvasPins}
            />

            {/* SIDE ANATOMY & IDENTIFICATION GUIDE: Placed safely to the side so the 3D sculpture is 100% visible */}
            {showSideGuide ? (
              <div className="absolute left-4 top-16 bottom-14 z-20 w-64 sm:w-72 flex flex-col bg-[#08080a]/92 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl overflow-hidden pointer-events-auto">
                {/* Side Guide Header */}
                <div className="p-3 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#F27D26]/15 border border-[#F27D26]/30 flex items-center justify-center text-[#F27D26]">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white">
                        Side Feature Guide
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-mono">
                        Identified parts (Sculpture clear)
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSideGuide(false)}
                    className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Collapse Side Guide"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Side Guide Scrollable Feature List */}
                <div className="flex-1 overflow-y-auto p-2.5 space-y-2 scrollbar-thin">
                  <div className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider px-1 flex items-center justify-between">
                    <span>Key Architectural Parts</span>
                    <span className="text-emerald-400">● Unblocked</span>
                  </div>

                  {selectedRelic.hotspots.map((spot, idx) => {
                    const isSelected = selectedHotspot?.id === spot.id;
                    return (
                      <button
                        key={spot.id}
                        type="button"
                        onClick={() => setSelectedHotspot(spot)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 group ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-lg'
                            : 'bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <span
                          className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold mt-0.5 transition-all ${
                            isSelected
                              ? 'bg-amber-400 text-black shadow-md shadow-amber-400/30'
                              : 'bg-white/10 text-zinc-400 group-hover:bg-white/20 group-hover:text-white'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className={`text-xs font-bold font-mono truncate ${
                              isSelected ? 'text-amber-300' : 'text-zinc-200 group-hover:text-white'
                            }`}>
                              {spot.name}
                            </h5>
                            {isSelected && (
                              <Sparkles className="w-3 h-3 text-amber-400 shrink-0 ml-1" />
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5 font-sans leading-relaxed">
                            {spot.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Side Guide Status Footer */}
                <div className="p-2 border-t border-white/10 bg-black/40 text-[10px] text-zinc-400 font-mono flex items-center gap-1.5 justify-center shrink-0">
                  <Eye className="w-3 h-3 text-emerald-400" />
                  <span>Center 3D sight is completely open</span>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowSideGuide(true)}
                className="absolute left-4 top-16 z-20 flex items-center gap-2 px-3 py-2 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md text-xs font-mono text-zinc-300 hover:text-white hover:border-[#F27D26]/50 shadow-xl pointer-events-auto transition-all"
                title="Open Side Feature Guide"
              >
                <Layers className="w-3.5 h-3.5 text-[#F27D26]" />
                <span>Show Side Guide ({selectedRelic.hotspots.length})</span>
              </button>
            )}
          </div>

          {/* Bottom Interactive Hotspot Strip */}
          <div className="border-t border-white/10 bg-[#080809]/80 backdrop-blur-md px-4 py-2.5 flex items-center justify-between gap-3 shrink-0 z-10">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[10px] mono uppercase tracking-wider text-[#F27D26] font-bold shrink-0">
                Architectural Parts:
              </span>
              {selectedRelic.hotspots.map((spot, idx) => {
                const isSelected = selectedHotspot?.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setSelectedHotspot(spot)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all shrink-0 ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                        : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white border border-transparent'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white/10 text-[9px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{spot.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>3D Sight Unobstructed</span>
            </div>
          </div>
        </div>

        {/* Right Archaeological Dossier Drawer */}
        <div
          className={`w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#09090b] flex flex-col min-h-0 overflow-y-auto transition-all ${
            isDossierOpen ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Dossier Header */}
          <div className="p-5 border-b border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span
                className="px-2.5 py-0.5 rounded text-[10px] mono uppercase font-bold tracking-wider"
                style={{
                  backgroundColor: `${selectedRelic.accentColor}20`,
                  color: selectedRelic.accentColor,
                  border: `1px solid ${selectedRelic.accentColor}40`,
                }}
              >
                {selectedRelic.civilization}
              </span>
              <div className="flex items-center gap-1.5 text-xs mono text-zinc-400">
                <Calendar className="w-3.5 h-3.5 text-[#F27D26]" />
                <span>{selectedRelic.yearDisplay}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold serif text-white leading-tight">
                {selectedRelic.title}
              </h3>
              <div className="flex items-center gap-2 text-xs mono text-[#A1A1A1] mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#F27D26]" />
                <span>{selectedRelic.location}</span>
                <span>•</span>
                <span>{selectedRelic.era}</span>
              </div>
            </div>
          </div>

          {/* Dossier Content */}
          <div className="p-5 space-y-5 flex-1">
            {/* Selected Hotspot Deep Dive (if active) */}
            {selectedHotspot && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mono uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Side Inspection Guide</span>
                  </div>
                  {(() => {
                    const spotIdx = selectedRelic.hotspots.findIndex((h) => h.id === selectedHotspot.id);
                    return (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        Part {spotIdx >= 0 ? spotIdx + 1 : 1} of {selectedRelic.hotspots.length}
                      </span>
                    );
                  })()}
                </div>
                <h4 className="text-sm font-bold font-mono text-white">
                  {selectedHotspot.name}
                </h4>
                <p className="text-xs text-zinc-200 serif italic">
                  "{selectedHotspot.description}"
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {selectedHotspot.historicalDetail}
                </p>
              </div>
            )}

            {/* Overview */}
            <div className="space-y-1.5">
              <h4 className="text-xs mono uppercase tracking-wider text-zinc-400 font-bold">
                Historical Overview
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {selectedRelic.overview}
              </p>
            </div>

            {/* Archaeological & Architectural Notes */}
            <div className="space-y-1.5">
              <h4 className="text-xs mono uppercase tracking-wider text-zinc-400 font-bold">
                Engineering & Architecture
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {selectedRelic.archaeologicalNotes}
              </p>
            </div>

            {/* Structural Specs Table */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <h4 className="text-xs mono uppercase tracking-wider text-zinc-400 font-bold">
                Physical Specifications
              </h4>
              <div className="space-y-2 text-xs mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Materials:</span>
                  <span className="text-zinc-300 text-right max-w-[200px]">
                    {selectedRelic.materialDesc}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Scale:</span>
                  <span className="text-zinc-300">{selectedRelic.dimensions}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Excavation:</span>
                  <span className="text-zinc-300 text-right max-w-[200px]">
                    {selectedRelic.currentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 border-t border-white/10 bg-black/40 space-y-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                onTimeJumpToRelic(
                  selectedRelic.location,
                  selectedRelic.year,
                  selectedRelic.era,
                  selectedRelic.suggestedPrompt
                )
              }
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#F27D26] hover:bg-[#ff8e38] text-black text-xs font-bold uppercase tracking-wider transition-transform active:scale-95 shadow-md shadow-[#F27D26]/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Chrono About this Relic</span>
            </button>
            <p className="text-[10px] text-center text-zinc-500 mono">
              Transfers context to temporal chat with archaeological citations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
