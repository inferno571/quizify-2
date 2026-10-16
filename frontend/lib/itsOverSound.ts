/** A short, original shutdown sting. Called only from a user click. */
export function playItsOverSound(): () => void {
  let context: AudioContext | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const stop = () => {
    clearTimeout(timer);
    if (context && context.state !== 'closed') void context.close().catch(() => {});
  };

  try {
    const Audio = window.AudioContext;
    if (!Audio) return stop;
    const ctx = context = new Audio();
    void ctx.resume().catch(stop);
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.32, now);
    master.connect(ctx.destination);

    const tone = (frequency: number, end: number, offset: number, duration: number, volume: number, type: OscillatorType) => {
      const oscillator = ctx.createOscillator();
      const envelope = ctx.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now + offset);
      oscillator.frequency.exponentialRampToValueAtTime(end, now + offset + duration);
      envelope.gain.setValueAtTime(0, now + offset);
      envelope.gain.linearRampToValueAtTime(volume, now + offset + 0.035);
      envelope.gain.exponentialRampToValueAtTime(0.001, now + offset + duration);
      oscillator.connect(envelope);
      envelope.connect(master);
      oscillator.start(now + offset);
      oscillator.stop(now + offset + duration);
    };

    // Three descending minor notes, a detuned drone, then the power dies.
    [392, 311.13, 261.63].forEach((note, index) => tone(note, note * 0.96, index * 0.32, 1.2, 0.24, 'triangle'));
    tone(98, 30, 0, 3.4, 0.6, 'sine');
    tone(99.5, 31, 0, 3.2, 0.2, 'sine');
    tone(740, 55, 1.15, 1.3, 0.08, 'triangle');

    // Low-pass static: soft rain rather than a loud noise burst.
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
    const rain = ctx.createBufferSource();
    rain.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100, now);
    filter.frequency.exponentialRampToValueAtTime(120, now + 3);
    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0, now);
    rainGain.gain.linearRampToValueAtTime(0.1, now + 0.2);
    rainGain.gain.exponentialRampToValueAtTime(0.001, now + 3);
    rain.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(master);
    rain.start(now);
    rain.stop(now + 3);
    timer = setTimeout(stop, 3800);
  } catch {
    stop(); // The animation still works when audio is unavailable.
  }
  return stop;
}
