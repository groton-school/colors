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

Color constants are defined in camelCase, PascalCase, CONSTANT_CASE, or kebab-case as is normal for their language context. For color blocks, their standard abbreviation is also included in every language (e.g. `RED` and `RD` in PHP, or `--red` and `--rd` in CSS).

- `No Color` -- a gray for information not associated with a color block
- `Red`
- `Orange`
- `Yellow`
- `Green`
- `LightBlue`
- `DarkBlue`
- `Purple`
- `GrotonRed` -- the school color

The hex color is defined in every context. To specifically access the Hex, RGB, or HSL definition of a color, it is also provided with the matching suffix: `--red-hex` or `RedRgb` or `RED_RGB`, etc.

### Variants

Three color variants are provided with each color:

1. Text on the color (automatically choosing white or black for readability): `--text-on-red`, `TEXT_ON_RED`, etc.
2. The color on white (automatically adjusted for readability): `$red-on-white`, `RedOnWhite`, etc.
3. The color on black (automatically adjusted for readability): `RED_ON_BLACK`, `$red-on-black`, etc.

## Usage

### TypeScript or JavasScript ESM modules

```ts
import * as Colors from '@groton/colors';

console.log(Colors.GrotonRed);
console.log(Colors.DarkBlueHsl);
console.log(Colors.PurpleRgb);
```

### JavaScript CommonJS module

```js
const Colors = require('@groton/colors');

console.log(Colors.GrotonRed);
console.log(Colors.DarkBlueHsl);
console.log(Colors.PurpleRgb);
```

### PHP

```php
use GrotonSchool\Colors;

echo Colors.GROTON_RED;
echo Colors.DARK_BLUE_HSL;
echo Colors.PURPLE_RGB;
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
  color: colors.$dark-blue-hsl;
  background: var(--purple-rgb);
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
  href="https://cdn.jsdelivr.net/npm/@groton/colors@0.2.0/vars.css"
/>
```

Use the variables:

```css
.my-style {
  background: var(--groton-red);
}

.my-other-style {
  color: var(--dark-blue-hsl);
  background: var(--purple-rgb);
}
```

<iframe src="./preview.html" style="border: 0; height: 600px; width: 100%"></iframe>
