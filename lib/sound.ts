let ctx: AudioContext | null = null;
let muted = false;

try {
  muted = localStorage.getItem("qt_sound_muted") === "1";
} catch {
  muted = false;
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.15,
  when = 0
) {
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + when;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

export const Sound = {
  get muted() {
    return muted;
  },
  setMuted(value: boolean) {
    muted = value;
    try {
      localStorage.setItem("qt_sound_muted", value ? "1" : "0");
    } catch {
      /* ignore */
    }
  },
  toggle() {
    this.setMuted(!muted);
    return muted;
  },
  move() {
    if (muted) return;
    tone(300, 0.05, "square", 0.06);
  },
  click() {
    if (muted) return;
    tone(520, 0.06, "triangle", 0.1);
  },
  rotate() {
    if (muted) return;
    tone(380, 0.06, "square", 0.08);
  },
  drop() {
    if (muted) return;
    tone(200, 0.08, "sawtooth", 0.08);
  },
  lock() {
    if (muted) return;
    tone(240, 0.06, "square", 0.07);
  },
  clearLine() {
    if (muted) return;
    tone(620, 0.08, "square", 0.1);
    tone(830, 0.1, "square", 0.1, 0.07);
  },
  eat() {
    if (muted) return;
    tone(540, 0.06, "square", 0.08);
    tone(720, 0.06, "square", 0.08, 0.04);
  },
  flip() {
    if (muted) return;
    tone(500, 0.05, "triangle", 0.07);
  },
  match() {
    if (muted) return;
    tone(700, 0.08, "sine", 0.12);
    tone(900, 0.1, "sine", 0.12, 0.06);
  },
  place() {
    if (muted) return;
    tone(440, 0.06, "triangle", 0.1);
  },
  win() {
    if (muted) return;
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.14, "sine", 0.12, i * 0.1));
  },
  lose() {
    if (muted) return;
    [440, 392, 330, 262].forEach((f, i) => tone(f, 0.16, "sine", 0.1, i * 0.12));
  },
  countdown() {
    if (muted) return;
    tone(880, 0.08, "sine", 0.08);
  },
  go() {
    if (muted) return;
    tone(1100, 0.18, "sine", 0.12);
  },
  error() {
    if (muted) return;
    tone(180, 0.15, "square", 0.1);
  },
  correct() {
    if (muted) return;
    tone(660, 0.09, "sine", 0.12);
    tone(880, 0.12, "sine", 0.12, 0.07);
  },
  wrong() {
    if (muted) return;
    tone(220, 0.18, "sawtooth", 0.09);
  },
  keypress() {
    if (muted) return;
    tone(480, 0.04, "triangle", 0.06);
  },
};

export default Sound;
