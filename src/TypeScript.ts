import * as Variant from './Variant.js';

async function Javascript(options: Variant.MinimalOptions = {}) {
  const config = { name: 'index.js', prefix: '', suffix: '', ...options };
  Variant.output({
    name: config.name,
    canonicalize: 'pascal',
    filename: { prefix: 'dist/', suffix: '' },
    file: { prefix: '', suffix: '' },
    line: { prefix: 'export const ', equals: "='", suffix: "';" },
    identifier: { prefix: config.prefix, suffix: config.suffix },
    transform: config.transform,
    append: config.append
  });
}

async function TypeScriptDeclaration(options: Variant.MinimalOptions = {}) {
  const config = { name: 'index.d.ts', prefix: '', suffix: '', ...options };
  Variant.output({
    name: config.name,
    canonicalize: 'pascal',
    filename: { prefix: 'dist/', suffix: '' },
    file: { prefix: '', suffix: '' },
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
