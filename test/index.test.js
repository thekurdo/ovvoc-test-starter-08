import assert from 'assert';
import {  formatLog, createLogger, formatTable, LOG_LEVELS  } from '../src/index.js';
import {  theme, colorize, rainbow, progressBar  } from '../src/colors.js';

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
  } catch (e) {
    console.error(`FAIL: ${name} — ${e.message}`);
    failed++;
  }
}

// formatLog tests
test('formatLog returns string with level', () => {
  const result = formatLog('error', 'Something went wrong');
  assert(typeof result === 'string');
  assert(result.includes('ERROR'));
});

test('formatLog includes context when provided', () => {
  const result = formatLog('info', 'test', { key: 'value' });
  assert(result.includes('Context'));
  assert(result.includes('key'));
});

test('formatLog handles unknown level', () => {
  const result = formatLog('custom', 'test message');
  assert(typeof result === 'string');
  assert(result.includes('CUSTOM'));
});

// createLogger tests
test('createLogger returns object with all methods', () => {
  const logger = createLogger('TestApp');
  assert(typeof logger.error === 'function');
  assert(typeof logger.warn === 'function');
  assert(typeof logger.info === 'function');
  assert(typeof logger.success === 'function');
  assert(typeof logger.debug === 'function');
});

// formatTable tests
test('formatTable formats headers and rows', () => {
  const result = formatTable(['Name', 'Age'], [['Alice', 30], ['Bob', 25]]);
  assert(typeof result === 'string');
  assert(result.includes('Alice'));
  assert(result.includes('Bob'));
});

// Color utility tests
test('theme has all color functions', () => {
  assert(typeof theme.primary === 'function');
  assert(typeof theme.secondary === 'function');
  assert(typeof theme.accent === 'function');
  assert(typeof theme.muted === 'function');
  assert(typeof theme.highlight === 'function');
});

test('colorize applies named colors', () => {
  const result = colorize('test', 'red');
  assert(typeof result === 'string');
});

test('colorize applies hex colors', () => {
  const result = colorize('test', '#FF0000');
  assert(typeof result === 'string');
});

test('colorize returns plain text for unknown', () => {
  const result = colorize('test', 'nonexistent');
  assert(result === 'test');
});

test('rainbow returns colored string', () => {
  const result = rainbow('Hello');
  assert(typeof result === 'string');
  assert(result.length > 0);
});

test('progressBar shows percentage', () => {
  const result = progressBar(50, 100);
  assert(result.includes('50%'));
  assert(result.includes('50/100'));
});

test('progressBar handles zero', () => {
  const result = progressBar(0, 100);
  assert(result.includes('0%'));
});

test('LOG_LEVELS has all levels', () => {
  assert(typeof LOG_LEVELS.error === 'function');
  assert(typeof LOG_LEVELS.warn === 'function');
  assert(typeof LOG_LEVELS.info === 'function');
  assert(typeof LOG_LEVELS.success === 'function');
  assert(typeof LOG_LEVELS.debug === 'function');
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
