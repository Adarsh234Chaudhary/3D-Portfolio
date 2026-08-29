import React from 'react';
import { EDUCATION_DATA } from '../data/portfolio';
import { GraduationCap, BookOpen, Award, Sparkles, CheckCircle2, Calendar, MapPin } from 'lucide-react';

interface EducationOverlayProps {
  scrollProgress: number;
}

export const EducationOverlay: React.FC<EducationOverlayProps> = ({ scrollProgress }) => {
  // Visible between 0.79 and 0.91
  let opacity = 0;
  let translateY = 35;
  let pointerEvents = 'pointer-events-none';

  if (scrollProgress >= 0.79 && scrollProgress < 0.83) {
    const factor = (scrollProgress - 0.79) / (0.83 - 0.79);
    opacity = factor;
    translateY = 35 * (1 - factor);
    pointerEvents = 'pointer-events-auto';
  } else if (scrollProgress >= 0.83 && scrollProgress <= 0.88) {
    opacity = 1.0;
    translateY = 0;
    pointerEvents = 'pointer-events-auto';
  } else if (scrollProgress > 0.88 && scrollProgress <= 0.92) {
    const factor = (scrollProgress - 0.88) / (0.92 - 0.88);
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
      className={`fixed inset-0 z-20 overflow-y-auto py-16 px-6 sm:px-12 max-w-6xl mx-auto flex flex-col justify-center items-center ${pointerEvents} select-none font-['Space_Grotesk']`}
    >
      {/* Vertical Section Identifier */}
      <div className="fixed left-6 sm:left-10 top-1/2 -translate-y-1/2 z-30 flex items-center -rotate-90 origin-left pointer-events-none">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-white/50 uppercase whitespace-nowrap">
          05 — EDUCATION
        </span>
      </div>

      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl mb-3">
          <GraduationCap className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-white/80 uppercase">
            ACADEMIC FOUNDATION &amp; RIGOR
          </span>
        </div>
        <h2 className="font-light text-2xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
          COMPUTER SCIENCE <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-white to-[#f6c344]">DEGREE &amp; STUDIES</span>
        </h2>
      </div>

      {/* Education Cards */}
      <div className="flex flex-col gap-6 w-full max-w-4xl">
        {EDUCATION_DATA.map((item) => (
          <div
            key={item.id}
            className="p-6 sm:p-8 rounded-3xl bg-black/50 border border-white/[0.1] backdrop-blur-2xl shadow-xl hover:border-white/25 transition-all"
          >
            {/* Top Bar: Degree, Period, GPA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-black bg-[#38bdf8] px-2 py-0.5 rounded">
                    EDU {item.number}
                  </span>
                  <span className="font-mono text-xs text-emerald-400">
                    {item.status}
                  </span>
                </div>
                <h3 className="font-medium text-xl sm:text-2xl text-white tracking-tight">
                  {item.degree}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-light">
                  {item.major} • <span className="text-white/90 font-medium">{item.institution}</span>
                </p>
              </div>

              <div className="flex sm:flex-col items-start sm:items-end gap-3 sm:gap-1 mt-2 sm:mt-0 font-mono">
                <div className="flex items-center gap-1.5 text-xs text-white/60">
                  <Calendar className="w-3 h-3 text-[#f6c344]" />
                  <span>{item.period}</span>
                </div>
                <div className="px-3 py-1 rounded-xl bg-white/[0.08] border border-white/10 text-xs font-bold text-[#f6c344]">
                  {item.gpa}
                </div>
              </div>
            </div>

            {/* Coursework & Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Core Coursework */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span className="font-mono text-xs text-white/60 uppercase tracking-wider">
                    Core CS Coursework
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.coursework.map((course, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-[11px] font-mono text-white/80 border border-white/[0.05]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Academic Highlights */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <Award className="w-3.5 h-3.5 text-[#f6c344]" />
                  <span className="font-mono text-xs text-white/60 uppercase tracking-wider">
                    Academic Highlights &amp; Honors
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {item.highlights.map((high, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-2 text-xs text-white/70 font-light leading-relaxed"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{high}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
