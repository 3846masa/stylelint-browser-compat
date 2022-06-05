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
      browserslist: 'ie 10',
    },
  ],
  reject: [
    {
      code: stripIndent`
        div::before:hover {
        }
      `,
      line: 1,
      column: 12,
      endLine: 1,
      endColumn: 18,
      message: messages.rejected('":hover" pseudo-class with pseudo-element', 'IE 10', ''),
    },
    {
      code: stripIndent`
        div::after:hover {
        }
      `,
      line: 1,
      column: 11,
      endLine: 1,
      endColumn: 17,
      message: messages.rejected('":hover" pseudo-class with pseudo-element', 'IE 10', ''),
    },
  ],
});
