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
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (grid: 0) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 13,
      message: messages.rejected(
        '"grid" media feature',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/@media/grid',
      ),
    },
  ],
});
