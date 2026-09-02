import React, { useRef } from 'react';

export const WeighbridgeTelemetryShowcase: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full bg-black overflow-hidden flex items-center justify-center">
      {/* Full-bleed Edge-to-Edge Cinematic Video Container */}
      <div className="w-full h-auto min-h-[50vh] sm:min-h-[70vh] lg:min-h-[85vh] max-h-screen flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src="/assets/weighbridge-telemetry-orange.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover sm:object-contain select-none max-h-screen"
        />
      </div>
    </section>
  );
};
