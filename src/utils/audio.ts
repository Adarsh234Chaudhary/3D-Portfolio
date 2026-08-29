/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Web Audio API synthesizer for tactile UI micro-interactions
 * Generates organic sub-audible clicks, detents, and glass harmonics without any external audio files.
 */
 
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private lastTickTime: number = 0;

  constructor() {
    // Lazy initialized on first user interaction
  }

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.ctx) {
      this.ctx.suspend().catch(() => {});
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Subtle mechanical detent click when scrubbing frames
   */
  public playFrameTick(pitch = 1.0) {
    if (this.isMuted) return;
    const now = performance.now();
    // Throttle clicks to avoid noise overload
    if (now - this.lastTickTime < 32) return;
    this.lastTickTime = now;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const freq = 1200 * pitch;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.015);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.018);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch {
      // AudioContext might be uninitialized
    }
  }

  /**
   * Crisp glass tap for button hover / modal actions
   */
  public playClick(highPitch = false) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      const startFreq = highPitch ? 2400 : 1600;
      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  }

  /**
   * Cosmic shatter burst synthesizer (triggers when solid knot breaks into 7,000 stars)
   */
  public playCosmicBurst() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // Deep sub-bass swell + shimmering high glass overtone
      const sub = ctx.createOscillator();
      const shimmer = ctx.createOscillator();
      const gainSub = ctx.createGain();
      const gainShimmer = ctx.createGain();

      sub.type = 'sine';
      sub.frequency.setValueAtTime(60, ctx.currentTime);
      sub.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.6);

      gainSub.gain.setValueAtTime(0.06, ctx.currentTime);
      gainSub.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      shimmer.type = 'triangle';
      shimmer.frequency.setValueAtTime(1400, ctx.currentTime);
      shimmer.frequency.exponentialRampToValueAtTime(2800, ctx.currentTime + 0.4);

      gainShimmer.gain.setValueAtTime(0.03, ctx.currentTime);
      gainShimmer.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

      sub.connect(gainSub);
      gainSub.connect(ctx.destination);

      shimmer.connect(gainShimmer);
      gainShimmer.connect(ctx.destination);

      sub.start();
      shimmer.start();
      sub.stop(ctx.currentTime + 0.6);
      shimmer.stop(ctx.currentTime + 0.6);
    } catch {
      // ignore
    }
  }

  /**
   * Resonant low harmonic chime when completing an action or changing phase
   */
  public playPhaseTransition() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(440, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.25);

      osc2.frequency.setValueAtTime(880, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.3);
      osc2.stop(ctx.currentTime + 0.3);
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundEngine();
