import * as Variant from './Variant.js';

export async function Sass(options: Variant.MinimalOptions = {}) {
  const config = { name: '_colors.scss', prefix: '', suffix: '', ...options };
  Variant.output({
    name: config.name,
    canonicalize: 'kebab',
    filename: { prefix: '', suffix: '' },
    file: { prefix: '', suffix: '' },
    line: { prefix: '$', equals: ':', suffix: ';' },
    identifier: { prefix: config.prefix, suffix: config.suffix },
    transform: config.transform,
    append: config.append
  });
}
