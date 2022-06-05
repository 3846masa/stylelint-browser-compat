import type { BrowserName } from '@mdn/browser-compat-data';

export type TargetInfo = {
  browserslist: string;
  mdn: BrowserName;
  name: string;
};

export type Target = {
  target: TargetInfo;
  version: number;
  versionString: string;
};

export type Feature = {
  endIndex: number;
  id: string;
  index: number;
  name: string;
  node: import('postcss').Node;
  prefix?: string;
};
