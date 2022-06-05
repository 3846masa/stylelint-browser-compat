/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [require.resolve('~/index')],
});

testRule({
  ruleName,
  config: [
    true,
    {
      browserslist: 'chrome 25',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: radial-gradient(circle at 100%, #333, #333 50%, #eee 75%, #333 75%);
        }
      `,
      line: 2,
      column: 44,
      endLine: 2,
      endColumn: 46,
      message: messages.rejected('"at" syntax for radial-gradient()', 'Chrome 25', ''),
    },
  ],
});
