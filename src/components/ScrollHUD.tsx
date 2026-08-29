/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
 
import React from 'react';
import { ChevronLeft, ChevronRight, Activity, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface ScrollHUDProps {
  scrollProgress: number;
  currentFrame: number;
  totalFrames: number;
  fps: number;
  onScrub: (fraction: number) => void;
  onStepFrame: (delta: number) => void;
}

export const ScrollHUD: React.FC<ScrollHUDProps> = ({
  scrollProgress,
  currentFrame,
  totalFrames,
  fps,
  onScrub,
  onStepFrame
}) => {
  const percent = Math.round(scrollProgress * 100);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fraction = parseFloat(e.target.value);
    onScrub(fraction);
  };

  const jumpPoints = [
    { label: '01 HERO', fraction: 0.0 },
    { label: '02 ABOUT', fraction: 0.24 },
    { label: '03 WORK', fraction: 0.54 },
    { label: '04 CAP', fraction: 0.83 },
    { label: '05 CONTACT', fraction: 0.98 }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-5 pointer-events-none select-none font-['Space_Grotesk']">
      <div className="max-w-4xl mx-auto rounded-2xl sm:rounded-full bg-black/70 border border-white/[0.1] backdrop-blur-2xl px-4 py-2 sm:px-6 sm:py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_12px_36px_rgba(0,0,0,0.8)] pointer-events-auto">
        {/* Left Stats Indicator */}
        <div className="flex items-center gap-3 font-mono text-xs text-white/70 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f6c344] animate-pulse" />
            <span className="text-white font-medium tracking-wider">
              WARP {percent}%
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-white/50 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.05]">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>{fps} FPS</span>
          </div>
        </div>

        {/* Center Interactive Scrubber Bar */}
        <div className="flex-1 w-full sm:max-w-xs flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onStepFrame(-1);
            }}
            title="Step Back"
            className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="relative flex-1 flex items-center group">
            <input
              type="range"
              min="0"
              max="1"
              step="0.002"
              value={scrollProgress}
              onChange={handleSliderChange}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#f6c344] hover:bg-white/30 transition-all"
            />
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onStepFrame(1);
            }}
            title="Step Forward"
            className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Jump Bookmarks */}
        <div className="hidden md:flex items-center gap-1">
          {jumpPoints.map((pt) => {
            const isActive = Math.abs(scrollProgress - pt.fraction) < 0.12;
            return (
              <button
                key={pt.label}
                onClick={() => {
                  sound.playClick();
                  onScrub(pt.fraction);
                }}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04]'
                }`}
              >
                {pt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
