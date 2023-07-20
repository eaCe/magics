# Alpine.js Magic helpers

This package provides some magic helpers for Alpine.js.

## Installation

Copy the magics.js file from the src folder into your project and include it in your JavaScript bundle.

## Usage

```js
import Alpine from 'alpinejs';
import Magics from './magics';

Alpine.plugin(Magics);
window.Alpine = Alpine
Alpine.start();
```

## Log Helpers

Every log-helper accepts one or two arguments. 
The first argument is the value to log. 
The second argument is a boolean value to clear the console before logging, if set to true.
You may pass an array of values as the first argument.

### `$log()`

```html
<div x-data="{ foo: 'bar' }">
    <button @click="$log(foo)">Log</button>
    <button @click="$log(['foo', ['foo', 'bar']], true)">Clear previous logs and log</button>
</div>
```

### `$warn()`

```html
<div x-data="{ foo: 'bar' }">
    <button @click="$warn(foo)">Log</button>
</div>
```

### `$error()`

```html
<div x-data="{ foo: 'bar' }">
    <button @click="$error(foo)">Log</button>
</div>
```

### `$info()`

```html
<div x-data="{ foo: 'bar' }">
    <button @click="$info(foo)">Log</button>
</div>
```

### `$table()`

```html
<div x-data="">
    <button @click="$table({ foo: 'bar', bar: 'foo'})">Log</button>
</div>
```

### `$clear()`

```html
<div x-data="">
    <button @click="clear();$log('foo')">Clear previous logs and log</button>
</div>
```

### `$group()` and `$groupEnd()`

```html
<div x-data="">
    <button @click="$group('Groupname');$log('foo');$log('bar');$groupEnd()">Group logs</button>
</div>
```

## Size Helpers

### `$width` and `$width()`

```html
<div x-data x-text="$width"></div>
<div x-data x-init="$width('200px')"></div>
```

### `$height` and `$height()`

```html
<div x-data x-text="$height"></div>
<div x-data x-init="$height('200px')"></div>
```

## Position Helpers

### `$offset().top` and `$offset().left`

```html
<div x-data x-text="$offset().top"></div>
<div x-data x-text="$offset().left"></div>
```

## Misc Helpers

### `$hasClass()`

```html
<div x-data x-text="$hasClass('foo')" class="foo"></div>
```

### `$trim()`

```html
<div x-data x-text="$trim(' foo ')"></div>
```
