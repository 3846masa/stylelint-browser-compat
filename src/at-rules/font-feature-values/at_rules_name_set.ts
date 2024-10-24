import bcd from '@mdn/browser-compat-data';
import get from 'lodash.get';

const IGNORE_KEYS = new Set<string>([]);

export const atRulesNameSet = new Set<string>(
  Array.from(Object.keys(get(bcd.css, 'at-rules.font-feature-values'))).filter((k) => !IGNORE_KEYS.has(k)),
);
