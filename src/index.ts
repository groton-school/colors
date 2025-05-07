import { Core } from '@battis/qui-cli.core';
import { register } from '@battis/qui-cli.plugin';
import { Root } from '@battis/qui-cli.root';
import fs from 'node:fs';
import path from 'node:path';
import * as CSS from './CSS.js';
import * as PHP from './PHP.js';
import * as Sass from './Sass.js';
import * as TypeScript from './TypeScript.js';

const name = '@groton/colors';
const src = import.meta.dirname;

async function run() {
  fs.mkdirSync(path.resolve(path.resolve(Root.path(), './dist')));
  await Promise.all([
    PHP.generate(),
    TypeScript.generate(),
    CSS.generate(),
    Sass.generate()
  ]);
}

await register({ name, src, run });
await Core.run();
