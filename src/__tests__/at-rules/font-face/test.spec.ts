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
      browserslist: 'opera 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @font-face {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 11,
      message: messages.rejected(
        '"@font-face" at rules',
        'Opera 9',
        'https://developer.mozilla.org/docs/Web/CSS/@font-face',
      ),
    },
  ],
});
