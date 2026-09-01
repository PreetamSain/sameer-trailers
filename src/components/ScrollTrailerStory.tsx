import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, Scale, Flame, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/trailers';

interface StoryChapter {
  id: string;
  stepNumber: string;
  badge: string;
  title: string;
  metricValue: string;
  metricLabel: string;
  description: string;
  keyPoints: string[];
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 'stance',
    stepNumber: '01',
    badge: 'STAGE 01 — PAYLOAD ARCHITECTURE',
    title: 'Engineered for Heavy Commercial Transit',
    metricValue: '55T+',
    metricLabel: 'Payload Rating',
    description: 'Designed from the ground up to reduce dead weight while maximizing legal cargo payload for India’s demanding bulk haulage corridors.',
    keyPoints: [
      'Up to 1.8 Tons lighter tare dead weight',
      'Optimized center of gravity for high-speed stability',
      '100% CMVR & ARAI AIS-113 certified'
    ]
  },
  {
    id: 'metallurgy',
    stepNumber: '02',
    badge: 'STAGE 02 — HIGH-GRADE METALLURGY',
    title: 'DOMEX 700 High-Yield Steel Main Chassis',
    metricValue: '700 MPa',
    metricLabel: 'Tensile Yield',
    description: 'Main longitudinal I-beams fabricated from ultra-high strength steel with robotic submerged arc welding to prevent beam sag and metal fatigue.',
    keyPoints: [
      'Double-sided continuous robotic submerged arc welds',
      'Zero longitudinal sagging over millions of kilometers',
      'Steel shot-blasted to SA 2.5 white metal finish'
    ]
  },
  {
    id: 'running-gear',
    stepNumber: '03',
    badge: 'STAGE 03 — AXLES & SAFETY DYNAMICS',
    title: 'Tridem Running Gear & Dual-Line Pneumatics',
    metricValue: '3 x 14T',
    metricLabel: 'Axle Capacity',
    description: 'Heavy-duty multi-leaf spring suspension combined with dual-line WABCO air brakes for fail-safe highway stopping power.',
    keyPoints: [
      'Even weight distribution across all 3 axles',
      'Automatic slack adjusters & emergency valves',
      'Reinforced tire wear geometry for maximum rubber life'
    ]
  }
];

export const ScrollTrailerStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure scroll progress through the 300vh tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Smooth spring for cinematic inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001
  });

  // Chapter 1 Opacity & Y
  const opacity1 = useTransform(smoothProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const y1 = useTransform(smoothProgress, [0, 0.25, 0.35], [0, 0, -30]);

  // Chapter 2 Opacity & Y
  const opacity2 = useTransform(smoothProgress, [0.32, 0.45, 0.65, 0.72], [0, 1, 1, 0]);
  const y2 = useTransform(smoothProgress, [0.32, 0.45, 0.65, 0.72], [30, 0, 0, -30]);

  // Chapter 3 Opacity & Y
  const opacity3 = useTransform(smoothProgress, [0.68, 0.78, 1], [0, 1, 1]);
  const y3 = useTransform(smoothProgress, [0.68, 0.78, 1], [30, 0, 0]);

  // Vehicle Scale & Shift along the scroll journey
  const vehicleScale = useTransform(smoothProgress, [0, 0.5, 1], [1.0, 1.12, 1.05]);
  const vehicleX = useTransform(smoothProgress, [0, 0.5, 1], ['0%', '-4%', '3%']);
  const vehicleRotate = useTransform(smoothProgress, [0, 0.5, 1], [0, -1.2, 0.8]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#FFFBF7] border-y border-[#EFE8DF]">
      
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

        <div className="max-w-7xl mx-auto w-full relative z-10 py-6">
          
          {/* Top Stage Header & Chapter Indicator */}
          <div className="flex items-center justify-between border-b border-[#EFE8DF] pb-4 mb-6 sm:mb-10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F68722] animate-pulse" />
              <span className="text-xs font-black text-[#F68722] uppercase tracking-widest font-mono-specs">
                SCROLL ENGINEERING SHOWCASE
              </span>
            </div>

            {/* 3-Step Chapter Pill Indicator */}
            <div className="flex items-center gap-2">
              {CHAPTERS.map((ch, idx) => (
                <div key={ch.id} className="flex items-center gap-1.5">
                  <span className="text-[11px] font-black font-mono-specs text-[#736F6A]">
                    {ch.stepNumber}
                  </span>
                  {idx < CHAPTERS.length - 1 && (
                    <span className="text-[#EFE8DF] text-xs">/</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main 2-Column Story Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Synchronized Story Chapters (Stacked with absolute alignment) */}
            <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[360px] flex flex-col justify-center">
              
              {/* CHAPTER 1 */}
              <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-x-0 space-y-5"
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#F68722] uppercase font-mono-specs tracking-wider">
                    {CHAPTERS[0].badge}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-[#3B3A3A] font-heading leading-tight">
                    {CHAPTERS[0].title}
                  </h2>
                </div>

                <div className="flex items-baseline gap-3 py-2 border-y border-[#EFE8DF]">
                  <span className="text-3xl sm:text-4xl font-black text-[#F68722] font-mono-specs">
                    {CHAPTERS[0].metricValue}
                  </span>
                  <span className="text-xs font-bold text-[#736F6A] uppercase font-mono-specs">
                    {CHAPTERS[0].metricLabel}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#736F6A] leading-relaxed">
                  {CHAPTERS[0].description}
                </p>

                <div className="space-y-2 pt-1">
                  {CHAPTERS[0].keyPoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#3B3A3A]">
                      <CheckCircle2 className="w-4 h-4 text-[#F68722] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CHAPTER 2 */}
              <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-x-0 space-y-5"
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#F68722] uppercase font-mono-specs tracking-wider">
                    {CHAPTERS[1].badge}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-[#3B3A3A] font-heading leading-tight">
                    {CHAPTERS[1].title}
                  </h2>
                </div>

                <div className="flex items-baseline gap-3 py-2 border-y border-[#EFE8DF]">
                  <span className="text-3xl sm:text-4xl font-black text-[#F68722] font-mono-specs">
                    {CHAPTERS[1].metricValue}
                  </span>
                  <span className="text-xs font-bold text-[#736F6A] uppercase font-mono-specs">
                    {CHAPTERS[1].metricLabel}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#736F6A] leading-relaxed">
                  {CHAPTERS[1].description}
                </p>

                <div className="space-y-2 pt-1">
                  {CHAPTERS[1].keyPoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#3B3A3A]">
                      <CheckCircle2 className="w-4 h-4 text-[#F68722] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CHAPTER 3 */}
              <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute inset-x-0 space-y-5"
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#F68722] uppercase font-mono-specs tracking-wider">
                    {CHAPTERS[2].badge}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-[#3B3A3A] font-heading leading-tight">
                    {CHAPTERS[2].title}
                  </h2>
                </div>

                <div className="flex items-baseline gap-3 py-2 border-y border-[#EFE8DF]">
                  <span className="text-3xl sm:text-4xl font-black text-[#F68722] font-mono-specs">
                    {CHAPTERS[2].metricValue}
                  </span>
                  <span className="text-xs font-bold text-[#736F6A] uppercase font-mono-specs">
                    {CHAPTERS[2].metricLabel}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#736F6A] leading-relaxed">
                  {CHAPTERS[2].description}
                </p>

                <div className="space-y-2 pt-1">
                  {CHAPTERS[2].keyPoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#3B3A3A]">
                      <CheckCircle2 className="w-4 h-4 text-[#F68722] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Right Column: Scroll-Driven Cinematic Vehicle Stage */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] bg-white rounded-3xl border-2 border-[#EFE8DF] p-4 sm:p-8 flex items-center justify-center shadow-lg shadow-[#3B3A3A]/5 overflow-hidden">
                
                {/* Brochure Offset Orange Frame */}
                <div className="absolute inset-0 bg-[#F68722]/10 rounded-3xl -z-10" />

                {/* Animated Vehicle Model responding in real-time to scroll */}
                <motion.div
                  style={{
                    scale: vehicleScale,
                    x: vehicleX,
                    rotateZ: vehicleRotate
                  }}
                  className="w-full h-full flex items-center justify-center select-none"
                >
                  <img
                    src={COMPANY_INFO.heroImage}
                    alt="Sameer Trailer Scroll Engineering Anatomy"
                    className="w-full h-auto max-h-[360px] object-contain drop-shadow-md"
                  />
                </motion.div>

                {/* Live Engineering Telemetry Chip */}
                <div className="absolute bottom-4 right-4 bg-[#3B3A3A] text-white px-3 py-1.5 rounded-xl text-[10px] font-bold font-mono-specs flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F68722] animate-ping" />
                  <span>SCROLL DYNAMICS ACTIVE</span>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Prompt */}
          <div className="mt-8 text-center">
            <span className="text-[11px] font-bold text-[#736F6A] uppercase font-mono-specs tracking-wider">
              ↓ SCROLL TO EXPLORE ALL CHAPTERS
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
