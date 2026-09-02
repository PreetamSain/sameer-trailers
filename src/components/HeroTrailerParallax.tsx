import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useScroll } from 'framer-motion';

export const HeroTrailerParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for pointer tracking (buttery lerp effect)
  const springConfig = { damping: 28, stiffness: 140, mass: 0.4 };
  const smoothMouseX = useSpring(0, springConfig);
  const smoothMouseY = useSpring(0, springConfig);

  // Continuous ambient idle time for gentle mobile float & breathing effect
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animId: number;
    const loop = (t: number) => {
      setTime(t);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Ambient gentle breathing offsets (sine waves)
  const idleFgY = Math.sin(time * 0.0018) * 6;
  const idleFgX = Math.cos(time * 0.0014) * 3;
  const idleBgY = Math.sin(time * 0.0018 + 1.5) * 8;
  const idleBgX = Math.cos(time * 0.0014 + 1.5) * 5;

  // Scroll parallax: differential movement between foreground card & background frame
  const { scrollY } = useScroll();
  const scrollBgY = useTransform(scrollY, [0, 700], [0, 85]);
  const scrollFgY = useTransform(scrollY, [0, 700], [0, 35]);
  const scrollRotate = useTransform(scrollY, [0, 700], [0, -2.5]);

  // Pointer / Mouse Move Handler
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    smoothMouseX.set(Math.max(-1, Math.min(1, x)));
    smoothMouseY.set(Math.max(-1, Math.min(1, y)));
  };

  const handlePointerEnter = () => setIsHovered(true);

  const handlePointerLeave = () => {
    setIsHovered(false);
    smoothMouseX.set(0);
    smoothMouseY.set(0);
  };

  // Device orientation (mobile gyroscope tilt)
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = Math.max(-1, Math.min(1, e.gamma / 25));
        const y = Math.max(-1, Math.min(1, (e.beta - 40) / 25));
        smoothMouseX.set(x);
        smoothMouseY.set(y);
      }
    };

    if (window.DeviceOrientationEvent && typeof (window.DeviceOrientationEvent as any).requestPermission !== 'function') {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [smoothMouseX, smoothMouseY]);

  // Transform mappings
  // Background Orange Frame moves in opposite direction for maximum depth
  const bgX = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const bgY = useTransform(smoothMouseY, [-1, 1], [-16, 16]);

  // Foreground White Card tilts in 3D perspective
  const fgX = useTransform(smoothMouseX, [-1, 1], [14, -14]);
  const fgY = useTransform(smoothMouseY, [-1, 1], [12, -12]);
  const fgRotateX = useTransform(smoothMouseY, [-1, 1], [7, -7]);
  const fgRotateY = useTransform(smoothMouseX, [-1, 1], [-7, 7]);

  // Inner Image micro-shift
  const imgX = useTransform(smoothMouseX, [-1, 1], [8, -8]);
  const imgY = useTransform(smoothMouseY, [-1, 1], [6, -6]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="relative w-full group cursor-pointer select-none"
      style={{ perspective: 1200 }}
    >
      {/* 1. LAYER 1: OFFSET BRAND ORANGE (#F68722) BACKDROP FRAME (Deep Parallax Layer) */}
      <motion.div
        style={{
          x: useTransform(bgX, (val) => val + idleBgX),
          y: useTransform(bgY, (val) => val + idleBgY),
          translateY: scrollBgY
        }}
        className="absolute inset-0 bg-[#F68722] rounded-2xl sm:rounded-3xl translate-x-2.5 translate-y-2.5 sm:translate-x-4 sm:translate-y-4 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300 -z-10 shadow-xl shadow-[#F68722]/30"
      />

      {/* 2. LAYER 2: FOREGROUND CARD CONTAINER WITH 3D PERSPECTIVE TILT */}
      <motion.div
        style={{
          x: useTransform(fgX, (val) => val + idleFgX),
          y: useTransform(fgY, (val) => val + idleFgY),
          translateY: scrollFgY,
          rotateX: fgRotateX,
          rotateY: fgRotateY,
          rotateZ: scrollRotate,
          transformStyle: 'preserve-3d'
        }}
        className="relative w-full bg-white rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5 border-2 sm:border-[3px] border-[#EFE8DF] overflow-hidden group-hover:border-[#F68722]/50 shadow-2xl transition-colors duration-300 flex items-center justify-center"
      >
        {/* Subtle Dynamic Specular Light Glare following mouse */}
        <motion.div
          style={{
            opacity: isHovered ? 0.35 : 0.12,
            x: useTransform(smoothMouseX, [-1, 1], [-80, 80]),
            y: useTransform(smoothMouseY, [-1, 1], [-80, 80])
          }}
          className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/80 to-transparent pointer-events-none -z-0 blur-xl"
        />

        {/* 3. LAYER 3: HIGH-RESOLUTION BROCHURE TRAILER IMAGE (Snug Edge-to-Edge Fit) */}
        <motion.img
          src="/assets/brochure-asset-21.png"
          alt="Sameer Commercial Trailer — Engineered Heavy Transport"
          style={{
            x: imgX,
            y: imgY,
            translateZ: 25
          }}
          className="w-full h-auto object-cover rounded-xl sm:rounded-2xl drop-shadow-md relative z-10 pointer-events-none block"
        />
      </motion.div>
    </div>
  );
};
