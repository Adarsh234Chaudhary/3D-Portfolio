import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/portfolio';
import { Code2, Layers, Cpu, Sliders, CheckCircle2, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface SkillsOverlayProps {
  scrollProgress: number;
}

export const SkillsOverlay: React.FC<SkillsOverlayProps> = ({ scrollProgress }) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  // Visible between 0.28 and 0.44
  let opacity = 0;
  let translateY = 35;
  let pointerEvents = 'pointer-events-none';

  if (scrollProgress >= 0.28 && scrollProgress < 0.33) {
    const factor = (scrollProgress - 0.28) / (0.33 - 0.28);
    opacity = factor;
    translateY = 35 * (1 - factor);
    pointerEvents = 'pointer-events-auto';
  } else if (scrollProgress >= 0.33 && scrollProgress <= 0.40) {
    opacity = 1.0;
    translateY = 0;
    pointerEvents = 'pointer-events-auto';
  } else if (scrollProgress > 0.40 && scrollProgress <= 0.45) {
    const factor = (scrollProgress - 0.40) / (0.45 - 0.40);
    opacity = 1.0 - factor;
    translateY = -35 * factor;
  }

  if (opacity <= 0.001) return null;

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-4 h-4 text-[#f6c344]" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-[#38bdf8]" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-[#34d399]" />;
      case 'Sliders':
      default:
        return <Sliders className="w-4 h-4 text-[#a855f7]" />;
    }
  };

  return (
    <div
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
      }}
      className={`fixed inset-0 z-20 flex flex-col justify-center items-center px-6 sm:px-12 max-w-6xl mx-auto ${pointerEvents} select-none font-['Space_Grotesk']`}
    >
      {/* Vertical Section Identifier */}
      <div className="fixed left-6 sm:left-10 top-1/2 -translate-y-1/2 z-30 flex items-center -rotate-90 origin-left pointer-events-none">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-white/50 uppercase whitespace-nowrap">
          02 — SKILLS
        </span>
      </div>

      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#f6c344] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-white/80 uppercase">
            TECHNICAL ARSENAL &amp; CAPABILITIES
          </span>
        </div>
        <h2 className="font-light text-2xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
          CORE COMPUTATIONAL <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#f6c344] via-white to-[#38bdf8]">COMPETENCIES</span>
        </h2>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 max-w-3xl">
        {SKILLS_DATA.map((cat, idx) => {
          const isActive = activeCategory === idx;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setActiveCategory(idx);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-black font-bold shadow-[0_0_16px_rgba(255,255,255,0.2)]'
                  : 'bg-black/50 border border-white/10 text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              {getCategoryIcon(cat.iconName)}
              <span>{cat.category}</span>
            </button>
          );
        })}
      </div>

      {/* Bento Grid displaying Current Active Category Skills */}
      <div className="w-full max-w-4xl p-6 sm:p-8 rounded-3xl bg-black/50 border border-white/[0.1] backdrop-blur-2xl shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/[0.06] flex items-center justify-center">
              {getCategoryIcon(SKILLS_DATA[activeCategory].iconName)}
            </div>
            <div>
              <h3 className="font-medium text-lg text-white">
                {SKILLS_DATA[activeCategory].category}
              </h3>
              <p className="text-xs text-white/50 font-light">
                {SKILLS_DATA[activeCategory].description}
              </p>
            </div>
          </div>
          <span className="font-mono text-xs text-white/40">
            {SKILLS_DATA[activeCategory].skills.length} SKILLS
          </span>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {SKILLS_DATA[activeCategory].skills.map((skill, sIdx) => (
            <div
              key={sIdx}
              className="p-3.5 rounded-2xl bg-black/60 border border-white/[0.08] hover:border-white/25 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-xs sm:text-sm text-white/90 group-hover:text-white">
                  {skill.name}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.05] text-white/60 border border-white/[0.05]">
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
