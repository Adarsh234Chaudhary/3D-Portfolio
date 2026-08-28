/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { ViewMode } from '../types';
import { sound } from '../utils/audio';

interface NavigationProps {
  scrollProgress: number;
  currentFrame: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onNavigate: (fraction: number) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  scrollProgress,
  viewMode,
  onViewModeChange,
  onNavigate
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleSoundToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const handleFullscreenToggle = () => {
    sound.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Determine which section is currently active
  const isAbout = scrollProgress >= 0.16 && scrollProgress < 0.40;
  const isWork = scrollProgress >= 0.40 && scrollProgress < 0.85;
  const isContact = scrollProgress >= 0.85;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 sm:px-12 sm:py-7 flex items-center justify-between pointer-events-auto select-none font-['Space_Grotesk']">
      {/* 1. Brand Logo: AC (Matching Image) */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => {
            sound.playClick();
            onNavigate(0);
          }}
          className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
        >
          <span className="font-['Space_Grotesk'] font-bold text-base sm:text-lg tracking-[0.18em] text-white group-hover:text-[#f6c344] transition-colors">
            AC
          </span>
        </button>
      </div>

      {/* 2. Center Indicator Badge: Golden Dot with Concentric Ring (Matching Image) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-5 sm:top-7 flex items-center justify-center pointer-events-auto">
        <button
          onClick={() => {
            sound.playClick();
            onNavigate(0.24);
          }}
          title="Scroll or Click to Explore Cosmic Shatter"
          className="relative w-8 h-8 rounded-full border border-white/20 hover:border-white/50 flex items-center justify-center group transition-all cursor-pointer backdrop-blur-md bg-white/[0.02]"
        >
          <span className="w-2 h-2 rounded-full bg-[#f6c344] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_12px_#f6c344]" />
        </button>
      </div>

      {/* 3. Top-Right Navigation: WORK, ABOUT, CONTACT (Matching Image) */}
      <div className="flex items-center gap-6 sm:gap-8">
        <nav className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-['Space_Grotesk'] tracking-[0.2em] uppercase font-medium">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate(0.52);
            }}
            className={`transition-colors cursor-pointer ${
              isWork ? 'text-white font-semibold' : 'text-white/60 hover:text-white'
            }`}
          >
            WORK
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate(0.24);
            }}
            className={`transition-colors cursor-pointer ${
              isAbout ? 'text-white font-semibold' : 'text-white/60 hover:text-white'
            }`}
          >
            ABOUT
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate(0.96);
            }}
            className={`transition-colors cursor-pointer ${
              isContact ? 'text-[#f6c344] font-semibold' : 'text-white/60 hover:text-white'
            }`}
          >
            CONTACT
          </button>
        </nav>

        {/* Audio Toggle & Fullscreen */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <button
            onClick={handleSoundToggle}
            title={isMuted ? 'Unmute Synthesized Feedback' : 'Mute Synthesized Feedback'}
            className="p-1.5 rounded-full text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleFullscreenToggle}
            title="Toggle Fullscreen"
            className="hidden sm:inline-block p-1.5 rounded-full text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
