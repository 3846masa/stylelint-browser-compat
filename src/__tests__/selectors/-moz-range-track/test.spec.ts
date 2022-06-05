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
      browserslist: 'firefox 20',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input[type=range]::-moz-range-track {
        }
      `,
      line: 1,
      column: 18,
      endLine: 1,
      endColumn: 36,
      message: messages.rejected(
        '"::-moz-range-track" pseudo-element',
        'Firefox 20',
        'https://developer.mozilla.org/docs/Web/CSS/::-moz-range-track',
      ),
    },
  ],
});
