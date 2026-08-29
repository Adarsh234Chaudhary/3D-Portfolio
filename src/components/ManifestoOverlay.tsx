/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Layers, Cpu, Code2, ArrowRight } from 'lucide-react';
import { ABOUT_DATA, PERSONAL_INFO } from '../data/portfolio';

interface ManifestoOverlayProps {
  scrollProgress: number;
}

export const ManifestoOverlay: React.FC<ManifestoOverlayProps> = ({ scrollProgress }) => {
  // Visible in the deep cosmic starfield phase: between 0.15 and 0.28
  let opacity = 0;
  let translateY = 35;
  let pointerEvents = 'pointer-events-none';

  if (scrollProgress >= 0.15 && scrollProgress < 0.20) {
    const factor = (scrollProgress - 0.15) / (0.20 - 0.15);
    opacity = factor;
    translateY = 35 * (1 - factor);
    pointerEvents = 'pointer-events-auto';
  } else if (scrollProgress >= 0.20 && scrollProgress <= 0.25) {
    opacity = 1.0;
    translateY = 0;
    pointerEvents = 'pointer-events-auto';
  } else if (scrollProgress > 0.25 && scrollProgress <= 0.29) {
    const factor = (scrollProgress - 0.25) / (0.29 - 0.25);
    opacity = 1.0 - factor;
    translateY = -35 * factor;
  }

  if (opacity <= 0.001) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
      }}
      className={`fixed inset-0 z-20 overflow-hidden py-16 px-6 sm:px-12 max-w-6xl mx-auto flex flex-col justify-center items-center ${pointerEvents} select-none font-['Space_Grotesk']`}
    >
      {/* Vertical Section Identifier */}
      <div className="fixed left-6 sm:left-10 top-1/2 -translate-y-1/2 z-30 flex items-center -rotate-90 origin-left pointer-events-none">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-white/50 uppercase whitespace-nowrap">
          01 — ABOUT
        </span>
      </div>

      {/* Main Header & Philosophy */}
      <div className="text-center mb-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#f6c344] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] text-white/80 uppercase">
            {ABOUT_DATA.tagline}
          </span>
        </div>

        <h2 className="font-['Space_Grotesk'] font-light text-2xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-[1.05] mb-3">
          {ABOUT_DATA.headline} <br />
          <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#f6c344] via-white to-[#38bdf8]">
            {ABOUT_DATA.headlineAccent}
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-xl mx-auto">
          {ABOUT_DATA.intro}
        </p>
      </div>

      {/* 3 Floating Liquid-Glass Architecture Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl mb-6">
        {ABOUT_DATA.pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="group relative p-5 sm:p-6 rounded-2xl bg-black/50 border border-white/[0.08] hover:border-white/25 backdrop-blur-2xl shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-white/40 tracking-wider">
                  {pillar.number} // PILLAR
                </span>
                <div
                  style={{ color: pillar.accent }}
                  className="w-7 h-7 rounded-full bg-white/[0.05] flex items-center justify-center"
                >
                  {idx === 0 ? <Code2 className="w-3.5 h-3.5" /> : idx === 1 ? <Layers className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5" />}
                </div>
              </div>
              <h3 className="font-medium text-base sm:text-lg text-white mb-2 tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-4xl">
        {ABOUT_DATA.stats.map((stat, sIdx) => (
          <div
            key={sIdx}
            className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-center"
          >
            <div className="font-mono font-bold text-xs sm:text-sm text-white text-transparent bg-clip-text bg-gradient-to-r from-white to-[#f6c344]">
              {stat.value}
            </div>
            <div className="font-mono text-[10px] text-white/50 tracking-wider uppercase mt-0.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

