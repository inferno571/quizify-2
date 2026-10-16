'use client';

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { CloudRain, Volume2, X } from 'lucide-react';
import { playItsOverSound } from '../lib/itsOverSound';
import styles from './ItsOverButton.module.css';

function ShutdownOverlay({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    const timer = setTimeout(onClose, 5200);
    return () => {
      clearTimeout(timer);
      element?.close();
    };
  }, [onClose]);

  return createPortal(
    <dialog ref={dialog} className={styles.overlay} aria-labelledby={titleId}
      onCancel={event => { event.preventDefault(); onClose(); }}>
      <div className={styles.artwork} aria-hidden="true" />
      <div className={styles.rain} aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => <i key={i} style={{
          '--left': `${(i * 37) % 100}%`, '--delay': `${-i * 0.17}s`,
          '--speed': `${0.8 + (i % 5) * 0.2}s`,
        } as CSSProperties} />)}
      </div>
      <div className={styles.scanlines} aria-hidden="true" />
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close animation">
        <X size={20} />
      </button>
      <div className={styles.stage}>
        <p className={styles.signal}><span /> SIGNAL LOST · ACADEMIC WINTER</p>
        <div className={styles.terminal} aria-hidden="true">
          <span>&gt; connecting to academic comeback...</span>
          <span>&gt; hope.exe has stopped responding</span>
          <span>&gt; aura remaining: 0</span>
        </div>
        <h2 id={titleId} className={styles.title}>IT&apos;S OVER<span>.</span></h2>
        <p className={styles.caption}>the syllabus won this round.</p>
        <div className={styles.power} aria-hidden="true"><span /></div>
        <p className={styles.recovery}>COMEBACK.EXE STILL EXISTS</p>
        <button type="button" onClick={onClose} className={styles.returnButton}>One more question →</button>
        <p className={styles.hint}>Esc to return · closes automatically</p>
      </div>
    </dialog>, document.body,
  );
}

export function ItsOverButton() {
  const [active, setActive] = useState(false);
  const stopSound = useRef<(() => void) | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    stopSound.current?.();
    stopSound.current = null;
    setActive(false);
    trigger.current?.focus();
  }, []);
  useEffect(() => () => { stopSound.current?.(); }, []);

  return <>
    <button ref={trigger} type="button" className={styles.trigger}
      aria-haspopup="dialog" title="Play the It's Over animation with sound"
      onClick={event => {
        event.stopPropagation();
        stopSound.current?.();
        stopSound.current = playItsOverSound();
        setActive(true);
      }}>
      <CloudRain size={15} aria-hidden="true" />
      <span>IT&apos;S OVER</span>
      <Volume2 size={13} aria-hidden="true" />
    </button>
    {active && <ShutdownOverlay onClose={close} />}
  </>;
}
