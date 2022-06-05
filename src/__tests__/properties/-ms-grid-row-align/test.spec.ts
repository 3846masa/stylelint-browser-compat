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
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -ms-grid-row-align: center;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 21,
      message: messages.rejected('"-ms-grid-row-align" property', 'IE 9', ''),
    },
  ],
});
