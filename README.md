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

The following colors are defined:

- `No Color` -- a gray for information not associated with a color block
- `Red` / `RD`
- `Orange` / `OR`
- `Yellow` / `YL`
- `Green` / `GR`
- `Light Blue` / `LB`
- `Dark Blue` / `DB`
- `Purple` / `PR`
- `Groton Red` -- the school color

Color constants are defined in the following cases for each language:

| Language               | Case                      | Example                                                                                                       |
| ---------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| TypeScript, JavaScript | PascalCase                | `Colors.NoColor`, `Colors.Red`, `Colors.RD`                                                                   |
| Sass/SCSS              | kebab-case                | `map.get(colors.$variants, 'no-color')`, `map.get(colors.$variants, 'red')`, `map.get(colors.$variants,'RD')` |
| CSS                    | kebab-case variable names | `var(--no-color)`, `var(--red)`, `var(--RD)`                                                                  |
| PHP                    | CONSTANT_CASE             | `Colors.NO_COLOR`, `Colors.RED`, `Colors.RD`                                                                  |

The hex color is defined in every context. The RGB and HSL components of the base color are also defined (`RED_R`, `RED_G`, `RED_B` in PHP, `--red-h`, `--red-s`, `--red-l` in CSS, etc.)

### Color Components

For the base color, the red, green, and blue components of RGB and the hue, saturation, and lightness components of HSL are defined for convenience in creating ranges of transparency/lightness/saturation.

| Language               | Examples                                                                   |
| ---------------------- | -------------------------------------------------------------------------- |
| TypeScript, Javascript | `Colors.RedR`, `Colors.RedH`                                               |
| SCSS/Sass              | `map.get(colors.$variants, 'red-r')`, `map.get(colors.$variants, 'red-h')` |
| CSS                    | `var(--red-r)`, `var(--red-h)`                                             |
| PHP                    | `Colors.RED_R`, `COLORS.RED_H`                                             |

### Variants

Three color variants are provided for each base color, for use as colored text or text on colored backgrounds.

| Variant                                                                   | TS/JS               | SCSS                                        | CSS                   | PHP                   |
| ------------------------------------------------------------------------- | ------------------- | ------------------------------------------- | --------------------- | --------------------- |
| Text on the color (automatically choosing white or black for readability) | `Colors.TextOnRed`  | `map.get(colors.$variants, 'text-on-red')`  | `var(--text-on-red)`  | `Colors.TEXT_ON_RED`  |
| The color on white (automatically adjusted for readability)               | `Colors.RedOnWhite` | `map.get(colors.$variants, 'red-on-white')` | `var(--red-on-white)` | `Colors.RED_ON_WHITE` |
| The color on black (automatically adjusted for readability)               | `Colors.RedOnBlack` | `map.get(colors.$variants, 'red-on-black')` | `var(--red-on-black)` | `Colors.RED_ON_BLACK` |

## Usage

### TypeScript or JavasScript ESM modules

```ts
import * as Colors from '@groton/colors';

console.log(Colors.GrotonRed);
console.log(Colors.DarkBlueOnBlack);
console.log(Colors.TextOnPurple);
```

### JavaScript CommonJS module

```js
const Colors = require('@groton/colors');

console.log(Colors.GrotonRed);
console.log(Colors.DarkBlueOnBlack);
console.log(Colors.TextOnPurple);
```

### PHP

```php
use GrotonSchool\Colors;

echo Colors.GROTON_RED;
echo Colors.DARK_BLUE_ON_BLACK;
echo Colors.TEXT_ON_PURPLE;
```

### Sass/SCSS

```scss
// Sass $variables
@use '@groton/colors';

// CSS --variables
@use '@groton/colors/vars.css';

.my-style {
  background: map.get(colors.$variants, 'groton-red');
}

.my-other-style {
  color: map.get(colors.$variant, 'dark-blue-on-black');
  background: var(--text-on-purple);
}

// N.B. using the Sass variables to initialize CSS variables requires string interpolation
:root {
  --my-color: #{map.get(colors.$variants, 'green')};
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
  href="https://cdn.jsdelivr.net/npm/@groton/colors@0.4.0/vars.css"
/>
```

Use the variables:

```css
.my-style {
  background: var(--groton-red);
}

.my-other-style {
  color: var(--dark-blue-on-black);
  background: var(--text-on-purple);
}
```

<iframe src="./preview.html" style="border: 0; height: 600px; width: 100%"></iframe>
