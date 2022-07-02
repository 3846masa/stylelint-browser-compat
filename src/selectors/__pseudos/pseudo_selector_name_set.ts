import bcd from '@mdn/browser-compat-data';
import get from 'lodash.get';

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
  Array.from(Object.keys(get(bcd.css, 'selectors') ?? {})).filter((k) => !IGNORE_KEYS.has(k)),
);
