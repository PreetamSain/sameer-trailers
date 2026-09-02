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

  // Derive unique deterministic seed for each card
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const cardSeed = (hash % 23) + 3;

  // ========================================================
  // IN-PLACE CLOUD BLOOMING & ACCUMULATION (अपनी जगह पर खिलना और जुड़ना)
  // No part slides forward! Each cloud puff is fixed in its place (cx, cy).
  // It blooms in place, merges into the descending mass, and new puffs
  // appear lower down and bloom in place, growing the cloud downwards.
  // ========================================================
  const p = Math.max(0, Math.min(1, effectiveProgress));

  // The base continuous mass accumulating from top to bottom
  const ceilingY = -140 + p * 1240;
  const baseCeilingD = `M -100 -200 L 1100 -200 L 1100 ${ceilingY.toFixed(1)} L -100 ${ceilingY.toFixed(1)} Z`;

  // Fixed constellation of in-place blooming cloud nodes
  // Seeded per card so every card has its own custom, organic cloud pattern!
  const s = cardSeed * 13;
  const cardNodes = [
    // Top Band (0% - 25% scroll)
    { cx: 220 + ((s * 7) % 60) - 30, cy: 120, maxR: 150, startP: 0.00, fullP: 0.18 },
    { cx: 500 + ((s * 3) % 60) - 30, cy: 90,  maxR: 160, startP: 0.02, fullP: 0.20 },
    { cx: 780 + ((s * 5) % 60) - 30, cy: 140, maxR: 150, startP: 0.04, fullP: 0.22 },
    { cx: 380 + ((s * 9) % 60) - 30, cy: 220, maxR: 170, startP: 0.08, fullP: 0.26 },
    { cx: 640 + ((s * 11) % 60) - 30, cy: 240, maxR: 160, startP: 0.10, fullP: 0.28 },

    // Upper-Mid Band (20% - 52% scroll)
    { cx: 160 + ((s * 4) % 60) - 30, cy: 380, maxR: 160, startP: 0.18, fullP: 0.38 },
    { cx: 840 + ((s * 8) % 60) - 30, cy: 360, maxR: 150, startP: 0.20, fullP: 0.40 },
    { cx: 460 + ((s * 6) % 60) - 30, cy: 410, maxR: 180, startP: 0.24, fullP: 0.44 },
    { cx: 680 + ((s * 2) % 60) - 30, cy: 460, maxR: 170, startP: 0.28, fullP: 0.48 },
    { cx: 290 + ((s * 13) % 60) - 30, cy: 490, maxR: 165, startP: 0.32, fullP: 0.52 },

    // Lower-Mid Band (42% - 75% scroll)
    { cx: 140 + ((s * 5) % 60) - 30, cy: 620, maxR: 155, startP: 0.42, fullP: 0.62 },
    { cx: 520 + ((s * 7) % 60) - 30, cy: 610, maxR: 185, startP: 0.46, fullP: 0.66 },
    { cx: 790 + ((s * 9) % 60) - 30, cy: 640, maxR: 175, startP: 0.50, fullP: 0.70 },
    { cx: 350 + ((s * 3) % 60) - 30, cy: 690, maxR: 170, startP: 0.54, fullP: 0.74 },
    { cx: 660 + ((s * 11) % 60) - 30, cy: 720, maxR: 165, startP: 0.58, fullP: 0.78 },

    // Bottom Band (65% - 100% scroll)
    { cx: 200 + ((s * 2) % 60) - 30, cy: 840, maxR: 170, startP: 0.64, fullP: 0.84 },
    { cx: 480 + ((s * 6) % 60) - 30, cy: 830, maxR: 190, startP: 0.68, fullP: 0.88 },
    { cx: 780 + ((s * 4) % 60) - 30, cy: 860, maxR: 175, startP: 0.72, fullP: 0.92 },
    { cx: 360 + ((s * 8) % 60) - 30, cy: 940, maxR: 180, startP: 0.76, fullP: 0.96 },
    { cx: 620 + ((s * 10) % 60) - 30, cy: 950, maxR: 185, startP: 0.78, fullP: 0.98 },
    { cx: 500, cy: 1020, maxR: 200, startP: 0.80, fullP: 1.00 }
  ];

  // Calculate in-place expansion for each fixed node
  const activeBlooms = cardNodes.map((node) => {
    if (p < node.startP) return null;
    const localT = Math.min(1, (p - node.startP) / (node.fullP - node.startP));
    const scale = localT * (2 - localT);
    return {
      cx: node.cx,
      cy: node.cy,
      r: node.maxR * scale
    };
  }).filter((n): n is { cx: number; cy: number; r: number } => n !== null);

  // Smooth feathered text reveal percentage
  const textRevealPos = Math.max(0, Math.min(1, effectiveProgress * 100));

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
      {/* 2. IN-PLACE BLOOMING CLOUD MASK (NO SLIDING FORWARD) */}
      {/* ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <filter
            id={filterId}
            x="-35%"
            y="-35%"
            width="170%"
            height="170%"
            filterUnits="userSpaceOnUse"
          >
            {/* Real Soft Puffy Cloud Filter */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.010 0.014"
              numOctaves={3}
              seed={cardSeed}
              result="cloudNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="cloudNoise"
              scale={150}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur
              in="displaced"
              stdDeviation={4.2}
              result="blurred"
            />
            <feComponentTransfer
              in="blurred"
              result="contrast"
            >
              <feFuncA type="linear" slope={2.8} intercept={-0.75} />
            </feComponentTransfer>
          </filter>

          <mask id={maskId} maskContentUnits="userSpaceOnUse">
            <g style={{ filter: `url(#${filterId})` }}>
              {/* Continuous ceiling accumulating downwards */}
              <path
                fill="white"
                d={baseCeilingD}
              />
              {/* In-place blooming nodes */}
              {activeBlooms.map((bloom, idx) => (
                <circle
                  key={idx}
                  cx={bloom.cx}
                  cy={bloom.cy}
                  r={bloom.r}
                  fill="white"
                />
              ))}
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
      {/* 3. PURE WHITE TEXT OVERLAY LAYER (SOFT FEATHERED REVEAL) */}
      {/* ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none z-20 text-white transition-opacity duration-200 ease-out"
        style={{
          maskImage: `linear-gradient(to bottom, rgba(0,0,0,1) ${Math.max(0, textRevealPos - 15)}%, rgba(0,0,0,0) ${Math.min(100, textRevealPos + 22)}%)`,
          WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,1) ${Math.max(0, textRevealPos - 15)}%, rgba(0,0,0,0) ${Math.min(100, textRevealPos + 22)}%)`,
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
