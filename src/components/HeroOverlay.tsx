/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Github, Linkedin, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';
import { sound } from '../utils/audio';

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

  // Circular photo disk appears smoothly on scroll
  const diskThresholdStart = 0.005;
  const diskThresholdFull = 0.035;
  let diskProgress = 0;
  if (scrollProgress >= diskThresholdStart) {
    diskProgress = Math.min((scrollProgress - diskThresholdStart) / (diskThresholdFull - diskThresholdStart), 1.0);
  }

  const diskOpacity = diskProgress;
  const diskScale = 0.85 + diskProgress * 0.15;
  const diskTranslateX = (1.0 - diskProgress) * 15;

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
      className={`fixed inset-0 z-20 overflow-y-auto flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 ${pointerEvents} pointer-events-none select-none font-['Space_Grotesk']`}
    >
      {/* 1. Top Section Spacer */}
      <div className="pt-14 sm:pt-16" />

      {/* 2. Main Hero Content Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12 xl:gap-16 pointer-events-auto my-auto pl-2 sm:pl-4">
        
        {/* Left Column: Headline, Bio & CSE Action Links */}
        <div className="flex-1 max-w-2xl text-left">
          {/* Eyebrow Label */}
          <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
            <span className="w-6 h-[1.5px] bg-[#f6c344]" />
            <span className="font-['Space_Grotesk'] text-xs sm:text-sm tracking-[0.24em] uppercase text-white/90 font-medium">
              {PERSONAL_INFO.title}
            </span>
          </div>

          {/* Main Headline Name */}
          <h1 className="font-['Space_Grotesk'] font-light text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl tracking-[-0.03em] text-white leading-[1.02] drop-shadow-2xl mb-4 sm:mb-5">
            Adarsh <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
              Chaudhary
            </span>
          </h1>

          {/* Bio / Lede Paragraph */}
          <p className="font-['Space_Grotesk'] text-sm sm:text-base lg:text-lg text-white/80 font-light leading-relaxed max-w-xl mb-6 sm:mb-8">
            {PERSONAL_INFO.bio}
          </p>

          {/* CSE Social & Profile Action Bar (GitHub, LinkedIn, CV) */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/15 text-white text-xs font-mono tracking-wider uppercase transition-all shadow-md group"
            >
              <Github className="w-3.5 h-3.5 text-[#f6c344] group-hover:scale-110 transition-transform" />
              <span>GitHub Profile</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/15 text-white text-xs font-mono tracking-wider uppercase transition-all shadow-md group"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#38bdf8] group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>

            <a
              href={PERSONAL_INFO.cvUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(true)}
              className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#f6c344]/20 to-[#f97316]/20 hover:from-[#f6c344]/30 hover:to-[#f97316]/30 border border-[#f6c344]/40 text-[#f6c344] text-xs font-mono tracking-wider uppercase transition-all shadow-md cursor-pointer group"
            >
              <FileText className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>Resume / CV</span>
            </a>
          </div>
        </div>

        {/* Right Column (Desktop) & Center Scroll-In (Mobile): Circular Floating Portrait Disk */}
        <div
          style={{
            opacity: diskOpacity,
            transform: `translate3d(${diskTranslateX}px, 0, 0) scale(${diskScale})`,
            pointerEvents: diskProgress > 0.2 ? 'auto' : 'none',
            transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="relative shrink-0 mx-auto lg:mx-0 self-center flex items-center justify-center mt-6 lg:mt-0"
        >
          {/* Outer Orbital Rotating Glow Ring (Scaled to Large Disk) */}
          <div className="absolute -inset-4 sm:-inset-6 lg:-inset-10 rounded-full border border-white/20 border-dashed animate-[spin_24s_linear_infinite] pointer-events-none" />
          
          {/* Subtle Ambient Glow Aura */}
          <div className="absolute -inset-3 sm:-inset-5 lg:-inset-8 rounded-full bg-gradient-to-tr from-[#f6c344]/30 via-transparent to-[#38bdf8]/20 blur-xl pointer-events-none" />

          {/* Obsidian Glass Floating Disk Container - Responsive Window & Mobile Scaling */}
          <div className="relative w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-[360px] lg:h-[360px] xl:w-[420px] xl:h-[420px] 2xl:w-[470px] 2xl:h-[470px] aspect-square rounded-full p-2 sm:p-2.5 lg:p-3 bg-gradient-to-b from-white/35 via-[#181a20]/90 to-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-[#090a0f] border border-white/20 shadow-inner">
              <img
                src={PERSONAL_INFO.avatarUrl}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Glass Specular Reflection Crescent */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Floating Status Pill Indicator */}
          <div className="absolute -bottom-2.5 sm:-bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/90 border border-white/25 backdrop-blur-md whitespace-nowrap shadow-2xl">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_12px_#10b981]" />
            <span className="font-['Space_Grotesk'] text-[10px] sm:text-xs tracking-wider uppercase text-white font-medium">
              ONLINE
            </span>
          </div>
        </div>

      </div>

      {/* 3. Bottom Controls */}
      <div className="flex items-center justify-between pointer-events-auto pb-4 sm:pb-6 border-t border-white/[0.05] pt-5 sm:pt-6">
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


