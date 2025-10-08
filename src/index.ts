import { Core } from '@battis/qui-cli.core';
import { register } from '@battis/qui-cli.plugin';
import { Root } from '@battis/qui-cli.root';
import { Shell } from '@battis/qui-cli.shell';
import fs from 'node:fs';
import path from 'node:path';
import tinycolor from 'tinycolor2';
import { CSS } from './CSS.js';
import { PHP } from './PHP.js';
import { Sass } from './Sass.js';
import { TypeScript } from './TypeScript.js';

const name = '@groton/colors';
const src = import.meta.dirname;

function findReadable(color: string, background: string) {
  const darker = tinycolor(color);
  const lighter = darker.clone();
  while (true) {
    darker.darken(1);
    lighter.lighten(1);
    if (tinycolor.isReadable(lighter, background)) {
      return lighter.toHexString();
    } else if (tinycolor.isReadable(darker, background)) {
      return darker.toHexString();
    }
  }
}

const Variants = [
  { components: true },
  {
    prefix: 'text on ',
    transform: (color: string) => {
      const value = tinycolor(color);
      if (value.isDark()) {
        return '#ffffff';
      } else {
        return '#000000';
      }
    },
    append: true
  },
  {
    suffix: ' on white',
    transform: (color: string) => findReadable(color, 'white'),
    append: true
  },
  {
    suffix: ' on black',
    transform: (color: string) => findReadable(color, 'black'),
    append: true
  }
];

async function run() {
  fs.mkdirSync(path.resolve(path.resolve(Root.path(), './dist')));
  await Promise.all([
    ...Variants.map((variant) => PHP(variant)),
    ...Variants.map((variant) => TypeScript(variant)),
    ...Variants.map((variant) => CSS(variant)),
    ...Variants.map((variant) => Sass(variant))
  ]);
  Shell.exec('prettier -w dist _colors.scss vars.css');
  Shell.exec('php-cs-fixer fix dist');
}

await register({ name, src, run });
await Core.run();
