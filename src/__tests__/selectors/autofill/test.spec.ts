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
      browserslist: 'firefox 85',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input:autofill {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 15,
      message: messages.rejected(
        '":autofill" pseudo-class',
        'Firefox 85',
        'https://developer.mozilla.org/docs/Web/CSS/:autofill',
      ),
    },
  ],
});
