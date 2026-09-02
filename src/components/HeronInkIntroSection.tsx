import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeronInkIntroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0.5);

  useEffect(() => {
    let rafId: number;
    let targetP = 0.5;
    let currentP = 0.5;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Starts when section top enters from bottom (vh * 0.90)
      // Completes when section is in upper half (vh * 0.20)
      const start = vh * 0.90;
      const end = vh * 0.20;
      const raw = (start - rect.top) / (start - end);
      targetP = Math.max(0, Math.min(1, raw));
    };

    const loop = () => {
      currentP += (targetP - currentP) * 0.12;
      setProgress(currentP);
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    loop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Calculate mask path coordinates based on exact Heron AI formula
  // Start: M 0 0 Q 500 0 1000 0 L 1000 0 L 0 0 Z
  // Final: M 0 1000 Q 500 1250 1000 1000 L 1000 0 L 0 0 Z
  const y = progress * 1000;
  const curve = Math.min(250, progress * 250);
  const maskPathD = `M 0 ${y} Q 500 ${y + curve} 1000 ${y} L 1000 0 L 0 0 Z`;

  const partnerLogos = [
    'TATA MOTORS FLEET',
    'ASHOK LEYLAND',
    'BHARATBENZ',
    'MAHINDRA TRUCKS',
    'CONTAINER CORP (CONCOR)',
    'VRL LOGISTICS'
  ];

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-[#FFFBF7] border-y border-[#EFE8DF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ======================================================== */}
          {/* LEFT: HERON AI EXACT INK-MASK DUAL LAYER VISUAL */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[1000/1012] max-w-[540px] mx-auto rounded-3xl overflow-hidden border border-[#EFE8DF] bg-white shadow-xl shadow-[#000000]/5">
              
              {/* Main Base Image: CAD Technical Wireframe */}
              <div className="absolute inset-0">
                <img
                  src="/images/heron/cad-wireframe.avif"
                  alt="Engineering CAD Blueprint"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="lazy"
                />
              </div>

              {/* Sub Layer: Revealed via Heron AI exact SVG Ink Mask */}
              <div className="absolute inset-0">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 1000 1011.7647058823529"
                  preserveAspectRatio="none"
                  className="w-full h-full overflow-visible"
                >
                  <defs>
                    {/* Exact Heron AI Displacement Filter */}
                    <filter
                      id="sharedDisplacementFilter_showcase"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%"
                      filterUnits="userSpaceOnUse"
                    >
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
                        scale={100}
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

                    {/* Ink Mask */}
                    <mask
                      id="inkCircleMask_showcase"
                      maskContentUnits="userSpaceOnUse"
                    >
                      <path
                        fill="white"
                        style={{ filter: 'url(#sharedDisplacementFilter_showcase)' }}
                        d={maskPathD}
                      />
                    </mask>
                  </defs>

                  {/* Sub Image: With Radiant Orange Sun Circle */}
                  <image
                    href="/images/heron/cad-sun.avif"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    mask="url(#inkCircleMask_showcase)"
                    className="w-full h-full object-cover select-none"
                  />
                </svg>
              </div>

              {/* Subtle Hairline Technical Metadata */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#EFE8DF] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#F68722] animate-pulse" />
                <span className="text-[10px] font-mono-specs font-bold text-[#3B3A3A] tracking-wider uppercase">
                  FEA STRESS DISSOLVE • {Math.round(progress * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: HERON AI SIGNATURE EDITORIAL TYPOGRAPHY & LOGOS */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Tagline */}
            <span className="text-xs font-black text-[#F68722] font-mono-specs uppercase tracking-[0.25em] block">
              PRECISION COMMERCIAL TRANSPORTATION
            </span>

            {/* Massive Swiss Grotesque Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#282828] font-heading leading-[1.25] tracking-tight uppercase">
              THE REPETITIVE 50-TON HAULS SHOULDN'T EAT YOUR FLEET'S MARGINS. SAMEER TRAILER HANDLES THE EXTREME AXLE STRESS SO YOU STAY FOCUSED ON LOGISTICS, NOT BREAKDOWNS.
            </h2>

            {/* Heron Style Interactive Button */}
            <div className="pt-2">
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-[#282828] hover:bg-[#282828] hover:text-white transition-all duration-300 active:scale-95 shadow-sm"
              >
                <span className="text-xs font-black uppercase font-mono-specs tracking-wider group-hover:text-white transition-colors">
                  EXPLORE FLEET MODELS
                </span>
                <div className="w-6 h-6 rounded-full bg-[#F68722] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>

            {/* Bottom Partners Section (Heron AI Style) */}
            <div className="pt-6 border-t border-[#EFE8DF] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-specs font-bold text-[#736F6A] uppercase tracking-wider">
                  FLEET PARTNERS & COMPATIBILITY
                </span>
                <div className="flex items-center gap-1.5 text-[#736F6A]">
                  <button className="p-1 rounded hover:bg-white border border-[#EFE8DF] transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1 rounded hover:bg-white border border-[#EFE8DF] transition-colors">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Partner Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {partnerLogos.map((p, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-[10px] font-black font-mono-specs uppercase rounded-lg bg-white border border-[#EFE8DF] text-[#3B3A3A] shadow-2xs"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <p className="text-xs text-[#736F6A] font-mono-specs pt-2">
                Works seamlessly across all Indian freight corridors, fully certified under CMVR and AIS-113 safety codes.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
