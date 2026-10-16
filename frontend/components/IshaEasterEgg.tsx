import type { CSSProperties } from "react";
import { isIshaName } from "../lib/playerEasterEgg";
import styles from "./IshaEasterEgg.module.css";

export function IshaEasterEgg({ name }: { name: string }) {
  if (!isIshaName(name)) return null;

  return (
    <div className={styles.celebration}>
      <div
        className={styles.hearts}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
      >
        {Array.from({ length: 14 }, (_, index) => (
          <span
            key={index}
            className={styles.floatingHeart}
            style={{
              "--left": `${4 + (index * 29) % 92}%`,
              "--delay": `${-(index * 0.37)}s`,
              "--duration": `${3.2 + (index % 4) * 0.5}s`,
              "--drift": `${index % 2 ? 22 : -22}px`,
              "--size": `${12 + (index % 4) * 5}px`,
            } as CSSProperties}
          >
            ♥
          </span>
        ))}
      </div>
      <div className={styles.message} role="status" aria-live="polite">
        <span className={styles.heart} aria-hidden="true">♥</span>
        <strong>For Isha, with love.</strong>
        <span>You&apos;re Saksham&apos;s favourite person.</span>
      </div>
    </div>
  );
}
