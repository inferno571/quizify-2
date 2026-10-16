import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
function load() {
  const audios = [];
  const timers = new Map();
  class Audio {
    constructor(src) { this.src = src; audios.push(this); }
    play() { this.played = true; return Promise.resolve(); }
    pause() { this.paused = true; }
    removeAttribute() { this.src = ''; }
    load() { this.released = true; }
  }
  const source = fs.readFileSync(new URL('../lib/larpMemeSounds.ts', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  new Function('exports', 'Audio', 'setTimeout', 'clearTimeout', compiled)(module.exports, Audio,
    fn => { const id = Symbol(); timers.set(id, fn); return id; }, id => timers.delete(id));
  return { ...module.exports, audios, timers };
}
test('each shuffled bag contains all six local sounds without consecutive repeats', () => {
  const h = load();
  let previous;
  for (let bag = 0; bag < 20; bag++) {
    const ids = new Set();
    for (let i = 0; i < 6; i++) {
      const clip = h.nextLarpMemeSound();
      assert.notEqual(clip.id, previous);
      ids.add(clip.id);
      previous = clip.id;
      assert.ok(fs.statSync(new URL(`../public/audio/larp/${clip.id}.mp3`, import.meta.url)).size > 1000);
    }
    assert.equal(ids.size, 6);
  }
});
test('new playback replaces old audio and dismissal, ended and error release resources', () => {
  const h = load();
  const first = h.playRandomLarpMemeSound();
  assert.equal(h.audios[0].played, true);
  const second = h.playRandomLarpMemeSound();
  assert.equal(h.audios[0].released, true);
  first.stop();
  assert.notEqual(h.audios[1].released, true);
  second.stop();
  assert.equal(h.timers.size, 0);
  h.playRandomLarpMemeSound();
  h.audios[2].onended();
  h.playRandomLarpMemeSound();
  h.audios[3].onerror();
  assert.equal(h.timers.size, 0);
  assert.ok(h.audios.every(audio => audio.released));
});
