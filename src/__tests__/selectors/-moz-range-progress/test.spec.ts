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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input[type=range]::-moz-range-progress {
        }
      `,
      line: 1,
      column: 18,
      endLine: 1,
      endColumn: 39,
      message: messages.rejected(
        '"::-moz-range-progress" pseudo-element',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/::-moz-range-progress',
      ),
    },
  ],
});
