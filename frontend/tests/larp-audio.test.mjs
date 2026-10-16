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
test('only the original effect and Vine Boom are selected without consecutive repeats', () => {
  const h = load();
  let previous;
  for (let bag = 0; bag < 20; bag++) {
    const ids = new Set();
    for (let i = 0; i < 2; i++) {
      const clip = h.nextLarpMemeSound();
      assert.notEqual(clip.id, previous);
      ids.add(clip.id);
      previous = clip.id;
      if (clip.id === 'vine-boom') assert.ok(fs.statSync(new URL('../public/audio/larp/vine-boom.mp3', import.meta.url)).size > 1000);
    }
    assert.deepEqual([...ids].sort(), ['original', 'vine-boom']);
  }
});
test('new playback replaces old audio and dismissal, ended and error release resources', () => {
  const h = load();
  let originals = 0;
  let stoppedOriginals = 0;
  const original = () => { originals++; return () => stoppedOriginals++; };
  const first = h.playRandomLarpMemeSound(original);
  const second = h.playRandomLarpMemeSound(original);
  assert.equal(originals, 1);
  assert.equal(h.audios.length, 1);
  assert.equal(h.audios[0].played, true);
  assert.equal(h.audios[0].src === '' || h.audios[0].src === '/audio/larp/vine-boom.mp3', true);
  first.stop();
  second.stop();
  second.stop();
  assert.equal(stoppedOriginals, 1);
  for (let i = 0; i < 4; i++) {
    const playback = h.playRandomLarpMemeSound(original);
    if (playback.clip.id === 'vine-boom') {
      const audio = h.audios.at(-1);
      (i < 2 ? audio.onended : audio.onerror)();
    } else playback.stop();
  }
  assert.equal(stoppedOriginals, originals);
  assert.equal(h.timers.size, 0);
  assert.ok(h.audios.every(audio => audio.released));
});
