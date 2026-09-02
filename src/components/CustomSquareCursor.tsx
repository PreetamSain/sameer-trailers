import React, { useEffect, useState, useRef } from 'react';

export const CustomSquareCursor: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // High-precision coordinates for 120Hz/60Hz smooth lerping
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const isVisibleRef = useRef<boolean>(false);

  useEffect(() => {
    // Only activate custom square cursor on desktop devices with a precision mouse
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setVisible(true);
      }
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setVisible(true);
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setVisible(false);
    };

    // Check if hovering over clickable or interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, .hover-target')
      );
      setHovered(isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    // Heron AI Lerp factor: 0.22 for silky-smooth follow
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    let rafId: number;
    const render = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.24);
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.24);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-150 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ willChange: 'transform' }}
    >
      {/* Heron AI Signature Sharp Square Dot Cursor */}
      <div
        className={`bg-[#F68722] border border-white/60 transition-all duration-200 ease-out shadow-sm ${
          hovered
            ? 'w-5 h-5 bg-[#e07414] scale-125 shadow-md shadow-[#F68722]/50'
            : 'w-2.5 h-2.5 scale-100'
        }`}
        style={{
          borderRadius: '0px' // Sharp square brutalist signature
        }}
      />
    </div>
  );
};
