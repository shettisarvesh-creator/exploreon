import React, { useState } from 'react';
import { HistoricalDestination } from '../types';
import { Compass, MapPin, Sparkles, Navigation, Globe2, ArrowRight } from 'lucide-react';

interface HistoricalMapViewProps {
  destinations: HistoricalDestination[];
  currentLocation: string;
  onSelectDestination: (dest: HistoricalDestination) => void;
  onAskAboutLandmark: (landmarkName: string, dest: HistoricalDestination) => void;
}

export const HistoricalMapView: React.FC<HistoricalMapViewProps> = ({
  destinations,
  currentLocation,
  onSelectDestination,
  onAskAboutLandmark
}) => {
  const [activeDest, setActiveDest] = useState<HistoricalDestination>(
    destinations.find(d => d.name.toLowerCase().includes(currentLocation.toLowerCase())) || destinations[0]
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-6 animate-fadeIn">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs mono uppercase tracking-[0.2em] text-[#F27D26]">
            <Compass className="w-4 h-4" />
            CARTOGRAPHY ARCHIVE
          </div>
          <h2 className="text-2xl md:text-3xl font-normal serif text-white mt-1">
            Global Time Horizons & Landmarks
          </h2>
          <p className="text-xs text-[#A1A1A1] font-sans mt-0.5">
            Explore geographical locations, sacred trade hubs, and monumental structures of antiquity.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs mono text-[#A1A1A1]">
          <Globe2 className="w-4 h-4 text-[#F27D26]" />
          <span>{destinations.length} Active Spatial Anchors</span>
        </div>
      </div>

      {/* Interactive Stylized Historical Map Canvas / Chart */}
      <div className="relative w-full h-96 rounded-2xl bg-[#080809] border border-white/15 overflow-hidden shadow-2xl p-6">
        {/* Subtle decorative grid lines and latitude/longitude guides */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        {/* Equator & Prime Meridian markers */}
        <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-white/10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-1/2 border-l border-dashed border-white/10 pointer-events-none" />

        {/* Global Markers projected on stylized map */}
        {destinations.map(d => {
          // Normalize lat (-90 to 90) to (90% to 10%), lon (-180 to 180) to (10% to 90%)
          const topPercent = 90 - ((d.coordinates[0] + 60) / 130) * 80;
          const leftPercent = ((d.coordinates[1] + 130) / 280) * 80 + 10;
          const isCurrent = d.name.toLowerCase() === activeDest.name.toLowerCase();

          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveDest(d)}
              style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer focus:outline-none"
            >
              <div className="relative flex items-center justify-center">
                {isCurrent && (
                  <span className="absolute w-8 h-8 rounded-full bg-[#F27D26]/30 animate-ping" />
                )}
                <div 
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isCurrent 
                      ? 'bg-[#F27D26] border-white text-black shadow-lg shadow-[#F27D26]/50 scale-125' 
                      : 'bg-[#080809] border-[#F27D26]/60 text-[#F27D26] hover:scale-110 hover:border-[#F27D26]'
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                </div>
              </div>
              <span className={`absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] mono uppercase tracking-wider px-2 py-0.5 rounded shadow backdrop-blur-md transition-all ${
                isCurrent 
                  ? 'bg-[#F27D26] text-black font-bold' 
                  : 'bg-black/90 text-zinc-300 group-hover:text-[#F27D26] border border-white/10'
              }`}>
                {d.name} ({d.goldenYear > 0 ? `${d.goldenYear} AD` : `${Math.abs(d.goldenYear)} BC`})
              </span>
            </button>
          );
        })}

        {/* Legend / Overlay info */}
        <div className="absolute bottom-4 left-4 z-10 glass border border-white/10 p-3 rounded max-w-xs text-xs space-y-1">
          <div className="mono text-[10px] text-[#F27D26] uppercase tracking-wider">Spatial Coordinate</div>
          <div className="serif font-bold text-white text-sm">{activeDest.name}, {activeDest.country}</div>
          <div className="mono text-[#A1A1A1] text-[10px]">
            {activeDest.coordinates[0]}° N, {activeDest.coordinates[1]}° E
          </div>
        </div>
      </div>

      {/* Selected Destination Landmark Inspector */}
      <div className="glass border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs mono uppercase text-[#F27D26] tracking-[0.2em]">
              {activeDest.era} (~{activeDest.goldenYear > 0 ? `${activeDest.goldenYear} AD` : `${Math.abs(activeDest.goldenYear)} BC`})
            </span>
            <h3 className="text-2xl serif font-normal text-white mt-1">
              {activeDest.name} Archaeological Topography
            </h3>
            <p className="text-xs text-[#A1A1A1] mt-1 max-w-2xl leading-relaxed">
              {activeDest.description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectDestination(activeDest)}
            className="flex items-center gap-2 px-6 py-3 rounded bg-[#F27D26] hover:bg-[#ff8e38] text-black font-bold uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all shrink-0"
          >
            <Navigation className="w-4 h-4" />
            <span>Enter Chat</span>
          </button>
        </div>

        {/* Prominent Historical Landmarks Grid */}
        <div>
          <h4 className="text-xs mono uppercase tracking-[0.2em] text-[#A1A1A1] mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
            Key Historical Landmarks & Sacred Structures
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {activeDest.landmarks.map((landmark, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl glass border-white/5 hover:border-[#F27D26]/40 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="w-7 h-7 rounded-full bg-[#F27D26]/10 border border-[#F27D26]/30 flex items-center justify-center text-[#F27D26] mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <h5 className="text-sm font-semibold serif text-[#E5E5E1]">
                    {landmark}
                  </h5>
                  <p className="text-[10px] text-[#A1A1A1] mono mt-1">
                    Documented archaeological site
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onAskAboutLandmark(landmark, activeDest)}
                  className="w-full flex items-center justify-between text-xs mono uppercase tracking-wider text-[#F27D26] hover:text-[#ff8e38] pt-2 border-t border-white/5"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
