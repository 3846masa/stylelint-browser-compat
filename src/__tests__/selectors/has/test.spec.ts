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
      browserslist: 'safari 15.1',
    },
  ],
  reject: [
    {
      code: stripIndent`
        a:has(> img) {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 13,
      message: messages.rejected(
        '":has" pseudo-class',
        'Safari 15.1',
        'https://developer.mozilla.org/docs/Web/CSS/:has',
      ),
    },
  ],
});
