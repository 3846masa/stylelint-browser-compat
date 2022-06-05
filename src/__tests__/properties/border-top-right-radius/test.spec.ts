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
      browserslist: 'op_mob 10',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-top-right-radius: 4px;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected(
        '"border-top-right-radius" property',
        'Opera Android 10',
        'https://developer.mozilla.org/docs/Web/CSS/border-top-right-radius',
      ),
    },
  ],
});
