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
        ::-webkit-progress-value {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 25,
      message: messages.rejected(
        '"::-webkit-progress-value" pseudo-element',
        'Chrome 24',
        'https://developer.mozilla.org/docs/Web/CSS/::-webkit-progress-value',
      ),
    },
  ],
});
