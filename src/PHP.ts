import { Root } from '@battis/qui-cli.root';
import { Shell } from '@battis/qui-cli.shell';
import { Case } from 'change-case-all';
import fs from 'node:fs';
import path from 'node:path';
import tinycolor from 'tinycolor2';
import * as Colors from './Colors.js';

export async function generate(filepath = './dist/Colors.php') {
  const consts: string[] = [];
  let color: keyof typeof Colors;
  for (color in Colors) {
    const canonicalName = Case.constant(color);
    consts.push(
      ...[
        `public const ${canonicalName} = "${tinycolor(Colors[color]).toHexString()}";`,
        `public const ${canonicalName}_RGB = "${tinycolor(Colors[color]).toRgbString()}";`,
        `public const ${canonicalName}_HSL = "${tinycolor(Colors[color]).toHslString()}";`
      ]
    );
  }
  filepath = path.resolve(Root.path(), filepath);
  fs.writeFileSync(
    filepath,
    `<?php declare(strict_types=1); namespace GrotonSchool; class Colors {${consts.join('')}}`
  );
  Shell.exec(`php-cs-fixer fix ${filepath}`);
}
