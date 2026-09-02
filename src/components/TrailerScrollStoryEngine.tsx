import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ShieldCheck, CheckCircle2, ArrowRight, Gauge, Layers, Truck, Sparkles, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/trailers';

const TOTAL_FRAMES = 246;

interface StoryStage {
  id: string;
  stageNumber: string;
  badge: string;
  title: string;
  metricValue: string;
  metricLabel: string;
  description: string;
  keyPoints: string[];
}

const STORY_STAGES: StoryStage[] = [
  {
    id: 'stage-1',
    stageNumber: '01',
    badge: 'STAGE 01 — AERODYNAMIC INDUSTRIAL FRONT',
    title: 'Engineered for Heavy Commercial Stance',
    metricValue: '700 MPa',
    metricLabel: 'DOMEX High-Yield Steel',
    description: 'High-tensile European DOMEX 700 steel construction delivers extreme torsional rigidity with up to 1.8 Tons lower dead weight, maximizing every ton of legal payload.',
    keyPoints: [
      'Reinforced front kingpin box & JOST landing gear',
      'Aerodynamic headboard profile minimizes wind drag',
      '100% ARAI AIS-113 & CMVR certified geometry'
    ]
  },
  {
    id: 'stage-2',
    stageNumber: '02',
    badge: 'STAGE 02 — ROBOTIC CHASSIS WELDING',
    title: 'Continuous Robotic SAW Long-Beams',
    metricValue: '100%',
    metricLabel: 'Submerged Arc Welds',
    description: 'Main longitudinal I-beams fabricated with automated double-sided Submerged Arc Welding (SAW) to prevent structural beam sag and metal fatigue over millions of kilometers.',
    keyPoints: [
      'Zero longitudinal sagging under peak 55T+ loads',
      'High-grade SA 2.5 white-metal shot blasted steel',
      'Dual-coat polyurethane anti-corrosion paint system'
    ]
  },
  {
    id: 'stage-3',
    stageNumber: '03',
    badge: 'STAGE 03 — TRIDEM RUNNING GEAR',
    title: '3 x 14 Ton Axles & Multi-Leaf Suspension',
    metricValue: '3 x 14T',
    metricLabel: 'Axle Capacity',
    description: 'Heavy-duty multi-leaf spring suspension combined with precision equalizer beams ensures optimal weight distribution across all 3 axles, preventing uneven tire wear.',
    keyPoints: [
      'Heavy-duty bronze-bushed equalizer rocker beams',
      'WABCO dual-line pneumatic fail-safe air brake system',
      'Automatic slack adjusters & reinforced wheel hubs'
    ]
  },
  {
    id: 'stage-4',
    stageNumber: '04',
    badge: 'STAGE 04 — MAXIMUM BULK PAYLOAD',
    title: 'Built for India’s Demanding Corridors',
    metricValue: '55T+',
    metricLabel: 'Certified Payload Rating',
    description: 'From rugged mining zones to express highway freight, Sameer Commercial Trailers deliver industry-leading reliability, lower diesel consumption, and maximum fleet ROI.',
    keyPoints: [
      '15+ years proven operational chassis lifespan',
      'Customized engineering for cement, steel, machinery & bulk',
      'Direct factory warranty & rapid nationwide delivery'
    ]
  }
];

export const TrailerScrollStoryEngine: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Scroll Progress measurement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.0005
  });

  // 1. PRELOAD ALL 246 WEBP FRAMES
  useEffect(() => {
    let mounted = true;
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, '0');
      img.src = `/assets/trailer-frames-webp/frame_${frameNum}.webp`;

      img.onload = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        if (count >= Math.min(TOTAL_FRAMES, 40)) {
          // As soon as first 40 frames are loaded, mark ready
          setIsPreloaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      mounted = false;
    };
  }, []);

  // 2. CANVAS DRAWING ON SCROLL PROGRESS
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Responsive Canvas Size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Maintain Aspect Ratio and Center
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = rect.width / rect.height;

    let drawWidth = rect.width;
    let drawHeight = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = rect.height;
      drawWidth = rect.height * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
    } else {
      drawWidth = rect.width;
      drawHeight = rect.width / imgRatio;
      offsetY = (rect.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  // 3. LISTEN TO SMOOTH SCROLL PROGRESS & UPDATE FRAME + STAGE
  useEffect(() => {
    return smoothProgress.on('change', (progress) => {
      // Calculate active frame index
      const clamped = Math.max(0, Math.min(progress, 0.9999));
      const frameIdx = Math.floor(clamped * (TOTAL_FRAMES - 1));
      drawFrame(frameIdx);

      // Determine active story stage
      if (progress < 0.25) {
        setCurrentStageIndex(0);
      } else if (progress < 0.52) {
        setCurrentStageIndex(1);
      } else if (progress < 0.78) {
        setCurrentStageIndex(2);
      } else {
        setCurrentStageIndex(3);
      }
    });
  }, [smoothProgress]);

  // Initial draw once first frame loads
  useEffect(() => {
    if (isPreloaded) {
      drawFrame(0);
    }
  }, [isPreloaded]);

  const currentStage = STORY_STAGES[currentStageIndex];

  return (
    <div ref={containerRef} className="relative h-[360vh] bg-[#FFFBF7]">
      
      {/* Pinned Fullscreen Cinematic Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Background Blueprint Grid */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#3B3A3A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10 py-4 sm:py-6 flex flex-col justify-between h-[92vh]">
          
          {/* Top HUD: Title Tag & Stage Indicators */}
          <div className="flex items-center justify-between border-b border-[#EFE8DF] pb-3 sm:pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F68722] animate-pulse" />
              <span className="text-xs font-black text-[#F68722] uppercase tracking-widest font-mono-specs">
                SCROLL-DRIVEN 3D CINEMATIC ANATOMY
              </span>
            </div>

            {/* Stage Indicators */}
            <div className="flex items-center gap-2">
              {STORY_STAGES.map((st, idx) => {
                const isActive = currentStageIndex === idx;
                return (
                  <div
                    key={st.id}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono-specs uppercase transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#3B3A3A] text-[#F68722] shadow-md scale-105'
                        : 'bg-white text-[#736F6A] border border-[#EFE8DF]'
                    }`}
                  >
                    <span>{st.stageNumber}</span>
                    <span className="hidden md:inline">{st.badge.split('—')[1]?.trim()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center flex-1 my-auto">
            
            {/* Left Column: Active Stage Text Readout with AnimatePresence */}
            <div className="lg:col-span-5 flex flex-col justify-center min-h-[220px] sm:min-h-[300px] z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] sm:text-xs font-bold text-[#F68722] uppercase font-mono-specs tracking-wider">
                      {currentStage.badge}
                    </span>
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-[#3B3A3A] font-heading leading-tight">
                      {currentStage.title}
                    </h2>
                  </div>

                  <div className="flex items-baseline gap-3 py-2 border-y border-[#EFE8DF]">
                    <span className="text-2xl sm:text-4xl font-black text-[#F68722] font-mono-specs">
                      {currentStage.metricValue}
                    </span>
                    <span className="text-xs font-bold text-[#736F6A] uppercase font-mono-specs">
                      {currentStage.metricLabel}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#736F6A] leading-relaxed">
                    {currentStage.description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {currentStage.keyPoints.map((pt, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#3B3A3A]">
                        <CheckCircle2 className="w-4 h-4 text-[#F68722] shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  {currentStageIndex === 3 && (
                    <div className="pt-2 flex items-center gap-3">
                      <Link
                        to="/contact"
                        className="bg-[#F68722] hover:bg-[#e07516] text-white px-4 py-2 rounded-xl text-xs font-black font-mono-specs uppercase flex items-center gap-2 shadow-md transition-all"
                      >
                        <span>GET FACTORY QUOTE</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: 60 FPS Photorealistic 3D Canvas Scrubber */}
            <div className="lg:col-span-7 flex items-center justify-center relative">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-white rounded-3xl border-2 border-[#EFE8DF] p-2 sm:p-4 flex items-center justify-center shadow-lg shadow-[#3B3A3A]/5 overflow-hidden">
                
                {/* 3D Canvas Rendering Ground */}
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-contain select-none"
                />

                {/* Preloading Progress Indicator if not finished */}
                {!isPreloaded && (
                  <div className="absolute inset-0 bg-[#FFFBF7]/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-30">
                    <div className="w-8 h-8 border-3 border-[#EFE8DF] border-t-[#F68722] rounded-full animate-spin" />
                    <span className="text-xs font-mono-specs font-bold text-[#736F6A]">
                      INITIALIZING 3D FRAMES ({loadedCount}/{TOTAL_FRAMES})...
                    </span>
                  </div>
                )}

                {/* Telemetry Live Badge */}
                <div className="absolute top-4 right-4 bg-[#3B3A3A]/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold font-mono-specs flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>STAGE {currentStage.stageNumber} ACTIVE</span>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom HUD: Progress Indicator */}
          <div className="border-t border-[#EFE8DF] pt-3 flex items-center justify-between text-[11px] font-bold text-[#736F6A] font-mono-specs uppercase">
            <span>ROTATION STAGE {currentStageIndex + 1} OF 4</span>
            <div className="flex-1 mx-6 h-1.5 bg-[#EFE8DF] rounded-full overflow-hidden hidden sm:block">
              <motion.div
                className="h-full bg-[#F68722]"
                style={{
                  width: `${((currentStageIndex + 1) / 4) * 100}%`
                }}
              />
            </div>
            <span className="text-[#F68722] animate-bounce">↓ SCROLL TO ROTATE</span>
          </div>

        </div>

      </div>

    </div>
  );
};
