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
        meter::-webkit-meter-bar {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 25,
      message: messages.rejected(
        '"::-webkit-meter-bar" pseudo-element',
        'Chrome 11',
        'https://developer.mozilla.org/docs/Web/CSS/::-webkit-meter-bar',
      ),
    },
  ],
});
