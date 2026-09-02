import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ShieldCheck, Cpu, Scale, Flame } from 'lucide-react';

export const HeronShowcaseSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20
  });

  // Sun rises and reveals smoothly as user scrolls past
  const sunY = useTransform(smoothProgress, [0.1, 0.6], [80, -20]);
  const sunScale = useTransform(smoothProgress, [0.1, 0.6], [0.75, 1.05]);
  const sunOpacity = useTransform(smoothProgress, [0.05, 0.25], [0.3, 1]);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-[#F7F5F0] border-y border-[#E8E2D9] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Split Layout: Blueprint + Rising Sun (Left) & Editorial Typography (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ======================================================== */}
          {/* LEFT: ARCHITECTURAL BLUEPRINT & RISING ORANGE SUN (HERON AI STYLE) */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
            
            {/* The Signature Radiant Orange Sun */}
            <motion.div
              style={{
                y: sunY,
                scale: sunScale,
                opacity: sunOpacity
              }}
              className="absolute top-10 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#F68722] shadow-2xl shadow-[#F68722]/30 pointer-events-none z-0"
            >
              {/* Subtle organic paper grain inside the sun */}
              <div
                className="absolute inset-0 rounded-full opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='s'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23s)'/%3E%3C/svg%3E")`
                }}
              />
            </motion.div>

            {/* Precision CAD Blueprint Line Art of Commercial Trailer */}
            <div className="relative z-10 w-full max-w-lg">
              <svg
                viewBox="0 0 520 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto drop-shadow-md"
              >
                {/* CAD Grid Background Lines */}
                <g stroke="#3B3A3A" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3">
                  <line x1="20" y1="20" x2="500" y2="20" />
                  <line x1="20" y1="90" x2="500" y2="90" />
                  <line x1="20" y1="160" x2="500" y2="160" />
                  <line x1="20" y1="230" x2="500" y2="230" />
                  <line x1="90" y1="10" x2="90" y2="270" />
                  <line x1="240" y1="10" x2="240" y2="270" />
                  <line x1="390" y1="10" x2="390" y2="270" />
                </g>

                {/* Dimension Guides */}
                <g stroke="#3B3A3A" strokeWidth="0.8" opacity="0.6">
                  <line x1="40" y1="265" x2="480" y2="265" />
                  <line x1="40" y1="260" x2="40" y2="270" />
                  <line x1="480" y1="260" x2="480" y2="270" />
                  <text x="260" y="278" fill="#3B3A3A" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    OAL: 12,500 mm | GVW: 49,000 KG
                  </text>
                </g>

                {/* Main Trailer Chassis I-Beam Architecture */}
                <path
                  d="M 50 160 L 470 160 L 470 178 L 460 188 L 130 188 L 110 215 L 50 215 Z"
                  stroke="#1A1A1A"
                  strokeWidth="2.5"
                  fill="#FFFBF7"
                  fillOpacity="0.85"
                />

                {/* Cargo Deck Platform */}
                <rect
                  x="50"
                  y="120"
                  width="420"
                  height="40"
                  stroke="#1A1A1A"
                  strokeWidth="2"
                  fill="#FFFFFF"
                  fillOpacity="0.9"
                />

                {/* Side Wall Structural Stanchions */}
                <g stroke="#1A1A1A" strokeWidth="1.5">
                  <line x1="80" y1="120" x2="80" y2="160" />
                  <line x1="130" y1="120" x2="130" y2="160" />
                  <line x1="180" y1="120" x2="180" y2="160" />
                  <line x1="230" y1="120" x2="230" y2="160" />
                  <line x1="280" y1="120" x2="280" y2="160" />
                  <line x1="330" y1="120" x2="330" y2="160" />
                  <line x1="380" y1="120" x2="380" y2="160" />
                  <line x1="430" y1="120" x2="430" y2="160" />
                </g>

                {/* Kingpin Coupler Assembly */}
                <rect x="70" y="215" width="25" height="15" stroke="#1A1A1A" strokeWidth="1.5" fill="#3B3A3A" />
                <line x1="82.5" y1="230" x2="82.5" y2="245" stroke="#F68722" strokeWidth="3" />

                {/* Landing Gear Support */}
                <rect x="145" y="188" width="12" height="42" stroke="#1A1A1A" strokeWidth="1.5" fill="#FFFBF7" />
                <circle cx="151" cy="230" r="4" stroke="#1A1A1A" strokeWidth="1.5" fill="#F68722" />

                {/* Triple Axle Suspension Group (Heavy Commercial Specs) */}
                {/* Axle 1 */}
                <circle cx="340" cy="225" r="24" stroke="#1A1A1A" strokeWidth="2.5" fill="#FFFBF7" />
                <circle cx="340" cy="225" r="14" stroke="#1A1A1A" strokeWidth="1.5" fill="#EFE8DF" />
                <circle cx="340" cy="225" r="5" fill="#F68722" />

                {/* Axle 2 */}
                <circle cx="395" cy="225" r="24" stroke="#1A1A1A" strokeWidth="2.5" fill="#FFFBF7" />
                <circle cx="395" cy="225" r="14" stroke="#1A1A1A" strokeWidth="1.5" fill="#EFE8DF" />
                <circle cx="395" cy="225" r="5" fill="#F68722" />

                {/* Axle 3 */}
                <circle cx="450" cy="225" r="24" stroke="#1A1A1A" strokeWidth="2.5" fill="#FFFBF7" />
                <circle cx="450" cy="225" r="14" stroke="#1A1A1A" strokeWidth="1.5" fill="#EFE8DF" />
                <circle cx="450" cy="225" r="5" fill="#F68722" />

                {/* Suspension Equalizer Leaf Springs */}
                <path d="M 320 205 Q 367 195 415 205" stroke="#3B3A3A" strokeWidth="2" fill="none" />
                <path d="M 375 205 Q 422 195 470 205" stroke="#3B3A3A" strokeWidth="2" fill="none" />

                {/* Engineering Callout Badges */}
                <g fontFamily="monospace" fontSize="8" fontWeight="bold">
                  <rect x="52" y="96" width="105" height="18" rx="4" fill="#1A1A1A" />
                  <text x="104" y="108" fill="#FFFBF7" textAnchor="middle">DOMEX 700 STEEL</text>
                  <line x1="104" y1="114" x2="104" y2="120" stroke="#1A1A1A" strokeWidth="1.2" />

                  <rect x="365" y="80" width="115" height="18" rx="4" fill="#F68722" />
                  <text x="422.5" y="92" fill="#FFFFFF" textAnchor="middle">16T HEAVY AXLE PACK</text>
                  <line x1="422.5" y1="98" x2="422.5" y2="201" stroke="#F68722" strokeWidth="1.2" strokeDasharray="2 2" />
                </g>
              </svg>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: EDITORIAL TYPOGRAPHY & HERO STATEMENT (EXACT HERON AI COMPOSITION) */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-8 lg:pl-6 border-l-0 lg:border-l border-[#E8E2D9]">
            
            <div className="space-y-4">
              <span className="text-xs font-mono-specs font-bold text-[#F68722] tracking-[0.25em] uppercase block">
                FLEET OPERATING ECONOMICS
              </span>

              {/* Massive Confident Grotesque Typography (Heron AI Style) */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A1A1A] font-heading leading-[1.25] tracking-tight uppercase">
                THE REPETITIVE 50-TON HAULS SHOULDN'T EAT YOUR FLEET'S MARGINS. SAMEER TRAILER HANDLES THE EXTREME AXLE STRESS SO YOU STAY FOCUSED ON LOGISTICS, NOT BREAKDOWNS.
              </h2>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 py-3.5 px-7 bg-[#1A1A1A] hover:bg-[#F68722] text-white font-mono-specs text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all duration-300 active:scale-95"
              >
                <span>REQUEST FACTORY QUOTE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 py-3.5 px-6 bg-transparent hover:bg-[#EFE8DF] text-[#1A1A1A] font-mono-specs text-xs uppercase tracking-wider rounded-xl border border-[#D5CFC5] transition-colors"
              >
                <span>VIEW TRAILER FLEET</span>
              </Link>
            </div>

            {/* Technical Validation Badges */}
            <div className="pt-6 border-t border-[#E8E2D9] grid grid-cols-2 sm:grid-cols-4 gap-4 text-[#736F6A]">
              <div>
                <span className="text-[10px] font-mono-specs uppercase text-[#F68722] font-bold block">MATERIAL</span>
                <span className="text-xs font-black text-[#1A1A1A] font-heading mt-0.5 block">DOMEX 700</span>
              </div>
              <div>
                <span className="text-[10px] font-mono-specs uppercase text-[#F68722] font-bold block">WELDING</span>
                <span className="text-xs font-black text-[#1A1A1A] font-heading mt-0.5 block">100% SAW</span>
              </div>
              <div>
                <span className="text-[10px] font-mono-specs uppercase text-[#F68722] font-bold block">SAVINGS</span>
                <span className="text-xs font-black text-[#1A1A1A] font-heading mt-0.5 block">-1.8T TARE</span>
              </div>
              <div>
                <span className="text-[10px] font-mono-specs uppercase text-[#F68722] font-bold block">STANDARD</span>
                <span className="text-xs font-black text-[#1A1A1A] font-heading mt-0.5 block">ARAI AIS-113</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
