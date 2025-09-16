import * as Variant from './Variant.js';

export async function CSS(options: Variant.MinimalOptions = {}) {
  const config = { name: 'vars.css', prefix: '', suffix: '', ...options };
  Variant.output({
    name: config.name,
    canonicalize: 'kebab',
    filename: { prefix: '', suffix: '' },
    file: { prefix: `:root {`, suffix: `}` },
    line: { prefix: `--`, equals: ':', suffix: ';' },
    identifier: { prefix: config.prefix, suffix: config.suffix },
    transform: config.transform,
    append: config.append
  });
}
