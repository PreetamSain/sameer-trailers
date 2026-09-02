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
  const [dims, setDims] = useState<{ w: number; h: number }>({ w: 340, h: 380 });

  const rawId = useId();
  const cleanId = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const filterId = `sharedDisplacementFilter_${cleanId}`;
  const maskId = `inkCircleMask_${cleanId}`;

  // Measure card dimensions dynamically so SVG foreignObject coordinates match 1:1 with pixels
  useEffect(() => {
    if (!cardRef.current) return;
    const updateDims = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDims({ w: Math.round(rect.width), h: Math.round(rect.height) });
        }
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

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

      // On mobile: compact focused window (vh * 0.75 to vh * 0.40) so cards animate strictly ONE BY ONE!
      // On desktop: synchronized row window (vh * 0.88 to vh * 0.35)
      const start = isMobile ? vh * 0.75 : vh * 0.88;
      const end = isMobile ? vh * 0.40 : vh * 0.35;
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
  // No part slides forward! Each cloud puff is fixed in its place.
  // It blooms in place, merges into the descending mass, and new puffs
  // appear lower down and bloom in place, growing the cloud downwards.
  // ========================================================
  const p = Math.max(0, Math.min(1, effectiveProgress));

  // The base continuous mass accumulating from top to bottom
  const ceilingY = -60 + p * (dims.h + 120);
  const baseCeilingD = `M -60 -60 L ${dims.w + 60} -60 L ${dims.w + 60} ${ceilingY.toFixed(1)} L -60 ${ceilingY.toFixed(1)} Z`;

  // Fixed constellation of in-place blooming cloud nodes (proportional to card dimensions)
  // Seeded per card so every card has its own custom, organic cloud pattern!
  const s = cardSeed * 13;
  const cardNodes = [
    // Top Band (0% - 25% scroll)
    { u: 0.22 + (((s * 7) % 30) - 15) / 100, v: 0.12, rRatio: 0.28, startP: 0.00, fullP: 0.18 },
    { u: 0.50 + (((s * 3) % 30) - 15) / 100, v: 0.09, rRatio: 0.32, startP: 0.02, fullP: 0.20 },
    { u: 0.78 + (((s * 5) % 30) - 15) / 100, v: 0.14, rRatio: 0.28, startP: 0.04, fullP: 0.22 },
    { u: 0.38 + (((s * 9) % 30) - 15) / 100, v: 0.22, rRatio: 0.34, startP: 0.08, fullP: 0.26 },
    { u: 0.64 + (((s * 11) % 30) - 15) / 100, v: 0.24, rRatio: 0.30, startP: 0.10, fullP: 0.28 },

    // Upper-Mid Band (20% - 52% scroll)
    { u: 0.16 + (((s * 4) % 30) - 15) / 100, v: 0.38, rRatio: 0.32, startP: 0.18, fullP: 0.38 },
    { u: 0.84 + (((s * 8) % 30) - 15) / 100, v: 0.36, rRatio: 0.29, startP: 0.20, fullP: 0.40 },
    { u: 0.46 + (((s * 6) % 30) - 15) / 100, v: 0.41, rRatio: 0.36, startP: 0.24, fullP: 0.44 },
    { u: 0.68 + (((s * 2) % 30) - 15) / 100, v: 0.46, rRatio: 0.33, startP: 0.28, fullP: 0.48 },
    { u: 0.29 + (((s * 13) % 30) - 15) / 100, v: 0.49, rRatio: 0.32, startP: 0.32, fullP: 0.52 },

    // Lower-Mid Band (42% - 75% scroll)
    { u: 0.14 + (((s * 5) % 30) - 15) / 100, v: 0.62, rRatio: 0.30, startP: 0.42, fullP: 0.62 },
    { u: 0.52 + (((s * 7) % 30) - 15) / 100, v: 0.61, rRatio: 0.36, startP: 0.46, fullP: 0.66 },
    { u: 0.79 + (((s * 9) % 30) - 15) / 100, v: 0.64, rRatio: 0.34, startP: 0.50, fullP: 0.70 },
    { u: 0.35 + (((s * 3) % 30) - 15) / 100, v: 0.69, rRatio: 0.33, startP: 0.54, fullP: 0.74 },
    { u: 0.66 + (((s * 11) % 30) - 15) / 100, v: 0.72, rRatio: 0.32, startP: 0.58, fullP: 0.78 },

    // Bottom Band (65% - 100% scroll)
    { u: 0.20 + (((s * 2) % 30) - 15) / 100, v: 0.84, rRatio: 0.33, startP: 0.64, fullP: 0.84 },
    { u: 0.48 + (((s * 6) % 30) - 15) / 100, v: 0.83, rRatio: 0.37, startP: 0.68, fullP: 0.88 },
    { u: 0.78 + (((s * 4) % 30) - 15) / 100, v: 0.86, rRatio: 0.34, startP: 0.72, fullP: 0.92 },
    { u: 0.36 + (((s * 8) % 30) - 15) / 100, v: 0.94, rRatio: 0.35, startP: 0.76, fullP: 0.96 },
    { u: 0.62 + (((s * 10) % 30) - 15) / 100, v: 0.95, rRatio: 0.36, startP: 0.78, fullP: 0.98 },
    { u: 0.50, v: 1.02, rRatio: 0.40, startP: 0.80, fullP: 1.00 }
  ];

  // Calculate in-place expansion for each fixed node
  const activeBlooms = cardNodes.map((node) => {
    if (p < node.startP) return null;
    const localT = Math.min(1, (p - node.startP) / (node.fullP - node.startP));
    const scale = localT * (2 - localT);
    return {
      cx: node.u * dims.w,
      cy: node.v * dims.h,
      r: node.rRatio * dims.w * scale
    };
  }).filter((n): n is { cx: number; cy: number; r: number } => n !== null);

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
      {/* 2. REVEALED LAYER: ORANGE BACKGROUND + PURE WHITE TEXT   */}
      {/* Both are inside the exact same SVG mask (<g mask="url(#...)">) */}
      {/* Edge-to-edge auto text white where orange is present!     */}
      {/* ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
        viewBox={`0 0 ${dims.w} ${dims.h}`}
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
              baseFrequency="0.012 0.016"
              numOctaves={3}
              seed={cardSeed}
              result="cloudNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="cloudNoise"
              scale={45}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur
              in="displaced"
              stdDeviation={2.5}
              result="blurred"
            />
            <feComponentTransfer
              in="blurred"
              result="contrast"
            >
              <feFuncA type="linear" slope={2.6} intercept={-0.75} />
            </feComponentTransfer>
          </filter>

          <mask id={maskId} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
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

        {/* REVEALED LAYER: BOTH Orange Background AND Pure White Text inside the exact same SVG Mask */}
        <g mask={`url(#${maskId})`}>
          {/* Solid Brand Orange rectangle */}
          <rect
            width={dims.w}
            height={dims.h}
            fill="#F68722"
          />

          {/* Cloned Pure White Typography (Pixel-for-pixel match to base card) */}
          <foreignObject x="0" y="0" width={dims.w} height={dims.h}>
            <div
              style={{ width: `${dims.w}px`, height: `${dims.h}px`, boxSizing: 'border-box' }}
              className="p-6 space-y-4 flex flex-col justify-between h-full text-white select-none"
            >
              <div className="space-y-4">
                {/* White Translucent Icon Pill */}
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/25 shadow-xs">
                  {icon}
                </div>

                {/* Pure White Typography */}
                <div>
                  <span className="text-xs font-black text-white font-mono-specs block drop-shadow-xs">
                    {tag}
                  </span>
                  <h3 className="text-base font-black text-white font-heading mt-1 leading-snug drop-shadow-xs">
                    {title}
                  </h3>
                  <p className="text-xs text-white/95 mt-2 leading-relaxed font-medium">
                    {description}
                  </p>
                </div>
              </div>

              {/* White Footer Metric */}
              {footerLabel && (
                <div className="pt-4 border-t border-white/30 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/90 uppercase font-mono-specs block">
                    {footerLabel}
                  </span>
                  <span className="text-xs font-black text-white block">
                    {footerValue}
                  </span>
                </div>
              )}
            </div>
          </foreignObject>
        </g>
      </svg>

    </div>
  );
};
