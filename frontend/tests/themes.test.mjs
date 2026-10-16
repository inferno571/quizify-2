import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const testDirectory = path.dirname(fileURLToPath(import.meta.url));
import vm from 'node:vm';
import ts from 'typescript';

function harness({ saved, dark = false, blocked = false } = {}) {
  const values = new Map(saved ? [['quizify_theme', saved]] : []);
  const media = new EventTarget();
  media.matches = dark;
  const window = new EventTarget();
  window.matchMedia = () => media;
  const root = { dataset: {}, style: {}, classList: { toggle: (_, value) => { root.dark = value; } } };
  const meta = { setAttribute: (_, value) => { meta.color = value; } };
  const localStorage = {
    getItem: key => { if (blocked) throw new Error('Storage denied'); return values.get(key) ?? null; },
    setItem: (key, value) => { if (blocked) throw new Error('Storage denied'); values.set(key, value); },
  };
  let store;
  const react = {
    createContext: () => ({ Provider: 'provider' }),
    useContext: value => value,
    useSyncExternalStore: (subscribe, getSnapshot, serverSnapshot) => {
      store = { subscribe, getSnapshot, serverSnapshot };
      return getSnapshot();
    },
  };
  const context = vm.createContext({ window, localStorage, CustomEvent,
    document: { documentElement: root, querySelector: () => meta } });
  const cache = new Map();
  function load(relative) {
    const filename = path.resolve(testDirectory, '..', relative);
    if (cache.has(filename)) return cache.get(filename);
    const compiledModule = { exports: {} };
    const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    const requireLocal = name => {
      if (name === 'react') return react;
      if (name === 'react/jsx-runtime') return { jsx: (type, props) => ({ type, props }) };
      if (name === '../lib/themes') return load('lib/themes.ts');
      throw new Error('Unexpected dependency: ' + name);
    };
    vm.runInContext('(function(require, module, exports) {' + source + '\n})', context)(requireLocal, compiledModule, compiledModule.exports);
    cache.set(filename, compiledModule.exports);
    return compiledModule.exports;
  }
  const definitions = load('lib/themes.ts');
  const boot = () => vm.runInContext(definitions.themeInitScript, context);
  const provider = () => load('components/ThemeProvider.tsx').ThemeProvider({ children: null }).props.value;
  const storage = value => {
    if (value === null) values.delete('quizify_theme'); else values.set('quizify_theme', value);
    const event = new Event('storage');
    Object.assign(event, { key: 'quizify_theme', newValue: value });
    window.dispatchEvent(event);
  };
  return { definitions, boot, provider, root, meta, media, window, storage, get store() { return store; } };
}

for (const theme of ['light', 'dark', 'midnight', 'emerald', 'cyberpunk', 'larp', 'itsover', 'itbegan']) {
  test('saved ' + theme + ' agrees at first paint and hydration', () => {
    const h = harness({ saved: theme, dark: true });
    h.boot();
    const value = h.provider();
    assert.equal(h.root.dataset.theme, value.theme);
    assert.equal(value.theme, theme);
    assert.equal(h.root.dark, value.isDark);
    assert.equal(h.meta.color, value.currentThemeDef.previewBg);
  });
}
for (const options of [{ saved: 'invalid', dark: true }, { blocked: true, dark: true }, { dark: false }]) {
  test('system fallback: ' + JSON.stringify(options), () => {
    const h = harness(options); h.boot();
    assert.equal(h.root.dataset.theme, options.dark ? 'dark' : 'light');
    assert.equal(h.provider().theme, h.root.dataset.theme);
  });
}
test('system changes, explicit preferences, cross-tab changes and clearing preferences', () => {
  const h = harness(); h.boot(); h.provider();
  const unsubscribe = h.store.subscribe(() => {});
  h.media.matches = true; h.media.dispatchEvent(new Event('change'));
  assert.equal(h.provider().theme, 'dark');
  h.provider().setTheme('emerald');
  h.media.matches = false; h.media.dispatchEvent(new Event('change'));
  assert.equal(h.provider().theme, 'emerald');
  h.storage('cyberpunk'); assert.equal(h.root.dataset.theme, 'cyberpunk');
  h.storage(null); assert.equal(h.root.dataset.theme, 'light');
  h.window.dispatchEvent(new CustomEvent('quizify_theme_change', { detail: 'invalid' }));
  assert.equal(h.provider().theme, 'light');
  unsubscribe();
});
test('storage denial still permits changing themes and toggling a colour theme to light', () => {
  const h = harness({ blocked: true }); h.boot(); h.provider();
  const unsubscribe = h.store.subscribe(() => {});
  h.provider().setTheme('midnight');
  assert.equal(h.provider().theme, 'midnight');
  assert.equal(h.root.dataset.theme, 'midnight');
  h.provider().toggleTheme();
  assert.equal(h.provider().theme, 'light');
  unsubscribe();
});
