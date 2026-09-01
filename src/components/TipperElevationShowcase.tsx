import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle2, ArrowRight, Gauge, Layers, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TipperStage {
  id: string;
  stepNumber: string;
  tabLabel: string;
  badge: string;
  title: string;
  metricValue: string;
  metricLabel: string;
  description: string;
  keyPoints: string[];
  image: string;
  tiltAngle: string;
  cycleTime: string;
}

const TIPPER_STAGES: TipperStage[] = [
  {
    id: 'stage-1',
    stepNumber: '01',
    tabLabel: '1. Transport Stance (Closed)',
    badge: 'STAGE 01 — HIGHWAY TRANSIT CONFIGURATION',
    title: 'Flat Locked Transport Stance',
    metricValue: '0° TILT',
    metricLabel: 'Transit Stance',
    description: 'Fully lowered and rigidly locked body with a low center of gravity, engineered for aerodynamic high-speed highway haulage without chassis oscillation.',
    keyPoints: [
      'Low center of gravity for sharp highway maneuvering',
      'Longitudinal chassis locking pins engaged',
      'Maximum legal road clearance and aerodynamics'
    ],
    image: '/assets/tipper-stage-1.png',
    tiltAngle: '0°',
    cycleTime: 'Transport Mode'
  },
  {
    id: 'stage-2',
    stepNumber: '02',
    tabLabel: '2. Mid Elevation (24° Lift)',
    badge: 'STAGE 02 — HYDRAULIC DISCHARGE INITIATION',
    title: '190 Bar Telescopic Power Surge',
    metricValue: '24° LIFT',
    metricLabel: 'Mid Elevation',
    description: 'Multi-stage hard-chromed telescopic cylinder extends under 190 bar pressure with integrated anti-roll stabilization valves for controlled aggregate flow.',
    keyPoints: [
      'Precision hard-chromed hydraulic cylinder extension',
      'Anti-roll safety stabilizer preventing tip-over',
      'Progressive aggregate flow initiation'
    ],
    image: '/assets/tipper-stage-1.png', // With dynamic CSS rotation & lift
    tiltAngle: '24°',
    cycleTime: '14 Sec Lift'
  },
  {
    id: 'stage-3',
    stepNumber: '03',
    tabLabel: '3. Full Discharge (48° Open)',
    badge: 'STAGE 03 — RAPID GRAVITY DISCHARGE',
    title: 'Full 48° Rapid Gravity Unload',
    metricValue: '48° OPEN',
    metricLabel: 'Full Discharge',
    description: 'Complete bulk material slide-off in under 30 seconds. Heavy-duty rear hinge geometry and automatic tailgate locks ensure zero residue in mining duty.',
    keyPoints: [
      'Complete bulk payload discharge in < 28 seconds',
      'Automatic pneumatic tailgate release mechanism',
      'Reinforced rear tipping hinge with bronze bushings'
    ],
    image: '/assets/tipper-stage-3.png',
    tiltAngle: '48°',
    cycleTime: '28 Sec Complete'
  }
];

export const TipperElevationShowcase: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-progress stages every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % TIPPER_STAGES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentStage = TIPPER_STAGES[activeStageIndex];

  return (
    <section className="py-20 md:py-32 bg-[#FFFBF7] border-y border-[#EFE8DF] relative overflow-hidden">
      
      {/* Background Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#3B3A3A 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EFE8DF] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F68722] animate-pulse" />
              <span className="text-xs font-black text-[#F68722] uppercase tracking-widest font-mono-specs">
                HYDRAULIC ACTION ANIMATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#3B3A3A] font-heading tracking-tight">
              3-Stage Tipping Dynamics
            </h2>
            <p className="text-xs sm:text-sm text-[#736F6A] max-w-xl">
              Watch how our commercial tippers transition seamlessly from high-speed highway transit to full 48° rapid gravity discharge in under 30 seconds.
            </p>
          </div>

          {/* 3 Interactive Stage Buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
            {TIPPER_STAGES.map((st, idx) => {
              const isActive = activeStageIndex === idx;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    setActiveStageIndex(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-mono-specs uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#3B3A3A] text-[#F68722] shadow-xl shadow-[#3B3A3A]/20 scale-[1.03] border border-[#3B3A3A]'
                      : 'bg-white text-[#736F6A] border border-[#EFE8DF] hover:bg-[#F5EFE8] hover:text-[#3B3A3A]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#F68722] animate-ping' : 'bg-[#EFE8DF]'}`} />
                  <span>{st.stepNumber}</span>
                  <span className="hidden sm:inline">{st.tabLabel.split('(')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Showcase Box */}
        <div
          onMouseEnter={() => setIsAutoPlaying(false)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl border-2 border-[#EFE8DF] p-6 sm:p-10 shadow-sm relative overflow-hidden"
        >
          {/* Subtle Technical Corner Crosshairs (+) */}
          <div className="absolute top-4 left-4 text-xs font-mono-specs text-[#EFE8DF] select-none">+</div>
          <div className="absolute top-4 right-4 text-xs font-mono-specs text-[#EFE8DF] select-none">+</div>
          <div className="absolute bottom-4 left-4 text-xs font-mono-specs text-[#EFE8DF] select-none">+</div>
          <div className="absolute bottom-4 right-4 text-xs font-mono-specs text-[#EFE8DF] select-none">+</div>

          {/* Left Column: Kinetic Text Reveal (Slides up / replaces smoothly) */}
          <div className="lg:col-span-5 flex flex-col justify-center min-h-[300px] sm:min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                <div className="space-y-1 sm:space-y-2">
                  <span className="text-xs font-bold text-[#F68722] uppercase font-mono-specs tracking-wider">
                    {currentStage.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#3B3A3A] font-heading leading-tight">
                    {currentStage.title}
                  </h3>
                </div>

                {/* Live Metric Badges */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#EFE8DF]">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-[#F68722] font-mono-specs block">
                      {currentStage.metricValue}
                    </span>
                    <span className="text-[10px] text-[#736F6A] font-bold uppercase font-mono-specs block mt-0.5">
                      Elevation Angle
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-[#3B3A3A] font-mono-specs block">
                      {currentStage.cycleTime}
                    </span>
                    <span className="text-[10px] text-[#736F6A] font-bold uppercase font-mono-specs block mt-0.5">
                      Hydraulic Cycle
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#736F6A] leading-relaxed">
                  {currentStage.description}
                </p>

                {/* Highlights Checklist */}
                <div className="space-y-2 pt-1">
                  {currentStage.keyPoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#3B3A3A]">
                      <CheckCircle2 className="w-4 h-4 text-[#F68722] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Dynamic Visual Tipper Elevation Stage */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] bg-[#FFFBF7] rounded-3xl border border-[#EFE8DF] p-6 sm:p-10 flex flex-col items-center justify-center shadow-inner overflow-hidden group">
              
              {/* Hydraulic Elevation Visual Stage */}
              <div className="w-full flex-1 flex items-center justify-center select-none relative min-h-[220px] sm:min-h-[300px]">
                <AnimatePresence mode="wait">
                  {activeStageIndex === 0 && (
                    <motion.div
                      key="stage-0-img"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src="/assets/tipper-stage-1.png"
                        alt="Sameer Commercial Tipper Closed Transport Stance"
                        className="w-full h-auto max-h-[240px] sm:max-h-[320px] object-contain drop-shadow-md"
                      />
                    </motion.div>
                  )}

                  {activeStageIndex === 1 && (
                    <motion.div
                      key="stage-1-img"
                      initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
                      animate={{ opacity: 1, scale: 1.02, rotate: -3 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src="/assets/tipper-stage-3.png"
                        alt="Sameer Commercial Tipper Mid Hydraulic Elevation"
                        className="w-full h-auto max-h-[240px] sm:max-h-[320px] object-contain drop-shadow-md opacity-90 scale-95"
                      />
                    </motion.div>
                  )}

                  {activeStageIndex === 2 && (
                    <motion.div
                      key="stage-2-img"
                      initial={{ opacity: 0, scale: 0.98, y: 10 }}
                      animate={{ opacity: 1, scale: 1.04, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src="/assets/tipper-stage-3.png"
                        alt="Sameer Commercial Tipper Full 48 Degree Open Discharge"
                        className="w-full h-auto max-h-[240px] sm:max-h-[320px] object-contain drop-shadow-xl"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animated Hydraulic Angle Indicator Badge */}
                <div className="absolute top-2 left-2 bg-[#3B3A3A]/90 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold font-mono-specs flex items-center gap-2 shadow-md backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#F68722] animate-pulse" />
                  <span>CYLINDER ANGLE: {currentStage.tiltAngle}</span>
                </div>
              </div>

              {/* Highway Road Base Track */}
              <div className="w-full h-7 border-t border-[#EFE8DF] bg-white rounded-xl flex items-center justify-center relative overflow-hidden px-4 mt-3">
                <div className="absolute inset-x-0 h-[1.5px] bg-[#EFE8DF] top-1/2 -translate-y-1/2" />
                <div className="flex items-center gap-6 w-full opacity-70">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-6 h-[2px] bg-[#F68722] shrink-0" />
                  ))}
                </div>
              </div>

              {/* Telemetry Status Chip */}
              <div className="absolute bottom-3 right-3 bg-[#3B3A3A] text-white px-3 py-1 rounded-full text-[10px] font-bold font-mono-specs flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>STAGE {currentStage.stepNumber} ACTIVE</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
