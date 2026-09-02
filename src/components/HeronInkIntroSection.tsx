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

  // Exact Heron AI formula:
  // Start: M 0 0 Q 500 0 1000 0 L 1000 0 L 0 0 Z
  // Final: M 0 1000 Q 500 1250 1000 1000 L 1000 0 L 0 0 Z
  const y = progress * 1000;
  const curve = Math.min(250, progress * 250);
  const maskPathD = `M 0 ${y.toFixed(2)} Q 500 ${(y + curve).toFixed(2)} 1000 ${y.toFixed(2)} L 1000 0 L 0 0 Z`;

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
          {/* LEFT: EXACT HERON AI DUAL-LAYER INK MASK VISUAL */}
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

                {/* 2. Sub Layer: Exact Heron AI SVG Displacement Mask */}
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
                        <path
                          fill="white"
                          style={{ filter: 'url(#sharedDisplacementFilter)' }}
                          d={maskPathD}
                          data-value-final="M 0 1000 Q 500 1250 1000 1000 L 1000 0 L 0 0 Z"
                          className="mask"
                        />
                      </mask>

                      {/* Exact Heron AI Displacement Filter Formula */}
                      <filter id="sharedDisplacementFilter">
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
                        />
                        <feGaussianBlur stdDeviation="1.8" result="blurred" />
                        <feComponentTransfer in="blurred" result="contrast">
                          <feFuncA type="linear" slope={2.2} intercept={-0.6} />
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

