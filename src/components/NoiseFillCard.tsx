import React, { useRef, useId } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface NoiseFillCardProps {
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  footerLabel?: string;
  footerValue?: string;
  baseBg?: string;
}

export const NoiseFillCard: React.FC<NoiseFillCardProps> = ({
  icon,
  tag,
  title,
  description,
  footerLabel,
  footerValue,
  baseBg = 'bg-[#FFFBF7]'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const filterId = `stipple_${rawId.replace(/[^a-zA-Z0-9]/g, '_')}`;

  // Measure scroll progress through this specific card
  // Starts filling as it enters the lower viewport and reaches 100% in focus
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.88', 'end 0.42']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001
  });

  // Stencil clip path: wipes down from 0% to 100%
  const clipInset = useTransform(smoothProgress, (p) => `inset(0% 0% ${Math.max(0, (1 - p) * 100)}% 0%)`);
  
  // Position of the stippled noise bleed edge
  const edgeTop = useTransform(smoothProgress, (p) => `${p * 100}%`);
  
  // Opacity of noise edge (hides when at 0% or 100% solid)
  const edgeOpacity = useTransform(smoothProgress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={cardRef}
      className={`relative rounded-3xl border border-[#EFE8DF] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${baseBg}`}
    >
      {/* ======================================================== */}
      {/* 1. BASE LAYER (Normal State: Light Background + Dark Ink Text) */}
      {/* ======================================================== */}
      <div className="p-6 space-y-4 flex flex-col justify-between h-full select-none">
        <div className="space-y-4">
          {/* Icon Pill */}
          <div className="w-12 h-12 rounded-2xl bg-[#F68722]/10 flex items-center justify-center text-[#F68722]">
            {icon}
          </div>

          {/* Dark Ink Typography */}
          <div>
            <span className="text-xs font-black text-[#F68722] font-mono-specs block">
              {tag}
            </span>
            <h3 className="text-base font-black text-[#3B3A3A] font-heading mt-1 leading-snug">
              {title}
            </h3>
            <p className="text-xs text-[#736F6A] mt-2 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Footer Metric */}
        {footerLabel && (
          <div className="pt-3 border-t border-[#EFE8DF]">
            <span className="text-[10px] font-bold text-[#736F6A] uppercase block">
              {footerLabel}
            </span>
            <span className="text-xs font-bold text-[#3B3A3A] mt-0.5 block">
              {footerValue}
            </span>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. TOP OVERLAY LAYER (Heron AI Style Orange Noise Fill on Scroll) */}
      {/* Stencil wipe via GPU-accelerated clipPath for zero text jump */}
      {/* ======================================================== */}
      <motion.div
        style={{ clipPath: clipInset }}
        className="absolute inset-0 bg-[#F68722] pointer-events-none z-10"
      >
        {/* Subtle Organic Paper Grain / Noise Texture */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Exact Duplicate Content in PURE WHITE for 100% Crisp Contrast */}
        <div className="p-6 space-y-4 flex flex-col justify-between h-full select-none text-white">
          <div className="space-y-4">
            {/* White Translucent Icon Pill */}
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
              {icon}
            </div>

            {/* White Typography */}
            <div>
              <span className="text-xs font-black text-white/90 font-mono-specs block">
                {tag}
              </span>
              <h3 className="text-base font-black text-white font-heading mt-1 leading-snug">
                {title}
              </h3>
              <p className="text-xs text-white/90 mt-2 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* White Footer Metric */}
          {footerLabel && (
            <div className="pt-3 border-t border-white/25">
              <span className="text-[10px] font-bold text-white/80 uppercase block">
                {footerLabel}
              </span>
              <span className="text-xs font-bold text-white mt-0.5 block">
                {footerValue}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* 3. STIPPLED SPRAY NOISE / RISOGRAPH GRAIN BLEED LEADING EDGE */}
      {/* Follows the clip edge dynamically with organic ink bleed */}
      {/* ======================================================== */}
      <motion.div
        style={{
          top: edgeTop,
          opacity: edgeOpacity
        }}
        className="absolute inset-x-0 h-10 pointer-events-none -translate-y-1/2 z-20 overflow-hidden"
      >
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 400 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.6 0.9" numOctaves="3" result="noise" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.965  0 0 0 0 0.529  0 0 0 0 0.133  1 0 0 0 0"
                in="noise"
                result="coloredNoise"
              />
              <feComponentTransfer in="coloredNoise" result="stipple">
                <feFuncA type="linear" slope="3" intercept="-0.7" />
              </feComponentTransfer>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="#F68722" filter={`url(#${filterId})`} />
        </svg>
      </motion.div>
    </div>
  );
};
