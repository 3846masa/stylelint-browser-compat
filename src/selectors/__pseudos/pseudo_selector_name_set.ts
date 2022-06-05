import bcd from '@mdn/browser-compat-data';
import dotProp from 'dot-prop';

const IGNORE_KEYS = new Set<string>([
  'adjacent_sibling',
  'attribute',
  'child',
  'class',
  'column',
  'descendant',
  'general_sibling',
  'id',
  'list',
  'namespace',
  'type',
  'universal',
  // for @page at-rule
  'first',
  // same as :host
  'hostfunction',
]);

export const pseudoSelectorNameSet = new Set<string>(
  Array.from(Object.keys(dotProp.get(bcd.css, 'selectors') ?? {})).filter((k) => !IGNORE_KEYS.has(k)),
);
