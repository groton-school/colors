import { Root } from '@battis/qui-cli.root';
import { Shell } from '@battis/qui-cli.shell';
import { Case } from 'change-case-all';
import fs from 'node:fs';
import path from 'node:path';
import tinycolor from 'tinycolor2';
import { Abbreviations } from './Abbreviations.js';
import * as Colors from './Colors.js';

export async function generate(filepath = './dist/Colors.php') {
  const consts: string[] = [];
  let color: keyof typeof Colors;
  for (color in Colors) {
    const canonicalName = Case.constant(color);
    const value = tinycolor(Colors[color]);
    consts.push(
      ...[
        `public const ${canonicalName} = "${value.toHexString()}"`,
        `public const ${canonicalName}_RGB = "${value.toRgbString()}"`,
        `public const ${canonicalName}_HSL = "${value.toHslString()}"`
      ]
    );
    if (color in Abbreviations) {
      consts.push(
        // @ts-expect-error 7053 -- validity checked in if statement
        `public const ${Abbreviations[color]} = "${value.toHexString()}"`
      );
    }
  }
  filepath = path.resolve(Root.path(), filepath);
  fs.writeFileSync(
    filepath,
    `<?php declare(strict_types=1); namespace GrotonSchool; class Colors {${consts.join(';')};}`
  );
  Shell.exec(`php-cs-fixer fix ${filepath}`);
}
