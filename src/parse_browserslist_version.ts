import type { Target, TargetInfo } from '~/types';

const STANDARD_TARGET_NAME_LIST: TargetInfo[] = [
  {
    browserslist: 'chrome',
    mdn: 'chrome',
    name: 'Chrome',
  },
  {
    browserslist: 'and_chr',
    mdn: 'chrome',
    name: 'Android Chrome',
  },
  {
    browserslist: 'edge',
    mdn: 'edge',
    name: 'Edge',
  },
  {
    browserslist: 'firefox',
    mdn: 'firefox',
    name: 'Firefox',
  },
  {
    browserslist: 'and_ff',
    mdn: 'firefox_android',
    name: 'Android Firefox',
  },
  {
    browserslist: 'ie',
    mdn: 'ie',
    name: 'IE',
  },
  {
    browserslist: 'node',
    mdn: 'nodejs',
    name: 'Node.js',
  },
  {
    browserslist: 'opera',
    mdn: 'opera',
    name: 'Opera',
  },
  {
    browserslist: 'op_mob',
    mdn: 'opera_android',
    name: 'Opera Android',
  },
  {
    browserslist: 'safari',
    mdn: 'safari',
    name: 'Safari',
  },
  {
    browserslist: 'ios_saf',
    mdn: 'safari_ios',
    name: 'iOS Safari',
  },
  {
    browserslist: 'samsung',
    mdn: 'samsunginternet_android',
    name: 'Samsung Browser',
  },
  {
    browserslist: 'android',
    mdn: 'webview_android',
    name: 'Android Webview',
  },
];

const STANDARD_TARGET_NAME_MAPPINGS = new Map(STANDARD_TARGET_NAME_LIST.map((info) => [info.browserslist, info]));

/**
 * MIT License Copyright (c) 2016 Amila Welihinda
 * Forked from https://github.com/amilajack/eslint-plugin-compat/blob/4f00359c239aa4eb06a3bf2b23d13f517b666eee/src/helpers.ts#L219-L264
 */
export function parseBrowsersListVersion(targetslist: Array<string>): Array<Target> {
  return (
    // Sort the targets by target name and then version number in ascending order
    targetslist
      .map((rawString: string): Target | null => {
        const [targetName, versionString] = rawString.split(' ') as [string, string];

        if (targetName === 'safari' && versionString === 'TP') {
          return null;
        }

        const parsedVersion: number = (() => {
          try {
            if (targetName === 'op_mob' && versionString === '10') {
              return 10.1;
            }
            if (versionString === 'all') {
              return 0;
            }
            const [minVersionString] = versionString.split('-');
            if (minVersionString == null) {
              throw new Error(`"${rawString}" cannot parsed.`);
            }
            const parsedVersion = Number.parseFloat(minVersionString);
            if (Number.isNaN(parsedVersion)) {
              throw new Error(`"${rawString}" cannot parsed.`);
            }
            return parsedVersion;
          } catch {
            throw new Error(`"${rawString}" cannot parsed.`);
          }
        })();

        const target = STANDARD_TARGET_NAME_MAPPINGS.get(targetName);

        if (target == null) {
          return null;
        }

        return {
          target,
          version: parsedVersion,
          versionString,
        };
      })
      .filter((v: Target | null): v is Target => v != null)
      .sort(
        // Sort the targets by target name and then version number in descending order
        // ex. [a@3, b@3, a@1] => [a@3, a@1, b@3]
        (a: Target, b: Target): number => {
          if (b.target.browserslist === a.target.browserslist) {
            return b.version - a.version;
          }
          return b.target.browserslist.localeCompare(a.target.browserslist);
        },
      )
      .filter(
        // First last target always has the latest version
        (e: Target, i: number, items: Array<Target>): boolean =>
          // Check if the current target is the last of its kind.
          // If it is, then it's the most recent version.
          i + 1 === items.length || e.target.browserslist !== items[i + 1]?.target.browserslist,
      )
  );
}
