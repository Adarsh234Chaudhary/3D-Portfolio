import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ViewMode } from '../types';

interface CanvasScrubberProps {
  currentFrame: number;
  scrollProgress: number;
  viewMode: ViewMode;
  onFpsUpdate?: (fps: number) => void;
  onLoadedProgress?: (progress: number) => void;
}

const TOTAL_FRAMES = 120;

export const CanvasScrubber: React.FC<CanvasScrubberProps> = ({
  currentFrame,
  scrollProgress,
  viewMode,
  onFpsUpdate,
  onLoadedProgress
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // Mouse tilt parallax state
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  });

  // FPS tracking
  const fpsRef = useRef<{ frames: number; lastTime: number; fps: number }>({
    frames: 0,
    lastTime: performance.now(),
    fps: 60
  });

  // Preload images progressively
  useEffect(() => {
    let active = true;
    let loaded = 0;

    // Load essential priority frames first (e.g. frame 1, 30, 60, 90, 120), then all in parallel batches
    const loadFrame = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const frameNum = (index + 1).toString().padStart(3, '0');
        const img = new Image();
        img.src = `/animation-frames/frame_${frameNum}.jpg`;
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          if (!active) return;
          imagesRef.current[index] = img;
          loaded++;
          setLoadedCount(loaded);
          if (onLoadedProgress) {
            onLoadedProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
          }
          if (loaded >= 8 && !isReady) {
            setIsReady(true);
          }
          resolve(img);
        };

        img.onerror = () => {
          // If frame not ready on disk yet, resolve null gracefully
          resolve(img);
        };
      });
    };

    // Parallel load with concurrency limiter
    const queue = Array.from({ length: TOTAL_FRAMES }, (_, i) => i);
    const BATCH_SIZE = 8;

    async function loadAll() {
      for (let i = 0; i < queue.length; i += BATCH_SIZE) {
        if (!active) break;
        const batch = queue.slice(i, i + BATCH_SIZE).map((idx) => loadFrame(idx));
        await Promise.all(batch);
      }
      if (active) setIsReady(true);
    }

    loadAll();

    return () => {
      active = false;
    };
  }, [onLoadedProgress]);

  // Mouse Parallax listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const ny = (e.clientY / innerHeight - 0.5) * 2;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Main 60fps render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Update FPS counter
      const now = performance.now();
      fpsRef.current.frames++;
      if (now - fpsRef.current.lastTime >= 1000) {
        fpsRef.current.fps = Math.round((fpsRef.current.frames * 1000) / (now - fpsRef.current.lastTime));
        fpsRef.current.frames = 0;
        fpsRef.current.lastTime = now;
        if (onFpsUpdate) onFpsUpdate(fpsRef.current.fps);
      }

      // Handle Resize & HiDPI
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Background clear
      ctx.fillStyle = '#0b0b0b';
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // Sub-frame calculation for buttery smooth cross-fading
      const frameFloat = scrollProgress * (TOTAL_FRAMES - 1);
      const baseIndex = Math.min(Math.max(Math.floor(frameFloat), 0), TOTAL_FRAMES - 1);
      const nextIndex = Math.min(baseIndex + 1, TOTAL_FRAMES - 1);
      const subFraction = frameFloat - baseIndex;

      const img1 = imagesRef.current[baseIndex];
      const img2 = imagesRef.current[nextIndex];

      // Subtle dynamic parallax tilt offset
      const tiltX = mouseRef.current.x * 24;
      const tiltY = mouseRef.current.y * 24;

      // Draw active image frame centered with scale
      const drawImageCover = (img: HTMLImageElement, alpha: number) => {
        if (!img || !img.complete || img.naturalWidth === 0) return false;

        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;

        // Maintain aspect ratio with responsive scaling
        const targetScale = Math.min(displayWidth * 0.85, displayHeight * 0.85);
        const w = targetScale;
        const h = targetScale * (imgHeight / imgWidth);

        const x = (displayWidth - w) / 2 + tiltX;
        const y = (displayHeight - h) / 2 + tiltY;

        ctx.globalAlpha = alpha;

        if (viewMode === 'wireframe') {
          // Wireframe / High-contrast scanline filter
          ctx.filter = 'invert(1) contrast(180%) hue-rotate(180deg)';
        } else {
          ctx.filter = 'none';
        }

        ctx.drawImage(img, x, y, w, h);
        ctx.globalAlpha = 1.0;
        return true;
      };

      let rendered = false;
      if (img1 && img1.complete) {
        drawImageCover(img1, 1.0);
        rendered = true;

        if (subFraction > 0.05 && img2 && img2.complete) {
          drawImageCover(img2, subFraction);
        }
      }

      // If image sequence is still buffering or unavailable, render high-end fallback procedural 3D wire sculpture
      if (!rendered) {
        const cx = displayWidth / 2 + tiltX;
        const cy = displayHeight / 2 + tiltY;
        const t = scrollProgress * Math.PI * 2;
        const radius = Math.min(displayWidth, displayHeight) * 0.24;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1.5;

        // Procedural kinetic sculpture rings
        for (let i = 0; i < 18; i++) {
          const angle = (i / 18) * Math.PI + t;
          ctx.beginPath();
          ctx.ellipse(
            cx,
            cy,
            radius * Math.abs(Math.sin(angle)),
            radius * Math.cos(angle * 0.5),
            angle + mouseRef.current.x * 0.2,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }

        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`BUFFERING SPATIAL FRAMES (${Math.round((loadedCount / TOTAL_FRAMES) * 100)}%)`, cx, cy + radius + 40);
      }

      // Draw subtle ambient vignette
      const grad = ctx.createRadialGradient(
        displayWidth / 2,
        displayHeight / 2,
        Math.min(displayWidth, displayHeight) * 0.2,
        displayWidth / 2,
        displayHeight / 2,
        Math.max(displayWidth, displayHeight) * 0.8
      );
      grad.addColorStop(0, 'rgba(11, 11, 11, 0)');
      grad.addColorStop(0.7, 'rgba(11, 11, 11, 0.4)');
      grad.addColorStop(1, 'rgba(11, 11, 11, 0.95)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // Fine film grain simulation
      if (Math.random() > 0.3) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
        for (let g = 0; g < 400; g++) {
          const gx = Math.random() * displayWidth;
          const gy = Math.random() * displayHeight;
          ctx.fillRect(gx, gy, 1, 1);
        }
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress, viewMode, loadedCount, onFpsUpdate]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};
