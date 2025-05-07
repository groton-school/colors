# @groton/colors

Standard colors for Groton School apps

[![npm version](https://badge.fury.io/js/@groton%2Fcolors.svg)](https://badge.fury.io/js/@groton%2Fcolors)
[![Packagist Version](https://img.shields.io/packagist/v/groton-school/colors.svg)](https://packagist.org/packages/groton-school/colors)

## Install

### Node `npm`

```sh
npm i @groton/colors
```

### PHP `composer`

```sh
composer require groton-school/colors
```

## Color Constants

Color constants are defined in camelCase, PascalCase, CONSTANT_CASE, or kebab-case as is normal for their language context.

- `NoColor`/`noColor`/`NO_COLOR`/`no-color` -- a gray for information not associated with a color block
- `Red`
- `Orange`
- `Yellow`
- `Green`
- `LightBlue`
- `DarkBlue`
- `Purple`
- `GrotonRed` -- the school color

The hex color is defined in every context. In contexts where it may also be helpful to have the RGB or HSL color definition (PHP, TypeScript, JavaScript) it is also provided with the matching suffix: `RedRGB` or `RED_RGB`, etc.

## Usage

### TypeScript or JavasScript ESM modules

```ts
import * as Colors from '@groton/colors';

console.log(Colors.GrotonRed);
console.log(Colors.DarkBlueHSL);
console.log(Colors.PurpleRGB);
```

### JavaScript CommonJS module

```js
const Colors = require('@groton/colors');

console.log(Colors.GrotonRed);
console.log(Colors.DarkBlueHSL);
console.log(Colors.PurpleRGB);
```

# PHP

```php
use GrotonSchool\Colors;

echo Colors.GROTON_RED;
echo Colors.DARK_BLUE_HSL;
echo Colors.PURPL_RGB;
```

### Sass/SCSS

```scss
// Sass $variables
@use '../node_modules/@groton/colors/colors';

// CSS --variables
@use '../node_modules/@groton/colors/vars.css';

.my-style {
  background: colors.$groton-red;
}

.my-other-style {
  color: colors.$dark-blue;
  background: var(--purple);
}

// N.B. using the Sass variables to initialize CSS variables requires string interpolation
:root {
  --my-color: #{colors.$green};
}
```

### CSS

Add the CSS variables to a TypeScript module:

```ts
import '@groton/colors/vars.css';
```

Use a CDN to get the variables:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@groton/colors@0.1.0/vars.css"
/>
```
