import bcd from '@mdn/browser-compat-data';
import get from 'lodash.get';

const IGNORE_KEYS = new Set<string>(['SVG_fonts', 'WOFF', 'WOFF_2']);

export const descriptorNameSet = new Set<string>(
  Array.from(Object.keys(get(bcd.css, 'at-rules.font-face'))).filter((k) => !IGNORE_KEYS.has(k)),
);
