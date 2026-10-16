/** Original, gently voiced Cmaj7–Fmaj7–Am7–G6 ambient loop. No audio downloads. */
export function createItBeganMusic(volume = 0.3) {
  const ctx = new window.AudioContext();
  const master = ctx.createGain();
  master.gain.value = volume * 0.2;
  master.connect(ctx.destination);
  let timer: ReturnType<typeof setInterval> | undefined;
  let stopped = false;
  let nextBar = 0;
  let bar = 0;
  const chords = [[48, 55, 59, 64], [53, 57, 60, 64], [45, 52, 55, 60], [43, 50, 55, 64]];
  const melody = [[72, 76, 79, 76], [69, 72, 76, 72], [72, 71, 69, 67], [67, 69, 71, 74]];
  const tone = (midi: number, at: number, duration: number, level: number) => {
    const oscillator = ctx.createOscillator();
    const envelope = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12);
    envelope.gain.setValueAtTime(0, at);
    envelope.gain.linearRampToValueAtTime(level, at + 0.35);
    envelope.gain.exponentialRampToValueAtTime(0.0001, at + duration);
    oscillator.connect(envelope);
    envelope.connect(master);
    oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
    oscillator.start(at);
    oscillator.stop(at + duration);
  };
  const schedule = () => {
    if (stopped || ctx.state !== 'running') return;
    // Skip missed time after browser throttling rather than stacking old notes.
    if (nextBar < ctx.currentTime) nextBar = ctx.currentTime + 0.05;
    while (nextBar < ctx.currentTime + 1) {
      const index = bar++ % chords.length;
      chords[index].forEach(note => tone(note, nextBar, 4.8, 0.18));
      melody[index].forEach((note, beat) => tone(note, nextBar + beat * 1.2, 2.2, 0.12));
      nextBar += 4.8;
    }
  };
  const stop = () => {
    stopped = true;
    clearInterval(timer);
    if (ctx.state !== 'closed') void ctx.close().catch(() => {});
  };
  return {
    async play() {
      try {
        await ctx.resume();
        if (stopped) return;
        if (ctx.state !== 'running') throw new Error('Audio could not start');
        nextBar = ctx.currentTime + 0.05;
        schedule();
        timer = setInterval(schedule, 500);
      } catch (error) { stop(); throw error; }
    },
    setVolume(value: number) {
      if (!stopped) master.gain.setTargetAtTime(Math.max(0, Math.min(1, value)) * 0.2, ctx.currentTime, 0.15);
    },
    stop,
  };
}
