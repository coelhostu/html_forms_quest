class AudioController {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private playTone(freq: number, type: OscillatorType, duration: number, vol = 0.1) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playCorrect() {
    this.playTone(600, 'square', 0.1, 0.1);
    setTimeout(() => this.playTone(800, 'square', 0.15, 0.1), 100);
  }

  playWrong() {
    this.playTone(200, 'sawtooth', 0.3, 0.15);
    setTimeout(() => this.playTone(150, 'sawtooth', 0.4, 0.15), 150);
  }

  playLevelComplete() {
    [400, 500, 600, 800, 1000].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'square', 0.2, 0.1), i * 100);
    });
  }

  playGameOver() {
    [300, 250, 200, 150].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'sawtooth', 0.4, 0.2), i * 200);
    });
  }

  playTick() {
    this.playTone(800, 'sine', 0.05, 0.05);
  }
}

export const audio = new AudioController();
