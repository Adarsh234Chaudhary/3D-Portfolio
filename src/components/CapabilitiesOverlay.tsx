/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CAPABILITIES } from '../data/projects';
import { Capability } from '../types';

interface CapabilitiesOverlayProps {
  scrollProgress: number;
} 

export const CapabilitiesOverlay: React.FC<CapabilitiesOverlayProps> = ({ scrollProgress }) => {
  // Visible between 0.77 and 0.89 in deep space
  let opacity = 0;
  let translateY = 30;
  let pointerEvents = 'pointer-events-none';

  if (scrollProgress >= 0.77 && scrollProgress < 0.82) {
    const factor = (scrollProgress - 0.77) / (0.82 - 0.77);
    opacity = factor;
    translateY = 30 * (1 - factor);
    pointerEvents = 'pointer-events-auto';
  } else if (scrollProgress >= 0.82 && scrollProgress <= 0.86) {
    opacity = 1.0;
    translateY = 0;
    pointerEvents = 'pointer-events-auto';
  } else if (scrollProgress > 0.86 && scrollProgress <= 0.90) {
    const factor = (scrollProgress - 0.86) / (0.90 - 0.86);
    opacity = 1.0 - factor;
    translateY = -30 * factor;
  }

  if (opacity <= 0.001) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
      }}
      className={`fixed inset-0 z-20 flex flex-col justify-center items-center px-6 sm:px-12 max-w-6xl mx-auto ${pointerEvents} select-none font-['Space_Grotesk']`}
    >
      {/* Vertical Section Identifier (`04 — CAPABILITIES`) */}
      <div className="fixed left-6 sm:left-10 top-1/2 -translate-y-1/2 z-30 flex items-center -rotate-90 origin-left pointer-events-none">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-white/50 uppercase whitespace-nowrap">
          04 — CAPABILITIES
        </span>
      </div>

      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl mb-3">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-white/80 uppercase">
            DISCIPLINES &amp; ARCHITECTURE
          </span>
        </div>
        <h2 className="font-light text-2xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
          FULL-SPECTRUM <span className="font-medium">SPATIAL CRAFT</span>
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
        {CAPABILITIES.map((cap: Capability) => (
          <div
            key={cap.id}
            className="group p-6 sm:p-7 rounded-3xl bg-black/40 border border-white/[0.08] backdrop-blur-2xl shadow-2xl hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-white/50 tracking-wider">
                  {cap.index} // DOMAIN
                </span>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                  TIER 01
                </span>
              </div>
              <h3 className="font-medium text-lg sm:text-xl text-white tracking-tight mb-1">
                {cap.title}
              </h3>
              <p className="text-xs text-white/50 mb-3">
                {cap.tagline}
              </p>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-4">
                {cap.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
              {cap.tools.map((tool, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] text-[10px] sm:text-[11px] font-mono text-white/60 tracking-wider"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
