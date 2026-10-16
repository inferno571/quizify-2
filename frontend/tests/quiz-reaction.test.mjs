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

test('only the Its Over theme replaces the reaction; rendering never starts sound', () => {
  let plays = 0;
  const { ItsOverButton } = load('../components/ItsOverButton.tsx', name => {
    if (name === '../lib/itsOverSound') return { playItsOverSound: () => { plays++; } };
    if (name.endsWith('.module.css')) return { default: {} };
    return require(name);
  });
  for (const theme of ['itsover', 'larp', 'light', 'dark', 'midnight', 'emerald', 'cyberpunk']) {
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
