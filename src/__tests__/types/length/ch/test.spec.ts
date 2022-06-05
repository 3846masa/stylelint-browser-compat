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
      browserslist: 'chrome 26',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          width: 1ch;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 13,
      message: messages.rejected('"ch" unit', 'Chrome 26', ''),
    },
  ],
});
