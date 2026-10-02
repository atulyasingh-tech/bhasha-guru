// Web Audio API Synthesizer for BhashaGuru
// Creates crisp, zero-latency micro-sounds without any external asset dependencies

class SoundService {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
  }

  // Play single note with envelope
  playTone(freq, duration = 0.15, type = 'sine', gainVal = 0.15) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play failed', e);
    }
  }

  // XP Award Sound (bubbly upbeat chime)
  playXpGain() {
    if (this.muted) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.12, 'triangle', 0.12);
      }, idx * 60);
    });
  }

  // Quiz Correct Sound (Major chord triumph)
  playCorrect() {
    if (this.muted) return;
    this.init();
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.18, 'sine', 0.15);
      }, idx * 70);
    });
  }

  // Quiz Incorrect Sound (Gentle low buzz)
  playIncorrect() {
    if (this.muted) return;
    this.init();
    this.playTone(220, 0.25, 'sawtooth', 0.1);
    setTimeout(() => {
      this.playTone(185, 0.35, 'sawtooth', 0.1);
    }, 120);
  }

  // Level Up Milestone Fanfare!
  playLevelUp() {
    if (this.muted) return;
    this.init();
    const melody = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.12 }, // G5
      { f: 1046.50, d: 0.25 }, // C6
      { f: 880.00, d: 0.15 }, // A5
      { f: 1046.50, d: 0.45 }, // C6 hold
    ];
    let time = 0;
    melody.forEach((note) => {
      setTimeout(() => {
        this.playTone(note.f, note.d, 'triangle', 0.2);
      }, time);
      time += note.d * 1000 + 40;
    });
  }

  // Layer Unlock Swoosh
  playLayerUnlock() {
    if (this.muted) return;
    this.init();
    this.playTone(392.00, 0.08, 'sine', 0.1);
    setTimeout(() => this.playTone(587.33, 0.14, 'sine', 0.14), 70);
  }
}

export const soundService = new SoundService();
