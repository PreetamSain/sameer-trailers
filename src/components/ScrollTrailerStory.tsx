import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Scale, Flame, ArrowRight, CheckCircle2, ChevronRight, Truck, Disc, Layers } from 'lucide-react';
import { COMPANY_INFO } from '../data/trailers';

interface StoryChapter {
  id: string;
  stepNumber: string;
  tabLabel: string;
  badge: string;
  title: string;
  metricValue: string;
  metricLabel: string;
  description: string;
  keyPoints: string[];
  hotspotText: string;
  hotspotX: string;
  hotspotY: string;
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 'stance',
    stepNumber: '01',
    tabLabel: '55T+ Payload',
    badge: 'STAGE 01 — PAYLOAD ARCHITECTURE',
    title: 'Engineered for Heavy Commercial Transit',
    metricValue: '55T+',
    metricLabel: 'Payload Rating',
    description: 'Designed from the ground up to reduce dead weight while maximizing legal cargo payload for India’s demanding bulk haulage corridors.',
    keyPoints: [
      'Up to 1.8 Tons lighter tare dead weight',
      'Optimized center of gravity for high-speed stability',
      '100% CMVR & ARAI AIS-113 certified'
    ],
    hotspotText: 'Aerodynamic Steel Body • Max Payload',
    hotspotX: '50%',
    hotspotY: '30%'
  },
  {
    id: 'metallurgy',
    stepNumber: '02',
    tabLabel: '700 MPa Chassis',
    badge: 'STAGE 02 — HIGH-GRADE METALLURGY',
    title: 'DOMEX 700 High-Yield Steel Main Chassis',
    metricValue: '700 MPa',
    metricLabel: 'Tensile Yield',
    description: 'Main longitudinal I-beams fabricated from ultra-high strength steel with robotic submerged arc welding to prevent beam sag and metal fatigue.',
    keyPoints: [
      'Double-sided continuous robotic submerged arc welds',
      'Zero longitudinal sagging over millions of kilometers',
      'Steel shot-blasted to SA 2.5 white metal finish'
    ],
    hotspotText: 'Robotic SAW Welded DOMEX 700 Beam',
    hotspotX: '45%',
    hotspotY: '58%'
  },
  {
    id: 'running-gear',
    stepNumber: '03',
    tabLabel: '3x14T Axles',
    badge: 'STAGE 03 — AXLES & SAFETY DYNAMICS',
    title: 'Tridem Running Gear & Dual-Line Pneumatics',
    metricValue: '3 x 14T',
    metricLabel: 'Axle Capacity',
    description: 'Heavy-duty multi-leaf spring suspension combined with dual-line WABCO air brakes for fail-safe highway stopping power.',
    keyPoints: [
      'Even weight distribution across all 3 axles',
      'Automatic slack adjusters & emergency valves',
      'Reinforced tire wear geometry for maximum rubber life'
    ],
    hotspotText: 'Tridem Heavy-Duty Multi-Leaf Gear',
    hotspotX: '78%',
    hotspotY: '70%'
  }
];

export const ScrollTrailerStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0);

  // Measure scroll progress through the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001
  });

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      if (v < 0.33) {
        setActiveStage(0);
      } else if (v < 0.66) {
        setActiveStage(1);
      } else {
        setActiveStage(2);
      }
    });
  }, [scrollYProgress]);

  // Vehicle dynamic transforms
  const vehicleX = useTransform(smoothProgress, [0, 0.5, 1], ['0%', '-3%', '3%']);
  const vehicleScale = useTransform(smoothProgress, [0, 0.5, 1], [1.0, 1.08, 1.04]);
  const roadOffset = useTransform(smoothProgress, [0, 1], ['0%', '-100%']);

  const scrollToStage = (stageIndex: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const targetScroll = containerTop + (stageIndex / 2.5) * (containerHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const currentChapter = CHAPTERS[activeStage];

  return (
    <div ref={containerRef} className="relative h-[260vh] md:h-[300vh] bg-[#FFFBF7] border-y border-[#EFE8DF]">
      
      {/* Sticky Fullscreen Cinematic Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Background Blueprint Grid */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#3B3A3A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10 py-4 sm:py-8">
          
          {/* Top Header & Interactive Stage Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE8DF] pb-4 mb-4 sm:mb-8">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F68722] animate-pulse" />
              <span className="text-xs font-black text-[#F68722] uppercase tracking-widest font-mono-specs">
                SCROLL ENGINEERING SHOWCASE
              </span>
            </div>

            {/* Interactive Clickable Stage Tabs */}
            <div className="flex items-center gap-2">
              {CHAPTERS.map((ch, idx) => {
                const isActive = activeStage === idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => scrollToStage(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-specs uppercase transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#3B3A3A] text-[#F68722] shadow-md scale-105'
                        : 'bg-white text-[#736F6A] border border-[#EFE8DF] hover:bg-[#F5EFE8]'
                    }`}
                  >
                    <span>{ch.stepNumber}</span>
                    <span className="hidden md:inline">{ch.tabLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            {/* Left Column: Active Stage Text Readout with AnimatePresence */}
            <div className="lg:col-span-6 flex flex-col justify-center min-h-[240px] sm:min-h-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentChapter.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-4 sm:space-y-5"
                >
                  <div className="space-y-1 sm:space-y-2">
                    <span className="text-[11px] sm:text-xs font-bold text-[#F68722] uppercase font-mono-specs tracking-wider">
                      {currentChapter.badge}
                    </span>
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-[#3B3A3A] font-heading leading-tight">
                      {currentChapter.title}
                    </h2>
                  </div>

                  <div className="flex items-baseline gap-3 py-2 border-y border-[#EFE8DF]">
                    <span className="text-2xl sm:text-4xl font-black text-[#F68722] font-mono-specs">
                      {currentChapter.metricValue}
                    </span>
                    <span className="text-xs font-bold text-[#736F6A] uppercase font-mono-specs">
                      {currentChapter.metricLabel}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#736F6A] leading-relaxed">
                    {currentChapter.description}
                  </p>

                  <div className="space-y-2 pt-1">
                    {currentChapter.keyPoints.map((pt, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#3B3A3A]">
                        <CheckCircle2 className="w-4 h-4 text-[#F68722] shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Cinematic Vehicle Stage with Active Telemetry Callouts */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] bg-white rounded-3xl border-2 border-[#EFE8DF] p-4 sm:p-8 flex flex-col items-center justify-center shadow-lg shadow-[#3B3A3A]/5 overflow-hidden group">
                
                {/* Offset Orange Backdrop Shadow */}
                <div className="absolute inset-0 bg-[#F68722]/5 rounded-3xl -z-10" />

                {/* Animated Vehicle Staging */}
                <motion.div
                  style={{
                    scale: vehicleScale,
                    x: vehicleX
                  }}
                  className="w-full flex-1 flex items-center justify-center select-none relative"
                >
                  <img
                    src={COMPANY_INFO.heroImage}
                    alt="Sameer Trailer Scroll Engineering Anatomy"
                    className="w-full h-auto max-h-[220px] sm:max-h-[340px] object-contain drop-shadow-md transition-all duration-300"
                  />

                  {/* Dynamic Hotspot Badge */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentChapter.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      style={{
                        left: currentChapter.hotspotX,
                        top: currentChapter.hotspotY
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden sm:flex items-center gap-2 bg-[#3B3A3A]/95 text-white px-3 py-1.5 rounded-full border border-white/20 shadow-xl backdrop-blur-md"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#F68722] animate-ping" />
                      <span className="text-[10px] font-bold font-mono-specs whitespace-nowrap text-[#F68722]">
                        {currentChapter.hotspotText}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Highway Motion Road Track at Bottom */}
                <div className="w-full h-8 border-t border-[#EFE8DF] bg-[#FFFBF7] rounded-xl flex items-center justify-center relative overflow-hidden px-4 mt-2">
                  <div className="absolute inset-x-0 h-[2px] bg-[#EFE8DF] top-1/2 -translate-y-1/2" />
                  <div className="flex items-center gap-6 w-full opacity-60">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-6 h-[2px] bg-[#F68722] shrink-0" />
                    ))}
                  </div>
                </div>

                {/* Live Telemetry Pill */}
                <div className="absolute top-4 right-4 bg-[#3B3A3A] text-white px-3 py-1 rounded-full text-[10px] font-bold font-mono-specs flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>STAGE {currentChapter.stepNumber} ACTIVE</span>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Scroll Prompt */}
          <div className="mt-4 sm:mt-8 flex items-center justify-between text-[11px] font-bold text-[#736F6A] font-mono-specs uppercase border-t border-[#EFE8DF] pt-3">
            <span>Stage {activeStage + 1} of 3</span>
            <span className="text-[#F68722] animate-bounce">↓ SCROLL TO EXPLORE</span>
          </div>

        </div>

      </div>

    </div>
  );
};
