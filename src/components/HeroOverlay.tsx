/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Github, Linkedin, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';
import { sound } from '../utils/audio';
import { formatImageUrl, handleImageFallback } from '../utils/image';

interface HeroOverlayProps {
  scrollProgress: number;
  onExploreClick: () => void;
  onNavigate?: (fraction: number) => void;
  onOpenCV?: () => void;
}

export function HeroOverlay({ scrollProgress, onExploreClick, onNavigate, onOpenCV }: HeroOverlayProps) {
  // Hero is visible between 0.00 and 0.18
  let opacity = 1.0;
  let scale = 1.0;
  let translateY = 0;
  let pointerEvents = 'pointer-events-auto';

  if (scrollProgress < 0.06) {
    opacity = 1.0;
    scale = 1.0;
    translateY = 0;
  } else if (scrollProgress <= 0.18) {
    const factor = (scrollProgress - 0.06) / (0.18 - 0.06);
    opacity = Math.max(1.0 - factor * 1.2, 0);
    scale = 1.0 + factor * 0.08;
    translateY = -factor * 40;
  } else {
    opacity = 0;
    pointerEvents = 'pointer-events-none';
  }

  // Photo disk scroll-triggered emergence animation (emerges smoothly after scrolling begins)
  const diskThresholdStart = 0.005;
  const diskThresholdFull = 0.055;
  let diskProgress = 0;
  if (scrollProgress >= diskThresholdStart) {
    diskProgress = Math.min((scrollProgress - diskThresholdStart) / (diskThresholdFull - diskThresholdStart), 1.0);
  }

  const diskOpacity = diskProgress;
  const diskScale = 0.7 + diskProgress * 0.3;
  const diskTranslateX = (1.0 - diskProgress) * 20;
  const diskTranslateY = (1.0 - diskProgress) * 15;

  const jumpPoints = [
    { label: '01 ABOUT', fraction: 0.22 },
    { label: '02 SKILLS', fraction: 0.36 },
    { label: '03 PROJECTS', fraction: 0.54 },
    { label: '04 AWARDS', fraction: 0.73 },
    { label: '05 EDUCATION', fraction: 0.85 },
    { label: '06 CONTACT', fraction: 0.96 }
  ];

  if (opacity <= 0.001) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        transition: 'opacity 0.08s ease-out, transform 0.08s ease-out'
      }}
      className={`fixed inset-0 z-20 overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 ${pointerEvents} pointer-events-none select-none font-['Space_Grotesk']`}
    >
      {/* 1. Top Section Spacer */}
      <div className="pt-12 sm:pt-14" />

      {/* 2. Main Hero Content Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-8 lg:gap-12 xl:gap-16 pointer-events-auto my-auto pl-1 sm:pl-4">
        
        {/* Left Column: Headline, Bio & CSE Action Links */}
        <div className="flex-1 max-w-2xl text-left order-2 sm:order-1">
          {/* Eyebrow Label with Profile Indicator */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-4">
            <span className="w-5 sm:w-6 h-[1.5px] bg-[#f6c344]" />
            <span className="font-['Space_Grotesk'] text-[11px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.24em] uppercase text-white/90 font-medium">
              {PERSONAL_INFO.title}
            </span>
          </div>

          {/* Main Headline Name */}
          <h1 className="font-['Space_Grotesk'] font-light text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[-0.03em] text-white leading-[1.05] drop-shadow-2xl mb-2.5 sm:mb-5">
            Adarsh <br className="hidden sm:inline" />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
              Chaudhary
            </span>
          </h1>

          {/* Bio / Lede Paragraph */}
          <p className="font-['Space_Grotesk'] text-xs sm:text-sm md:text-base lg:text-lg text-white/80 font-light leading-relaxed max-w-xl mb-4 sm:mb-6 lg:mb-8 line-clamp-3 sm:line-clamp-none">
            {PERSONAL_INFO.bio}
          </p>

          {/* CSE Social & Profile Action Bar (GitHub, LinkedIn, CV) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/15 text-white text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all shadow-md group"
            >
              <Github className="w-3.5 h-3.5 text-[#f6c344] group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/15 text-white text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all shadow-md group"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#38bdf8] group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>

            <a
              href={PERSONAL_INFO.cvUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#f6c344]/20 to-[#f97316]/20 hover:from-[#f6c344]/30 hover:to-[#f97316]/30 border border-[#f6c344]/40 text-[#f6c344] text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all shadow-md cursor-pointer group"
            >
              <FileText className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>Resume / CV</span>
            </a>
          </div>
        </div>

        {/* Right Column (Desktop) / Top Avatar (Mobile): Floating Profile Avatar Disk - Emerges upon scrolling */}
        <div
          style={{
            opacity: diskOpacity,
            transform: `translate3d(${diskTranslateX}px, ${diskTranslateY}px, 0) scale(${diskScale})`,
            pointerEvents: diskProgress > 0.3 ? 'auto' : 'none',
            transition: 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="relative shrink-0 mx-auto sm:mx-0 self-center flex items-center justify-center order-1 sm:order-2 my-1 sm:my-0"
        >
          {/* Outer Orbital Rotating Glow Ring */}
          <div className="absolute -inset-3 sm:-inset-5 lg:-inset-8 rounded-full border border-white/20 border-dashed animate-[spin_24s_linear_infinite] pointer-events-none" />
          
          {/* Subtle Ambient Glow Aura */}
          <div className="absolute -inset-2.5 sm:-inset-4 lg:-inset-6 rounded-full bg-gradient-to-tr from-[#f6c344]/25 via-transparent to-[#38bdf8]/15 blur-lg pointer-events-none" />

          {/* Obsidian Glass Floating Disk Container */}
          <div className="relative w-28 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-92 xl:h-92 aspect-square rounded-full p-1.5 sm:p-2.5 lg:p-3 bg-gradient-to-b from-white/30 via-[#181a20]/90 to-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-[#090a0f] border border-white/20 shadow-inner">
              <img
                src={formatImageUrl(PERSONAL_INFO.avatarUrl)}
                alt={PERSONAL_INFO.name}
                onError={(e) => handleImageFallback(e)}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Floating Status Pill */}
          <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/90 border border-white/25 backdrop-blur-md whitespace-nowrap shadow-xl">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="font-['Space_Grotesk'] text-[9px] sm:text-[10px] tracking-wider uppercase text-white font-medium">
              ONLINE
            </span>
          </div>
        </div>

      </div>

      {/* 3. Bottom Controls */}
      <div className="flex items-center justify-between pointer-events-auto pb-4 sm:pb-6 border-t border-white/[0.05] pt-4 sm:pt-5">
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
            SCROLL TO EXPLORE PORTFOLIO
          </span>
        </button>

        {/* Bottom Right: 01 —— 06 */}
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-white/60 tracking-widest">
          <span className="text-white font-semibold">01</span>
          <span className="w-6 h-[1px] bg-white/30" />
          <span className="text-white/40">06</span>
        </div>
      </div>

      {/* 4. Right Vertical Indicator Rail */}
      <div className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 pointer-events-auto">
        {jumpPoints.map((pt) => {
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
                className="w-1.5 h-1.5 bg-white/25 rounded-full group-hover:bg-[#f6c344] group-hover:scale-150 transition-all duration-300"
              />

              {/* Tooltip on Hover */}
              <span className="absolute right-7 font-mono text-[10px] tracking-wider text-white/80 bg-black/90 border border-white/15 px-2 py-0.5 rounded backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                {pt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


