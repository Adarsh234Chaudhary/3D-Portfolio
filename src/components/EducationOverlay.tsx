import React from 'react';
import { EDUCATION_DATA } from '../data/portfolio';
import { GraduationCap, BookOpen, Award, CheckCircle2, Calendar } from 'lucide-react';
import { sound } from '../utils/audio';

interface EducationOverlayProps {
  scrollProgress: number;
  onNavigate?: (fraction: number) => void;
}

export const EducationOverlay: React.FC<EducationOverlayProps> = ({ scrollProgress, onNavigate }) => {
  // Visible between 0.79 and 0.91
  if (scrollProgress < 0.785 || scrollProgress > 0.915) return null;

  const rangeStart = 0.79;
  const rangeEnd = 0.91;
  const normalized = Math.min(Math.max((scrollProgress - rangeStart) / (rangeEnd - rangeStart), 0), 0.999);

  // Active sub-slide: 0 (EDU 01 B.Tech) or 1 (EDU 02 12th & EDU 03 10th)
  const currentSlide = normalized < 0.5 ? 0 : 1;

  // Slide-specific smooth opacity & transform transition calculation
  let slideOpacity = 1.0;
  let slideTranslateY = 0;

  if (currentSlide === 0) {
    // Slide 0 ranges from normalized 0.0 to 0.5
    if (normalized < 0.06) {
      const f = normalized / 0.06;
      slideOpacity = f;
      slideTranslateY = 25 * (1 - f);
    } else if (normalized > 0.44) {
      const f = (normalized - 0.44) / 0.06;
      slideOpacity = 1 - f;
      slideTranslateY = -25 * f;
    }
  } else {
    // Slide 1 ranges from normalized 0.5 to 1.0
    if (normalized < 0.56) {
      const f = (normalized - 0.5) / 0.06;
      slideOpacity = f;
      slideTranslateY = 25 * (1 - f);
    } else if (normalized > 0.94) {
      const f = (normalized - 0.94) / 0.06;
      slideOpacity = 1 - f;
      slideTranslateY = -25 * f;
    }
  }

  const btechItem = EDUCATION_DATA[0]; // EDU 01
  const schoolItems = EDUCATION_DATA.slice(1); // EDU 02 & EDU 03

  return (
    <div className="fixed inset-0 z-20 flex flex-col justify-center items-center py-12 sm:py-16 px-4 sm:px-8 lg:px-12 pointer-events-none select-none font-['Space_Grotesk']">
      {/* Vertical Section Identifier */}
      <div className="fixed left-4 sm:left-10 top-1/2 -translate-y-1/2 z-30 flex items-center -rotate-90 origin-left pointer-events-none">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-white/50 uppercase whitespace-nowrap">
          05 — EDUCATION
        </span>
      </div>

      {/* Main Slide Card Container */}
      <div
        style={{
          opacity: slideOpacity,
          transform: `translate3d(0, ${slideTranslateY}px, 0)`,
          transition: 'opacity 0.08s ease-out, transform 0.08s ease-out'
        }}
        className="w-full max-w-4xl pointer-events-auto flex flex-col items-center"
      >
        {/* Header & Sub-Slide Indicator */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl mb-2 sm:mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-white/80 uppercase">
              ACADEMIC FOUNDATION • SLIDE 0{currentSlide + 1} OF 02
            </span>
          </div>
          <h2 className="font-light text-2xl sm:text-4xl text-white tracking-tight uppercase leading-tight">
            {currentSlide === 0 ? (
              <>
                UNDERGRADUATE <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-white to-[#f6c344]">B.TECH CSE DEGREE</span>
              </>
            ) : (
              <>
                HIGH SCHOOL &amp; <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-white to-[#f6c344]">SECONDARY ACADEMICS</span>
              </>
            )}
          </h2>
        </div>

        {/* SLIDE 01: B.Tech Degree Card */}
        {currentSlide === 0 && (
          <div className="w-full p-6 sm:p-8 rounded-3xl bg-black/60 border border-white/[0.12] backdrop-blur-2xl shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8)] hover:border-white/25 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-black bg-[#38bdf8] px-2.5 py-0.5 rounded">
                    EDU {btechItem.number}
                  </span>
                  <span className="font-mono text-xs text-emerald-400 font-semibold">
                    {btechItem.status}
                  </span>
                </div>
                <h3 className="font-medium text-xl sm:text-2xl lg:text-3xl text-white tracking-tight">
                  {btechItem.degree}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-light mt-1">
                  {btechItem.major} • <span className="text-white/95 font-medium">{btechItem.institution}</span>
                </p>
                <p className="text-xs text-white/50 font-mono mt-0.5">
                  📍 {btechItem.location}
                </p>
              </div>

              <div className="flex sm:flex-col items-start sm:items-end gap-3 sm:gap-1.5 mt-2 sm:mt-0 font-mono">
                <div className="flex items-center gap-1.5 text-xs text-white/70">
                  <Calendar className="w-3.5 h-3.5 text-[#f6c344]" />
                  <span>{btechItem.period}</span>
                </div>
                <div className="px-3 py-1 rounded-xl bg-white/[0.08] border border-white/10 text-xs font-bold text-[#f6c344]">
                  {btechItem.gpa}
                </div>
              </div>
            </div>

            {/* Coursework & Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-[#38bdf8]" />
                  <span className="font-mono text-xs text-white/70 uppercase tracking-wider font-semibold">
                    Core CS Coursework
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {btechItem.coursework.map((course, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-2.5 py-1.5 rounded-xl bg-white/[0.05] text-xs font-mono text-white/90 border border-white/[0.08]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-[#f6c344]" />
                  <span className="font-mono text-xs text-white/70 uppercase tracking-wider font-semibold">
                    Academic Highlights &amp; Honors
                  </span>
                </div>
                <ul className="space-y-2">
                  {btechItem.highlights.map((high, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-white/80 font-light leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{high}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 02: 12th & 10th High School Cards */}
        {currentSlide === 1 && (
          <div className="w-full flex flex-col gap-4 sm:gap-5">
            {schoolItems.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-3xl bg-black/60 border border-white/[0.12] backdrop-blur-2xl shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8)] hover:border-white/25 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[11px] font-bold text-black bg-[#38bdf8] px-2 py-0.5 rounded">
                        EDU {item.number}
                      </span>
                      <span className="font-mono text-[11px] text-emerald-400 font-semibold">
                        {item.status}
                      </span>
                    </div>
                    <h3 className="font-medium text-lg sm:text-xl text-white tracking-tight">
                      {item.degree}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 font-light">
                      {item.major} • <span className="text-white/90 font-medium">{item.institution}</span>
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-1 mt-1 sm:mt-0 font-mono">
                    <div className="flex items-center gap-1.5 text-xs text-white/60">
                      <Calendar className="w-3 h-3 text-[#f6c344]" />
                      <span>{item.period}</span>
                    </div>
                    <div className="px-2.5 py-0.5 rounded-lg bg-white/[0.08] border border-white/10 text-xs font-bold text-[#f6c344]">
                      {item.gpa}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <BookOpen className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span className="font-mono text-[11px] text-white/60 uppercase tracking-wider font-semibold">
                        Key Subjects
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.coursework.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2 py-1 rounded-lg bg-white/[0.04] text-[11px] font-mono text-white/80 border border-white/[0.05]"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Award className="w-3.5 h-3.5 text-[#f6c344]" />
                      <span className="font-mono text-[11px] text-white/60 uppercase tracking-wider font-semibold">
                        Highlights
                      </span>
                    </div>
                    <ul className="space-y-1">
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
        )}

        {/* Interactive Sub-Slide Switcher Controls */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              if (onNavigate) {
                sound.playClick();
                onNavigate(0.82); // Jump to Slide 1
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all cursor-pointer border ${
              currentSlide === 0
                ? 'bg-[#38bdf8] text-black font-bold border-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                : 'bg-black/50 text-white/70 hover:text-white border-white/10 hover:bg-white/[0.1]'
            }`}
          >
            <span>01 B.TECH DEGREE</span>
          </button>

          <button
            onClick={() => {
              if (onNavigate) {
                sound.playClick();
                onNavigate(0.88); // Jump to Slide 2
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all cursor-pointer border ${
              currentSlide === 1
                ? 'bg-[#38bdf8] text-black font-bold border-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                : 'bg-black/50 text-white/70 hover:text-white border-white/10 hover:bg-white/[0.1]'
            }`}
          >
            <span>02 HIGH SCHOOL (12TH &amp; 10TH)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

