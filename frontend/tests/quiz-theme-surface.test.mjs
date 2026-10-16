import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const source = fs.readFileSync(new URL('../components/QuizThemeSurface.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
}).outputText;

function render(theme) {
  const result = { exports: {} };
  const dependencies = name => {
    if (name === './ThemeProvider') return { useTheme: () => ({ theme }) };
    if (name.endsWith('.module.css')) {
      return { default: new Proxy({}, { get: (_, key) => `scoped-${key}` }) };
    }
    return require(name);
  };
  new Function('require', 'module', 'exports', compiled)(dependencies, result, result.exports);
  return renderToStaticMarkup(React.createElement(result.exports.QuizThemeSurface, {
    className: 'quiz-question-pane',
  }, React.createElement('div', { className: 'quiz-content' }, 'Readable question')));
}

test('Wojak renders only its own decorative copy, never LARP copy', () => {
  const html = render('itsover');
  assert.match(html, /data-text="IT&#x27;S OVER\."/);
  assert.match(html, /scoped-itsover/);
  assert.doesNotMatch(html, /NO LIMIT|CLUTCH MODE|scoped-larp/);
});

test('LARP renders only its own decorative copy, never Wojak copy', () => {
  const html = render('larp');
  assert.match(html, /data-text="NO LIMIT\."/);
  assert.match(html, /scoped-larp/);
  assert.doesNotMatch(html, /hope\.exe|ACADEMIC WINTER|scoped-itsover/);
});

test('It Began renders its optimistic sunrise atmosphere', () => {
  const html = render('itbegan');
  assert.match(html, /data-text="IT BEGAN\."/);
  assert.match(html, /scoped-itbegan/);
  assert.doesNotMatch(html, /hope\.exe|ACADEMIC WINTER|CLUTCH MODE/);
});

for (const theme of ['itsover', 'larp', 'itbegan']) {
  test(`${theme} cannot leak plain captions or add a flex row without its CSS`, () => {
    const html = render(theme);
    assert.equal(html.replace(/<[^>]*>/g, ''), 'Readable question');
    assert.match(html, /aria-hidden="true"/);
    assert.match(html, /style="position:absolute;inset:0;pointer-events:none;overflow:hidden"/);
    assert.doesNotMatch(html, /quiz-theme-artwork|<img/);
  });
}

for (const theme of ['light', 'dark', 'midnight', 'emerald', 'cyberpunk']) {
  test(`${theme} renders no meme effects`, () => {
    const html = render(theme);
    assert.match(html, /Readable question/);
    assert.doesNotMatch(html, /data-text|scoped-atmosphere|scoped-pane/);
  });
}
