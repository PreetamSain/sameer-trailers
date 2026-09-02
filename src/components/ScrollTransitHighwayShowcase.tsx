import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, ArrowRight, Gauge, Zap, Navigation, Truck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedCounter } from './AnimatedCounter';

export const ScrollTransitHighwayShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure scroll progress across 300vh sticky track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.0005
  });

  // ========================================================
  // SCROLL-DRIVEN RIGHT TO LEFT TRANSIT KINEMATICS
  // ========================================================
  
  // 1. Truck Horizontal Position (Enters from Right at +100vw -> Stops in Center at 0% -> Exits to Left at -100vw)
  // 0.0 -> 0.35 : Drives from Right (+80vw) to Center (0vw)
  // 0.35 -> 0.65 : Pauses / cruises through Center stage (0vw)
  // 0.65 -> 1.0 : Drives from Center (0vw) to Left (-85vw)
  const truckX = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    ['75vw', '0vw', '0vw', '-75vw']
  );

  // 2. Wheel Rotation simulation tied to scroll distance
  const wheelRotate = useTransform(smoothProgress, [0, 1], [0, -1440]); // Rotates forward as driving right-to-left

  // 3. Center Technical Telemetry HUD (Appears when truck reaches center 0.30 -> 0.70)
  const hudOpacity = useTransform(smoothProgress, [0.25, 0.35, 0.65, 0.75], [0, 1, 1, 0]);
  const hudY = useTransform(smoothProgress, [0.25, 0.35, 0.65, 0.75], [25, 0, 0, -25]);

  // 4. Milestone Road Progress (0 km to 1,500 km transit)
  const roadLineOffset = useTransform(smoothProgress, [0, 1], ['0%', '-200%']);

  return (
    <section ref={containerRef} className="relative h-[320vh] bg-[#0A0A0D] text-white overflow-hidden border-y border-[#202026]">
      
      {/* Pinned Sticky Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-10">
        
        {/* Background Blueprint Grid & Ambient Orange Glow */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#F68722 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F68722]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* 1. TOP HEADER & TELEMETRY */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222228] pb-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F68722] animate-ping" />
                <span className="text-xs font-bold text-[#F68722] uppercase tracking-[0.2em] font-mono-specs">
                  SCROLL-DRIVEN HIGHWAY TRANSIT SIMULATION
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-heading tracking-tight">
                Continuous Heavy Transit. <br className="sm:hidden" />
                <span className="text-[#F68722]">Engineered for Long Haul.</span>
              </h2>
            </div>

            {/* Scroll Direction Indicator */}
            <div className="flex items-center gap-3 text-xs font-mono-specs text-[#A09D98] bg-[#14141A] px-4 py-2 rounded-xl border border-[#2B2B35]">
              <span className="text-[#F68722] font-bold">DIRECTION:</span>
              <span>RIGHT → LEFT TRANSIT</span>
              <span className="text-emerald-400">● 60 FPS SYNC</span>
            </div>
          </div>
        </div>

        {/* 2. CENTER STAGE: TRUCK DRIVING RIGHT TO LEFT + DYNAMIC TELEMETRY HUD */}
        <div className="relative w-full flex-1 flex flex-col items-center justify-center z-10 my-auto">
          
          {/* CENTER TELEMETRY HUD (Pops up when truck enters center stage) */}
          <motion.div
            style={{ opacity: hudOpacity, y: hudY }}
            className="absolute top-2 sm:top-6 z-30 max-w-2xl px-4 text-center pointer-events-none space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F68722]/15 border border-[#F68722]/30 text-xs font-bold text-[#F68722] font-mono-specs">
              <Zap className="w-3.5 h-3.5" />
              <span>55T BULK CARGO CORRIDOR TRANSIT</span>
            </div>

            <p className="text-xs sm:text-sm text-[#E0DDD8] max-w-xl mx-auto font-medium leading-relaxed drop-shadow-md">
              High-tensile DOMEX 700 longitudinal beams maintain zero deflection under high-speed highway haulage with genuine WABCO pneumatic dual-circuit air braking.
            </p>

            {/* 3 Telemetry Badges */}
            <div className="flex flex-wrap justify-center items-center gap-3 pt-1">
              <span className="bg-[#14141A]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-[#2B2B35] text-[11px] font-mono-specs text-white">
                <span className="text-[#F68722] font-bold">700 MPa</span> High-Yield Steel
              </span>
              <span className="bg-[#14141A]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-[#2B2B35] text-[11px] font-mono-specs text-white">
                <span className="text-[#F68722] font-bold">3 x 14T</span> Tridem Axles
              </span>
              <span className="bg-[#14141A]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-[#2B2B35] text-[11px] font-mono-specs text-white">
                <span className="text-emerald-400 font-bold">ARAI AIS-113</span> 100% Homologated
              </span>
            </div>
          </motion.div>

          {/* TRUCK CONTAINER (Drives Right to Left across the screen on Scroll) */}
          <div className="relative w-full overflow-visible flex items-center justify-center py-4">
            <motion.div
              style={{ x: truckX }}
              className="relative w-[85vw] max-w-4xl sm:max-w-5xl flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
            >
              
              {/* High-Resolution Side-Profile Transparent Truck Asset */}
              <img
                src="/assets/trailer-frames-webp/frame_0001.webp"
                alt="Sameer Heavy Commercial Trailer Transit"
                className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] filter brightness-105"
              />

              {/* Dynamic Vehicle Tracking HUD Nodes */}
              <motion.div
                style={{ opacity: hudOpacity }}
                className="absolute -top-3 left-[20%] bg-[#F68722] text-white px-2.5 py-1 rounded-md text-[10px] font-black font-mono-specs tracking-wider shadow-lg flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>JOST 15T GEAR</span>
              </motion.div>

              <motion.div
                style={{ opacity: hudOpacity }}
                className="absolute -top-3 right-[22%] bg-black/90 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-md text-[10px] font-black font-mono-specs tracking-wider shadow-lg"
              >
                <span>3x14T TRIDEM AXLES</span>
              </motion.div>

            </motion.div>
          </div>

          {/* 3. ROADWAY TRACK WITH DYNAMIC DASHED LINES & MILESTONES */}
          <div className="w-full max-w-7xl mx-auto px-4 relative mt-2">
            
            {/* Road Surface */}
            <div className="relative w-full h-12 bg-gradient-to-b from-[#16161D] to-[#0D0D11] rounded-2xl border border-[#2B2B35] flex items-center overflow-hidden shadow-inner">
              
              {/* Moving Road Center Dashed Line */}
              <motion.div
                style={{ x: roadLineOffset }}
                className="w-[300%] h-1 bg-[repeating-linear-gradient(90deg,#F68722_0px,#F68722_30px,transparent_30px,transparent_60px)] opacity-70"
              />

              {/* Roadside Distance Marker Pills */}
              <div className="absolute inset-0 flex items-center justify-between px-6 text-[10px] font-mono-specs text-[#736F6A] pointer-events-none">
                <span>000 KM (START)</span>
                <span>500 KM</span>
                <span className="text-[#F68722] font-bold">1,000 KM (HIGHWAY CRUISE)</span>
                <span>1,500+ KM (NON-STOP)</span>
              </div>

            </div>

          </div>

        </div>

        {/* 4. BOTTOM PERSISTENT SCROLL HELPER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
          <div className="flex items-center justify-between border-t border-[#222228] pt-3 text-[11px] font-mono-specs text-[#736F6A]">
            <span>ENGINEERED IN INDIA FOR NATIONWIDE FREIGHT</span>
            <div className="flex items-center gap-2 text-[#F68722] font-bold animate-pulse">
              <span>↓ SCROLL DOWN TO DRIVE FORWARD</span>
              <span>•</span>
              <span>↑ SCROLL UP TO REVERSE</span>
            </div>
            <span>ZERO OVERLOAD RISK</span>
          </div>
        </div>

      </div>

    </section>
  );
};
