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
          background-image: repeating-radial-gradient(circle at 100%, #333, #eee 50%);
        }
      `,
      line: 2,
      column: 54,
      endLine: 2,
      endColumn: 56,
      message: messages.rejected('"at" syntax for repeating-radial-gradient()', 'Chrome 25', ''),
    },
  ],
});
