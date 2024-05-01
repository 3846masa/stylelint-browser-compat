import path from 'node:path';
import process from 'node:process';

import bcd from '@mdn/browser-compat-data' assert { type: 'json' };
import fs from 'fs-extra';

/**
 *
 * @param {import('@mdn/browser-compat-data').Identifier} i
 * @param {string} cwd
 */
async function createSpecFile(i, cwd) {
  for (const key of Object.keys(i)) {
    const target = i[key];
    if (target == null || key === '__compat') {
      continue;
    }
    const hasCompat = target.__compat != null;
    const filePath = path.resolve(cwd, `./${key}/test.spec.ts`);
    if (hasCompat && !(await fs.pathExists(filePath))) {
      const filePath = path.resolve(cwd, `./${key}/test.skip.spec.ts`);
      await fs.createFile(filePath);
    }
    await createSpecFile(target, path.resolve(cwd, `./${key}/`));
  }
}

await createSpecFile(bcd.css, path.resolve(process.cwd(), './src/__tests__/'));
