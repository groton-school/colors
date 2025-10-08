import * as Variant from './Variant.js';

export async function Sass(options: Variant.MinimalOptions = {}) {
  const config = { name: '_index.scss', prefix: '', suffix: '', ...options };
  const canonicalize = 'kebab';
  Variant.output({
    name: config.name,
    canonicalize,
    filename: {
      prefix: '',
      suffix: ''
    },
    file: {
      prefix:
        Variant.summaries({
          prefix: '$',
          equals: ':',
          assocStart: '("',
          assocEnd: '")',
          listStart: '"',
          listEnd: '"',
          listEquals: '":"',
          listSeparator: '","',
          suffix: ';',
          canonicalize
        }) + `$variants: (`,
      suffix: ');'
    },
    line: { prefix: '', equals: ':', suffix: ',' },
    identifier: { prefix: config.prefix, suffix: config.suffix },
    transform: config.transform,
    components: config.components,
    append: config.append
  });
}
