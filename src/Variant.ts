import { Root } from '@qui-cli/root';
import { Case } from 'change-case-all';
import fs from 'node:fs';
import path from 'node:path';
import tinycolor from 'tinycolor2';
import { Abbreviations } from './Abbreviations.js';
import { Colors } from './Colors.js';
import { Overrides } from './Overrides.js';

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
  components?: boolean;
  append?: boolean;
};

export type MinimalOptions = {
  name?: string;
  prefix?: string;
  suffix?: string;
  transform?: (value: string) => string;
  append?: boolean;
  components?: boolean;
};

const Notations = {
  '': (value: string) => tinycolor(value).toHexString(),
  r: (value: string) => tinycolor(value).toRgb().r,
  g: (value: string) => tinycolor(value).toRgb().g,
  b: (value: string) => tinycolor(value).toRgb().b,
  h: (value: string) => tinycolor(value).toHsl().h,
  s: (value: string) => tinycolor(value).toHsl().s * 100 + '%',
  l: (value: string) => tinycolor(value).toHsl().l * 100 + '%'
};

export async function output(options: Options) {
  const lines = [options.file.prefix];
  const { transform = (v) => v } = options;
  let color: keyof typeof Colors;
  const { prefix, equals, suffix } = options.line;
  for (color in Colors) {
    const value =
      `${options.identifier.prefix}${color}${options.identifier.suffix}` in
      Overrides
        ? // @ts-expect-error 7053 -- validity checked in if statement
          Overrides[
            `${options.identifier.prefix}${color}${options.identifier.suffix}`
          ]
        : transform(Colors[color]);
    if (color in Abbreviations) {
      lines.push(
        // @ts-expect-error 7053 -- validity checked in if statement
        `${prefix}${Case[options.canonicalize](`${options.identifier.prefix}xxxx${Abbreviations[color]}yyyy${options.identifier.suffix}`)}${equals}${Notations[''](value)}${suffix}`.replace(
          /xxxx.+yyyy/i,
          // @ts-expect-error 7053 -- validity checked in if statement
          Abbreviations[color]
        )
      );
    }
    let notation: keyof typeof Notations;
    for (notation in Notations) {
      if (notation === '' || options.components) {
        const name = Case[options.canonicalize](
          `${options.identifier.prefix}${color}${options.identifier.suffix} ${notation}`.trim()
        );
        const version = Notations[notation](value);
        lines.push(`${prefix}${name}${equals}${version}${suffix}`);
      }
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
}

type SummaryOptions = {
  prefix: string;
  equals: string;
  assocStart: string;
  assocEnd: string;
  listStart: string;
  listEnd: string;
  listEquals: string;
  listSeparator: string;
  suffix: string;
  canonicalize: Options['canonicalize'];
};

export function summaries(options: SummaryOptions) {
  return `${options.prefix}${Case[options.canonicalize]('abbreviations')}${options.equals}${options.assocStart}${Object.keys(
    Abbreviations
  )
    .map(
      (key) =>
        `${Abbreviations[key as keyof typeof Abbreviations]}${options.listEquals}${Case[options.canonicalize](key)}`
    )
    .join(options.listSeparator)}${options.assocEnd}${options.suffix}
    ${options.prefix}${Case[options.canonicalize]('all')}${options.equals}${options.listStart}${Object.keys(
      Colors
    )
      .map((key) => `${Case[options.canonicalize](key)}`)
      .join(options.listSeparator)}${options.listEnd}${options.suffix}`;
}
