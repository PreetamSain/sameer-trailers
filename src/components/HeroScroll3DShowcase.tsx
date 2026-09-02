import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, CheckCircle2, ArrowRight, Phone, Truck, Layers, Scale, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedCounter } from './AnimatedCounter';
import { HeroParticles } from './HeroParticles';
import { COMPANY_INFO } from '../data/trailers';

const TOTAL_FRAMES = 246;

interface StoryChapter {
  id: string;
  stageNumber: string;
  badge: string;
  headlineMain: string;
  headlineAccent: string;
  statValue: string;
  statLabel: string;
  description: string;
  keyPoints: string[];
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 'intro',
    stageNumber: '00',
    badge: 'MADE IN INDIA',
    headlineMain: 'BUILT TO PERFORM.',
    headlineAccent: 'BUILT TO LAST.',
    statValue: '700 MPa',
    statLabel: 'DOMEX High-Yield Steel',
    description: 'We manufacture high-performance commercial trailers designed to handle the toughest loads, harshest terrains, and longest hauls across India.',
    keyPoints: [
      '100% ARAI AIS-113 & CMVR certified manufacturing',
      'Ultra-high strength European DOMEX 700 steel construction',
      'Engineered for maximum legal revenue payload'
    ]
  },
  {
    id: 'stage-1',
    stageNumber: '01',
    badge: '01 / AERODYNAMIC STANCE',
    headlineMain: 'ENGINEERED FOR',
    headlineAccent: 'HEAVY TRANSIT.',
    statValue: '700 MPa',
    statLabel: 'Tensile Yield Strength',
    description: 'High-tensile European DOMEX 700 steel construction delivers extreme torsional rigidity with up to 1.8 Tons lower tare weight, maximizing every ton of legal freight.',
    keyPoints: [
      'Reinforced front kingpin box & JOST dual-speed landing gear',
      'Aerodynamic headboard profile minimizes highway wind drag',
      'Optimized center of gravity for sharp highway stability'
    ]
  },
  {
    id: 'stage-2',
    stageNumber: '02',
    badge: '02 / ROBOTIC METALLURGY',
    headlineMain: 'CONTINUOUS ROBOTIC',
    headlineAccent: 'SAW WELDS.',
    statValue: '100%',
    statLabel: 'Submerged Arc Welds',
    description: 'Main longitudinal I-beams fabricated with automated double-sided Submerged Arc Welding (SAW) to prevent structural beam sag and metal fatigue over millions of kilometers.',
    keyPoints: [
      'Zero longitudinal sagging under peak 55T+ loads',
      'Steel shot-blasted to SA 2.5 white-metal finish',
      'Dual-coat polyurethane anti-corrosion paint system'
    ]
  },
  {
    id: 'stage-3',
    stageNumber: '03',
    badge: '03 / TRIDEM RUNNING GEAR',
    headlineMain: '3 x 14 TON AXLES &',
    headlineAccent: 'MULTI-LEAF SPRINGS.',
    statValue: '3 x 14T',
    statLabel: 'Axle Load Rating',
    description: 'Heavy-duty multi-leaf spring suspension combined with precision equalizer rocker beams ensures optimal weight distribution across all 3 axles, preventing uneven tire scrubbing.',
    keyPoints: [
      'Heavy-duty bronze-bushed equalizer rocker arms',
      'WABCO dual-line pneumatic fail-safe air brake system',
      'Automatic slack adjusters & reinforced wheel hubs'
    ]
  },
  {
    id: 'stage-4',
    stageNumber: '04',
    badge: '04 / MAXIMUM BULK PAYLOAD',
    headlineMain: '55T+ CERTIFIED',
    headlineAccent: 'MAXIMUM PAYLOAD.',
    statValue: '55T+',
    statLabel: 'Certified Payload Rating',
    description: 'From rugged mining zones to express highway freight, Sameer Commercial Trailers deliver industry-leading reliability, lower diesel consumption, and maximum fleet ROI.',
    keyPoints: [
      '15+ years proven operational chassis lifespan',
      'Customized engineering for cement, steel, machinery & bulk',
      'Direct factory warranty & rapid nationwide delivery'
    ]
  }
];

export const HeroScroll3DShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [scrollProgressVal, setScrollProgressVal] = useState<number>(0);
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Smooth scroll progress measurement across 350vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.0005
  });

  // Initial Buttons & Stats visibility (Fades out gently as scroll starts > 0.08)
  const initialButtonsOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const initialButtonsPointerEvents = useTransform(smoothProgress, (v) => (v > 0.08 ? 'none' : 'auto'));

  // 1. PRELOAD 246 WEBP FRAMES
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
        if (count >= 15) {
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

  // 2. CANVAS DRAWING ON ACTIVE FRAME (Crisp Scaling & Centered)
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

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

  // 3. LISTEN TO SMOOTH SCROLL PROGRESS & SCRUB FRAMES + UPDATE CHAPTER
  useEffect(() => {
    return smoothProgress.on('change', (progress) => {
      setScrollProgressVal(progress);

      // Frame scrubbing: progress 0.0 to 1.0 -> frame 0 to 245
      const clamped = Math.max(0, Math.min(progress, 0.9999));
      const frameIdx = Math.floor(clamped * (TOTAL_FRAMES - 1));
      drawFrame(frameIdx);

      // Determine active story chapter
      if (progress < 0.12) {
        setActiveChapterIndex(0); // Intro
      } else if (progress < 0.38) {
        setActiveChapterIndex(1); // Stage 1
      } else if (progress < 0.64) {
        setActiveChapterIndex(2); // Stage 2
      } else if (progress < 0.86) {
        setActiveChapterIndex(3); // Stage 3
      } else {
        setActiveChapterIndex(4); // Stage 4
      }
    });
  }, [smoothProgress]);

  // Initial draw once preloaded
  useEffect(() => {
    if (isPreloaded) {
      drawFrame(0);
    }
  }, [isPreloaded]);

  const currentChapter = CHAPTERS[activeChapterIndex];

  return (
    <section ref={containerRef} className="relative h-[360vh] bg-[#FFFBF7]">
      
      {/* Sticky Full-Screen Pinned Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Subtle Background Particles & Blueprint Grid */}
        <HeroParticles />
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#3B3A3A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* MAIN SIDE-BY-SIDE 2-COLUMN VIEWPORT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-6 flex-1 flex flex-col justify-center">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            
            {/* 1. LEFT COLUMN: DYNAMIC EDITORIAL TYPOGRAPHY (Smooth In-Place Crossfade) */}
            <div className="lg:col-span-6 flex flex-col justify-center min-h-[320px] sm:min-h-[400px]">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentChapter.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-4 sm:space-y-5 select-none"
                >
                  {/* Badge */}
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F68722] animate-pulse" />
                    <span className="text-xs font-bold text-[#F68722] uppercase tracking-wider font-mono-specs">
                      {currentChapter.badge}
                    </span>
                  </div>

                  {/* Main Headings */}
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#3B3A3A] font-heading leading-tight tracking-tight">
                    {currentChapter.headlineMain} <br />
                    <span className="text-[#F68722]">{currentChapter.headlineAccent}</span>
                  </h1>

                  {/* Description */}
                  <p className="text-xs sm:text-base text-[#736F6A] max-w-lg leading-relaxed font-medium">
                    {currentChapter.description}
                  </p>

                  {/* Key Highlights Checklist (for stages 1, 2, 3, 4) */}
                  {activeChapterIndex > 0 && (
                    <div className="space-y-2 pt-1">
                      {currentChapter.keyPoints.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#3B3A3A]">
                          <CheckCircle2 className="w-4 h-4 text-[#F68722] shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stage 4 Final Action CTA */}
                  {activeChapterIndex === 4 && (
                    <div className="pt-2 flex flex-wrap gap-3">
                      <Link
                        to="/contact"
                        className="bg-[#F68722] hover:bg-[#e07516] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#F68722]/20 flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <span>REQUEST FACTORY QUOTE</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Initial Action Buttons & Stats (Only visible at intro scroll = 0) */}
              {activeChapterIndex === 0 && (
                <motion.div
                  style={{ opacity: initialButtonsOpacity }}
                  className="space-y-6 pt-5"
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to="/products"
                      className="bg-[#F68722] hover:bg-[#e07516] text-white px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#F68722]/20 hover:shadow-xl hover:shadow-[#F68722]/30 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                    >
                      <span>EXPLORE PRODUCTS</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/contact"
                      className="bg-[#3B3A3A] hover:bg-[#222222] text-white px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      REQUEST QUOTE
                    </Link>
                  </div>

                  {/* 3 Animated Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#EFE8DF] max-w-lg">
                    <div>
                      <div className="text-xs font-bold text-[#3B3A3A] font-mono-specs">ARAI AIS-113</div>
                      <div className="text-[11px] text-[#736F6A]">100% Homologated</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#F68722] font-mono-specs">
                        <AnimatedCounter end={700} suffix=" MPa" />
                      </div>
                      <div className="text-[11px] text-[#736F6A]">High-Tensile Steel</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#3B3A3A] font-mono-specs">
                        <AnimatedCounter end={55} suffix="T+ Max" />
                      </div>
                      <div className="text-[11px] text-[#736F6A]">Payload Capacity</div>
                    </div>
                  </div>
                </motion.div>
              )}

            </div>

            {/* 2. RIGHT COLUMN: SEAMLESS 3D TRANSPARENT TRAILER CANVAS (Stays fixed in right column) */}
            <div className="lg:col-span-6 flex items-center justify-center relative w-full">
              <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] flex items-center justify-center select-none">
                
                {/* Seamless Canvas (No border box, no frame, pure transparent vehicle) */}
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-contain select-none drop-shadow-2xl scale-[1.08] sm:scale-[1.15]"
                />

                {/* Floating Telemetry Pill for Active Stage */}
                {activeChapterIndex > 0 && (
                  <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#EFE8DF] shadow-md flex items-center gap-2 text-[10px] font-bold font-mono-specs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F68722] animate-ping" />
                    <span className="text-[#3B3A3A]">{currentChapter.statValue}</span>
                    <span className="text-[#736F6A]">• {currentChapter.statLabel}</span>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

        {/* Bottom Persistent Scroll Helper */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-[#EFE8DF] py-2.5 flex items-center justify-between text-[11px] font-bold text-[#736F6A] font-mono-specs uppercase">
          <span>STAGE {activeChapterIndex + 1} OF 5</span>
          <div className="flex-1 mx-6 h-1 bg-[#EFE8DF] rounded-full overflow-hidden hidden sm:block">
            <div
              className="h-full bg-[#F68722] transition-all duration-150"
              style={{ width: `${((activeChapterIndex + 1) / 5) * 100}%` }}
            />
          </div>
          <span className="text-[#F68722] animate-bounce">↓ SCROLL TO ROTATE & EXPLORE</span>
        </div>

      </div>

    </section>
  );
};
