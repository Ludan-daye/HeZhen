
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Globe from 'react-globe.gl';
import { Ship, Anchor, Globe as GlobeIcon, Map, Info, Calendar, Menu, X, Package, ArrowUpRight, ArrowDownLeft, Sparkles } from 'lucide-react';
import { LOCATIONS, VOYAGES } from './data';
import { ArcData, Voyage, Location } from './types';
import { getHistoricalInsight } from './services/gemini';

const getArcsForVoyage = (voyage: Voyage): ArcData[] => {
  const arcs: ArcData[] = [];
  for (let i = 0; i < voyage.path.length - 1; i++) {
    const start = LOCATIONS[voyage.path[i]];
    const end = LOCATIONS[voyage.path[i + 1]];
    if (start && end) {
      arcs.push({
        startLat: start.lat,
        startLng: start.lng,
        endLat: end.lat,
        endLng: end.lng,
        color: voyage.color,
        label: `${start.name} to ${end.name}`
      });
    }
  }
  return arcs;
};

const App: React.FC = () => {
  const [selectedVoyageId, setSelectedVoyageId] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [shipPosition, setShipPosition] = useState<{lat: number, lng: number} | null>(null);
  const globeEl = useRef<any>();

  const selectedVoyage = useMemo(() => 
    VOYAGES.find(v => v.id === selectedVoyageId) || VOYAGES[0]
  , [selectedVoyageId]);

  const arcsData = useMemo(() => getArcsForVoyage(selectedVoyage), [selectedVoyage]);
  
  const labelsData = useMemo(() => {
    return selectedVoyage.path.map(id => {
      const loc = LOCATIONS[id];
      return {
        lat: loc.lat,
        lng: loc.lng,
        text: loc.name, // Use English name for stability on the globe
        id: loc.id
      };
    });
  }, [selectedVoyage]);

  const ringsData = useMemo(() => {
    return selectedVoyage.path.map(id => {
      const loc = LOCATIONS[id];
      return {
        lat: loc.lat,
        lng: loc.lng,
        color: selectedVoyage.color,
        maxR: 2,
        propagationSpeed: 2,
        repeatPeriod: 1000
      };
    });
  }, [selectedVoyage]);

  // Animation for the ship fleet
  useEffect(() => {
    let animationId: number;
    let startTime: number;
    const duration = 15000; // 15 seconds for a full route loop

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = ((time - startTime) % duration) / duration;
      
      const numArcs = arcsData.length;
      if (numArcs > 0) {
        const arcIndex = Math.floor(progress * numArcs);
        const arcProgress = (progress * numArcs) % 1;
        const arc = arcsData[arcIndex];
        
        if (arc) {
          // Simple linear interpolation for demonstration
          const lat = arc.startLat + (arc.endLat - arc.startLat) * arcProgress;
          const lng = arc.startLng + (arc.endLng - arc.startLng) * arcProgress;
          setShipPosition({ lat, lng });
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [arcsData]);

  const objectsData = useMemo(() => {
    if (!shipPosition) return [];
    return [{
      lat: shipPosition.lat,
      lng: shipPosition.lng,
      color: '#fff'
    }];
  }, [shipPosition]);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 10, lng: 100, altitude: 2 }, 1000);
    }
  }, []);

  const handleLocationClick = useCallback(async (label: any) => {
    const loc = LOCATIONS[label.id];
    if (loc) {
      setSelectedLocation(loc);
      setAiInsight('');
      setIsLoadingInsight(true);
      const insight = await getHistoricalInsight(loc.name, selectedVoyageId);
      setAiInsight(insight);
      setIsLoadingInsight(false);
      globeEl.current.pointOfView({ lat: loc.lat, lng: loc.lng, altitude: 1.2 }, 600);
    }
  }, [selectedVoyageId]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-sans text-white">
      {/* Globe Container */}
      <div className="absolute inset-0">
        <Globe
          ref={globeEl}
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
          
          arcsData={arcsData}
          arcColor="color"
          arcDashLength={0.6}
          arcDashGap={0.3}
          arcDashAnimateTime={1500}
          arcStroke={0.6}
          
          ringsData={ringsData}
          ringColor={(d: any) => d.color}
          ringMaxRadius={(d: any) => d.maxR}
          ringPropagationSpeed={(d: any) => d.propagationSpeed}
          ringRepeatPeriod={(d: any) => d.repeatPeriod}

          labelsData={labelsData}
          labelLat={(d: any) => d.lat}
          labelLng={(d: any) => d.lng}
          labelText={(d: any) => d.text}
          labelSize={0.8}
          labelDotRadius={0.4}
          labelColor={() => selectedVoyage.color}
          labelResolution={2}
          onLabelClick={handleLocationClick}

          objectsData={objectsData}
          objectLat={(d: any) => d.lat}
          objectLng={(d: any) => d.lng}
          objectLabel="Treasure Fleet"
          objectColor={(d: any) => d.color}
        />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none z-10">
        <div className="pointer-events-auto">
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3 drop-shadow-2xl">
            <Ship className="w-10 h-10 text-red-500 fill-red-500/20" />
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-red-500 via-yellow-400 to-amber-600">
              ZHENG HE
            </span>
          </h1>
          <p className="text-amber-200/60 text-xs font-bold tracking-[0.3em] uppercase mt-1 flex items-center gap-2">
            The Maritime Silk Road • 1405–1433
          </p>
        </div>
        
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="pointer-events-auto p-3 bg-white/5 backdrop-blur-xl rounded-full text-white hover:bg-white/10 transition-all border border-white/10"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Sidebar */}
      <div className={`absolute left-0 top-0 h-full transition-transform duration-500 z-20 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="w-80 h-full bg-black/40 backdrop-blur-2xl border-r border-white/10 p-6 pt-24 flex flex-col gap-8">
          <div className="space-y-4">
            <h2 className="text-xs font-black text-amber-500 tracking-[0.2em] uppercase flex items-center gap-2">
              <Map className="w-4 h-4" />
              Imperial Expeditions
            </h2>
            <div className="grid gap-3 custom-scrollbar overflow-y-auto max-h-[60vh] pr-2">
              {VOYAGES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVoyageId(v.id)}
                  className={`group relative p-4 rounded-2xl text-left transition-all border flex flex-col gap-1 ${
                    selectedVoyageId === v.id 
                      ? 'bg-white/10 border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.05)]' 
                      : 'bg-transparent border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Voyage 0{v.id}</span>
                    <Calendar className="w-3 h-3 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-amber-400 transition-colors">{v.title}</h3>
                  <p className="text-xs text-gray-500">{v.years}</p>
                  {selectedVoyageId === v.id && (
                    <div className="absolute right-3 bottom-3 animate-pulse">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-white/10">
             <p className="text-[10px] text-amber-200/50 leading-relaxed uppercase tracking-widest font-bold">
               Legend: The white moving light represents the Admiral's Treasure Fleet in transit.
             </p>
          </div>
        </div>
      </div>

      {/* Info & Trade Panel */}
      <div className="absolute right-6 bottom-6 w-96 max-w-[calc(100vw-3rem)] z-30 flex flex-col gap-4">
        {/* Voyage Overview */}
        <div className="p-6 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
             <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: selectedVoyage.color }} />
             <h3 className="text-2xl font-black">{selectedVoyage.chineseTitle}</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {selectedVoyage.summary}
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
             <div>
               <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-widest">Status</span>
               <span className="text-sm text-green-400 flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                 Active Exploration
               </span>
             </div>
             <div>
               <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-widest">Region</span>
               <span className="text-sm">Western Ocean</span>
             </div>
          </div>
        </div>

        {/* Trade & Cargo Panel */}
        {selectedLocation && (
          <div className="p-6 bg-amber-950/20 backdrop-blur-3xl border border-amber-500/30 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-bottom duration-500">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-black flex flex-col">
                  <span className="text-xs text-amber-500 uppercase tracking-[0.2em] mb-1">Port of Call</span>
                  {selectedLocation.name}
                </h3>
                <span className="text-sm text-amber-200/40">{selectedLocation.chineseName}</span>
              </div>
              <button 
                onClick={() => setSelectedLocation(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Trade Goods Visualization */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black text-red-400 uppercase tracking-widest">
                  <ArrowUpRight className="w-3 h-3" />
                  Exports from Ming
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedLocation.tradeExports?.map(item => (
                    <span key={item} className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-[10px] font-bold">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                  <ArrowDownLeft className="w-3 h-3" />
                  Acquired Imports
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedLocation.tradeImports?.map(item => (
                    <span key={item} className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] font-bold">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-black text-amber-400 uppercase tracking-[0.2em]">
                <Package className="w-3 h-3" />
                Historical Insight
              </div>
              {isLoadingInsight ? (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-3 h-3 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                  Accessing Imperial Archives...
                </div>
              ) : (
                <p className="text-xs text-gray-300 leading-relaxed font-serif italic">
                  "{aiInsight}"
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Guide */}
      {!selectedLocation && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
           <div className="mb-4 flex justify-center opacity-20">
             <div className="w-24 h-24 border-2 border-amber-500/20 rounded-full flex items-center justify-center">
                <Anchor className="w-8 h-8 text-amber-500" />
             </div>
           </div>
           <p className="text-amber-500/40 text-[10px] tracking-[0.4em] uppercase font-black">
             Click on City Labels to Inspect Trade
           </p>
        </div>
      )}
    </div>
  );
};

export default App;
