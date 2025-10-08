import path from 'node:path';
import * as Variant from './Variant.js';

export async function PHP(options: Variant.MinimalOptions) {
  const config = { name: 'Colors.php', prefix: '', suffix: '', ...options };
  const name = path.basename(config.name, '.php');
  Variant.output({
    name: config.name,
    canonicalize: 'constant',
    filename: { prefix: 'dist/', suffix: '' },
    file: {
      prefix: `<?php
declare(strict_types=1);
namespace GrotonSchool;
class ${name}
{`,
      suffix: `}`
    },
    line: {
      prefix: `public const `,
      equals: `="`,
      suffix: '";'
    },
    identifier: {
      prefix: config.prefix,
      suffix: config.suffix
    },
    transform: config.transform,
    components: config.components,
    append: config.append
  });
}
