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
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-position-y: top 50%;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 33,
      message: messages.rejected('Offset values from any edge specified as background-position-y', 'IE 8', ''),
    },
  ],
});
