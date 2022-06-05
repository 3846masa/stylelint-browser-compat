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
      browserslist: 'firefox 65',
    },
  ],
  reject: [
    {
      code: stripIndent`
        a[href*="value" s] {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 19,
      message: messages.rejected('Attribute selector with case-sensitive modifier', 'Firefox 65', ''),
    },
    {
      code: stripIndent`
        a[href*="value" S] {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 19,
      message: messages.rejected('Attribute selector with case-sensitive modifier', 'Firefox 65', ''),
    },
  ],
});
