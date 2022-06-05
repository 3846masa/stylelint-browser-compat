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
      browserslist: 'chrome 98',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @layer utilities {
          /* ... */
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 7,
      message: messages.rejected('"@layer" at rules', 'Chrome 98', 'https://developer.mozilla.org/docs/Web/CSS/@layer'),
    },
  ],
});
