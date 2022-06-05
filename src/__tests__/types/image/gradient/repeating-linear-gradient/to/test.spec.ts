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
          background-image: repeating-linear-gradient(to left top, blue, red 40px);
        }
      `,
      line: 2,
      column: 47,
      endLine: 2,
      endColumn: 58,
      message: messages.rejected('"to" keyword for repeating-linear-gradient()', 'Chrome 25', ''),
    },
  ],
});
