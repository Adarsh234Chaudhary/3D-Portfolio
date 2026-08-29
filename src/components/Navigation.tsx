/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, FileText, Menu, X, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';
import { ViewMode } from '../types';
import { sound } from '../utils/audio';

interface NavigationProps {
  scrollProgress: number;
  currentFrame: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onNavigate: (fraction: number) => void;
  onOpenCV?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  scrollProgress,
  onNavigate
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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

  const handleOpenCVDirectly = () => {
    sound.playClick(true);
    window.open(PERSONAL_INFO.cvUrl, '_blank', 'noopener,noreferrer');
  };

  // Determine which section is currently active
  const isAbout = scrollProgress >= 0.15 && scrollProgress < 0.28;
  const isSkills = scrollProgress >= 0.28 && scrollProgress < 0.44;
  const isProjects = scrollProgress >= 0.44 && scrollProgress < 0.65;
  const isAchievements = scrollProgress >= 0.65 && scrollProgress < 0.79;
  const isEducation = scrollProgress >= 0.79 && scrollProgress < 0.91;
  const isContact = scrollProgress >= 0.91;

  const navItems = [
    { label: 'ABOUT', fraction: 0.22, active: isAbout },
    { label: 'SKILLS', fraction: 0.36, active: isSkills },
    { label: 'PROJECTS', fraction: 0.54, active: isProjects },
    { label: 'ACHIEVEMENTS', fraction: 0.73, active: isAchievements },
    { label: 'EDUCATION', fraction: 0.85, active: isEducation },
    { label: 'CONTACT', fraction: 0.96, active: isContact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 py-4 sm:py-5 flex items-center justify-between pointer-events-auto select-none font-['Space_Grotesk'] backdrop-blur-md bg-black/30 border-b border-white/[0.05]">
      {/* 1. Brand Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            sound.playClick();
            onNavigate(0);
          }}
          className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
        >
          <span className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center font-bold text-sm tracking-widest text-white group-hover:border-[#f6c344] group-hover:text-[#f6c344] transition-all">
            AC
          </span>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-xs tracking-wider text-white">
              ADARSH CHAUDHARY
            </span>
            <span className="font-mono text-[9px] text-white/50 tracking-widest uppercase">
              CSE PORTFOLIO
            </span>
          </div>
        </button>
      </div>

      {/* 2. Desktop Navigation Series */}
      <nav className="hidden xl:flex items-center gap-6 lg:gap-7 text-xs font-mono tracking-[0.18em] uppercase font-medium">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              sound.playClick();
              onNavigate(item.fraction);
            }}
            className={`transition-all py-1 cursor-pointer relative ${
              item.active
                ? 'text-[#f6c344] font-bold drop-shadow-[0_0_8px_rgba(246,195,68,0.5)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {item.label}
            {item.active && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#f6c344] rounded-full shadow-[0_0_8px_#f6c344]" />
            )}
          </button>
        ))}
      </nav>

      {/* 3. Right Actions: CV Button + Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* CV / Resume Action Button */}
        <button
          onClick={handleOpenCVDirectly}
          title="Open Curriculum Vitae (CV) in New Tab"
          className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-[#f6c344] to-[#f97316] text-black font-semibold text-xs font-mono tracking-wider uppercase hover:opacity-90 active:scale-95 transition-all shadow-[0_0_16px_rgba(246,195,68,0.3)] cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>CV</span>
        </button>

        {/* Audio Toggle & Fullscreen */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
          <button
            onClick={handleSoundToggle}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2 rounded-full text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleFullscreenToggle}
            title="Toggle Fullscreen"
            className="hidden sm:inline-block p-2 rounded-full text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-full bg-white/[0.06] text-white/80 hover:text-white transition-colors cursor-pointer"
          title="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[60px] bg-black/95 border-b border-white/15 p-6 backdrop-blur-2xl flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  sound.playClick();
                  onNavigate(item.fraction);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl font-mono text-xs tracking-wider text-left transition-all ${
                  item.active
                    ? 'bg-[#f6c344] text-black font-bold'
                    : 'bg-white/[0.04] text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleOpenCVDirectly();
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f6c344] to-[#f97316] text-black font-semibold font-mono text-xs tracking-wider flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>OPEN RESUME (CV) IN NEW TAB</span>
          </button>
        </div>
      )}
    </header>
  );
};

