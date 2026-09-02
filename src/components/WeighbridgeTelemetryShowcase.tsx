import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Scale, ShieldCheck, Cpu, ArrowRight, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedCounter } from './AnimatedCounter';

export const WeighbridgeTelemetryShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#0E0E10] text-white relative overflow-hidden border-y border-[#26262B]">
      
      {/* Blueprint Grid Background Pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#F68722 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      {/* Ambient Orange Glow */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-[#F68722]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-[#F68722]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#26262B] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F68722] animate-ping" />
              <span className="text-xs font-bold text-[#F68722] uppercase tracking-[0.2em] font-mono-specs">
                TELEMETRY & ON-SITE INTEGRATIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading leading-tight tracking-tight">
              DYNAMIC WEIGHBRIDGE & <br />
              <span className="text-[#F68722]">PAYLOAD SENSING.</span>
            </h2>
          </div>

          <p className="text-sm text-[#A09D98] max-w-md leading-relaxed font-medium">
            Direct connection to on-site sensors, weigh scales, and electronic meters to validate tare weight, payload capacity, and tridem axle balance automatically.
          </p>
        </div>

        {/* Cula.tech Inspired Cinematic Hologram Container */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-[#2A2A30] bg-[#08080A] shadow-2xl">
          
          {/* Top Telemetry Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#222228] bg-[#121216]/80 backdrop-blur-md text-[11px] font-mono-specs text-[#A09D98]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[#F68722] font-bold">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>LOAD CELL TELEMETRY</span>
              </span>
              <span className="hidden sm:inline text-[#4A4A52]">|</span>
              <span className="hidden sm:inline">SENSOR ID: ST-WB-8840</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-[#736F6A]">CALIBRATION:</span>
                <span className="text-emerald-400 font-bold">ARAI AIS-113 OK</span>
              </div>
            </div>
          </div>

          {/* Video Player Box with Holographic Orange Video */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[320px] sm:min-h-[440px] flex items-center justify-center bg-black overflow-hidden">
            
            <video
              ref={videoRef}
              src="/assets/weighbridge-telemetry-orange.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover select-none"
            />

            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#08080A] via-transparent to-[#08080A]/40" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#08080A]/50 via-transparent to-[#08080A]/50" />
          </div>

          {/* Bottom Live Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 bg-[#121216]/90 border-t border-[#222228]">
            <div className="space-y-1">
              <div className="text-[10px] text-[#736F6A] font-mono-specs uppercase">GROSS WEIGHT TEST</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono-specs">
                <AnimatedCounter end={38} suffix=".31 t" />
              </div>
              <div className="text-[11px] text-[#A09D98]">Total Vehicle + Freight</div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] text-[#736F6A] font-mono-specs uppercase">PAYLOAD CAPACITY</div>
              <div className="text-xl sm:text-2xl font-black text-[#F68722] font-mono-specs">
                <AnimatedCounter end={29} suffix=".46 t" />
              </div>
              <div className="text-[11px] text-[#A09D98]">Net Commercial Freight</div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] text-[#736F6A] font-mono-specs uppercase">CHASSIS TARE WEIGHT</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono-specs">
                <AnimatedCounter end={8} suffix=".85 t" />
              </div>
              <div className="text-[11px] text-[#A09D98]">Ultra-Light DOMEX 700</div>
            </div>

            <div className="space-y-1 flex flex-col justify-center">
              <div className="text-[10px] text-[#736F6A] font-mono-specs uppercase">OVERLOAD PROTECTION</div>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 font-mono-specs">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% CMVR COMPLIANT</span>
              </div>
              <div className="text-[11px] text-[#A09D98]">Zero Axle Stress Spikes</div>
            </div>
          </div>

        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-[#141418] border border-[#26262B] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F68722]/10 border border-[#F68722]/20 flex items-center justify-center text-[#F68722]">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-white font-heading">
              Precision Tare Weight
            </h3>
            <p className="text-xs text-[#A09D98] leading-relaxed">
              Every Sameer trailer is manufactured with laser-calibrated tolerances, ensuring minimum unladen tare weight for higher profit per trip.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141418] border border-[#26262B] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F68722]/10 border border-[#F68722]/20 flex items-center justify-center text-[#F68722]">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-white font-heading">
              Balanced Axle Loading
            </h3>
            <p className="text-xs text-[#A09D98] leading-relaxed">
              Engineered tridem geometry prevents uneven load concentrations, eliminating road authority overload fines and uneven tyre wear.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141418] border border-[#26262B] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F68722]/10 border border-[#F68722]/20 flex items-center justify-center text-[#F68722]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-white font-heading">
              IoT Sensor Ready
            </h3>
            <p className="text-xs text-[#A09D98] leading-relaxed">
              Pre-wired chassis channels support standard digital load cells, TPMS (Tyre Pressure Monitoring), and GPS fleet tracking hubs.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};
