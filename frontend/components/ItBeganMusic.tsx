'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Sunrise } from 'lucide-react';
import { createItBeganMusic } from '../lib/itBeganMusic';

export function ItBeganMusic() {
  const audio = useRef<ReturnType<typeof createItBeganMusic> | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [error, setError] = useState('');

  useEffect(() => {
    const hide = () => {
      if (document.hidden) {
        audio.current?.stop();
        audio.current = null;
        setPlaying(false);
      }
    };
    document.addEventListener('visibilitychange', hide);
    return () => {
      document.removeEventListener('visibilitychange', hide);
      audio.current?.stop();
      audio.current = null;
    };
  }, []);

  async function toggle() {
    if (audio.current) {
      audio.current.stop();
      audio.current = null;
      setPlaying(false);
      return;
    }
    setError('');
    let player: ReturnType<typeof createItBeganMusic> | null = null;
    try {
      player = createItBeganMusic(volume / 100);
      audio.current = player;
      setPlaying(true);
      await player.play();
    } catch {
      if (audio.current !== player) return;
      audio.current = null;
      setPlaying(false);
      setError('Audio unavailable. Try playing again.');
    }
  }

  return (
    <details className="relative text-xs text-foreground">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-outline bg-surface px-3 py-1.5 font-semibold" aria-label="Peaceful background music controls">
        <Sunrise size={14} aria-hidden="true" /> {playing ? 'BGM playing' : 'Peaceful BGM'}
      </summary>
      <div className="absolute left-0 top-full z-50 mt-2 w-60 max-w-[calc(100vw-2rem)] rounded-xl border border-outline bg-surface p-4 shadow-xl">
        <p className="font-bold text-accent">Every sunrise is a fresh start.</p>
        <p className="mt-1 mb-3 text-muted">Take a breath. One question at a time.</p>
        <button type="button" onClick={toggle} aria-pressed={playing}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-outline bg-surface-muted px-3 py-2 font-semibold hover:bg-surface-hover">
          {playing ? <Pause size={14} /> : <Play size={14} />}
          {playing ? 'Pause music' : 'Play peaceful music'}
        </button>
        <label className="mt-3 flex items-center gap-2">
          <span>Volume</span>
          <input type="range" min="0" max="100" value={volume} className="min-w-0 flex-1 accent-amber-700"
            onChange={event => {
              const value = Number(event.target.value);
              setVolume(value);
              audio.current?.setVolume(value / 100);
            }} />
          <span className="w-8 tabular-nums">{volume}%</span>
        </label>
        <p role="status" className="mt-2 text-muted">{error || 'Soft chords for a little more hope.'}</p>
      </div>
    </details>
  );
}
