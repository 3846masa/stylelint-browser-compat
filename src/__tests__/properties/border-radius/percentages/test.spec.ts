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
      browserslist: 'chrome 7',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-radius: 50%;
        }
      `,
      line: 2,
      column: 18,
      endLine: 2,
      endColumn: 21,
      message: messages.rejected('Percentage value specified as border-radius', 'Chrome 7', ''),
    },
  ],
});
