import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cpu, Layers, Disc, Flame, Gauge, ArrowRight, Check } from 'lucide-react';

interface InspectionNode {
  id: string;
  number: string;
  title: string;
  category: string;
  xPercent: number; // For desktop hotspot coordinate
  yPercent: number;
  mobileXPercent: number;
  mobileYPercent: number;
  specValue: string;
  specMetric: string;
  description: string;
  highlights: string[];
}

const INSPECTION_NODES: InspectionNode[] = [
  {
    id: 'chassis',
    number: '01',
    title: 'High-Yield DOMEX 700 I-Beam Chassis',
    category: 'STRUCTURAL FRAME',
    xPercent: 48,
    yPercent: 55,
    mobileXPercent: 50,
    mobileYPercent: 54,
    specValue: '700 MPa',
    specMetric: 'Yield Strength',
    description: 'Automated double-sided submerged arc welded main longitudinal beams with zero beam sag under continuous 55T+ highway loads.',
    highlights: [
      'Zero longitudinal stress fatigue',
      'Continuous automated SAW robotic welding',
      '1.8 Metric Ton tare weight reduction'
    ]
  },
  {
    id: 'axles',
    number: '02',
    title: 'Tridem Heavy-Duty Mechanical Suspension',
    category: 'AXLE & RUNNING GEAR',
    xPercent: 78,
    yPercent: 68,
    mobileXPercent: 76,
    mobileYPercent: 68,
    specValue: '3 x 14T',
    specMetric: 'Axle Load Rating',
    description: 'Heavy-duty multi-leaf spring suspension engineered for uneven mining haul roads and high-speed highway stability.',
    highlights: [
      'High-grade forged steel hub bearings',
      'Even load distribution across 3 axles',
      'Optimized tire wear geometry'
    ]
  },
  {
    id: 'hydraulics',
    number: '03',
    title: 'Hard-Chromed Multi-Stage Tipping Cylinder',
    category: 'HYDRAULICS & TIPPING',
    xPercent: 20,
    yPercent: 46,
    mobileXPercent: 24,
    mobileYPercent: 46,
    specValue: '190 Bar',
    specMetric: 'Working Pressure',
    description: 'Precision hard-chromed hydraulic telescopic cylinder delivering ultra-fast 28-second dump cycles with anti-tipping rollover valve.',
    highlights: [
      'Under 30s full elevation dump cycle',
      'Anti-burst high-pressure hydraulic safety hose',
      'Hard chrome plated against dust abrasion'
    ]
  },
  {
    id: 'braking',
    number: '04',
    title: 'Dual-Line WABCO Air Braking & ABS',
    category: 'SAFETY & CONTROL',
    xPercent: 66,
    yPercent: 72,
    mobileXPercent: 64,
    mobileYPercent: 72,
    specValue: 'AIS-113',
    specMetric: 'Safety Certified',
    description: 'Dual-line pneumatic brake system with automatic slack adjusters and rapid emergency release for fail-safe highway stopping power.',
    highlights: [
      '100% CMVR & ARAI compliance',
      'Automatic slack adjuster valves',
      'Heavy-duty alloy air reservoir tanks'
    ]
  }
];

export const InteractiveVehicleInspector: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('chassis');
  const activeNode = INSPECTION_NODES.find((n) => n.id === activeNodeId) || INSPECTION_NODES[0];

  return (
    <section className="py-20 md:py-32 bg-[#FFFBF7] border-y border-[#EFE8DF] relative overflow-hidden">
      {/* Heron AI Style Precision Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 border-x border-[#EFE8DF]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header with Swiss Metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EFE8DF] pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#F68722] animate-ping" />
              <span className="text-xs font-bold text-[#F68722] uppercase tracking-widest font-mono-specs">
                INTERACTIVE ENGINEERING BLUEPRINT
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#3B3A3A] font-heading tracking-tight">
              Explore Vehicle Anatomy
            </h2>
            <p className="text-xs sm:text-sm text-[#736F6A] max-w-xl">
              Tap any hotspot node below or switch technical systems to inspect the advanced metallurgy, structural welds, and safety mechanics.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-[#EFE8DF] self-start md:self-end">
            <span className="text-[10px] font-bold text-[#736F6A] uppercase font-mono-specs">STATUS:</span>
            <span className="text-xs font-bold text-emerald-700 font-mono-specs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              LIVE TELEMETRY
            </span>
          </div>
        </div>

        {/* System Selector Tabs (Heron AI Inspired Pill Controls) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {INSPECTION_NODES.map((node) => {
            const isActive = node.id === activeNodeId;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isActive
                    ? 'bg-[#3B3A3A] text-white border-[#3B3A3A] shadow-xl shadow-[#3B3A3A]/15 scale-[1.02]'
                    : 'bg-white text-[#3B3A3A] border-[#EFE8DF] hover:border-[#F68722]/50 hover:bg-[#FFFBF7]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-black font-mono-specs ${isActive ? 'text-[#F68722]' : 'text-[#736F6A]'}`}>
                    SYS {node.number}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-white/70' : 'text-[#736F6A]'}`}>
                    {node.category.split(' ')[0]}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold truncate">
                  {node.title.split(' ')[0]} {node.title.split(' ')[1]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border-2 border-[#EFE8DF] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          {/* Subtle Technical Corner Crosshairs (+) */}
          <div className="absolute top-4 left-4 text-xs font-mono-specs text-[#EFE8DF] select-none">+</div>
          <div className="absolute top-4 right-4 text-xs font-mono-specs text-[#EFE8DF] select-none">+</div>
          <div className="absolute bottom-4 left-4 text-xs font-mono-specs text-[#EFE8DF] select-none">+</div>
          <div className="absolute bottom-4 right-4 text-xs font-mono-specs text-[#EFE8DF] select-none">+</div>

          {/* Left: Vehicle Stage with Interactive Nodes */}
          <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] bg-[#FFFBF7] rounded-2xl border border-[#EFE8DF] flex items-center justify-center p-4 overflow-hidden group">
            {/* Blueprint Grid Overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#3B3A3A 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Vehicle Image */}
            <img
              src="/assets/hero-trailer.png"
              alt="Sameer Commercial Trailer Interactive Anatomy"
              className="w-full h-full object-contain relative z-10 select-none transition-transform duration-500 group-hover:scale-105"
            />

            {/* Interactive Pulse Hotspots */}
            {INSPECTION_NODES.map((node) => {
              const isActive = node.id === activeNodeId;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  style={{
                    left: `${node.xPercent}%`,
                    top: `${node.yPercent}%`
                  }}
                  className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer transition-all duration-300 focus:outline-none ${
                    isActive ? 'scale-125' : 'scale-100 hover:scale-110 opacity-80'
                  }`}
                >
                  {/* Ping Animation on Active Node */}
                  {isActive && (
                    <span className="absolute w-10 h-10 rounded-full bg-[#F68722]/30 animate-ping pointer-events-none" />
                  )}

                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-xs font-black font-mono-specs shadow-lg transition-colors ${
                    isActive
                      ? 'bg-[#F68722] text-white border-white'
                      : 'bg-[#3B3A3A] text-white border-white/80 hover:bg-[#F68722]'
                  }`}>
                    {node.number}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Technical Inspector Readout (Animated upon selection) */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-6"
              >
                {/* Header Tag & Metric Display */}
                <div className="flex items-start justify-between gap-4 border-b border-[#EFE8DF] pb-5">
                  <div>
                    <span className="px-2.5 py-1 bg-[#F68722]/10 text-[#F68722] text-[10px] font-black font-mono-specs rounded-md uppercase tracking-wider">
                      {activeNode.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#3B3A3A] font-heading mt-2">
                      {activeNode.title}
                    </h3>
                  </div>

                  <div className="bg-[#FFFBF7] p-3 rounded-2xl border border-[#EFE8DF] text-right shrink-0">
                    <span className="text-xl font-black text-[#F68722] font-mono-specs block">
                      {activeNode.specValue}
                    </span>
                    <span className="text-[10px] text-[#736F6A] font-bold uppercase block mt-0.5">
                      {activeNode.specMetric}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#736F6A] leading-relaxed">
                  {activeNode.description}
                </p>

                {/* Engineering Highlights */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-bold text-[#3B3A3A] uppercase font-mono-specs block">
                    Key Performance Metrics:
                  </span>
                  {activeNode.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#3B3A3A] font-medium bg-[#FFFBF7] p-2.5 rounded-xl border border-[#EFE8DF]">
                      <div className="w-5 h-5 rounded-md bg-[#F68722]/10 flex items-center justify-center text-[#F68722] shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
