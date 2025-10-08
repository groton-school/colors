import * as Variant from './Variant.js';

const canonicalize = 'pascal';

export async function TypeScript(options: Variant.MinimalOptions = {}) {
  const config = { name: 'index.ts', prefix: '', suffix: '', ...options };
  Variant.output({
    name: config.name,
    canonicalize,
    filename: { prefix: 'dist/', suffix: '' },
    file: {
      prefix: Variant.summaries({
        prefix: 'export const ',
        equals: '=',
        assocStart: '{"',
        assocEnd: '"}',
        listStart: '["',
        listEnd: '"]',
        listEquals: '":"',
        listSeparator: '","',
        suffix: ';',
        canonicalize
      }),
      suffix: ''
    },
    line: { prefix: 'export const ', equals: "='", suffix: "';" },
    identifier: { prefix: config.prefix, suffix: config.suffix },
    transform: config.transform,
    append: config.append
  });
}

/*
async function TypeScriptDeclaration(options: Variant.MinimalOptions = {}) {
  const config = { name: 'index.d.ts', prefix: '', suffix: '', ...options };
  Variant.output({
    name: config.name,
    canonicalize,
    filename: { prefix: 'dist/', suffix: '' },
    file: {
      prefix: Variant.summaries({
        prefix: 'export declare const ',
        equals: '=',
        assocStart: '{"',
        assocEnd: '"}',
        listStart: '["',
        listEnd: '"]',
        listEquals: '":"',
        listSeparator: '","',
        suffix: ';',
        canonicalize
      }),
      suffix: ''
    },
    line: { prefix: 'export declare const ', equals: "='", suffix: "';" },
    identifier: { prefix: config.prefix, suffix: config.suffix },
    transform: config.transform,
    components: config.components,
    append: config.append
  });
}

export async function TypeScript(options: Variant.MinimalOptions = {}) {
  Javascript(options);
  TypeScriptDeclaration(options);
}
*/