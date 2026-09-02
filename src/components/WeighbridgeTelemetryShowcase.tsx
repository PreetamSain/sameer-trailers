import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck } from 'lucide-react';

export const WeighbridgeTelemetryShowcase: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="py-16 md:py-24 bg-[#FFFBF7] border-b border-[#EFE8DF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Heading directly above the video */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F68722]/10 border border-[#F68722]/20">
            <span className="w-2 h-2 rounded-full bg-[#F68722] animate-ping" />
            <span className="text-xs font-bold text-[#F68722] uppercase tracking-[0.2em] font-mono-specs">
              ON-SITE INTEGRATIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#3B3A3A] font-heading leading-tight tracking-tight">
            Dynamic Weighbridge & <br />
            <span className="text-[#F68722]">Payload Sensing.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#736F6A] leading-relaxed font-medium">
            Direct connection to existing load sensors, weigh scales, and electronic fleet telemetry to capture operational payload data automatically.
          </p>
        </div>

        {/* Cula.tech Exact Proportion Frame (960px - 1024px, 480px height on PC, centered & nicely cropped on Mobile) */}
        <div className="max-w-5xl mx-auto">
          <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] rounded-3xl overflow-hidden bg-black shadow-2xl border-2 border-[#EFE8DF] group">
            
            {/* Top Telemetry Status Pill */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono-specs text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F68722] animate-pulse" />
              <span>LIVE SENSOR FEED • ST-WB-8840</span>
            </div>

            {/* Video Element:
                - On Mobile: object-cover object-center with slight horizontal crop to preserve large legible text & HUD
                - On Desktop/PC: object-contain/cover fitted inside exact 480px Cula frame
            */}
            <video
              ref={videoRef}
              src="/assets/weighbridge-telemetry-orange.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center select-none"
            />

            {/* Subtle Vignette & Depth */}
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-3xl" />
          </div>
        </div>

      </div>
    </section>
  );
};
