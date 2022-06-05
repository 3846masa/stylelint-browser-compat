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
      browserslist: 'chrome 22',
    },
  ],
  reject: [
    {
      code: stripIndent`
        ::-webkit-progress-inner-element {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 33,
      message: messages.rejected(
        '"::-webkit-progress-inner-element" pseudo-element',
        'Chrome 22',
        'https://developer.mozilla.org/docs/Web/CSS/::-webkit-progress-inner-element',
      ),
    },
  ],
});
