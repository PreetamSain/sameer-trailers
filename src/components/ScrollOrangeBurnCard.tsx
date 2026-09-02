import React, { useRef, useState, useEffect, useId } from 'react';

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
  const rawId = useId();
  const cleanId = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const filterId = `sharedDisplacementFilter_${cleanId}`;
  const maskId = `inkCircleMask_${cleanId}`;

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

  // Exact Heron AI Ink Mask curve coordinates (scaling from top to bottom)
  // When p = 0: y = -160 (mask is above the card, 0% orange visible)
  // When p = 1: y = 1150 (mask covers the whole card, 100% orange visible)
  const y = -160 + effectiveProgress * 1310;
  const curve = 140;
  const pathD = `M -100 -100 L 1100 -100 L 1100 ${y} Q 500 ${y + curve} -100 ${y} Z`;

  // White text layer clip-path to match top-to-bottom fill
  const bottomInset = Math.max(0, Math.min(100, (1 - effectiveProgress) * 100));

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
      {/* 2. EXACT HERON AI INK DISPLACEMENT MASK LAYER */}
      {/* Uses feTurbulence + feDisplacementMap + feGaussianBlur + feComponentTransfer */}
      {/* ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <filter
            id={filterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="userSpaceOnUse"
          >
            {/* Exact Heron AI Displacement Filter Settings */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.045 0.055"
              numOctaves={4}
              seed={5}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={80}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur
              in="displaced"
              stdDeviation={1.8}
              result="blurred"
            />
            <feComponentTransfer
              in="blurred"
              result="contrast"
            >
              <feFuncA type="linear" slope={2.2} intercept={-0.6} />
            </feComponentTransfer>
          </filter>

          <mask id={maskId} maskContentUnits="userSpaceOnUse">
            <path
              fill="white"
              style={{ filter: `url(#${filterId})` }}
              d={pathD}
            />
          </mask>
        </defs>

        {/* Solid Brand Orange rectangle revealed by the ink mask */}
        <rect
          width="1000"
          height="1000"
          fill="#F68722"
          mask={`url(#${maskId})`}
        />
      </svg>

      {/* ======================================================== */}
      {/* 3. PURE WHITE TEXT OVERLAY LAYER */}
      {/* Synchronized with the advancing ink layer */}
      {/* ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none z-20 text-white transition-[clip-path] duration-150 ease-out"
        style={{
          clipPath: `inset(0% 0% ${bottomInset}% 0%)`,
          WebkitClipPath: `inset(0% 0% ${bottomInset}% 0%)`
        }}
      >
        <div className="p-6 space-y-4 flex flex-col justify-between h-full">
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

    </div>
  );
};
