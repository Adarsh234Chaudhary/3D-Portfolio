/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { sound } from '../utils/audio';

interface CaseStudiesOverlayProps {
  scrollProgress: number;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onJumpToProject: (targetFrame: number) => void;
}

export const CaseStudiesOverlay: React.FC<CaseStudiesOverlayProps> = ({
  scrollProgress,
  projects,
  onSelectProject,
  onJumpToProject
}) => {
  // Case Studies span 0.35 to 0.78
  if (scrollProgress < 0.33 || scrollProgress > 0.80) {
    return null;
  }

  // Range is 0.35 to 0.78 (span of 0.43)
  const rangeStart = 0.35;
  const rangeEnd = 0.78;
  const normalized = Math.min(Math.max((scrollProgress - rangeStart) / (rangeEnd - rangeStart), 0), 0.999);
  const activeIndex = Math.min(Math.floor(normalized * projects.length), projects.length - 1);
  const currentProject = projects[activeIndex];

  const stepSize = 1 / projects.length;
  const stepProgress = (normalized % stepSize) / stepSize;
  
  let itemOpacity = 1.0;
  let itemTranslateX = 0;

  if (stepProgress < 0.12) {
    const f = stepProgress / 0.12;
    itemOpacity = f;
    itemTranslateX = 20 * (1 - f);
  } else if (stepProgress > 0.88) {
    const f = (stepProgress - 0.88) / 0.12;
    itemOpacity = 1 - f;
    itemTranslateX = -20 * f;
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-between p-6 sm:p-12 lg:p-16 pointer-events-none select-none font-['Space_Grotesk']">
      {/* Vertical Section Identifier (Matching Image 2 style: `03 — WORK`) */}
      <div className="fixed left-6 sm:left-10 top-1/2 -translate-y-1/2 z-30 flex items-center -rotate-90 origin-left pointer-events-none">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-white/50 uppercase whitespace-nowrap">
          03 — WORK
        </span>
      </div>

      {/* Main Glass Case Study Card Floating in Starfield */}
      <div
        style={{
          opacity: itemOpacity,
          transform: `translate3d(${itemTranslateX}px, 0, 0)`,
          transition: 'opacity 0.08s ease-out, transform 0.08s ease-out'
        }}
        className="w-full max-w-xl lg:max-w-2xl pointer-events-auto pl-4 sm:pl-8"
      >
        <div className="p-6 sm:p-8 rounded-3xl bg-black/50 border border-white/[0.1] backdrop-blur-2xl shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8)] hover:border-white/20 transition-all duration-300">
          {/* Metadata Header */}
          <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/[0.08] mb-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-white tracking-widest px-2.5 py-0.5 rounded bg-white/10">
                PROJ {currentProject.number}
              </span>
              <span className="font-mono text-[11px] text-white/50 uppercase tracking-wider">
                {currentProject.category}
              </span>
            </div>
            <span className="font-mono text-xs text-white/40">
              {currentProject.year}
            </span>
          </div>

          {/* Title & Subtitle */}
          <div className="mb-4">
            <h2 className="font-['Space_Grotesk'] font-medium text-2xl sm:text-4xl text-white tracking-tight uppercase leading-tight mb-2">
              {currentProject.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-light">
              {currentProject.subtitle}
            </p>
          </div>

          {/* Summary Text */}
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light mb-6">
            {currentProject.summary}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-3 rounded-2xl bg-black/60 border border-white/[0.06] mb-6">
            {currentProject.metrics.map((m, idx) => (
              <div key={idx} className="p-2">
                <div className="font-mono text-[9px] sm:text-[10px] text-white/40 uppercase tracking-wider truncate">
                  {m.label}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-0.5 truncate">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() => {
                sound.playClick(true);
                onSelectProject(currentProject);
              }}
              className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white text-black font-medium text-xs tracking-wider uppercase hover:bg-white/90 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer"
            >
              <span>Inspect Case Study</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <span className="hidden sm:inline-block font-mono text-[11px] text-white/40">
              CLIENT: {currentProject.client.split(' ')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Right Floating Project Index Switcher */}
      <div className="hidden lg:flex flex-col gap-3 pointer-events-auto pr-2">
        <div className="p-3 rounded-2xl bg-black/50 border border-white/[0.08] backdrop-blur-xl flex flex-col gap-2">
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest px-2 pb-1 border-b border-white/[0.05]">
            CONSTELLATION // 01-04
          </span>
          {projects.map((proj, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  sound.playClick();
                  onJumpToProject(proj.frameTarget);
                }}
                className={`flex items-center justify-between gap-4 px-3 py-2 rounded-xl text-xs font-mono tracking-wider transition-all text-left cursor-pointer ${
                  isCurrent
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span>{proj.number} {proj.title.split(' ')[0]}</span>
                <span className="text-[10px] opacity-60">{proj.year}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
