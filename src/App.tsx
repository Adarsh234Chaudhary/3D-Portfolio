/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
 
import React, { useState, useEffect } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { CanvasScrubber } from './components/CanvasScrubber';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navigation } from './components/Navigation';
import { HeroOverlay } from './components/HeroOverlay';
import { ManifestoOverlay } from './components/ManifestoOverlay';
import { SkillsOverlay } from './components/SkillsOverlay';
import { CaseStudiesOverlay } from './components/CaseStudiesOverlay';
import { AchievementsOverlay } from './components/AchievementsOverlay';
import { EducationOverlay } from './components/EducationOverlay';
import { ContactOverlay } from './components/ContactOverlay';
import { CaseStudyModal } from './components/CaseStudyModal';
import { CertificateModal } from './components/CertificateModal';
import { MaterialStudy } from './components/MaterialStudy';
import { PROJECTS_DATA } from './data/portfolio';
import { Project, Certificate, ViewMode } from './types';
import { sound } from './utils/audio';

export default function App() {
  const {
    scrollProgress,
    currentFrame,
    scrollToFraction,
    setScrubProgress,
    scrollToFrame,
    totalFrames
  } = useSmoothScroll();

  const [viewMode, setViewMode] = useState<ViewMode>('webgl');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [fps, setFps] = useState<number>(60);
  const [loadProgress, setLoadProgress] = useState<number>(100);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Auto-play / continuous warp animation loop
  useEffect(() => {
    if (!isAutoPlaying) return;

    let rafId: number;
    let lastTime = performance.now();

    const autoPlayLoop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const speed = 0.05;
      let next = scrollProgress + dt * speed;
      if (next >= 1.0) next = 0;

      setScrubProgress(next);
      rafId = requestAnimationFrame(autoPlayLoop);
    };

    rafId = requestAnimationFrame(autoPlayLoop);
    return () => cancelAnimationFrame(rafId);
  }, [isAutoPlaying, scrollProgress, setScrubProgress]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject || selectedCertificate) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(scrollProgress + 1 / totalFrames, 1);
        setScrubProgress(next);
        sound.playFrameTick();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = Math.max(scrollProgress - 1 / totalFrames, 0);
        setScrubProgress(prev);
        sound.playFrameTick();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        sound.playClick();
        setIsAutoPlaying(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollProgress, totalFrames, setScrubProgress, selectedProject, selectedCertificate]);

  if (viewMode === 'material-study') {
    return (
      <MaterialStudy onExit={() => setViewMode('webgl')} />
    );
  }

  return (
    <main className="relative min-h-[600vh] bg-[#040406] text-[#e5e5e5] select-none font-['Space_Grotesk']">
      {/* 1. Fixed Viewport 3D Engine */}
      {viewMode === 'webgl' ? (
        <ThreeCanvas scrollProgress={scrollProgress} />
      ) : (
        <CanvasScrubber
          currentFrame={currentFrame}
          scrollProgress={scrollProgress}
          viewMode={viewMode}
          onFpsUpdate={setFps}
          onLoadedProgress={setLoadProgress}
        />
      )}

      {/* 2. Top Header Navigation (About, Skills, Projects, Achievements, Education, Contact + CV direct opener) */}
      <Navigation
        scrollProgress={scrollProgress}
        currentFrame={currentFrame}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onNavigate={scrollToFraction}
      />

      {/* 3. Section 01: Hero Overlay with Floating Portrait Disk */}
      <HeroOverlay
        scrollProgress={scrollProgress}
        onExploreClick={() => scrollToFraction(0.22)}
        onNavigate={scrollToFraction}
      />

      {/* 4. Section 02: About (Manifesto) */}
      <ManifestoOverlay
        scrollProgress={scrollProgress}
      />

      {/* 5. Section 03: Technical Skills Matrix */}
      <SkillsOverlay
        scrollProgress={scrollProgress}
      />

      {/* 6. Section 04: Projects (with Live Link and GitHub Repo Link) */}
      <CaseStudiesOverlay
        scrollProgress={scrollProgress}
        projects={PROJECTS_DATA}
        onSelectProject={setSelectedProject}
        onJumpToProject={scrollToFrame}
      />

      {/* 7. Section 05: Achievements & Certificates (Click to open viewer) */}
      <AchievementsOverlay
        scrollProgress={scrollProgress}
        onSelectCertificate={setSelectedCertificate}
      />

      {/* 8. Section 06: Education & Academic Rigor */}
      <EducationOverlay
        scrollProgress={scrollProgress}
      />

      {/* 9. Section 07: Contact Terminal */}
      <ContactOverlay
        scrollProgress={scrollProgress}
        onScrollToTop={() => scrollToFraction(0)}
      />

      {/* Interactive Modals */}
      {/* Case Study Deep Architecture Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject}
        allProjects={PROJECTS_DATA}
      />

      {/* Certificate High-Res Viewer Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </main>
  );
}

