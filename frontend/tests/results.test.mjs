import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
const require = createRequire(import.meta.url);
function render(props, active = 'INCORRECT') {
  const source = fs.readFileSync(new URL('../components/ResultsScreen.tsx', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const module = { exports: {} };
  let state = 0;
  const deps = name => {
    if (name === 'react') return { ...React, useEffect() {}, useState(value) { return [state++ === 0 ? active : value, () => {}]; } };
    if (name === 'motion/react') return { motion: { div: ({ children, className }) => React.createElement('div', { className }, children) } };
    if (name === './MathText') return { MathText: ({ text }) => React.createElement('span', null, text) };
    if (name === './Leaderboard') return { Leaderboard: () => null };
    return require(name);
  };
  new Function('require', 'module', 'exports', compiled)(deps, module, module.exports);
  return renderToStaticMarkup(React.createElement(module.exports.ResultsScreen, { starred: [], onBack() {}, ...props }));
}
const quiz = { id: 'test', title: 'Test', questions: [
  { question: 'Correct single question', options: ['A', 'B'], correctAnswer: 'A', explanation: 'First explanation' },
  { question: 'Wrong single question', options: ['C', 'D'], correctAnswer: 'C', explanation: 'Second explanation' },
  { question: 'Skipped question', options: ['E', 'F'], correctAnswer: 'E', explanation: 'Third explanation' },
  { question: 'Multi select question', options: ['G', 'H', 'I'], correctAnswer: ['G', 'H'], explanation: 'Fourth explanation' },
] };
test('Incorrect includes mistakes and unanswered questions independently of stars', () => {
  const html = render({ quiz, answers: { 0: 'A', 1: 'D', 3: ['h', ' g '] } });
  assert.match(html, /Wrong single question/);
  assert.match(html, /Skipped question/);
  assert.match(html, /Unanswered/);
  assert.match(html, /Second explanation/);
  assert.match(html, /Correct answer:/);
  assert.doesNotMatch(html, /Correct single question|Multi select question/);
});
test('partial MSQ answers are incorrect and complete unordered answers are correct', () => {
  const html = render({ quiz, answers: { 0: 'A', 1: 'C', 2: 'E', 3: ['G'] } });
  assert.match(html, /Multi select question/);
  assert.doesNotMatch(html, /Wrong single question|Skipped question/);
});
test('perfect results have a friendly empty state', () => {
  const html = render({ quiz, answers: { 0: 'A', 1: 'C', 2: 'E', 3: ['H', 'G'] } });
  assert.match(html, /No incorrect answers/);
  assert.doesNotMatch(html, /Correct single question|Wrong single question|Skipped question|Multi select question/);
});
test('two-player incorrect section includes mistakes by either player', () => {
  const html = render({ quiz, isTwoPlayer: true, answers: {}, player1Answers: { 0: 'A', 1: 'C', 2: 'E', 3: ['G', 'H'] }, player2Answers: { 0: 'B', 1: 'C', 2: 'E', 3: ['G', 'H'] } });
  assert.match(html, /Correct single question/);
  assert.match(html, /Questions either player missed/);
  assert.doesNotMatch(html, /Wrong single question|Skipped question|Multi select question/);
});
test('overview continues to show all questions', () => {
  const html = render({ quiz, answers: { 0: 'A' } }, 'OVERVIEW');
  for (const question of quiz.questions) assert.ok(html.includes(question.question));
});
