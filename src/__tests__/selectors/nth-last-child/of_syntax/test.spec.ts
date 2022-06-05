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
      browserslist: 'safari 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        :nth-last-child(2n of .text) {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 29,
      message: messages.rejected('"of" syntax of :nth-last-child pseudo-class', 'Safari 8', ''),
    },
  ],
});
