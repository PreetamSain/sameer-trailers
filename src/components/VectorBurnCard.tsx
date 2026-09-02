import React, { useRef, useState, useId } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface VectorBurnCardProps {
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  footerLabel?: string;
  footerValue?: string;
  baseBg?: string;
}

// 7 Pre-calculated organic vector burn ignition spots (kahin se kuch jala, kahin se kuch jala)
const BURN_SPOTS = [
  { cx: 28, cy: 76, rx: 22, ry: 18, startP: 0.08, maxScale: 1.5 },
  { cx: 74, cy: 68, rx: 26, ry: 20, startP: 0.16, maxScale: 1.7 },
  { cx: 46, cy: 52, rx: 30, ry: 24, startP: 0.28, maxScale: 1.8 },
  { cx: 82, cy: 40, rx: 24, ry: 19, startP: 0.42, maxScale: 1.6 },
  { cx: 20, cy: 34, rx: 22, ry: 17, startP: 0.52, maxScale: 1.6 },
  { cx: 58, cy: 24, rx: 28, ry: 22, startP: 0.65, maxScale: 1.7 },
  { cx: 35, cy: 12, rx: 25, ry: 20, startP: 0.78, maxScale: 1.8 }
];

export const VectorBurnCard: React.FC<VectorBurnCardProps> = ({
  icon,
  tag,
  title,
  description,
  footerLabel,
  footerValue,
  baseBg = 'bg-[#FFFBF7]'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rawId = useId();
  const maskId = `burn_mask_${rawId.replace(/[^a-zA-Z0-9]/g, '_')}`;

  // Track scroll progress through this specific card
  // Burns from bottom to top as user scrolls
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.90', 'end 0.35']
  });

  // Buttery-smooth spring physics for organic burn spread
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001
  });

  // Effective progress: allows hover to ignite the card dynamically
  // 0 = completely white/unburned; 1 = fully consumed by orange
  const effectiveProgress = useTransform(smoothProgress, (p) => {
    if (isHovered) return Math.max(p, 0.92);
    return p;
  });

  // Main advancing wave height (measured from bottom 100% up to 0%)
  const waveBaseY = useTransform(effectiveProgress, [0, 1], [115, -15]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-3xl border border-[#EFE8DF] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 select-none ${baseBg}`}
    >
      {/* ======================================================== */}
      {/* 1. BASE UNBURNED LAYER (Clean Off-White + Dark Charcoal Text) */}
      {/* ======================================================== */}
      <div className="p-6 space-y-4 flex flex-col justify-between h-full relative z-0">
        <div className="space-y-4">
          {/* Icon Pill */}
          <div className="w-12 h-12 rounded-2xl bg-[#F68722]/10 flex items-center justify-center text-[#F68722]">
            {icon}
          </div>

          {/* Dark Charcoal Typography */}
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
          <div className="pt-4 border-t border-[#EFE8DF] flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#736F6A] uppercase font-mono-specs block">
              {footerLabel}
            </span>
            <span className="text-xs font-black text-[#3B3A3A] block">
              {footerValue}
            </span>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. SVG VECTOR BURN MASK DEFINITION */}
      {/* Combines rising organic wave + stochastic burning vector holes */}
      {/* ======================================================== */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <mask id={maskId} maskUnits="objectBoundingBox" x="0" y="0" width="1" height="1">
            {/* Black background hides overlay */}
            <rect width="1" height="1" fill="black" />

            {/* White shapes reveal the orange overlay */}
            <g fill="white">
              {/* Main Rising Vector Wave from Bottom */}
              <motion.path
                style={{
                  d: useTransform(waveBaseY, (y) => {
                    const yVal = y / 100;
                    // Undulating organic vector curve
                    const y1 = Math.max(-0.2, yVal - 0.05);
                    const y2 = Math.max(-0.2, yVal + 0.04);
                    const y3 = Math.max(-0.2, yVal - 0.03);
                    return `M 0 1.2 L 0 ${y1} Q 0.25 ${y2}, 0.5 ${yVal} T 1 ${y3} L 1 1.2 Z`;
                  })
                }}
              />

              {/* Stochastic Vector Burn Spots (Ignite ahead of the wave) */}
              {BURN_SPOTS.map((spot, i) => (
                <motion.ellipse
                  key={i}
                  cx={spot.cx / 100}
                  cy={spot.cy / 100}
                  style={{
                    rx: useTransform(effectiveProgress, (p) => {
                      if (p < spot.startP) return 0;
                      const localP = Math.min(1, (p - spot.startP) / 0.22);
                      return (spot.rx / 100) * localP * spot.maxScale;
                    }),
                    ry: useTransform(effectiveProgress, (p) => {
                      if (p < spot.startP) return 0;
                      const localP = Math.min(1, (p - spot.startP) / 0.22);
                      return (spot.ry / 100) * localP * spot.maxScale;
                    })
                  }}
                />
              ))}
            </g>
          </mask>
        </defs>
      </svg>

      {/* ======================================================== */}
      {/* 3. BURNED OVERLAY LAYER (Rich Brand Orange + Crisp Pure White Text) */}
      {/* Masked dynamically by the SVG Vector Burn Mask */}
      {/* ======================================================== */}
      <div
        className="absolute inset-0 bg-[#F68722] pointer-events-none z-10"
        style={{
          mask: `url(#${maskId})`,
          WebkitMask: `url(#${maskId})`
        }}
      >
        {/* Subtle organic paper grain inside the burned orange area */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='b'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23b)'/%3E%3C/svg%3E")`
          }}
        />

        {/* Duplicate Content in Pure White Text for 100% Crisp Contrast */}
        <div className="p-6 space-y-4 flex flex-col justify-between h-full text-white">
          <div className="space-y-4">
            {/* Translucent White Icon Pill */}
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
              {icon}
            </div>

            {/* Pure White Typography */}
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
            <div className="pt-4 border-t border-white/25 flex items-center justify-between">
              <span className="text-[10px] font-bold text-white/80 uppercase font-mono-specs block">
                {footerLabel}
              </span>
              <span className="text-xs font-black text-white block">
                {footerValue}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. VECTOR EMBER / GLOWING CHAR BOUNDARY OUTLINE */}
      {/* Renders glowing vector contour strokes along the burn front */}
      {/* ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Burning Front Wave Vector Rim */}
        <motion.path
          fill="none"
          stroke="#FFA040"
          strokeWidth="1.2"
          strokeDasharray="2 1"
          style={{
            opacity: useTransform(effectiveProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]),
            d: useTransform(waveBaseY, (y) => {
              const yVal = y / 100;
              const y1 = Math.max(-0.2, yVal - 0.05);
              const y2 = Math.max(-0.2, yVal + 0.04);
              const y3 = Math.max(-0.2, yVal - 0.03);
              return `M 0 ${y1} Q 0.25 ${y2}, 0.5 ${yVal} T 1 ${y3}`;
            })
          }}
        />

        {/* Glowing Ember Rims around Active Burn Spots */}
        {BURN_SPOTS.map((spot, i) => (
          <motion.ellipse
            key={i}
            cx={spot.cx / 100}
            cy={spot.cy / 100}
            fill="none"
            stroke="#FFB300"
            strokeWidth="0.8"
            style={{
              opacity: useTransform(effectiveProgress, (p) => {
                if (p < spot.startP || p > spot.startP + 0.35) return 0;
                return 0.9;
              }),
              rx: useTransform(effectiveProgress, (p) => {
                if (p < spot.startP) return 0;
                const localP = Math.min(1, (p - spot.startP) / 0.22);
                return (spot.rx / 100) * localP * spot.maxScale;
              }),
              ry: useTransform(effectiveProgress, (p) => {
                if (p < spot.startP) return 0;
                const localP = Math.min(1, (p - spot.startP) / 0.22);
                return (spot.ry / 100) * localP * spot.maxScale;
              })
            }}
          />
        ))}
      </svg>

    </div>
  );
};
