export const LARP_MEME_SOUNDS = [
  { id: 'anime-wow', name: 'Anime Wow', duration: 4.18 },
  { id: 'vine-boom', name: 'Vine Boom', duration: 1.26 },
  { id: 'mlg-air-horn', name: 'MLG Air Horn', duration: 2.97 },
  { id: 'ronaldo-siu', name: 'Ronaldo Siuuu', duration: 6.34 },
  { id: 'oh-my-god-wow', name: 'Oh My God, Wow', duration: 6.61 },
  { id: 'emotional-damage', name: 'Emotional Damage', duration: 3.33 },
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
export function playRandomLarpMemeSound() {
  stopActive?.();
  const clip = nextLarpMemeSound();
  const audio = new Audio(`/audio/larp/${clip.id}.mp3`);
  let stopped = false;
  const stop = () => {
    if (stopped) return;
    stopped = true;
    clearTimeout(timer);
    audio.onended = null;
    audio.onerror = null;
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    if (stopActive === stop) stopActive = undefined;
  };
  const timer = setTimeout(stop, 8000);
  stopActive = stop;
  audio.volume = 0.65;
  audio.onended = stop;
  audio.onerror = stop;
  void audio.play().catch(stop);
  return { clip, stop };
}
