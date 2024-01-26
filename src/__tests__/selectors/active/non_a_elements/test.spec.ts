/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, plugin, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [plugin],
});

testRule({
  ruleName,
  config: [
    true,
    {
      browserslist: 'ie 7',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input:active {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 13,
      message: messages.rejected('":active" pseudo-class with the non-anchor tag', 'IE 7', ''),
    },
    {
      code: stripIndent`
        input.class:active {
        }
      `,
      line: 1,
      column: 12,
      endLine: 1,
      endColumn: 19,
      message: messages.rejected('":active" pseudo-class with the non-anchor tag', 'IE 7', ''),
    },
  ],
});
