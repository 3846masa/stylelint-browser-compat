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
      browserslist: 'ie 6',
    },
  ],
  reject: [
    {
      code: stripIndent`
        p:first-child {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 14,
      message: messages.rejected(
        '":first-child" pseudo-class',
        'IE 6',
        'https://developer.mozilla.org/docs/Web/CSS/:first-child',
      ),
    },
  ],
});
