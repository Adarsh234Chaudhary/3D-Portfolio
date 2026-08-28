/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Layers, Cpu, Compass, Sliders, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

interface ManifestoOverlayProps {
  scrollProgress: number;
}

export const ManifestoOverlay: React.FC<ManifestoOverlayProps> = ({ scrollProgress }) => {
  // Visible in the deep cosmic starfield phase: between 0.16 and 0.38
  let opacity = 0;
  let translateY = 40;
  let pointerEvents = 'pointer-events-none';

  if (scrollProgress >= 0.16 && scrollProgress < 0.22) {
    const factor = (scrollProgress - 0.16) / (0.22 - 0.16);
    opacity = factor;
    translateY = 40 * (1 - factor);
    pointerEvents = 'pointer-events-auto';
  } else if (scrollProgress >= 0.22 && scrollProgress <= 0.32) {
    opacity = 1.0;
    translateY = 0;
    pointerEvents = 'pointer-events-auto';
  } else if (scrollProgress > 0.32 && scrollProgress <= 0.38) {
    const factor = (scrollProgress - 0.32) / (0.38 - 0.32);
    opacity = 1.0 - factor;
    translateY = -40 * factor;
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
      {/* Vertical Section Identifier (Matching Image 2 Left Margin: `02 — ABOUT`) */}
      <div className="fixed left-6 sm:left-10 top-1/2 -translate-y-1/2 z-30 flex items-center -rotate-90 origin-left pointer-events-none">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-white/50 uppercase whitespace-nowrap">
          02 — ABOUT
        </span>
      </div>

      {/* Main About & Philosophy Content Floating in the Starfield */}
      <div className="text-center mb-8 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#f6c344] animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.24em] text-white/80 uppercase">
            SHATTERED INTO THE COSMOS
          </span>
        </div>

        <h2 className="font-['Space_Grotesk'] font-light text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.05] mb-4">
          CRAFTING SYSTEMS <br />
          <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#f6c344] via-white to-[#38bdf8]">
            FROM THE ATOM TO ORBIT
          </span>
        </h2>

        <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xl mx-auto">
          When physical form gives way to pure computation, every pixel becomes a star in a larger choreography of light, mathematics, and kinetic emotion.
        </p>
      </div>

      {/* 3 Floating Liquid-Glass Cards with Starfield Reflections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
        {/* Card 01 */}
        <div className="group relative p-6 sm:p-7 rounded-2xl bg-black/40 border border-white/[0.08] hover:border-white/20 backdrop-blur-xl shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-white/40 tracking-wider">01 // DIRECTION</span>
            <div className="w-7 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-[#f6c344]">
              <Compass className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="font-medium text-lg text-white mb-2 tracking-tight">
            Creative Direction
          </h3>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
            Guiding high-stakes digital identity, spatial design systems, and cinematic digital products for vanguard teams across Silicon Valley and Tokyo.
          </p>
        </div>

        {/* Card 02 */}
        <div className="group relative p-6 sm:p-7 rounded-2xl bg-black/40 border border-white/[0.08] hover:border-white/20 backdrop-blur-xl shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-white/40 tracking-wider">02 // WEBGL & 3D</span>
            <div className="w-7 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-[#38bdf8]">
              <Cpu className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="font-medium text-lg text-white mb-2 tracking-tight">
            Computational Shaders
          </h3>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
            Sculpting real-time GPU particle systems, physical tone mapping, and custom WebGL shaders running at an uncompromising 60+ FPS.
          </p>
        </div>

        {/* Card 03 */}
        <div className="group relative p-6 sm:p-7 rounded-2xl bg-black/40 border border-white/[0.08] hover:border-white/20 backdrop-blur-xl shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-white/40 tracking-wider">03 // ENGINEERING</span>
            <div className="w-7 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-emerald-400">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="font-medium text-lg text-white mb-2 tracking-tight">
            Obsessive Precision
          </h3>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
            Merging Swiss typographic rigor with dynamic reactive physics. Every interaction curve is calibrated to cognitive momentum.
          </p>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="mt-8 flex items-center gap-3 font-mono text-[11px] text-white/40 tracking-widest uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#f6c344] animate-ping" />
        <span>CONTINUE SCROLLING TO TRAVEL DEEPER INTO SELECTED WORKS</span>
      </div>
    </div>
  );
};
