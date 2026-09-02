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

  // Derive unique deterministic variant & seed for each card so NO TWO CARDS LOOK ALIKE!
  // Completely eliminates the repetitive symmetrical loop and matches the reference closeup
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const cardSeed = (hash % 19) + 2;
  const variant = hash % 4;

  // Asymmetric detached droplets floating ahead of the straight horizontal advancing edge
  // (Matches the exact Heron AI reference closeup with detached floating islands)
  const dropletPresets = [
    // Variant 0: Left & center clusters with drifting drops on right
    [
      { cx: 120, dy: 45, r: 34 },
      { cx: 170, dy: 95, r: 42 },
      { cx: 140, dy: 155, r: 26 },
      { cx: 230, dy: 60, r: 24 },
      { cx: 410, dy: 50, r: 38 },
      { cx: 470, dy: 110, r: 46 },
      { cx: 520, dy: 170, r: 28 },
      { cx: 580, dy: 75, r: 32 },
      { cx: 740, dy: 45, r: 26 },
      { cx: 810, dy: 100, r: 36 },
      { cx: 860, dy: 160, r: 22 },
      { cx: 920, dy: 60, r: 18 }
    ],
    // Variant 1: Dense center drops with deep floating splatter dots
    [
      { cx: 180, dy: 55, r: 26 },
      { cx: 290, dy: 90, r: 34 },
      { cx: 340, dy: 150, r: 28 },
      { cx: 480, dy: 60, r: 42 },
      { cx: 540, dy: 125, r: 50 },
      { cx: 510, dy: 195, r: 30 },
      { cx: 620, dy: 70, r: 38 },
      { cx: 680, dy: 135, r: 36 },
      { cx: 750, dy: 190, r: 24 },
      { cx: 830, dy: 50, r: 22 },
      { cx: 900, dy: 80, r: 20 }
    ],
    // Variant 2: Left-heavy cascade with deep floating dots
    [
      { cx: 90, dy: 60, r: 24 },
      { cx: 140, dy: 115, r: 40 },
      { cx: 210, dy: 70, r: 36 },
      { cx: 190, dy: 170, r: 28 },
      { cx: 270, dy: 125, r: 32 },
      { cx: 410, dy: 65, r: 30 },
      { cx: 470, dy: 120, r: 38 },
      { cx: 600, dy: 50, r: 26 },
      { cx: 720, dy: 85, r: 34 },
      { cx: 780, dy: 155, r: 24 },
      { cx: 880, dy: 60, r: 20 }
    ],
    // Variant 3: Right-heavy cascade with isolated organic islands
    [
      { cx: 150, dy: 45, r: 22 },
      { cx: 260, dy: 60, r: 28 },
      { cx: 390, dy: 75, r: 32 },
      { cx: 520, dy: 55, r: 30 },
      { cx: 610, dy: 105, r: 40 },
      { cx: 670, dy: 170, r: 32 },
      { cx: 750, dy: 70, r: 44 },
      { cx: 820, dy: 135, r: 48 },
      { cx: 790, dy: 205, r: 26 },
      { cx: 900, dy: 80, r: 30 },
      { cx: 940, dy: 145, r: 20 }
    ]
  ];

  const droplets = dropletPresets[variant];

  // Straight horizontal progression:
  // Starts with all droplets above the card (y = -260), finishes past the bottom (y = 1050)
  const y = -260 + effectiveProgress * 1310;

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
      {/* 2. STRAIGHT ADVANCING FRONT WITH DETACHED INK DROPLETS */}
      {/* Exact Heron AI reference filter + asymmetric floating droplets */}
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
            {/* Exact Heron AI Displacement Filter */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.038 0.046"
              numOctaves={4}
              seed={cardSeed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={105}
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
            <g style={{ filter: `url(#${filterId})` }}>
              {/* Straight horizontal advancing fill (NO curve/bowl!) */}
              <path
                fill="white"
                d={`M -100 -100 L 1100 -100 L 1100 ${y} L -100 ${y} Z`}
              />
              {/* Asymmetric detached ink droplets floating ahead of the straight front */}
              {droplets.map((d, i) => (
                <circle
                  key={i}
                  cx={d.cx}
                  cy={y + d.dy}
                  r={d.r}
                  fill="white"
                />
              ))}
            </g>
          </mask>
        </defs>

        {/* Solid Brand Orange rectangle revealed by the organic ink mask */}
        <rect
          width="1000"
          height="1000"
          fill="#F68722"
          mask={`url(#${maskId})`}
        />
      </svg>

      {/* ======================================================== */}
      {/* 3. PURE WHITE TEXT OVERLAY LAYER (SMOOTH FEATHERED REVEAL) */}
      {/* ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none z-20 text-white transition-opacity duration-200 ease-out"
        style={{
          maskImage: `linear-gradient(to bottom, rgba(0,0,0,1) ${Math.max(0, textRevealPos - 12)}%, rgba(0,0,0,0) ${Math.min(100, textRevealPos + 18)}%)`,
          WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,1) ${Math.max(0, textRevealPos - 12)}%, rgba(0,0,0,0) ${Math.min(100, textRevealPos + 18)}%)`,
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
