import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, CheckCircle2, ArrowRight, Phone, Truck, Layers, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedCounter } from './AnimatedCounter';
import { HeroParticles } from './HeroParticles';
import { COMPANY_INFO } from '../data/trailers';

const TOTAL_FRAMES = 246;

interface ChapterInfo {
  id: string;
  badge: string;
  title: string;
  statValue: string;
  statLabel: string;
  description: string;
  keyPoints: string[];
}

const CHAPTERS: ChapterInfo[] = [
  {
    id: 'ch-1',
    badge: 'STAGE 01 — AERODYNAMIC INDUSTRIAL STANCE',
    title: 'Engineered for Heavy Commercial Transit',
    statValue: '700 MPa',
    statLabel: 'DOMEX High-Yield Steel',
    description: 'High-tensile European DOMEX 700 steel construction reduces tare dead weight by up to 1.8 Tons while maximizing legal revenue payload across national highway corridors.',
    keyPoints: [
      'Reinforced front kingpin box & JOST landing gear',
      'Aerodynamic headboard profile minimizes wind drag',
      '100% ARAI AIS-113 & CMVR certified geometry'
    ]
  },
  {
    id: 'ch-2',
    badge: 'STAGE 02 — ROBOTIC CHASSIS WELDING',
    title: 'Continuous Robotic SAW Long-Beams',
    statValue: '100%',
    statLabel: 'Submerged Arc Welds',
    description: 'Main longitudinal I-beams fabricated with automated double-sided Submerged Arc Welding (SAW) to prevent structural beam sag and metal fatigue over millions of kilometers.',
    keyPoints: [
      'Zero longitudinal sagging under peak 55T+ loads',
      'High-grade SA 2.5 white-metal shot blasted steel',
      'Dual-coat polyurethane anti-corrosion paint system'
    ]
  },
  {
    id: 'ch-3',
    badge: 'STAGE 03 — TRIDEM RUNNING GEAR',
    title: '3 x 14 Ton Axles & Multi-Leaf Suspension',
    statValue: '3 x 14T',
    statLabel: 'Axle Capacity',
    description: 'Heavy-duty multi-leaf spring suspension combined with precision equalizer beams ensures optimal weight distribution across all 3 axles, preventing uneven tire wear.',
    keyPoints: [
      'Heavy-duty bronze-bushed equalizer rocker beams',
      'WABCO dual-line pneumatic fail-safe air brake system',
      'Automatic slack adjusters & reinforced wheel hubs'
    ]
  },
  {
    id: 'ch-4',
    badge: 'STAGE 04 — MAXIMUM BULK PAYLOAD',
    title: 'Built for India’s Demanding Corridors',
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
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Scroll Progress across 350vh pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.0005
  });

  // Dynamic Layout Transforms as user scrolls down:
  // Phase 1 (0.0 to 0.18): Hero text fades & slides left; 3D Box expands to full width
  const heroTextOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const heroTextX = useTransform(smoothProgress, [0, 0.14], [0, -60]);

  // Canvas Container positioning: starts as 2-column card, scales & expands to full screen
  const isExpanded = useTransform(smoothProgress, (v) => v > 0.1);
  const [expandedState, setExpandedState] = useState(false);

  // Chapter HUD overlay opacity (only visible after expansion, 0.18 to 0.95)
  const hudOpacity = useTransform(smoothProgress, [0.15, 0.22, 0.94, 1.0], [0, 1, 1, 0]);

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
        if (count >= 25) {
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

  // 2. CANVAS DRAWING ON ACTIVE FRAME
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

  // 3. LISTEN TO SMOOTH SCROLL PROGRESS & SCRUB FRAMES
  useEffect(() => {
    return smoothProgress.on('change', (progress) => {
      setExpandedState(progress > 0.12);

      // Frame scrubbing (progress 0.0 to 1.0 -> frame 0 to 245)
      const clamped = Math.max(0, Math.min(progress, 0.9999));
      const frameIdx = Math.floor(clamped * (TOTAL_FRAMES - 1));
      drawFrame(frameIdx);

      // Determine active chapter (across 0.20 to 1.0)
      if (progress < 0.38) {
        setActiveChapterIndex(0);
      } else if (progress < 0.60) {
        setActiveChapterIndex(1);
      } else if (progress < 0.82) {
        setActiveChapterIndex(2);
      } else {
        setActiveChapterIndex(3);
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
    <section ref={containerRef} className="relative h-[380vh] bg-[#FFFBF7]">
      
      {/* Sticky Full-Screen Pinned Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Subtle Background Particles & Grid */}
        <HeroParticles />
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#3B3A3A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* 1. INITIAL HERO LANDING VIEW (Fades & slides out as scroll starts) */}
        {!expandedState && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-6 sm:py-12 absolute inset-x-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Hero Copy & CTAs */}
              <motion.div
                style={{
                  opacity: heroTextOpacity,
                  x: heroTextX
                }}
                className="lg:col-span-6 space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#F68722] uppercase tracking-wider font-mono-specs">
                    MADE IN INDIA
                  </span>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#3B3A3A] font-heading leading-tight tracking-tight">
                    BUILT TO PERFORM.<br />
                    <span className="text-[#F68722]">BUILT TO LAST.</span>
                  </h1>
                </div>

                <p className="text-sm sm:text-base text-[#736F6A] max-w-lg leading-relaxed">
                  We manufacture high-performance trailers designed to handle the toughest loads, harshest terrains, and longest hauls. When strength, safety, and reliability matter, our engineering delivers without compromise.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    to="/products"
                    className="bg-[#F68722] hover:bg-[#e07516] text-white px-7 py-3.5 rounded-2xl font-bold text-sm tracking-wide shadow-lg shadow-[#F68722]/20 hover:shadow-xl hover:shadow-[#F68722]/30 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                  >
                    <span>EXPLORE PRODUCTS</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-[#3B3A3A] hover:bg-[#2A2929] text-white px-7 py-3.5 rounded-2xl font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    REQUEST QUOTE
                  </Link>
                </div>

                {/* 3 Stats Counters */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#EFE8DF]">
                  <div>
                    <span className="text-xs font-bold text-[#3B3A3A] font-mono-specs block">ARAI AIS-113</span>
                    <span className="text-[11px] text-[#736F6A]">100% Homologated</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#F68722] font-mono-specs block">
                      <AnimatedCounter end={700} suffix=" MPa" />
                    </span>
                    <span className="text-[11px] text-[#736F6A]">High-Tensile Steel</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#3B3A3A] font-mono-specs block">
                      <AnimatedCounter end={55} suffix="T+ Max" />
                    </span>
                    <span className="text-[11px] text-[#736F6A]">Payload Capacity</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Initial 2-Column Hero Card */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-lg aspect-[16/11] bg-white rounded-3xl p-3 shadow-xl border border-[#EFE8DF]">
                  {/* Brochure Offset Solid Orange Frame */}
                  <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl bg-[#F68722] -z-10" />

                  <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain rounded-2xl select-none"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. EXPANDED FULL-SCREEN 3D SCROLL EXPERIENCE (Active from scroll > 12%) */}
        {expandedState && (
          <div className="absolute inset-0 w-full h-full flex flex-col justify-between p-4 sm:p-8 z-20">
            
            {/* Top HUD Bar */}
            <motion.div
              style={{ opacity: hudOpacity }}
              className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-[#EFE8DF] pb-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F68722] animate-pulse" />
                <span className="text-xs font-black text-[#F68722] uppercase tracking-widest font-mono-specs">
                  3D SCROLL ROTATION SHOWCASE
                </span>
              </div>

              {/* Stage Pills */}
              <div className="flex items-center gap-2">
                {CHAPTERS.map((ch, idx) => {
                  const isActive = activeChapterIndex === idx;
                  return (
                    <div
                      key={ch.id}
                      className={`px-3 py-1 rounded-xl text-[10px] font-bold font-mono-specs uppercase transition-all duration-300 flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#3B3A3A] text-[#F68722] shadow-md scale-105'
                          : 'bg-white text-[#736F6A] border border-[#EFE8DF]'
                      }`}
                    >
                      <span>0{idx + 1}</span>
                      <span className="hidden sm:inline">{ch.badge.split('—')[1]?.trim()}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Centered Master 3D Trailer Canvas */}
            <div className="flex-1 w-full max-w-6xl mx-auto flex items-center justify-center relative my-auto">
              <canvas
                ref={canvasRef}
                className="w-full h-full max-h-[70vh] object-contain select-none drop-shadow-2xl"
              />
            </div>

            {/* Bottom Left: Dynamic Technical Story Readout */}
            <motion.div
              style={{ opacity: hudOpacity }}
              className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-end border-t border-[#EFE8DF] pt-4"
            >
              <div className="md:col-span-7 space-y-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentChapter.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-1.5"
                  >
                    <span className="text-[11px] font-bold text-[#F68722] uppercase font-mono-specs">
                      {currentChapter.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#3B3A3A] font-heading leading-tight">
                      {currentChapter.title}
                    </h2>
                    <p className="text-xs text-[#736F6A] max-w-xl leading-relaxed">
                      {currentChapter.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Right: Live Metric & Scroll Prompt */}
              <div className="md:col-span-5 flex flex-col md:items-end justify-between gap-3">
                <div className="bg-white border border-[#EFE8DF] px-4 py-2 rounded-2xl shadow-sm flex items-center gap-3">
                  <span className="text-xl font-black text-[#F68722] font-mono-specs">
                    {currentChapter.statValue}
                  </span>
                  <span className="text-[10px] font-bold text-[#736F6A] uppercase font-mono-specs">
                    {currentChapter.statLabel}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#F68722] font-mono-specs uppercase animate-bounce">
                  ↓ SCROLL TO ROTATE & EXPLORE
                </span>
              </div>
            </motion.div>

          </div>
        )}

      </div>

    </section>
  );
};
