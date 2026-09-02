import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Activity, 
  Scan, 
  Zap, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  Info,
  Maximize2
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

type ViewMode = 'exterior' | 'xray' | 'stress';

interface Hotspot {
  id: string;
  title: string;
  category: string;
  spec: string;
  metric: string;
  description: string;
  xPercent: number; // percentage from left
  yPercent: number; // percentage from top
  keyFeatures: string[];
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'kingpin',
    title: 'Reinforced Kingpin & Landing Interface',
    category: 'COUPLING DYNAMICS',
    spec: '2" Forged Alloy Kingpin (AIS-113)',
    metric: '15 Ton Static Load',
    description: 'Fabricated with 16mm high-yield steel mounting plates to withstand extreme dynamic pivot stress, braking inertia, and tight highway turnaround torque.',
    xPercent: 18,
    yPercent: 46,
    keyFeatures: [
      'JOST heavy-duty dual-speed landing legs',
      'Continuous gusseted box reinforcement',
      'Universal 5th-wheel prime-mover coupling'
    ]
  },
  {
    id: 'chassis',
    title: 'Longitudinal I-Beams (Robotic SAW Welded)',
    category: 'STRUCTURAL SKELETON',
    spec: 'DOMEX 700 MPa High-Yield Steel',
    metric: '700 MPa Yield Point',
    description: 'Continuous Submerged Arc Welded (SAW) main longitudinal beams. Automated double-sided welding eliminates micro-fractures, ensuring zero structural beam sag under 55T+ bulk freight.',
    xPercent: 50,
    yPercent: 44,
    keyFeatures: [
      'Zero longitudinal sagging under peak load',
      '-1,800 KG lighter tare weight advantage',
      'SA 2.5 White-Metal grit blasting'
    ]
  },
  {
    id: 'axles',
    title: 'Tridem Running Gear & Rocker Equalizers',
    category: 'SUSPENSION & AXLES',
    spec: '3 x 14 Ton Heavy-Duty Axles',
    metric: '42 Ton Tridem Rating',
    description: 'Precision multi-leaf spring assemblies with bronze-bushed equalizer rocker beams dynamically distribute road shocks evenly, completely preventing premature tyre scrubbing.',
    xPercent: 78,
    yPercent: 58,
    keyFeatures: [
      'Heavy-duty phosphor-bronze bushed equalizers',
      'Reinforced forged steel wheel hubs',
      'Optimized axle pitch for Indian highway speed'
    ]
  },
  {
    id: 'brakes',
    title: 'Dual-Line Pneumatic Braking Network',
    category: 'SAFETY & CONTROL',
    spec: 'WABCO ABS & Relay Valves',
    metric: '< 3.8s Response Time',
    description: 'Dual-circuit pneumatic fail-safe air brake system with automatic slack adjusters. Provides instant stopping power under full 55T loaded highway emergency deceleration.',
    xPercent: 86,
    yPercent: 48,
    keyFeatures: [
      'Genuine WABCO relay emergency valves',
      'Corrosion-resistant copper/braided air lines',
      'Automatic slack adjusters for zero brake fade'
    ]
  }
];

export const XRayMetallurgyShowcase: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('xray');
  const [sliderPos, setSliderPos] = useState<number>(55); // percentage for split scanner
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(HOTSPOTS[1]);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle interactive mouse/touch drag on scanner
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  };

  return (
    <section className="py-20 md:py-28 bg-[#0C0C0E] text-white relative overflow-hidden border-b border-[#222226]">
      
      {/* Background Hologram Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#F68722 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Ambient Lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#F68722]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-[#F68722]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#222228] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F68722]/10 border border-[#F68722]/20">
              <Scan className="w-3.5 h-3.5 text-[#F68722] animate-pulse" />
              <span className="text-xs font-bold text-[#F68722] uppercase tracking-[0.2em] font-mono-specs">
                BESPOKE METALLURGY SCANNER
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading leading-tight tracking-tight">
              3D X-Ray Metallurgy & <br />
              <span className="text-[#F68722]">Stress-Test Diagnostics.</span>
            </h2>
          </div>

          {/* Mode Selector Pill Buttons */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#16161C] border border-[#2B2B33]">
            <button
              onClick={() => setViewMode('exterior')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono-specs uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                viewMode === 'exterior'
                  ? 'bg-[#F68722] text-white shadow-lg shadow-[#F68722]/25'
                  : 'text-[#A09D98] hover:text-white hover:bg-[#202028]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>01. Exterior Finish</span>
            </button>

            <button
              onClick={() => setViewMode('xray')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono-specs uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                viewMode === 'xray'
                  ? 'bg-[#F68722] text-white shadow-lg shadow-[#F68722]/25'
                  : 'text-[#A09D98] hover:text-white hover:bg-[#202028]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>02. DOMEX 700 X-Ray</span>
            </button>

            <button
              onClick={() => setViewMode('stress')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono-specs uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                viewMode === 'stress'
                  ? 'bg-[#F68722] text-white shadow-lg shadow-[#F68722]/25'
                  : 'text-[#A09D98] hover:text-white hover:bg-[#202028]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>03. 55T FEA Stress Heatmap</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Scanning Stage (Cula Proportions & Pure High-End Aesthetics) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 8 COLS: INTERACTIVE VEHICLE SCANNER VIEWPORT */}
          <div className="lg:col-span-8 space-y-4">
            <div
              ref={containerRef}
              onPointerMove={handlePointerMove}
              onPointerEnter={() => setIsHovering(true)}
              onPointerLeave={() => setIsHovering(false)}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[340px] sm:min-h-[440px] rounded-3xl overflow-hidden bg-[#070709] border-2 border-[#24242A] shadow-2xl select-none cursor-ew-resize group"
            >
              
              {/* TOP HUD BAR */}
              <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-5 py-3 bg-[#111116]/80 backdrop-blur-md border-b border-[#222228] text-[11px] font-mono-specs text-[#A09D98]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-[#F68722] font-bold">
                    <Zap className="w-3.5 h-3.5 animate-pulse" />
                    <span>SCAN MODE: {viewMode.toUpperCase()}</span>
                  </span>
                  <span className="hidden sm:inline text-[#4A4A52]">|</span>
                  <span className="hidden sm:inline">LASER SLICE: {sliderPos}%</span>
                </div>

                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SAFETY FACTOR: 2.85x OK</span>
                </div>
              </div>

              {/* LAYER 1: BASE EXTERIOR LAYER */}
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                <img
                  src="/assets/trailer-frames-webp/frame_0001.webp"
                  alt="Sameer Trailer Exterior"
                  className={`w-full h-full object-contain transition-all duration-500 ${
                    viewMode === 'exterior'
                      ? 'opacity-100 filter-none scale-[1.02]'
                      : viewMode === 'xray'
                      ? 'opacity-20 brightness-50'
                      : 'opacity-15 brightness-25 contrast-150'
                  }`}
                />
              </div>

              {/* LAYER 2: X-RAY WIREFRAME / SKELETON OVERLAY */}
              {viewMode === 'xray' && (
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
                  {/* Glowing Hologram Vector Shader Simulation */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src="/assets/trailer-frames-webp/frame_0001.webp"
                      alt="Sameer Trailer X-Ray"
                      className="w-full h-full object-contain filter invert hue-rotate-[160deg] brightness-125 contrast-200 opacity-90 drop-shadow-[0_0_20px_rgba(246,135,34,0.6)]"
                    />

                    {/* Laser Scanner Slice Overlay */}
                    <div
                      className="absolute top-0 bottom-0 border-r-2 border-[#F68722] bg-gradient-to-r from-transparent to-[#F68722]/15 pointer-events-none"
                      style={{ left: 0, width: `${sliderPos}%` }}
                    >
                      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-4 h-8 bg-[#F68722] rounded-full flex items-center justify-center shadow-lg shadow-[#F68722]">
                        <span className="w-1 h-3 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAYER 3: 55T FEA STRESS HEATMAP OVERLAY */}
              {viewMode === 'stress' && (
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src="/assets/trailer-frames-webp/frame_0001.webp"
                      alt="Sameer Trailer FEA Stress"
                      className="w-full h-full object-contain filter invert hue-rotate-[240deg] saturate-200 brightness-110 opacity-85 drop-shadow-[0_0_25px_rgba(246,135,34,0.8)]"
                    />
                    
                    {/* FEA Gradient Calibration Legend */}
                    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-[10px] font-mono-specs space-y-1">
                      <div className="text-[#A09D98] uppercase">FEA STRESS DISTRIBUTION</div>
                      <div className="flex items-center gap-1">
                        <span className="w-4 h-2 rounded bg-emerald-500" />
                        <span className="text-[9px] text-[#A09D98]">150 MPa</span>
                        <span className="w-4 h-2 rounded bg-amber-400" />
                        <span className="text-[9px] text-[#A09D98]">380 MPa</span>
                        <span className="w-4 h-2 rounded bg-[#F68722]" />
                        <span className="text-[9px] text-white font-bold">520 MPa MAX</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* INTERACTIVE CLICKABLE HOTSPOTS */}
              {HOTSPOTS.map((hotspot) => {
                const isSelected = activeHotspot?.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspot(hotspot);
                    }}
                    style={{
                      left: `${hotspot.xPercent}%`,
                      top: `${hotspot.yPercent}%`
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center transition-all duration-300 group cursor-pointer ${
                      isSelected ? 'scale-125' : 'hover:scale-110'
                    }`}
                  >
                    {/* Pulsing Target Ring */}
                    <span className={`absolute w-8 h-8 rounded-full animate-ping opacity-75 ${
                      isSelected ? 'bg-[#F68722]' : 'bg-white/40'
                    }`} />
                    
                    {/* Center Core Node */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 transition-all ${
                      isSelected
                        ? 'bg-[#F68722] border-white text-white shadow-[#F68722]/80'
                        : 'bg-black/90 border-[#F68722] text-[#F68722] hover:bg-[#F68722] hover:text-white'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-current" />
                    </div>

                    {/* Floating Label */}
                    <div className={`absolute top-full mt-1.5 px-2.5 py-1 rounded-md text-[9px] font-bold font-mono-specs whitespace-nowrap pointer-events-none transition-all ${
                      isSelected
                        ? 'bg-[#F68722] text-white shadow-md'
                        : 'bg-black/80 text-[#A09D98] border border-white/10 opacity-0 group-hover:opacity-100'
                    }`}>
                      {hotspot.category}
                    </div>
                  </button>
                );
              })}

              {/* Bottom Instruction Bar */}
              <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center items-center pointer-events-none">
                <span className="text-[10px] font-bold font-mono-specs text-[#A09D98] bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  ↔ DRAG MOUSE / TOUCH TO SLICE X-RAY SCANNER • CLICK NODES FOR DETAILS
                </span>
              </div>

            </div>

            {/* QUICK STATS STRIP UNDER SCANNER */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#141418] border border-[#222228]">
                <div className="text-[10px] font-mono-specs text-[#736F6A] uppercase">YIELD STRENGTH</div>
                <div className="text-lg font-black text-[#F68722] font-mono-specs">700 MPa</div>
                <div className="text-[10px] text-[#A09D98]">DOMEX High-Yield</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141418] border border-[#222228]">
                <div className="text-[10px] font-mono-specs text-[#736F6A] uppercase">SAFETY FACTOR</div>
                <div className="text-lg font-black text-white font-mono-specs">2.85x</div>
                <div className="text-[10px] text-[#A09D98]">Zero Beam Deflection</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141418] border border-[#222228]">
                <div className="text-[10px] font-mono-specs text-[#736F6A] uppercase">TARE REDUCTION</div>
                <div className="text-lg font-black text-[#F68722] font-mono-specs">-1,800 KG</div>
                <div className="text-[10px] text-[#A09D98]">More Revenue Payload</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141418] border border-[#222228]">
                <div className="text-[10px] font-mono-specs text-[#736F6A] uppercase">WARRANTY CHASSIS</div>
                <div className="text-lg font-black text-white font-mono-specs">15+ YRS</div>
                <div className="text-[10px] text-[#A09D98]">Operational Lifespan</div>
              </div>
            </div>
          </div>

          {/* RIGHT 4 COLS: DYNAMIC TECHNICAL TELEMETRY PANEL */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              {activeHotspot && (
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-3xl bg-[#14141A] border-2 border-[#262630] shadow-2xl space-y-5"
                >
                  {/* Category & Metric Header */}
                  <div className="flex items-center justify-between border-b border-[#26262E] pb-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-[#F68722] uppercase tracking-wider font-mono-specs">
                        {activeHotspot.category}
                      </span>
                      <div className="text-xs font-bold text-[#A09D98] font-mono-specs">
                        {activeHotspot.spec}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-[#F68722] font-mono-specs">
                        {activeHotspot.metric}
                      </div>
                      <div className="text-[9px] text-emerald-400 font-bold font-mono-specs">
                        ARAI AIS-113 OK
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white font-heading leading-snug">
                      {activeHotspot.title}
                    </h3>
                    <p className="text-xs text-[#A09D98] leading-relaxed">
                      {activeHotspot.description}
                    </p>
                  </div>

                  {/* Key Engineering Features Checklist */}
                  <div className="space-y-2.5 pt-2 border-t border-[#26262E]">
                    <div className="text-[10px] font-bold text-white font-mono-specs uppercase">
                      ENGINEERING SPECIFICATIONS
                    </div>
                    {activeHotspot.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E5E5E5]">
                        <CheckCircle2 className="w-4 h-4 text-[#F68722] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hotspot Quick Selector Dots */}
                  <div className="pt-3 border-t border-[#26262E] flex items-center justify-between">
                    <span className="text-[10px] font-mono-specs text-[#736F6A]">SELECT COMPONENT:</span>
                    <div className="flex gap-1.5">
                      {HOTSPOTS.map((h, i) => (
                        <button
                          key={h.id}
                          onClick={() => setActiveHotspot(h)}
                          className={`w-6 h-6 rounded-lg text-[10px] font-mono-specs font-bold transition-all cursor-pointer ${
                            activeHotspot.id === h.id
                              ? 'bg-[#F68722] text-white'
                              : 'bg-[#202028] text-[#A09D98] hover:bg-[#2A2A35]'
                          }`}
                        >
                          0{i + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

    </section>
  );
};
