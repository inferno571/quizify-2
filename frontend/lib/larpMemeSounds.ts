export const LARP_MEME_SOUNDS = [
  { id: 'original', name: 'Original cinematic effect', duration: 1.2 },
  { id: 'vine-boom', name: 'Vine Boom', duration: 1.26 },
] as const;
let bag: number[] = [];
let previous = -1;
export function nextLarpMemeSound() {
  if (!bag.length) {
    bag = LARP_MEME_SOUNDS.map((_, i) => i);
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    if (bag[bag.length - 1] === previous) [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];
  }
  previous = bag.pop()!;
  return LARP_MEME_SOUNDS[previous];
}
let stopActive: (() => void) | undefined;
export function playRandomLarpMemeSound(playOriginal: () => (() => void) | void) {
  stopActive?.();
  const clip = nextLarpMemeSound();
  const audio = clip.id === 'vine-boom' ? new Audio('/audio/larp/vine-boom.mp3') : undefined;
  let stopOriginal: (() => void) | void;
  let stopped = false;
  const stop = () => {
    if (stopped) return;
    stopped = true;
    clearTimeout(timer);
    stopOriginal?.();
    if (audio) {
      audio.onended = null;
      audio.onerror = null;
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    }
    if (stopActive === stop) stopActive = undefined;
  };
  const timer = setTimeout(stop, 8000);
  stopActive = stop;
  try {
    if (audio) {
      audio.volume = 0.65;
      audio.onended = stop;
      audio.onerror = stop;
      void audio.play().catch(stop);
    } else {
      stopOriginal = playOriginal();
    }
  } catch { stop(); }
  return { clip, stop };
}
