import Alpine from 'alpinejs';
import Magics from '../src/magics';

beforeAll(() => {
  Alpine.plugin(Magics);
  window.Alpine = Alpine;
  Alpine.start();
});

afterEach(() => {
  console.clear();
});

const mutateDom = () => Alpine.mutateDom(() => {
  Alpine.initTree(document.body);
});

test('log > console.log()', async () => {
  const logSpy = jest.spyOn(global.console, 'log');

  document.body.innerHTML = `<div x-data="{title: 'foo'}" x-init="$log(title)"></div>`;

  mutateDom();

  expect(logSpy).toHaveBeenCalled();
  expect(logSpy).toHaveBeenCalledTimes(1);
  expect(logSpy).toHaveBeenCalledWith('foo');
  expect(logSpy.mock.calls).toContainEqual(['foo']);

  logSpy.mockRestore();
});

test('log > console.log() with clear', async () => {
  const logSpy = jest.spyOn(global.console, 'log');
  const clearLogSpy = jest.spyOn(global.console, 'clear');

  document.body.innerHTML = `<div x-data="{title: 'foo'}" x-init="$log(title);$log('bar',true)"></div>`;

  mutateDom();

  jest.setTimeout(200);

  expect(clearLogSpy).toHaveBeenCalled();
  expect(clearLogSpy).toHaveBeenCalledTimes(1);
  expect(logSpy).toHaveBeenCalled();
  expect(logSpy).toHaveBeenCalledTimes(2);
  expect(logSpy).toHaveBeenCalledWith('bar');
  expect(logSpy.mock.calls).toContainEqual(['bar']);

  logSpy.mockRestore();
});

test('info > console.info()', async () => {
  const logSpy = jest.spyOn(global.console, 'info');

  document.body.innerHTML = `<div x-data="{title: 'foo'}" x-init="$info(title)"></div>`;

  mutateDom();

  expect(logSpy).toHaveBeenCalled();
  expect(logSpy).toHaveBeenCalledTimes(1);
  expect(logSpy).toHaveBeenCalledWith('foo');
  expect(logSpy.mock.calls).toContainEqual(['foo']);

  logSpy.mockRestore();
});

test('warn > console.warn()', async () => {
  const logSpy = jest.spyOn(global.console, 'warn');

  document.body.innerHTML = `<div x-data="{title: 'foo'}" x-init="$warn(title)"></div>`;

  mutateDom();

  expect(logSpy).toHaveBeenCalled();
  expect(logSpy).toHaveBeenCalledTimes(1);
  expect(logSpy).toHaveBeenCalledWith('foo');
  expect(logSpy.mock.calls).toContainEqual(['foo']);

  logSpy.mockRestore();
});

test('error > console.error()', async () => {
  const logSpy = jest.spyOn(global.console, 'error');

  document.body.innerHTML = `<div x-data="{title: 'foo'}" x-init="$error(title)"></div>`;

  mutateDom();

  expect(logSpy).toHaveBeenCalled();
  expect(logSpy).toHaveBeenCalledTimes(1);
  expect(logSpy).toHaveBeenCalledWith('foo');
  expect(logSpy.mock.calls).toContainEqual(['foo']);

  logSpy.mockRestore();
});

test('table > console.table()', async () => {
  const logSpy = jest.spyOn(global.console, 'table');

  document.body.innerHTML = `<div x-data x-init="$table({ foo: 'bar', bar: 'foo'})"></div>`;

  mutateDom();

  expect(logSpy).toHaveBeenCalled();
  expect(logSpy).toHaveBeenCalledTimes(1);
  expect(logSpy).toHaveBeenCalledWith({ foo: 'bar', bar: 'foo' });
  expect(logSpy.mock.calls[0][0]).toEqual({ foo: 'bar', bar: 'foo' });

  logSpy.mockRestore();
});

test('assert true > console.assert()', async () => {
  const logSpy = jest.spyOn(global.console, 'assert');

  document.body.innerHTML = `<div x-data x-init="$assert([true, 'Failed'])"></div>`;

  mutateDom();

  expect(logSpy).toHaveBeenCalled();
  expect(logSpy).toHaveBeenCalledTimes(1);
  expect(logSpy.mock.calls).toContainEqual([true, 'Failed']);

  logSpy.mockRestore();
});

test('assert false > console.assert()', async () => {
  const logSpy = jest.spyOn(global.console, 'assert');

  document.body.innerHTML = `<div x-data x-init="$assert([false, 'Failed'])"></div>`;

  mutateDom();

  expect(logSpy).toHaveBeenCalled();
  expect(logSpy).toHaveBeenCalledTimes(1);
  expect(logSpy.mock.calls).toContainEqual([false, 'Failed']);

  logSpy.mockRestore();
});

test('group and groupEnd > console.group() and console.groupEnd()', async () => {
  const logSpy = jest.spyOn(global.console, 'log');
  const groupSpy = jest.spyOn(global.console, 'group');
  const groupEndSpy = jest.spyOn(global.console, 'groupEnd');

  document.body.innerHTML = `<div x-data x-init="$group('Groupname');$log('foo');$groupEnd()"></div>`;

  mutateDom();

  expect(groupSpy).toHaveBeenCalled();
  expect(groupSpy).toHaveBeenCalledTimes(1);
  expect(logSpy).toHaveBeenCalled();
  expect(logSpy).toHaveBeenCalledTimes(1);
  expect(groupEndSpy).toHaveBeenCalled();
  expect(groupEndSpy).toHaveBeenCalledTimes(1);

  expect(groupSpy.mock.calls).toContainEqual(['Groupname']);
  expect(logSpy.mock.calls).toContainEqual(['foo']);

  logSpy.mockRestore();
});

test('offset > offset.left and offset.top', async () => {
  document.body.innerHTML = `<div x-data x-text="$offset().top + ', ' + $offset().left" id="foo" style="margin-top:250px"></div>`;

  const div = document.getElementById('foo');
  div.getBoundingClientRect = () => ({ top: 100, left: 200 });

  mutateDom();

  expect(document.getElementById('foo').innerHTML).toEqual('100, 200');
});
