import { useState, useEffect, useRef, useCallback } from 'react';
import { sound } from '../utils/audio';
 
const TOTAL_FRAMES = 120;
const LERP_FACTOR = 0.085; // Silky smooth damping

export function useSmoothScroll() {
  const [scrollProgress, setScrollProgress] = useState(0); // 0.0 to 1.0
  const [currentFrame, setCurrentFrame] = useState(1);
  const [velocity, setVelocity] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastFrameRef = useRef(1);
  const isInteractingRef = useRef(false);

  // Update target progress from window scroll
  const handleScroll = useCallback(() => {
    if (isInteractingRef.current) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const currentScrollY = window.scrollY || window.pageYOffset;
    const progress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);
    targetProgressRef.current = progress;
  }, []);

  // Programmatic scroll to fraction (0 to 1)
  const scrollToFraction = useCallback((fraction: number, smooth = true) => {
    const clamped = Math.min(Math.max(fraction, 0), 1);
    targetProgressRef.current = clamped;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = clamped * maxScroll;

    if (!smooth) {
      currentProgressRef.current = clamped;
      setScrollProgress(clamped);
      window.scrollTo(0, targetY);
    } else {
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }
  }, []);

  // Scrub timeline directly (for timeline slider interaction)
  const setScrubProgress = useCallback((fraction: number) => {
    isInteractingRef.current = true;
    const clamped = Math.min(Math.max(fraction, 0), 1);
    targetProgressRef.current = clamped;
    currentProgressRef.current = clamped;
    setScrollProgress(clamped);

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, clamped * maxScroll);

    setTimeout(() => {
      isInteractingRef.current = false;
    }, 50);
  }, []);

  // Scroll to specific frame (1 to 120)
  const scrollToFrame = useCallback((frameNum: number) => {
    const fraction = (frameNum - 1) / (TOTAL_FRAMES - 1);
    scrollToFraction(fraction, true);
  }, [scrollToFraction]);

  // Main 60fps lerp loop
  useEffect(() => {
    let lastTime = performance.now();
    let scrollTimeout: NodeJS.Timeout;

    const loop = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Spring / Lerp interpolation
      const diff = targetProgressRef.current - currentProgressRef.current;
      const currentVel = Math.abs(diff);

      // Adaptive lerp factor based on delta time
      const lerp = 1.0 - Math.pow(1.0 - LERP_FACTOR, dt * 60);
      currentProgressRef.current += diff * lerp;

      // Snap if close
      if (Math.abs(diff) < 0.0001) {
        currentProgressRef.current = targetProgressRef.current;
      }

      const p = currentProgressRef.current;
      setScrollProgress(p);
      setVelocity(currentVel);

      // Calculate corresponding frame (1 to 120)
      const frameFloat = p * (TOTAL_FRAMES - 1) + 1;
      const calculatedFrame = Math.min(Math.max(Math.round(frameFloat), 1), TOTAL_FRAMES);

      if (calculatedFrame !== lastFrameRef.current) {
        lastFrameRef.current = calculatedFrame;
        setCurrentFrame(calculatedFrame);
        // Play subtle mechanical audio click on frame transition
        sound.playFrameTick(0.8 + (calculatedFrame / TOTAL_FRAMES) * 0.5);
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    const onScroll = () => {
      handleScroll();
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial sync
    handleScroll();

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [handleScroll]);

  return {
    scrollProgress,
    currentFrame,
    velocity,
    isScrolling,
    scrollToFraction,
    setScrubProgress,
    scrollToFrame,
    totalFrames: TOTAL_FRAMES
  };
}
