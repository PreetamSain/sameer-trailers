import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';

export const HeroTrailerParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [webglLoaded, setWebglLoaded] = useState(false);

  // Mouse / Pointer normalized coordinates (-1 to 1)
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  // Scroll tracking for scroll-driven 3D tilt & orange frame drop
  const { scrollY } = useScroll();
  const scrollBgY = useTransform(scrollY, [0, 700], [0, 95]);
  const scrollBgX = useTransform(scrollY, [0, 700], [0, -20]);

  // Handle mouse / pointer move
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    targetMouse.current.x = Math.max(-1, Math.min(1, x));
    targetMouse.current.y = Math.max(-1, Math.min(1, y));
  }, []);

  const handlePointerEnter = () => setIsHovered(true);

  const handlePointerLeave = () => {
    setIsHovered(false);
    targetMouse.current.x = 0;
    targetMouse.current.y = 0;
  };

  // Mobile gyroscope / device orientation tilt
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = Math.max(-1, Math.min(1, e.gamma / 22));
        const y = Math.max(-1, Math.min(1, (e.beta - 42) / 22));
        targetMouse.current.x = x;
        targetMouse.current.y = y;
      }
    };

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent && typeof (window.DeviceOrientationEvent as any).requestPermission !== 'function') {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // WebGL Depth Shader Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
    if (!gl) return;
    glRef.current = gl;

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        v_uv.y = 1.0 - v_uv.y; // Flip Y for WebGL texture orientation
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform sampler2D u_texture;
      uniform sampler2D u_depth;
      uniform vec2 u_mouse;
      uniform float u_time;
      varying vec2 v_uv;

      void main() {
        // Zoom in slightly (6%) so parallax displacement never hits empty border clamp
        vec2 uv = (v_uv - 0.5) * 0.94 + 0.5;

        // 4-step raymarched parallax displacement for sharp, clean edges
        vec2 p = u_mouse * 0.052;
        vec2 offset = vec2(0.0);
        for(int i = 0; i < 4; i++) {
          float d = texture2D(u_depth, uv + offset).r;
          offset += p * (d - 0.45) * 0.28;
        }

        vec2 finalUv = clamp(uv + offset, 0.001, 0.999);
        vec4 color = texture2D(u_texture, finalUv);
        float finalDepth = texture2D(u_depth, finalUv).r;

        // Dynamic 3D directional specular sheen on the truck body reacting to cursor
        vec2 lightSource = u_mouse * 1.6;
        float lightAngle = dot(normalize(vec3(lightSource, 1.0)), normalize(vec3(offset * 28.0, 1.0)));
        color.rgb += vec3(0.08) * max(0.0, lightAngle * finalDepth);

        // Micro chromatic aberration on high-depth silhouettes for cinematic lens effect
        float r = texture2D(u_texture, finalUv + offset * 0.04).r;
        float b = texture2D(u_texture, finalUv - offset * 0.04).b;
        color.r = mix(color.r, r, 0.3);
        color.b = mix(color.b, b, 0.3);

        gl_FragColor = color;
      }
    `;

    const createShader = (glCtx: WebGLRenderingContext, type: number, source: string) => {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      return shader;
    };

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,  1, -1, -1,  1,
        -1,  1,  1, -1,  1,  1
      ]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTexLoc = gl.getUniformLocation(program, 'u_texture');
    const uDepthLoc = gl.getUniformLocation(program, 'u_depth');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');

    let texturesLoaded = 0;
    const checkAllLoaded = () => {
      texturesLoaded++;
      if (texturesLoaded >= 2) {
        setWebglLoaded(true);
      }
    };

    const loadTexture = (url: string, unit: number) => {
      const tex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = () => {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        checkAllLoaded();
      };
      return tex;
    };

    loadTexture('/assets/brochure-asset-21.png', 0);
    loadTexture('/assets/trailer-depth.jpg', 1);

    gl.uniform1i(uTexLoc, 0);
    gl.uniform1i(uDepthLoc, 1);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Continuous 60fps render loop
    let startTime = performance.now();
    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      // Silky smooth lerp for pointer
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.08;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.08;

      // Ambient breathing idle sway for continuous mobile float
      const idleSwayX = Math.sin(elapsed * 1.5) * 0.16;
      const idleSwayY = Math.cos(elapsed * 1.2) * 0.12;

      // Scroll-driven vertical pitch
      const scrollPitch = Math.min(1.0, window.scrollY / 500) * 0.28;

      const totalX = currentMouse.current.x + idleSwayX;
      const totalY = currentMouse.current.y + idleSwayY + scrollPitch;

      gl.useProgram(program);
      gl.uniform2f(uMouseLoc, totalX, totalY);
      gl.uniform1f(uTimeLoc, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="relative w-full group select-none cursor-grab active:cursor-grabbing"
    >
      {/* 1. LAYER 1: OFFSET BRAND ORANGE (#F68722) BACKDROP FRAME (Deep Parallax Layer) */}
      <motion.div
        style={{
          translateY: scrollBgY,
          translateX: scrollBgX
        }}
        className="absolute inset-0 bg-[#F68722] rounded-3xl translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-300 -z-10 shadow-2xl shadow-[#F68722]/35"
      />

      {/* 2. LAYER 2: FOREGROUND WEBGL 3D SPATIAL CANVAS */}
      <div className="relative w-full bg-white rounded-3xl p-1.5 sm:p-2 border-2 border-[#EFE8DF] overflow-hidden group-hover:border-[#F68722]/50 shadow-2xl transition-colors duration-300 aspect-[16/10] min-h-[340px] sm:min-h-[420px] flex items-center justify-center">
        
        {/* TOP HUD BADGE: Technical Excellence Signal */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#0E0E10]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-[10px] font-mono-specs text-white shadow-lg pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#F68722] animate-ping" />
          <span className="font-bold text-[#F68722]">WEBGL 3D DEPTH</span>
          <span className="text-white/60">•</span>
          <span className="text-white/80">SPATIAL PARALLAX</span>
        </div>

        {/* BOTTOM HUD PILL: Interactive Prompt */}
        <div className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-2 bg-[#0E0E10]/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono-specs text-white/90 shadow-lg pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          <Compass className="w-3.5 h-3.5 text-[#F68722] animate-spin" style={{ animationDuration: '8s' }} />
          <span>MOVE CURSOR / SCROLL TO ROTATE DEPTH</span>
        </div>

        {/* WEBGL CANVAS (True 3D Raymarched Depth Map) */}
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-cover rounded-2xl transition-opacity duration-700 ${
            webglLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Fallback Static Image (Shown instantly while WebGL textures initialize) */}
        {!webglLoaded && (
          <img
            src="/assets/brochure-asset-21.png"
            alt="Sameer Commercial Trailer — Engineered Heavy Transport"
            className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-contain rounded-2xl"
          />
        )}
      </div>
    </div>
  );
};
