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
      browserslist: 'chrome 11',
    },
  ],
  reject: [
    {
      code: stripIndent`
        meter::-webkit-meter-even-less-good-value {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 42,
      message: messages.rejected(
        '"::-webkit-meter-even-less-good-value" pseudo-element',
        'Chrome 11',
        'https://developer.mozilla.org/docs/Web/CSS/::-webkit-meter-even-less-good-value',
      ),
    },
  ],
});
