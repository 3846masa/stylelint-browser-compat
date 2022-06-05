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
        ::-moz-page-sequence {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 21,
      message: messages.rejected(
        '"::-moz-page-sequence" pseudo-element',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/::-moz-page-sequence',
      ),
    },
  ],
});
