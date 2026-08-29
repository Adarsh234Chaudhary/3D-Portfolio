/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Sparkles, ArrowUp, Github, Linkedin, FileText, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface ContactOverlayProps {
  scrollProgress: number;
  onScrollToTop: () => void;
  onOpenCV?: () => void;
}
 
export const ContactOverlay: React.FC<ContactOverlayProps> = ({ scrollProgress, onScrollToTop, onOpenCV }) => {
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['Full-Stack Development']);
  const [clientEmail, setClientEmail] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Visible between 0.91 and 1.00
  let opacity = 0;
  let translateY = 40;
  let pointerEvents = 'pointer-events-none';

  if (scrollProgress >= 0.91) {
    const factor = Math.min((scrollProgress - 0.91) / (0.96 - 0.91), 1.0);
    opacity = factor;
    translateY = 40 * (1 - factor);
    pointerEvents = 'pointer-events-auto';
  }

  if (opacity <= 0.001) return null;

  const toggleScope = (scope: string) => {
    sound.playClick();
    if (selectedScopes.includes(scope)) {
      setSelectedScopes(selectedScopes.filter(s => s !== scope));
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail) return;

    sound.playPhaseTransition();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f6c344', '#38bdf8', '#ffffff', '#ffd700']
    });

    setIsSubmitted(true);
  };

  const scopes = [
    'Full-Stack Software Engineering',
    'Interactive 3D / WebGL Graphics',
    'Distributed Systems & Cloud',
    'Open Source & Research'
  ];

  return (
    <div
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
      }}
      className={`fixed inset-0 z-20 overflow-y-auto px-6 sm:px-12 py-20 max-w-6xl mx-auto flex flex-col justify-between ${pointerEvents} select-none font-['Space_Grotesk']`}
    >
      {/* Vertical Section Identifier */}
      <div className="fixed left-6 sm:left-10 top-1/2 -translate-y-1/2 z-30 flex items-center -rotate-90 origin-left pointer-events-none">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-white/50 uppercase whitespace-nowrap">
          06 — CONTACT
        </span>
      </div>

      {/* Main Inquiry Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto pl-4 sm:pl-8">
        {/* Left Column: CSE Profile & Direct Channels */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f6c344] animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/80 uppercase">
                GET IN TOUCH &amp; COLLABORATE
              </span>
            </div>
            <h2 className="font-light text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight">
              LET'S BUILD <br />
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#f6c344] via-white to-[#38bdf8]">
                SCALABLE SYSTEMS
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-3 leading-relaxed font-light">
              Open to full-time Software Engineer opportunities, high-impact internships, research collaborations, and creative full-stack contracts.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08] backdrop-blur-xl flex flex-col gap-3.5">
            <div className="flex items-center gap-3 text-xs text-white/90">
              <Mail className="w-4 h-4 text-[#f6c344] shrink-0" />
              <a href={`mailto:${PERSONAL_INFO.email}`} className="font-mono hover:text-[#f6c344] transition-colors">
                {PERSONAL_INFO.email}
              </a>
            </div>

            <div className="flex items-center gap-3 text-xs text-white/70 font-mono">
              <MapPin className="w-4 h-4 text-[#38bdf8] shrink-0" />
              <span>{PERSONAL_INFO.location} • Available Globally (Remote / Relocation)</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/[0.08] text-xs font-mono">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] text-white/80 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-[#f6c344]" />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] text-white/80 hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PERSONAL_INFO.cvUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f6c344]/15 hover:bg-[#f6c344]/25 text-[#f6c344] transition-colors cursor-pointer border border-[#f6c344]/30"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume / CV</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Inquiry Terminal */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-black/50 border border-white/[0.1] backdrop-blur-2xl shadow-2xl">
            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-xl text-white">Message Transmitted</h3>
                <p className="text-xs sm:text-sm text-white/60 max-w-sm">
                  Your message has been received! Adarsh will get back to you promptly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs font-mono text-white/50 hover:text-white underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block font-mono text-[11px] text-white/50 uppercase tracking-wider mb-2.5">
                    Opportunity / Topic Area
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {scopes.map(s => {
                      const active = selectedScopes.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleScope(s)}
                          className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                            active
                              ? 'bg-white text-black font-semibold shadow-sm'
                              : 'bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-white'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-white/50 uppercase tracking-wider mb-2">
                    Your Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="recruiter@tech.com or founder@startup.io"
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/[0.08] text-white placeholder-white/20 text-xs sm:text-sm focus:outline-none focus:border-white/40 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-white/50 uppercase tracking-wider mb-2">
                    Message / Opportunity Scope
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell me about your team, role opening, project challenge, or tech stack..."
                    value={projectBrief}
                    onChange={e => setProjectBrief(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/[0.08] text-white placeholder-white/20 text-xs sm:text-sm focus:outline-none focus:border-white/40 resize-none font-light"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-[#f6c344] to-[#f97316] text-black font-semibold text-xs uppercase tracking-widest hover:opacity-90 active:scale-[0.99] transition-all shadow-[0_0_24px_rgba(246,195,68,0.25)] cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer & Warp Back Action */}
      <div className="flex items-center justify-between pt-8 border-t border-white/[0.05] pl-4 sm:pl-8">
        <button
          onClick={() => {
            sound.playClick();
            onScrollToTop();
          }}
          className="group flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white uppercase tracking-wider cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#f6c344]" />
          <span>BACK TO TOP</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-xs text-white/60 tracking-widest">
          <span className="text-white/40">01</span>
          <span className="w-6 h-[1px] bg-white/30" />
          <span className="text-[#f6c344] font-semibold">06</span>
        </div>
      </div>
    </div>
  );
};

