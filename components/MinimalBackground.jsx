'use client';

import React, { useEffect, useRef } from 'react';

export default function MinimalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();
    let time = 0;

    const render = (now) => {
      // 30 FPS throttling for zero GPU load
      if (now - lastTime < 32) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastTime = now;
      time += 0.012;

      ctx.clearRect(0, 0, width, height);

      // Base Dark Obsidian Fill
      ctx.fillStyle = '#0b0b0d';
      ctx.fillRect(0, 0, width, height);

      // Top Ambient Copper Flare
      const topGlow = ctx.createRadialGradient(width / 2, 0, 0, width / 2, 0, height * 0.65);
      topGlow.addColorStop(0, 'rgba(212, 163, 115, 0.16)');
      topGlow.addColorStop(0.6, 'rgba(212, 163, 115, 0.03)');
      topGlow.addColorStop(1, 'rgba(11, 11, 13, 0)');
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, width, height);

      // LIQUID COPPER MESH WAVES (NO GRID LINES)
      const waveLayers = 3;
      for (let l = 0; l < waveLayers; l++) {
        ctx.beginPath();
        ctx.moveTo(0, height);

        const layerOffset = l * 0.8;
        const amplitude = 55 - l * 10;
        const frequency = 0.003 - l * 0.0005;

        for (let x = 0; x <= width; x += 15) {
          const y =
            height * 0.55 +
            Math.sin(x * frequency + time + layerOffset) * amplitude +
            Math.cos(x * 0.001 + time * 0.6) * 30;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Wave Fill Gradient
        const waveGrad = ctx.createLinearGradient(0, height * 0.4, 0, height);
        waveGrad.addColorStop(0, `rgba(212, 163, 115, ${0.14 - l * 0.03})`);
        waveGrad.addColorStop(0.5, `rgba(168, 145, 130, ${0.05 - l * 0.01})`);
        waveGrad.addColorStop(1, 'rgba(11, 11, 13, 0)');

        ctx.fillStyle = waveGrad;
        ctx.fill();

        ctx.strokeStyle = `rgba(212, 163, 115, ${0.28 - l * 0.06})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Tactile Film Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
