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
      browserslist: 'op_mob 12',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-bottom-right-radius: 4px 16px;
        }
      `,
      line: 2,
      column: 31,
      endLine: 2,
      endColumn: 39,
      message: messages.rejected('Elliptical corner by border-bottom-right-radius', 'Opera Android 12', ''),
    },
  ],
});
