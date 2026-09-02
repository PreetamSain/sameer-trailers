import React, { useRef, useState, useEffect } from 'react';

interface ScrollOrangeBurnCardProps {
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  footerLabel?: string;
  footerValue?: string;
  baseBg?: string;
}

export const ScrollOrangeBurnCard: React.FC<ScrollOrangeBurnCardProps> = ({
  icon,
  tag,
  title,
  description,
  footerLabel,
  footerValue,
  baseBg = 'bg-[#FFFBF7]'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Directly track card position in viewport for 100% guaranteed reliability
  useEffect(() => {
    let rafId: number;
    let targetP = 0;
    let currentP = 0;

    const updateScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Starts when card top enters from bottom of screen (vh * 0.95)
      // Reaches 100% full orange when card is in comfortable reading view (vh * 0.35)
      const start = vh * 0.95;
      const end = vh * 0.35;
      const raw = (start - rect.top) / (start - end);
      targetP = Math.max(0, Math.min(1, raw));
    };

    const loop = () => {
      // Smooth lerp for liquid / organic flow
      currentP += (targetP - currentP) * 0.15;
      if (Math.abs(targetP - currentP) > 0.001) {
        setScrollProgress(currentP);
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    updateScroll();
    loop();

    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Effective progress: hover ignites the card to 100%
  const effectiveProgress = isHovered ? 1 : scrollProgress;

  // Inset calculation: clips from the top down to (1 - effectiveProgress)
  // When p = 0: inset is 100% from top (0% orange visible)
  // When p = 0.5: inset is 50% from top (bottom 50% is solid orange)
  // When p = 1: inset is 0% from top (100% full orange)
  const clipPercentage = Math.max(0, Math.min(100, (1 - effectiveProgress) * 100));

  // Position of the rising vector flame edge
  const edgeTop = `${clipPercentage}%`;
  const showEdge = effectiveProgress > 0.03 && effectiveProgress < 0.97;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-3xl border border-[#EFE8DF] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 select-none ${baseBg}`}
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

          {/* Dark Typography */}
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
      {/* 2. ORANGE OVERLAY LAYER (Rises from bottom to top on scroll) */}
      {/* 100% reliable hardware-accelerated clipPath */}
      {/* ======================================================== */}
      <div
        className="absolute inset-0 bg-[#F68722] pointer-events-none z-10 transition-[clip-path] duration-150 ease-out"
        style={{
          clipPath: `inset(${clipPercentage}% 0% 0% 0%)`,
          WebkitClipPath: `inset(${clipPercentage}% 0% 0% 0%)`
        }}
      >
        {/* Subtle Paper Grain Texture */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`
          }}
        />

        {/* Duplicate Content in Pure White Text for 100% Crisp Contrast */}
        <div className="p-6 space-y-4 flex flex-col justify-between h-full text-white">
          <div className="space-y-4">
            {/* White Translucent Icon Pill */}
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
      {/* 3. ORGANIC VECTOR FLAME / BURN BOUNDARY LINE */}
      {/* Rides right on the rising edge with glowing vector wave & embers */}
      {/* ======================================================== */}
      {showEdge && (
        <div
          className="absolute inset-x-0 h-8 pointer-events-none z-20 -translate-y-1/2 overflow-visible"
          style={{ top: edgeTop }}
        >
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 300 24"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Wavy Vector Ember Glow */}
            <path
              d="M 0 12 Q 75 0, 150 12 T 300 12 L 300 24 L 0 24 Z"
              fill="#F68722"
            />
            {/* Glowing Golden Vector Line */}
            <path
              d="M 0 12 Q 75 0, 150 12 T 300 12"
              stroke="#FFA000"
              strokeWidth="2"
            />
            {/* Tiny Floating Vector Embers (Paper burn sparks) */}
            <circle cx="60" cy="4" r="2" fill="#FFD54F" />
            <circle cx="180" cy="2" r="1.5" fill="#FFA726" />
            <circle cx="240" cy="6" r="2" fill="#FFD54F" />
          </svg>
        </div>
      )}

    </div>
  );
};
