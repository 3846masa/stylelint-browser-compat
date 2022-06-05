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
      browserslist: 'chrome 85',
    },
  ],
  reject: [
    {
      code: stripIndent`
        button:focus-visible {
        }
      `,
      line: 1,
      column: 7,
      endLine: 1,
      endColumn: 21,
      message: messages.rejected(
        '":focus-visible" pseudo-class',
        'Chrome 85',
        'https://developer.mozilla.org/docs/Web/CSS/:focus-visible',
      ),
    },
  ],
});
