import React, { useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Layers, Cpu, Compass, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { sound } from '../utils/audio';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  allProjects: Project[];
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => {
          sound.playClick();
          onClose();
        }}
        className="absolute inset-0 bg-black/80 backdrop-blur-2xl transition-opacity"
      />

      {/* Main Glass Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e0e0e]/95 border border-white/[0.12] p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] z-10">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-6">
          <div className="flex items-center gap-3">
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-white px-2.5 py-1 rounded bg-white/10">
              CASE STUDY // {project.number}
            </span>
            <span className="font-['JetBrains_Mono'] text-xs text-white/50 uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/[0.05] border border-white/[0.1] text-white/70 hover:text-white hover:bg-white/10 transition-all"
            title="Close [ESC]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title and Client Banner */}
        <div className="mb-8">
          <h2 className="font-['Syne'] font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight leading-tight mb-2">
            {project.title}
          </h2>
          <p className="font-['Space_Grotesk'] text-sm sm:text-base text-white/80 font-light max-w-2xl">
            {project.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 font-['JetBrains_Mono'] text-xs text-white/40">
            <span>CLIENT: <span className="text-white/80">{project.client}</span></span>
            <span>•</span>
            <span>ROLE: <span className="text-white/80">{project.role}</span></span>
            <span>•</span>
            <span>TIMELINE: <span className="text-white/80">{project.year}</span></span>
          </div>
        </div>

        {/* Overview & Deep Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h3 className="font-['JetBrains_Mono'] text-xs text-white/40 uppercase tracking-widest">
              EXECUTIVE BRIEF &amp; OBJECTIVE
            </h3>
            <p className="font-['Space_Grotesk'] text-sm text-white/80 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          <div className="lg:col-span-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="font-['JetBrains_Mono'] text-xs text-white/40 uppercase tracking-widest mb-3">
              VALIDATED PERFORMANCE METRICS
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-black/40 border border-white/[0.04]">
                  <div className="font-['JetBrains_Mono'] text-[10px] text-white/40 uppercase">
                    {m.label}
                  </div>
                  <div className="font-['Space_Grotesk'] text-sm font-semibold text-white mt-0.5">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Architectural Features */}
        <div className="mb-10">
          <h3 className="font-['JetBrains_Mono'] text-xs text-white/40 uppercase tracking-widest mb-4">
            CORE ARCHITECTURAL PILLARS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-['JetBrains_Mono'] mb-3">
                  0{idx + 1}
                </div>
                <h4 className="font-['Space_Grotesk'] font-semibold text-sm text-white mb-2">
                  {feat.title}
                </h4>
                <p className="font-['Space_Grotesk'] text-xs text-white/60 leading-relaxed font-light">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables & Technology Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-10">
          <div>
            <h4 className="font-['JetBrains_Mono'] text-xs text-white/40 uppercase tracking-widest mb-3">
              PRODUCTION DELIVERABLES
            </h4>
            <div className="flex flex-col gap-2">
              {project.deliverables.map((del, dIdx) => (
                <div key={dIdx} className="flex items-center gap-2 text-xs font-['Space_Grotesk'] text-white/70">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-['JetBrains_Mono'] text-xs text-white/40 uppercase tracking-widest mb-3">
              DEPLOYED TECH STACK
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-md bg-white/[0.05] text-xs font-['JetBrains_Mono'] text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation Between Projects */}
        <div className="flex items-center justify-between pt-6 border-t border-white/[0.08]">
          <button
            onClick={() => {
              sound.playClick();
              onSelectProject(prevProject);
            }}
            className="group flex items-center gap-2 text-xs font-['Space_Grotesk'] text-white/60 hover:text-white uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Prev: {prevProject.title.split(' ')[0]}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectProject(nextProject);
            }}
            className="group flex items-center gap-2 text-xs font-['Space_Grotesk'] text-white/60 hover:text-white uppercase tracking-wider transition-colors"
          >
            <span>Next: {nextProject.title.split(' ')[0]}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
