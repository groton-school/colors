import { Root } from '@battis/qui-cli.root';
import { Case } from 'change-case-all';
import fs from 'node:fs';
import path from 'node:path';
import * as prettier from 'prettier';
import { Abbreviations } from './Abbreviations.js';
import * as Colors from './Colors.js';

export async function generate(filepath = './vars.css') {
  const vars: string[] = [];
  let color: keyof typeof Colors;
  for (color in Colors) {
    const canonicalName = Case.kebab(color);
    vars.push(`--${canonicalName}: ${Colors[color]}`);
    if (color in Abbreviations) {
      // @ts-expect-error 7053 -- validity checked in if statement
      vars.push(`--${Abbreviations[color]}: ${Colors[color]}`);
    }
  }
  filepath = path.resolve(Root.path(), filepath);
  fs.writeFileSync(
    filepath,
    await prettier.format(`:root {${vars.join(';')};}`, { filepath })
  );
}
