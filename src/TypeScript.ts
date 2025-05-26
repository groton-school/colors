import { Root } from '@battis/qui-cli.root';
import { Case } from 'change-case-all';
import fs from 'node:fs';
import path from 'node:path';
import * as prettier from 'prettier';
import tinycolor from 'tinycolor2';
import { Abbreviations } from './Abbreviations.js';
import * as Colors from './Colors.js';

export const foo = 'bar';

export async function generate(filepath = './dist/index.ts') {
  const consts: string[] = [];
  let color: keyof typeof Colors;
  for (color in Colors) {
    const canonicalName = Case.pascal(color);
    const value = tinycolor(Colors[color]);
    consts.push(
      ...[
        `export const ${canonicalName} = '${value.toHexString()}'`,
        `export const ${canonicalName}Rgb = '${value.toRgbString()}'`,
        `export const ${canonicalName}Hsl = '${value.toHslString()}'`
      ]
    );
    if (color in Abbreviations) {
      consts.push(
        // @ts-expect-error 7053 -- validity checked in if statement
        `export const ${Abbreviations[color]} = '${value.toHexString()}'`
      );
    }
  }
  filepath = path.resolve(
    Root.path(),
    filepath.replace(path.extname(filepath), '.js')
  );
  fs.writeFileSync(
    filepath,
    await prettier.format(`${consts.join(';')};`, { filepath })
  );
  filepath = filepath.replace(/\.js$/, '.d.ts');
  fs.writeFileSync(
    filepath,
    await prettier.format(
      `${consts
        .map((c) => c.replace('export const', 'export declare const'))
        .join(';')};`,
      { filepath }
    )
  );
}
