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
      browserslist: 'chrome 24',
    },
  ],
  reject: [
    {
      code: stripIndent`
        ::-webkit-progress-bar {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 23,
      message: messages.rejected(
        '"::-webkit-progress-bar" pseudo-element',
        'Chrome 24',
        'https://developer.mozilla.org/docs/Web/CSS/::-webkit-progress-bar',
      ),
    },
  ],
});
