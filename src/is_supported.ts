import type { SupportBlock } from '@mdn/browser-compat-data';
import semver from 'semver';

import type { Target } from '~/types';

type Options = {
  allow: {
    flagged: boolean;
    partialImplementation: boolean;
    prefix: boolean;
  };
};

export function isSupported(supportBlock: SupportBlock, target: Target, options: Options): boolean {
  const supportList = [supportBlock[target.target.mdn]].flat().filter(<T>(v: T | undefined): v is T => v != null);

  for (const s of supportList) {
    if (s.alternative_name != null) {
      // TODO
      continue;
    }
    if (Array.isArray(s.flags) && !options.allow.flagged) {
      continue;
    }
    if (s.partial_implementation === true && !options.allow.partialImplementation) {
      continue;
    }
    if (s.prefix != null && !options.allow.prefix) {
      continue;
    }

    if (s.version_added === true) {
      return true;
    }
    if (s.version_added === false) {
      return false;
    }
    if (s.version_added == null) {
      return false;
    }
    if (s.version_added.startsWith('≤')) {
      return true;
    }

    const addedSemver = semver.minVersion(s.version_added);
    const targetSemver = semver.minVersion(target.version.toString(10));
    if (addedSemver == null || targetSemver == null) {
      continue;
    }
    if (semver.lte(addedSemver, targetSemver)) {
      if (typeof s.version_removed !== 'string') {
        return true;
      }
      const removedSemver = semver.minVersion(s.version_removed);
      if (removedSemver == null) {
        return true;
      }
      if (semver.gt(removedSemver, targetSemver)) {
        return true;
      }
    }
  }

  return false;
}
