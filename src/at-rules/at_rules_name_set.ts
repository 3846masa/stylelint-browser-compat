import bcd from '@mdn/browser-compat-data';
import dotProp from 'dot-prop';

const IGNORE_KEYS = new Set<string>([]);

export const atRulesNameSet = new Set<string>(
  Array.from(Object.keys(dotProp.get(bcd.css, 'at-rules') ?? {})).filter((k) => !IGNORE_KEYS.has(k)),
);
