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
      const isMobile = window.innerWidth < 768;

      // On mobile: compact focused window (vh * 0.72 to vh * 0.42) so cards animate strictly ONE BY ONE!
      // On desktop: synchronized row window (vh * 0.88 to vh * 0.35)
      const start = isMobile ? vh * 0.72 : vh * 0.88;
      const end = isMobile ? vh * 0.42 : vh * 0.35;
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

  // Cloud coordinates (scaling from top to bottom)
  // When p = 0: y = -350 (clouds are fully above card, 0% orange visible)
  // When p = 1: y = 1200 (clouds have fully passed bottom, 100% orange visible)
  const y = -350 + effectiveProgress * 1550;

  // Smooth feathered text reveal percentage (completely eliminates hard cut lines)
  const textRevealPos = Math.max(0, Math.min(100, effectiveProgress * 100));

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
      {/* 2. SOFT BILLOWING CLOUD DISPLACEMENT MASK (NO SCRATCHES) */}
      {/* Low frequency (0.007) + 2 octaves + stdDev 4.5 = Soft Cumulus Cloud */}
      {/* ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <filter
            id={filterId}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            filterUnits="userSpaceOnUse"
          >
            {/* Soft Puffy Cloud Turbulence (NO scratchy grain) */}
            <feTurbulence
              type="turbulence"
              baseFrequency="0.007 0.010"
              numOctaves={2}
              seed={4}
              result="cloudNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="cloudNoise"
              scale={115}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur
              in="displaced"
              stdDeviation={4.5}
              result="blurred"
            />
            <feComponentTransfer
              in="blurred"
              result="contrast"
            >
              <feFuncA type="linear" slope={2.0} intercept={-0.5} />
            </feComponentTransfer>
          </filter>

          <mask id={maskId} maskContentUnits="userSpaceOnUse">
            <g style={{ filter: `url(#${filterId})` }}>
              {/* Base Upper Inflow */}
              <path
                fill="white"
                d={`M -200 -200 L 1200 -200 L 1200 ${y} Q 500 ${y + 200} -200 ${y} Z`}
              />
              {/* Billowing Soft Cumulus Cloud Lobes */}
              <circle cx="160" cy={y + 110} r="110" fill="white" />
              <circle cx="380" cy={y + 150} r="130" fill="white" />
              <circle cx="620" cy={y + 140} r="125" fill="white" />
              <circle cx="840" cy={y + 100} r="105" fill="white" />
              <circle cx="500" cy={y + 220} r="140" fill="white" />
              <circle cx="280" cy={y + 190} r="95" fill="white" />
              <circle cx="720" cy={y + 180} r="100" fill="white" />
            </g>
          </mask>
        </defs>

        {/* Solid Brand Orange rectangle revealed by the soft cloud mask */}
        <rect
          width="1000"
          height="1000"
          fill="#F68722"
          mask={`url(#${maskId})`}
        />
      </svg>

      {/* ======================================================== */}
      {/* 3. PURE WHITE TEXT OVERLAY LAYER (FEATHERED CLOUD TRANSITION) */}
      {/* ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none z-20 text-white transition-opacity duration-200 ease-out"
        style={{
          maskImage: `linear-gradient(to bottom, rgba(0,0,0,1) ${Math.max(0, textRevealPos - 20)}%, rgba(0,0,0,0) ${Math.min(100, textRevealPos + 25)}%)`,
          WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,1) ${Math.max(0, textRevealPos - 20)}%, rgba(0,0,0,0) ${Math.min(100, textRevealPos + 25)}%)`,
          opacity: effectiveProgress > 0.02 ? 1 : 0
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
