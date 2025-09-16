import { Root } from '@battis/qui-cli.root';
import { Shell } from '@battis/qui-cli.shell';
import { Case } from 'change-case-all';
import fs from 'node:fs';
import path from 'node:path';
import tinycolor from 'tinycolor2';
import { Abbreviations } from './Abbreviations.js';
import * as Colors from './Colors.js';

export const FILEPATH = '%FILEPATH%';

type Context = {
  prefix: string;
  suffix: string;
};

type Options = {
  name: string;
  canonicalize:
    | 'camel'
    | 'capital'
    | 'constant'
    | 'dot'
    | 'kebab'
    | 'no'
    | 'pascal'
    | 'path'
    | 'sentence'
    | 'snake'
    | 'train'
    | 'sponge'
    | 'swap'
    | 'title';
  filename: Context;
  file: Context;
  line: Context & { equals: string };
  identifier: Context;
  transform?: (value: string) => string;
  prettier?: string;
  append?: boolean;
};

export type MinimalOptions = {
  name?: string;
  prefix?: string;
  suffix?: string;
  transform?: (value: string) => string;
  append?: boolean;
};

const Notations = {
  '': (value: string) => tinycolor(value).toHexString(),
  hex: (value: string) => tinycolor(value).toHexString(),
  rgb: (value: string) => tinycolor(value).toRgbString(),
  hsl: (value: string) => tinycolor(value).toHslString()
};

export async function output(options: Options) {
  const lines = [options.file.prefix];
  const { transform = (v) => v } = options;
  let color: keyof typeof Colors;
  const { prefix, equals, suffix } = options.line;
  for (color in Colors) {
    const value = transform(Colors[color]);
    if (color in Abbreviations) {
      lines.push(
        // @ts-expect-error 7053 -- validity checked in if statement
        `${prefix}${Case[options.canonicalize](`${options.identifier.prefix}${Abbreviations[color]}${options.identifier.suffix}`)}${equals}${Notations['hex'](value)}${suffix}`
      );
    }
    let notation: keyof typeof Notations;
    for (notation in Notations) {
      const name = Case[options.canonicalize](
        `${options.identifier.prefix}${color}${options.identifier.suffix} ${notation}`.trim()
      );
      const version = Notations[notation](value);
      lines.push(`${prefix}${name}${equals}${version}${suffix}`);
    }
  }
  lines.push(options.file.suffix);
  const filepath = path.resolve(
    Root.path(),
    `${options.filename.prefix}${options.name}${options.filename.suffix}`
  );
  if (options.append) {
    lines.shift();
    let previous = fs.readFileSync(filepath).toString();
    previous = previous.substring(
      0,
      previous.length - options.file.suffix.length - 1
    );
    lines.unshift(previous);
  }
  fs.writeFileSync(filepath, lines.join('\n'));
  let { prettier } = options;
  if (!prettier) {
    prettier = `prettier -w ${FILEPATH}`;
  }
  Shell.exec(prettier.replace(FILEPATH, `"${filepath}"`));
}
