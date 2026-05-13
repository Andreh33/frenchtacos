// Procedural UI sound effects via WebAudio API.
// Zero downloads, ~150 lines, sub-100ms samples. Respects mute preference.

class SoundService {
  private ctx: AudioContext | null = null;
  private muted = false;
  private initialized = false;

  setMuted(m: boolean) {
    this.muted = m;
  }

  isMuted() {
    return this.muted;
  }

  private getCtx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Ctx = window.AudioContext || (window as any).webkitAudioContext;
        if (!Ctx) return null;
        this.ctx = new Ctx();
      } catch {
        return null;
      }
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /** Triggered by first user gesture — required by browsers. */
  prime() {
    if (this.initialized) return;
    this.initialized = true;
    this.getCtx();
  }

  playClick() {
    if (this.muted) return;
    const ctx = this.getCtx();
    if (!ctx) return;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1100, t);
    osc.frequency.exponentialRampToValueAtTime(640, t + 0.08);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.07, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  }

  playSwoosh() {
    if (this.muted) return;
    const ctx = this.getCtx();
    if (!ctx) return;
    const t = ctx.currentTime;

    // band-passed white noise burst
    const bufferSize = Math.floor(ctx.sampleRate * 0.12);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1800, t);
    filter.frequency.exponentialRampToValueAtTime(400, t + 0.12);
    filter.Q.value = 1.4;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.06, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);

    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.15);
  }
}

export const sound = new SoundService();
