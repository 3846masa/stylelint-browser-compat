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
      browserslist: 'chrome 87',
    },
  ],
  reject: [
    {
      code: stripIndent`
        :not(.foo, .bar) {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 17,
      message: messages.rejected('":not" pseudo-class with several selectors', 'Chrome 87', ''),
    },
  ],
});
