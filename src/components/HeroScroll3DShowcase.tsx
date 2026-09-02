import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, CheckCircle2, ArrowRight, Phone, Truck, Layers, Scale, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedCounter } from './AnimatedCounter';
import { HeroParticles } from './HeroParticles';
import { COMPANY_INFO } from '../data/trailers';

const TOTAL_FRAMES = 246;

export const HeroScroll3DShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollP, setScrollP] = useState<number>(0);
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Detect mobile vs desktop screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth scroll progress measurement across 420vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    restDelta: 0.0005
  });

  // ========================================================
  // RESPONSIVE CONTINUOUS TRANSFORMS (Grand Scale & Dead-Centered)
  // ========================================================
  
  // 1. Initial Hero Left Typography (Fades & slides left smoothly 0.0 -> 0.16)
  const leftTextOpacity = useTransform(smoothProgress, [0, 0.14], [1, 0]);
  const leftTextX = useTransform(smoothProgress, [0, 0.16], [0, -100]);
  const leftTextScale = useTransform(smoothProgress, [0, 0.16], [1, 0.94]);

  // 2. 3D Trailer Canvas Transforms:
  // Desktop: Starts at right half (scale: 0.85, x: 26%, y: 0) -> expands to center stage (scale: 1.28, x: 0%, y: 0%)
  // Mobile: Starts centered below text (scale: 0.95, y: 15%) -> expands to center stage (scale: 1.15, y: 0%)
  const canvasScale = useTransform(
    smoothProgress,
    [0, 0.22],
    isMobile ? [0.95, 1.15] : [0.85, 1.28]
  );
  
  const canvasX = useTransform(
    smoothProgress,
    [0, 0.22],
    isMobile ? ['0%', '0%'] : ['26%', '0%']
  );

  const canvasY = useTransform(
    smoothProgress,
    [0, 0.22],
    isMobile ? ['16%', '0%'] : ['0%', '0%']
  );

  // Initial Orange Backdrop Card Border (fades out as expansion starts)
  const initialCardBorderOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  // 3. Floating Editorial Callouts (Fade in smoothly across distinct stages 0.20 -> 1.0)
  // Stage 1 Callouts (0.20 to 0.44)
  const stage1Opacity = useTransform(smoothProgress, [0.18, 0.24, 0.40, 0.45], [0, 1, 1, 0]);
  const stage1Y = useTransform(smoothProgress, [0.18, 0.24, 0.40, 0.45], [20, 0, 0, -20]);

  // Stage 2 Callouts (0.45 to 0.68)
  const stage2Opacity = useTransform(smoothProgress, [0.44, 0.49, 0.64, 0.69], [0, 1, 1, 0]);
  const stage2Y = useTransform(smoothProgress, [0.44, 0.49, 0.64, 0.69], [20, 0, 0, -20]);

  // Stage 3 Callouts (0.69 to 0.88)
  const stage3Opacity = useTransform(smoothProgress, [0.68, 0.73, 0.84, 0.89], [0, 1, 1, 0]);
  const stage3Y = useTransform(smoothProgress, [0.68, 0.73, 0.84, 0.89], [20, 0, 0, -20]);

  // Stage 4 Callouts (0.89 to 1.0)
  const stage4Opacity = useTransform(smoothProgress, [0.88, 0.92, 0.98, 1.0], [0, 1, 1, 1]);
  const stage4Y = useTransform(smoothProgress, [0.88, 0.92], [20, 0]);

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

  // 2. CANVAS DRAWING ON ACTIVE FRAME (Ultra-Crisp Scaling)
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
      setScrollP(progress);

      // Frame scrubbing: progress 0.0 to 1.0 -> frame 0 to 245
      const clamped = Math.max(0, Math.min(progress, 0.9999));
      const frameIdx = Math.floor(clamped * (TOTAL_FRAMES - 1));
      drawFrame(frameIdx);
    });
  }, [smoothProgress]);

  // Initial draw once preloaded
  useEffect(() => {
    if (isPreloaded) {
      drawFrame(0);
    }
  }, [isPreloaded]);

  return (
    <section ref={containerRef} className="relative h-[420vh] bg-[#FFFBF7]">
      
      {/* Sticky Full-Screen Pinned Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Subtle Background Particles & Blueprint Grid */}
        <HeroParticles />
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#3B3A3A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* 1. INITIAL HERO TYPOGRAPHY (Positioned cleanly on Left) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            
            <motion.div
              style={{
                opacity: leftTextOpacity,
                x: leftTextX,
                scale: leftTextScale
              }}
              className="lg:col-span-6 space-y-5 sm:space-y-6 pointer-events-auto select-none"
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

              <p className="text-sm sm:text-base text-[#736F6A] max-w-lg leading-relaxed font-medium">
                We manufacture high-performance commercial trailers designed to handle the toughest loads, harshest terrains, and longest hauls across India.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
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

          </div>
        </div>

        {/* 2. MASTER 3D CANVAS STAGE (Expands to Huge Central Screen Presence) */}
        <motion.div
          style={{
            scale: canvasScale,
            x: canvasX,
            y: canvasY
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 px-2 sm:px-6"
        >
          <div className="relative w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
            
            {/* Initial Offset Orange Backdrop Frame (Visible only at scroll 0) */}
            <motion.div
              style={{ opacity: initialCardBorderOpacity }}
              className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl bg-[#F68722] -z-10 hidden lg:block"
            />

            {/* Canvas Viewport */}
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain select-none drop-shadow-2xl"
            />

          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* FLOATING BODY PART CALLOUTS (Scattered around vehicle) */}
        {/* ======================================================== */}

        {/* STAGE 01 CALLOUTS (Front / Stance View — 20% to 45%) */}
        <motion.div
          style={{ opacity: stage1Opacity, y: stage1Y }}
          className="absolute top-6 left-4 sm:left-12 lg:left-16 max-w-xs z-30 pointer-events-none bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#EFE8DF] shadow-xl"
        >
          <div className="flex items-center gap-2 text-[10px] font-black text-[#F68722] font-mono-specs uppercase">
            <span className="w-2 h-2 rounded-full bg-[#F68722] animate-ping" />
            <span>01 / FRONT AERODYNAMICS</span>
          </div>
          <h3 className="text-sm sm:text-base font-black text-[#3B3A3A] font-heading mt-1">
            Low-Drag Cab Interface
          </h3>
          <p className="text-[11px] text-[#736F6A] leading-relaxed mt-0.5">
            Aerodynamic headboard geometry reduces highway wind drag with heavy-duty JOST landing gear.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: stage1Opacity, y: stage1Y }}
          className="absolute bottom-6 left-4 sm:left-12 lg:left-16 max-w-xs z-30 pointer-events-none bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#EFE8DF] shadow-xl"
        >
          <span className="text-xl font-black text-[#F68722] font-mono-specs block">700 MPa</span>
          <span className="text-[10px] font-bold text-[#3B3A3A] uppercase font-mono-specs block">DOMEX High-Yield Steel</span>
        </motion.div>

        {/* STAGE 02 CALLOUTS (Chassis Long-Beam View — 45% to 68%) */}
        <motion.div
          style={{ opacity: stage2Opacity, y: stage2Y }}
          className="absolute top-6 right-4 sm:right-12 lg:right-16 max-w-xs z-30 pointer-events-none bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#EFE8DF] shadow-xl text-left"
        >
          <div className="flex items-center gap-2 text-[10px] font-black text-[#F68722] font-mono-specs uppercase">
            <span className="w-2 h-2 rounded-full bg-[#F68722] animate-ping" />
            <span>02 / ROBOTIC METALLURGY</span>
          </div>
          <h3 className="text-sm sm:text-base font-black text-[#3B3A3A] font-heading mt-1">
            Continuous Robotic SAW Welds
          </h3>
          <p className="text-[11px] text-[#736F6A] leading-relaxed mt-0.5">
            Longitudinal I-beams welded on both sides to prevent beam sag and metal fatigue over millions of kilometers.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: stage2Opacity, y: stage2Y }}
          className="absolute bottom-6 right-4 sm:right-12 lg:right-16 max-w-xs z-30 pointer-events-none bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#EFE8DF] shadow-xl text-left"
        >
          <span className="text-xl font-black text-[#3B3A3A] font-mono-specs block">-1,800 KG</span>
          <span className="text-[10px] font-bold text-[#F68722] uppercase font-mono-specs block">Lighter Tare Dead Weight</span>
        </motion.div>

        {/* STAGE 03 CALLOUTS (Rear Axles & Suspension — 69% to 88%) */}
        <motion.div
          style={{ opacity: stage3Opacity, y: stage3Y }}
          className="absolute top-8 left-4 sm:left-12 lg:left-16 max-w-xs z-30 pointer-events-none bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#EFE8DF] shadow-xl"
        >
          <div className="flex items-center gap-2 text-[10px] font-black text-[#F68722] font-mono-specs uppercase">
            <span className="w-2 h-2 rounded-full bg-[#F68722] animate-ping" />
            <span>03 / RUNNING GEAR & AXLES</span>
          </div>
          <h3 className="text-sm sm:text-base font-black text-[#3B3A3A] font-heading mt-1">
            3 x 14 Ton Heavy Tridem Axles
          </h3>
          <p className="text-[11px] text-[#736F6A] leading-relaxed mt-0.5">
            Heavy multi-leaf springs & bronze-bushed equalizers distribute load evenly, preventing uneven tire scrubbing.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: stage3Opacity, y: stage3Y }}
          className="absolute bottom-6 right-4 sm:right-12 lg:right-16 max-w-xs z-30 pointer-events-none bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#EFE8DF] shadow-xl"
        >
          <span className="text-xl font-black text-[#F68722] font-mono-specs block">WABCO</span>
          <span className="text-[10px] font-bold text-[#3B3A3A] uppercase font-mono-specs block">Dual-Line Pneumatic Brakes</span>
        </motion.div>

        {/* STAGE 04 CALLOUTS (Final Hero & Direct Action — 89% to 1.0) */}
        <motion.div
          style={{ opacity: stage4Opacity, y: stage4Y }}
          className="absolute bottom-6 right-4 sm:right-12 lg:right-16 max-w-sm z-30 pointer-events-auto bg-white/95 backdrop-blur-xl p-5 rounded-3xl border-2 border-[#EFE8DF] shadow-2xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#F68722] font-mono-specs uppercase">STAGE 04 / CERTIFIED</span>
            <span className="text-xs font-bold text-[#3B3A3A] font-mono-specs">ARAI AIS-113</span>
          </div>
          <h3 className="text-lg font-black text-[#3B3A3A] font-heading leading-tight">
            55T+ Certified Dynamic Payload
          </h3>
          <p className="text-xs text-[#736F6A] leading-relaxed">
            Engineered for maximum haulage profitability across all national corridors with 15+ years chassis lifespan.
          </p>
          <div className="pt-1 flex gap-2">
            <Link
              to="/contact"
              className="flex-1 bg-[#F68722] hover:bg-[#e07516] text-white py-2.5 px-3 rounded-xl text-xs font-black font-mono-specs uppercase text-center shadow-md transition-all cursor-pointer"
            >
              REQUEST FACTORY QUOTE
            </Link>
          </div>
        </motion.div>

        {/* Bottom Persistent Scroll Helper */}
        {scrollP < 0.95 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center items-center gap-2 pointer-events-none text-[11px] font-bold text-[#736F6A] font-mono-specs uppercase">
            <span className="text-[#F68722] animate-bounce">↓ SCROLL TO ROTATE IN 3D</span>
          </div>
        )}

      </div>

    </section>
  );
};
