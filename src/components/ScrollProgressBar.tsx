import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Truck } from 'lucide-react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [percent, setPercent] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setPercent(Math.round(latest * 100));
      setShowScrollTop(latest > 0.15);
    });
  }, [scrollYProgress]);

  const truckLeft = useTransform(scaleX, [0, 1], ['0%', 'calc(100% - 28px)']);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Ultra-Minimal Top Scroll Journey Track (Below sticky header) */}
      <div className="fixed top-20 left-0 right-0 h-[3px] bg-[#EFE8DF]/60 z-40 pointer-events-none">
        {/* Animated Brand Orange Progress Bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-[#F68722] via-[#ff9a3d] to-[#F68722] origin-left"
          style={{ scaleX }}
        />

        {/* Minimal Subtle Moving Trailer Silhouette along the track */}
        <motion.div
          className="absolute -top-3 flex items-center justify-center pointer-events-none"
          style={{ left: truckLeft }}
        >
          <div className="p-1 rounded-md bg-[#3B3A3A] text-[#F68722] shadow-sm border border-[#EFE8DF]/40 flex items-center gap-1 scale-[0.8] sm:scale-90">
            <Truck className="w-3 h-3" />
          </div>
        </motion.div>
      </div>

      {/* 2. Minimal Floating Highway Metric Badge & Quick Return (Bottom-Right) */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.9 }}
          onClick={scrollToTop}
          title="Scroll to Top"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#3B3A3A]/90 hover:bg-[#3B3A3A] text-white px-3.5 py-2 rounded-full border border-white/10 shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer group"
        >
          <div className="w-2 h-2 rounded-full bg-[#F68722] animate-pulse" />
          <span className="text-[10px] font-black font-mono-specs tracking-wider text-[#F68722]">
            {percent}%
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 group-hover:text-white hidden sm:inline">
            TOP ↑
          </span>
        </motion.button>
      )}
    </>
  );
};
