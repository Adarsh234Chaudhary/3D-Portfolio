/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { sound } from '../utils/audio';

interface HeroOverlayProps {
  scrollProgress: number;
  onExploreClick: () => void;
  onNavigate?: (fraction: number) => void;
  onMaterialStudyClick?: () => void;
}

export function HeroOverlay({ scrollProgress, onExploreClick, onNavigate }: HeroOverlayProps) {
  // Hero is visible between 0.00 and 0.16
  // As scrollProgress increases, elements scale slightly and fade out smoothly as knot zooms in
  let opacity = 1.0;
  let scale = 1.0;
  let translateY = 0;
  let pointerEvents = 'pointer-events-auto';

  if (scrollProgress < 0.06) {
    opacity = 1.0;
    scale = 1.0;
    translateY = 0;
  } else if (scrollProgress <= 0.16) {
    const factor = (scrollProgress - 0.06) / (0.16 - 0.06);
    opacity = Math.max(1.0 - factor * 1.2, 0);
    scale = 1.0 + factor * 0.08;
    translateY = -factor * 40;
  } else {
    opacity = 0;
    pointerEvents = 'pointer-events-none';
  }

  const jumpPoints = [
    { label: '01 HERO', fraction: 0.0 },
    { label: '02 ABOUT', fraction: 0.24 },
    { label: '03 WORK', fraction: 0.54 },
    { label: '04 CAPABILITIES', fraction: 0.83 },
    { label: '05 CONTACT', fraction: 0.98 }
  ];

  if (opacity <= 0.001) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        transition: 'opacity 0.08s ease-out, transform 0.08s ease-out'
      }}
      className={`fixed inset-0 z-20 flex flex-col justify-between p-6 sm:p-12 lg:p-16 ${pointerEvents} pointer-events-none select-none font-['Space_Grotesk']`}
    >
      {/* 1. Top Section Spacer */}
      <div className="pt-16 sm:pt-20" />

      {/* 2. Main Hero Content (Clean Left Alignment so 3D Obsidian Object is 100% Unobstructed) */}
      <div className="max-w-xl text-left pointer-events-auto my-auto pl-2 sm:pl-4">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <span className="w-6 h-[1.5px] bg-white/70" />
          <span className="font-['Space_Grotesk'] text-xs sm:text-sm tracking-[0.24em] uppercase text-white/80 font-medium">
            CREATIVE DIRECTOR &amp; DESIGNER
          </span>
        </div>

        {/* Main Headline Name */}
        <h1 className="font-['Space_Grotesk'] font-light text-5xl sm:text-7xl lg:text-8xl tracking-[-0.03em] text-white leading-[1.02] mb-6 sm:mb-8 drop-shadow-2xl">
          Adarsh <br />
          <span className="font-normal">Chaudhary</span>
        </h1>

        {/* Bio / Lede Paragraph */}
        <p className="font-['Space_Grotesk'] text-sm sm:text-base lg:text-lg text-white/70 font-light leading-relaxed max-w-md">
          Crafting digital experiences at the intersection of art, engineering, and obsessive attention to detail.
        </p>
      </div>

      {/* 3. Bottom Controls (Clean Minimalist Anchor) */}
      <div className="flex items-center justify-between pointer-events-auto pb-4 sm:pb-8 border-t border-white/[0.05] pt-6">
        {/* Bottom Left: — SCROLL TO EXPLORE */}
        <button
          onClick={() => {
            sound.playClick();
            onExploreClick();
          }}
          className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
        >
          <span className="w-5 h-[1.5px] bg-white/60 group-hover:w-8 transition-all duration-300" />
          <span className="font-['Space_Grotesk'] text-xs sm:text-sm tracking-[0.22em] uppercase text-white/80 group-hover:text-white font-medium transition-colors">
            SCROLL TO EXPLORE
          </span>
        </button>

        {/* Bottom Right: 01 —— 05 */}
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-white/60 tracking-widest">
          <span className="text-white font-semibold">01</span>
          <span className="w-6 h-[1px] bg-white/30" />
          <span className="text-white/40">05</span>
        </div>
      </div>

      {/* 4. Right Vertical 5-Dot Indicator Rail (Interactive Jump Points) */}
      <div className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3.5 pointer-events-auto">
        {jumpPoints.map((pt, index) => {
          const isActive = index === 0;
          return (
            <button
              key={pt.label}
              onClick={() => {
                sound.playClick();
                if (onNavigate) onNavigate(pt.fraction);
              }}
              title={pt.label}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
            >
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2 h-2 bg-[#f6c344] shadow-[0_0_12px_#f6c344]'
                    : 'w-1.5 h-1.5 bg-white/25 group-hover:bg-white/70 group-hover:scale-125'
                }`}
              />

              {/* Tooltip on Hover */}
              <span className="absolute right-7 font-mono text-[10px] tracking-wider text-white/70 bg-black/80 border border-white/10 px-2 py-0.5 rounded backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {pt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
