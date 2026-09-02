import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeronInkIntroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  useEffect(() => {
    let rafId: number;
    let targetP = 0;
    let currentP = 0;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Start transition when container is 85% into viewport from bottom
      // Complete transition when container is 25% from top
      const start = vh * 0.85;
      const end = vh * 0.20;
      const raw = (start - rect.top) / (start - end);
      targetP = Math.max(0, Math.min(1, raw));
    };

    const loop = () => {
      currentP += (targetP - currentP) * 0.15;
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

  // ========================================================
  // UNPREDICTABLE BILLOWING CLOUD TRANSITION (बादल / धुंध)
  // Eliminates bubble shape: asymmetric multi-harmonic crests,
  // natural voids/gaps, and detached drifting cloud islands.
  // ========================================================
  const p = Math.max(0, Math.min(1, progress));
  const y = -160 + p * 1320;

  // Asymmetric multi-harmonic crests and deep receding voids (kabhi kahi hai, kabhi kahi nahi hai)
  const c1 = Math.sin(p * 5.1 + 0.9) * 85 + 35;  // Left flank swell
  const c2 = -Math.cos(p * 3.7 + 1.4) * 95 - 45; // Deep void / gap where cloud recedes
  const c3 = Math.sin(p * 3.2 + 2.8) * 145 + 85; // Deep surging cloud head
  const c4 = Math.cos(p * 4.3 + 0.6) * 115 + 40; // Right-center secondary puff
  const c5 = -Math.sin(p * 4.8 + 2.1) * 85 - 35; // Secondary void / gap
  const c6 = Math.sin(p * 2.9 + 1.2) * 100 + 50; // Far right trailing wisp

  // Complex organic undulating perimeter (Never a simple bubble parabola)
  const cloudContourD =
    `M -150 -200 L 1150 -200 L 1150 ${(y - 120).toFixed(1)} ` +
    `Q 1000 ${(y + c1).toFixed(1)} 850 ${(y + c2).toFixed(1)} ` +
    `Q 700 ${(y + c3).toFixed(1)} 550 ${(y + c4).toFixed(1)} ` +
    `Q 400 ${(y + c5).toFixed(1)} 250 ${(y + c6).toFixed(1)} ` +
    `Q 100 ${(y + c1).toFixed(1)} -150 ${y.toFixed(1)} Z`;

  // Detached, unpredictable floating cloud islands (kabhi kahi hai, kabhi kahi nahi hai)
  const cloudIslands = p > 0.04 && p < 0.96 ? [
    { cx: 280, cy: y + 175 + Math.sin(p * 7) * 45, r: 80 + Math.cos(p * 6) * 20 },
    { cx: 720, cy: y + 235 + Math.cos(p * 6) * 55, r: 98 + Math.sin(p * 5) * 25 },
    { cx: 510, cy: y + 275 + Math.sin(p * 8) * 40, r: 68 + Math.sin(p * 7) * 18 },
    { cx: 140, cy: y + 145 + Math.cos(p * 9) * 35, r: 62 },
    { cx: 890, cy: y + 165 + Math.sin(p * 5) * 40, r: 72 },
    { cx: 390, cy: y + 215 + Math.sin(p * 9) * 30, r: 58 },
  ] : [];

  const partnerLogos = [
    'TATA MOTORS FLEET',
    'ASHOK LEYLAND',
    'BHARATBENZ',
    'MAHINDRA TRUCKS',
    'CONTAINER CORP (CONCOR)',
    'VRL LOGISTICS'
  ];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : partnerLogos.length - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev < partnerLogos.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="home-intro-wrap relative bg-[#FAF8F5] border-y border-[#EAE3D9] overflow-hidden py-16 md:py-24">
      {/* Structural Hairline Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#CFC5B8_1px,transparent_1px)] [background-size:24px_24px]" />

      <section ref={containerRef} className="home-intro relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-layout-blockcontainer container full-h grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* ======================================================== */}
          {/* LEFT: EXACT UNPREDICTABLE BILLOWING CLOUD MASK VISUAL */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 home-intro-img-wrap">
            <div className="home-intro-img relative w-full aspect-[1000/1012] max-w-[540px] mx-auto rounded-3xl overflow-hidden border border-[#DFD7CB] bg-white shadow-2xl shadow-black/5">
              <div data-wf--ink-mask--variant="path" className="ink-mask relative w-full h-full">
                
                {/* 1. Main Base Image: CAD Technical Wireframe */}
                <div data-end="55" data-start="35" className="ink-mask-img main absolute inset-0">
                  <img
                    src="/images/heron/cad-wireframe.avif"
                    alt="Technical Engineering CAD Wireframe"
                    className="img-basic img-abs w-full h-full object-cover select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>

                {/* 2. Sub Layer: Organic Unpredictable Cloud Displacement Mask */}
                <div className="ink-mask-img sub ink-filter absolute inset-0">
                  <svg
                    width="100%"
                    height="100%"
                    preserveAspectRatio="none"
                    className="layer w-full h-full overflow-visible"
                    viewBox="0 0 1000 1011.7647058823529"
                  >
                    <defs>
                      <mask id="inkCircleMask-0" maskContentUnits="userSpaceOnUse">
                        <g style={{ filter: 'url(#sharedDisplacementFilter)' }}>
                          <path
                            fill="white"
                            d={cloudContourD}
                            className="mask"
                          />
                          {cloudIslands.map((island, idx) => (
                            <circle
                              key={idx}
                              cx={island.cx}
                              cy={island.cy}
                              r={island.r}
                              fill="white"
                            />
                          ))}
                        </g>
                      </mask>

                      {/* Authentic Rolling Cloud Vapor Turbulence Filter */}
                      <filter id="sharedDisplacementFilter" x="-35%" y="-35%" width="170%" height="170%">
                        <feTurbulence
                          type="fractalNoise"
                          baseFrequency="0.011 0.015"
                          numOctaves={4}
                          seed={23}
                          result="cloudNoise"
                        />
                        <feDisplacementMap
                          in="SourceGraphic"
                          in2="cloudNoise"
                          scale={165}
                          xChannelSelector="R"
                          yChannelSelector="G"
                          result="displaced"
                        />
                        <feGaussianBlur in="displaced" stdDeviation={3.5} result="blurred" />
                        <feComponentTransfer in="blurred" result="contrast">
                          <feFuncA type="linear" slope={2.8} intercept={-0.75} />
                        </feComponentTransfer>
                      </filter>
                    </defs>

                    {/* Sub Image: Revealed with Glowing Radiant Sun */}
                    <image
                      href="/images/heron/cad-sun.avif"
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      mask="url(#inkCircleMask-0)"
                      className="img-basic w-full h-full object-cover select-none"
                      style={{ maskImage: 'url("#inkCircleMask-0")' }}
                    />
                  </svg>
                </div>

              </div>

              {/* Technical HUD Floating Badge */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E5E0D8] shadow-sm pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-[#F68722] animate-pulse" />
                <span className="text-[10px] font-mono-specs font-bold text-[#3B3A3A] tracking-wider uppercase">
                  METALLURGIC CAD STRESS INK DISSOLVE • {Math.round(progress * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: EXACT HERON AI EDITORIAL TYPOGRAPHY & BUTTON */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 home-intro-body space-y-8">
            <div className="home-intro-content space-y-6">
              
              {/* Mono Subtitle */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#F68722]" />
                <span className="text-xs font-black text-[#F68722] font-mono-specs uppercase tracking-[0.25em]">
                  SAMEER COMMERCIAL TRANSPORT
                </span>
              </div>

              {/* Massive Swiss Grotesque Headline */}
              <div className="home-intro-content-title">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black text-[#282828] font-heading leading-[1.18] tracking-tight uppercase">
                  THE REPETITIVE 50-TON HAULS SHOULDN'T EAT YOUR FLEET'S MARGINS. SAMEER HANDLES THE EXTREME AXLE STRESS SO YOU STAY FOCUSED ON BUSINESS, NOT BREAKDOWNS.
                </h2>
              </div>

              {/* Signature Heron AI Double-Deck Sliding Button */}
              <div className="pt-2">
                <Link
                  to="/products"
                  className="home-intro-btn inline-block group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-full border border-[#282828] px-7 py-3.5 bg-transparent group-hover:bg-[#282828] transition-colors duration-300 flex items-center gap-4 shadow-sm">
                    {/* Double-Deck Sliding Label */}
                    <div className="relative h-4 overflow-hidden font-mono-specs text-xs font-black uppercase tracking-wider">
                      <div className="transform transition-transform duration-300 group-hover:-translate-y-full text-[#282828]">
                        Learn more
                      </div>
                      <div className="absolute inset-0 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white">
                        Learn more
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="w-5 h-5 rounded-full bg-[#F68722] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </div>

            </div>

            {/* ======================================================== */}
            {/* PARTNER SWIPER STRIP (EXACT HERON AI LAYOUT) */}
            {/* ======================================================== */}
            <div className="home-intro-partner-wrap pt-6 border-t border-[#EAE3D9] space-y-4">
              <div className="home-intro-partner-label-wrap flex items-center justify-between">
                <div className="text-[11px] font-mono-specs font-bold text-[#736F6A] uppercase tracking-wider flex items-center gap-2">
                  <span>CLIENTS & PRIME-MOVER COMPATIBILITY</span>
                </div>
                
                {/* Prev / Next Slider Controls */}
                <div className="home-intro-partner-ctrls flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous partner slide"
                    className="p-1.5 rounded-lg border border-[#DFD7CB] bg-white text-[#3B3A3A] hover:bg-[#F68722] hover:text-white hover:border-[#F68722] transition-colors shadow-2xs"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next partner slide"
                    className="p-1.5 rounded-lg border border-[#DFD7CB] bg-white text-[#3B3A3A] hover:bg-[#F68722] hover:text-white hover:border-[#F68722] transition-colors shadow-2xs"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Partner Badges Carousel */}
              <div className="flex flex-wrap gap-2 pt-1">
                {partnerLogos.map((logo, idx) => (
                  <span
                    key={idx}
                    className={`px-3.5 py-1.5 text-[10px] font-black font-mono-specs uppercase rounded-lg border transition-all duration-300 ${
                      idx === activeSlide
                        ? 'bg-[#282828] text-white border-[#282828] shadow-sm scale-[1.03]'
                        : 'bg-white text-[#3B3A3A] border-[#DFD7CB] hover:border-[#F68722]'
                    }`}
                  >
                    {logo}
                  </span>
                ))}
              </div>

              {/* Descriptive Subtext */}
              <div className="home-intro-desc pt-2">
                <p className="text-xs text-[#736F6A] font-mono-specs leading-relaxed">
                  Works natively inside all heavy fleet setups across India, compatible with Tata Motors, Ashok Leyland, BharatBenz and Mahindra prime movers.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

