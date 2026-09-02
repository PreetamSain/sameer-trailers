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
  // Completely eliminates repetitive loops and creates natural, organic clouds
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const cardSeed = (hash % 23) + 3;
  const variant = hash % 4;

  // Soft billowing cumulus cloud presets (overlapping large puffs + detached wisps)
  // Low frequency + soft feathering = true cloud feel, ZERO scratches!
  const cloudPresets = [
    // Variant 0: Rolling cloud front with center-left puffs and drifting wisps
    [
      { cx: 120, dy: 35, r: 85 },
      { cx: 240, dy: 65, r: 105 },
      { cx: 410, dy: 50, r: 115 },
      { cx: 580, dy: 70, r: 100 },
      { cx: 760, dy: 40, r: 90 },
      { cx: 910, dy: 55, r: 80 },
      // Detached floating cloud wisps
      { cx: 280, dy: 130, r: 55 },
      { cx: 490, dy: 150, r: 65 },
      { cx: 710, dy: 120, r: 50 },
      { cx: 520, dy: 210, r: 40 }
    ],
    // Variant 1: Dense center-right cloud billowing downward
    [
      { cx: 100, dy: 45, r: 80 },
      { cx: 260, dy: 40, r: 90 },
      { cx: 430, dy: 75, r: 110 },
      { cx: 620, dy: 80, r: 120 },
      { cx: 800, dy: 55, r: 95 },
      { cx: 930, dy: 40, r: 75 },
      // Detached floating cloud wisps
      { cx: 380, dy: 140, r: 55 },
      { cx: 590, dy: 165, r: 65 },
      { cx: 770, dy: 135, r: 50 },
      { cx: 630, dy: 220, r: 42 }
    ],
    // Variant 2: Left-leaning cloud cascade
    [
      { cx: 110, dy: 70, r: 110 },
      { cx: 270, dy: 65, r: 105 },
      { cx: 440, dy: 45, r: 95 },
      { cx: 610, dy: 50, r: 90 },
      { cx: 780, dy: 40, r: 85 },
      { cx: 920, dy: 45, r: 75 },
      // Detached floating cloud wisps
      { cx: 180, dy: 155, r: 60 },
      { cx: 350, dy: 135, r: 55 },
      { cx: 530, dy: 125, r: 48 },
      { cx: 240, dy: 215, r: 40 }
    ],
    // Variant 3: Double-billow cloud formation
    [
      { cx: 140, dy: 55, r: 95 },
      { cx: 300, dy: 70, r: 110 },
      { cx: 470, dy: 45, r: 85 },
      { cx: 650, dy: 70, r: 115 },
      { cx: 820, dy: 60, r: 100 },
      { cx: 930, dy: 40, r: 75 },
      // Detached floating cloud wisps
      { cx: 330, dy: 150, r: 60 },
      { cx: 670, dy: 155, r: 65 },
      { cx: 500, dy: 120, r: 45 },
      { cx: 350, dy: 210, r: 38 }
    ]
  ];

  const cloudPuffs = cloudPresets[variant];

  // Soft rolling cloud coordinates:
  // Starts with all cloud puffs safely above the card (y = -320), finishes past bottom (y = 1100)
  const y = -320 + effectiveProgress * 1420;

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
      {/* 2. REAL SOFT BILLOWING CLOUD MASK (NO SCRATCHES, NO FLAT LINE) */}
      {/* Low frequency (0.004) + stdDev 7.5 = True Soft Puffy Cloud */}
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
            {/* Real Soft Puffy Cloud Filter - Low frequency, NO scratches, High blur */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.004 0.006"
              numOctaves={2}
              seed={cardSeed}
              result="cloudNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="cloudNoise"
              scale={85}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur
              in="displaced"
              stdDeviation={7.5}
              result="blurred"
            />
            <feComponentTransfer
              in="blurred"
              result="contrast"
            >
              <feFuncA type="linear" slope={2.5} intercept={-0.7} />
            </feComponentTransfer>
          </filter>

          <mask id={maskId} maskContentUnits="userSpaceOnUse">
            <g style={{ filter: `url(#${filterId})` }}>
              {/* Base Upper Inflow */}
              <path
                fill="white"
                d={`M -100 -100 L 1100 -100 L 1100 ${y} L -100 ${y} Z`}
              />
              {/* Overlapping billowing cloud lobes & floating wisps (Multi-depth cloud) */}
              {cloudPuffs.map((puff, i) => (
                <circle
                  key={i}
                  cx={puff.cx}
                  cy={y + puff.dy}
                  r={puff.r}
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
