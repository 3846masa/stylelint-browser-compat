import path from 'node:path';
import process from 'node:process';

import bcd from '@mdn/browser-compat-data' assert { type: 'json' };
import fs from 'fs-extra';

/**
 *
 * @param {bcd.PrimaryIdentifier} i
 * @param {string} cwd
 */
async function createSpecFile(i, cwd) {
  for (const key of Object.keys(i)) {
    if (i[key] == null || key === '__compat') {
      continue;
    }
    const hasCompat = i[key].__compat != null;
    const filePath = path.resolve(cwd, `./${key}/test.spec.ts`);
    if (hasCompat && (await fs.pathExists(filePath)) !== true) {
      const filePath = path.resolve(cwd, `./${key}/test.skip.spec.ts`);
      await fs.createFile(filePath);
    }
    await createSpecFile(i[key], path.resolve(cwd, `./${key}/`));
  }
}

await createSpecFile(bcd.css, path.resolve(process.cwd(), './src/__tests__/'));
