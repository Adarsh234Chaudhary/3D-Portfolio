import React from 'react';
import { ACHIEVEMENTS_DATA } from '../data/portfolio';
import { Certificate } from '../types';
import { Award, ExternalLink, ShieldCheck, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface AchievementsOverlayProps {
  scrollProgress: number;
  onSelectCertificate: (cert: Certificate) => void;
}

export const AchievementsOverlay: React.FC<AchievementsOverlayProps> = ({
  scrollProgress,
  onSelectCertificate
}) => {
  // Visible between 0.65 and 0.80
  let opacity = 0;
  let translateY = 35;
  let pointerEvents = 'pointer-events-none';

  if (scrollProgress >= 0.65 && scrollProgress < 0.70) {
    const factor = (scrollProgress - 0.65) / (0.70 - 0.65);
    opacity = factor;
    translateY = 35 * (1 - factor);
    pointerEvents = 'pointer-events-auto';
  } else if (scrollProgress >= 0.70 && scrollProgress <= 0.76) {
    opacity = 1.0;
    translateY = 0;
    pointerEvents = 'pointer-events-auto';
  } else if (scrollProgress > 0.76 && scrollProgress <= 0.81) {
    const factor = (scrollProgress - 0.76) / (0.81 - 0.76);
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
      className={`fixed inset-0 z-20 overflow-hidden py-16 px-6 sm:px-12 max-w-6xl mx-auto flex flex-col justify-center items-center ${pointerEvents} select-none font-['Space_Grotesk']`}
    >
      {/* Vertical Section Identifier */}
      <div className="fixed left-6 sm:left-10 top-1/2 -translate-y-1/2 z-30 flex items-center -rotate-90 origin-left pointer-events-none">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-white/50 uppercase whitespace-nowrap">
          04 — ACHIEVEMENTS
        </span>
      </div>

      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl mb-3">
          <Award className="w-3.5 h-3.5 text-[#f6c344]" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-white/80 uppercase">
            CERTIFICATIONS &amp; HONORS
          </span>
        </div>
        <h2 className="font-light text-2xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
          PROVEN CREDENTIALS &amp; <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#f6c344] via-white to-[#34d399]">AWARDS</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 font-light mt-2 max-w-lg mx-auto">
          Click any certificate card below to inspect full verification details, credentials, and certified technical competencies.
        </p>
      </div>

      {/* Grid of 4 Certificates with Visible Previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-5xl">
        {ACHIEVEMENTS_DATA.map((cert) => (
          <div
            key={cert.id}
            onClick={() => {
              sound.playClick(true);
              onSelectCertificate(cert);
            }}
            className="group relative p-5 sm:p-6 rounded-3xl bg-black/50 border border-white/[0.1] hover:border-white/30 backdrop-blur-2xl shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Top Row: Preview Thumbnail & Issuer Details */}
            <div className="flex gap-4 items-start mb-4">
              {/* Visible Certificate Preview Thumbnail */}
              <div className="relative w-24 sm:w-28 h-20 sm:h-22 rounded-xl overflow-hidden border border-white/20 bg-black/80 shrink-0 group-hover:shadow-[0_0_20px_rgba(246,195,68,0.3)] transition-all">
                <img
                  src={cert.certificateImage}
                  alt={cert.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-black/70 border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest truncate">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-[10px] text-[#f6c344] font-medium shrink-0">
                    {cert.issueDate}
                  </span>
                </div>
                <h3 className="font-medium text-sm sm:text-base text-white tracking-tight leading-snug group-hover:text-[#f6c344] transition-colors line-clamp-2">
                  {cert.title}
                </h3>
                <span className="inline-block font-mono text-[9px] uppercase tracking-wider text-emerald-400 mt-1">
                  ✓ VERIFIED CREDENTIAL
                </span>
              </div>
            </div>

            {/* Bottom Row: Skills Chips & Click Action */}
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
                {cert.skillsCovered.slice(0, 2).map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 rounded bg-white/[0.05] text-[10px] font-mono text-white/70"
                  >
                    {skill}
                  </span>
                ))}
                {cert.skillsCovered.length > 2 && (
                  <span className="px-1.5 py-0.5 rounded bg-white/[0.03] text-[10px] font-mono text-white/40">
                    +{cert.skillsCovered.length - 2}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs font-mono text-white/80 group-hover:text-white shrink-0">
                <span>View Certificate</span>
                <ExternalLink className="w-3 h-3 text-[#f6c344]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
