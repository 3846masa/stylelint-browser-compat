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
      browserslist: 'firefox 46',
    },
  ],
  reject: [
    {
      code: stripIndent`
        a[href*="value" i] {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 19,
      message: messages.rejected('Attribute selector with case-insensitive modifier', 'Firefox 46', ''),
    },
    {
      code: stripIndent`
        a[href*="value" I] {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 19,
      message: messages.rejected('Attribute selector with case-insensitive modifier', 'Firefox 46', ''),
    },
  ],
});
