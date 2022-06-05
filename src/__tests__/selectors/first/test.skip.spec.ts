/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, ruleName } from '~/rule';

// TODO: implement for @page at-rule

const testRule = getTestRule({
  plugins: [require.resolve('~/index')],
});

testRule({
  ruleName,
  config: [
    true,
    {
      browserslist: 'chrome 17',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @page :first {
        }
      `,
      line: 1,
      column: 7,
      endLine: 1,
      endColumn: 13,
      message: messages.rejected(
        '":first" pseudo-class',
        'Chrome 17',
        'https://developer.mozilla.org/docs/Web/CSS/:first',
      ),
    },
  ],
});
