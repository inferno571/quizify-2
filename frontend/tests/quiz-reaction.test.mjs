import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
function load(file, dependencies = require, globals = {}) {
  const source = fs.readFileSync(new URL(file, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const result = { exports: {} };
  new Function('require', 'module', 'exports', ...Object.keys(globals), compiled)(
    dependencies, result, result.exports, ...Object.values(globals),
  );
  return result.exports;
}

test('meme themes use their own reactions; rendering never starts sound', () => {
  let plays = 0;
  const { ItsOverButton } = load('../components/ItsOverButton.tsx', name => {
    if (name === '../lib/itsOverSound') return { playItsOverSound: () => { plays++; } };
    if (name.endsWith('.module.css')) return { default: {} };
    return require(name);
  });
  for (const theme of ['itsover', 'larp', 'light', 'dark', 'midnight', 'emerald', 'cyberpunk', 'itbegan']) {
    const { QuizReactionButton } = load('../components/QuizReactionButton.tsx', name => {
      if (name === './ThemeProvider') return { useTheme: () => ({ theme }) };
      if (name === './ItsOverButton') return { ItsOverButton };
      if (name === './LarpGuideModal') return { LarpSuccessfulButton: () => React.createElement('button', null, 'LARP Successful') };
      return require(name);
    });
    const html = renderToStaticMarkup(React.createElement(QuizReactionButton));
    if (theme === 'itsover') {
      assert.match(html, /IT&#x27;S OVER/);
      assert.match(html, /aria-haspopup="dialog"/);
      assert.doesNotMatch(html, /LARP Successful/);
    } else if (theme === 'itbegan') {
      assert.match(html, /IT BEGAN/);
      assert.doesNotMatch(html, /LARP Successful|IT&#x27;S OVER/);
    } else {
      assert.match(html, /LARP Successful/);
      assert.doesNotMatch(html, /IT&#x27;S OVER/);
    }
  }
  assert.equal(plays, 0);
});

function soundHarness({ fails = false, unavailable = false } = {}) {
  let closed = 0;
  let resumed = 0;
  let expiry;
  let delay;
  const stops = [];
  const parameter = () => ({ setValueAtTime() {}, exponentialRampToValueAtTime() {}, linearRampToValueAtTime() {} });
  const node = () => ({ connect() {}, start() {}, stop(at) { stops.push(at); } });
  class FakeAudioContext {
    state = 'suspended';
    currentTime = 10;
    sampleRate = 100;
    destination = {};
    resume() { resumed++; return Promise.resolve(); }
    close() { this.state = 'closed'; closed++; return Promise.resolve(); }
    createGain() { if (fails) throw Error('Unavailable'); return { ...node(), gain: parameter() }; }
    createOscillator() { return { ...node(), frequency: parameter() }; }
    createBuffer() { return { getChannelData: () => new Float32Array(300) }; }
    createBufferSource() { return node(); }
    createBiquadFilter() { return { ...node(), frequency: parameter() }; }
  }
  const { playItsOverSound } = load('../lib/itsOverSound.ts', require, {
    window: { AudioContext: unavailable ? undefined : FakeAudioContext },
    setTimeout: (callback, ms) => { expiry = callback; delay = ms; return 1; },
    clearTimeout: () => {},
  });
  return { playItsOverSound, stops, expire: () => expiry(), get closed() { return closed; }, get resumed() { return resumed; }, get delay() { return delay; } };
}

test('shutdown sound has finite sources, resumes audio and releases its context', () => {
  const sound = soundHarness();
  const stop = sound.playItsOverSound();
  assert.equal(sound.resumed, 1);
  assert.equal(sound.stops.length, 7);
  assert.ok(sound.stops.every(at => at > 10 && at <= 13.4));
  assert.equal(sound.delay, 3800);
  sound.expire();
  stop();
  assert.equal(sound.closed, 1);
});

test('dismissal stops audio immediately and safely tolerates repeated cleanup', () => {
  const sound = soundHarness();
  const stop = sound.playItsOverSound();
  stop();
  stop();
  assert.equal(sound.closed, 1);
});

test('audio unavailable or failing does not prevent the animation', () => {
  const unavailable = soundHarness({ unavailable: true });
  assert.doesNotThrow(() => unavailable.playItsOverSound()());
  const failed = soundHarness({ fails: true });
  assert.doesNotThrow(() => failed.playItsOverSound()());
  assert.equal(failed.closed, 1);
});

function musicHarness({ denied = false, pending = false } = {}) {
  let context;
  let tick;
  let cleared = false;
  let finishResume;
  const starts = [];
  const volumes = [];
  const parameter = () => ({ setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {}, setTargetAtTime(value) { volumes.push(value); } });
  class AudioContext {
    state = 'suspended';
    currentTime = 0;
    destination = {};
    closed = 0;
    constructor() { context = this; }
    resume() {
      if (denied) return Promise.reject(new Error('Denied'));
      if (pending) return new Promise(resolve => { finishResume = resolve; });
      this.state = 'running';
      return Promise.resolve();
    }
    close() { this.state = 'closed'; this.closed++; return Promise.resolve(); }
    createGain() { return { gain: parameter(), connect() {}, disconnect() {} }; }
    createOscillator() { return { frequency: {}, connect() {}, disconnect() {}, start(at) { starts.push(at); }, stop() {} }; }
  }
  const { createItBeganMusic } = load('../lib/itBeganMusic.ts', require, {
    window: { AudioContext },
    setInterval(callback) { tick = callback; return 1; },
    clearInterval() { cleared = true; },
  });
  const player = createItBeganMusic();
  return { player, starts, volumes, get context() { return context; }, get cleared() { return cleared; }, tick: () => tick(), finishResume: () => finishResume() };
}

test('peaceful music loops, skips throttled time, adjusts volume and releases audio', async () => {
  const h = musicHarness();
  assert.equal(h.starts.length, 0);
  await h.player.play();
  assert.equal(h.starts.length, 8);
  h.context.currentTime = 4.5;
  h.tick();
  assert.equal(h.starts.length, 16);
  h.context.currentTime = 100;
  h.tick();
  assert.equal(h.starts.length, 24);
  assert.ok(h.starts.slice(-8).every(at => at > 100));
  h.player.setVolume(0);
  h.player.setVolume(2);
  assert.deepEqual(h.volumes, [0, 0.2]);
  h.player.stop();
  h.player.stop();
  h.tick();
  assert.equal(h.context.closed, 1);
  assert.equal(h.cleared, true);
  assert.equal(h.starts.length, 24);
});

test('denied music playback closes the audio context', async () => {
  const h = musicHarness({ denied: true });
  await assert.rejects(h.player.play(), /Denied/);
  assert.equal(h.context.closed, 1);
  assert.equal(h.starts.length, 0);
});

test('leaving the theme while audio is starting cannot restart the loop', async () => {
  const h = musicHarness({ pending: true });
  const playing = h.player.play();
  h.player.stop();
  h.finishResume();
  await playing;
  assert.equal(h.starts.length, 0);
  assert.equal(h.context.closed, 1);
});
