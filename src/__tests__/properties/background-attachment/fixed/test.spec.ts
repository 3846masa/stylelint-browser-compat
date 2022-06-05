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
          background-attachment: fixed;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected('"fixed" value specified as background-attachment', 'IE 8', ''),
    },
    {
      code: stripIndent`
        #id {
          background: fixed;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 20,
      message: messages.rejected('"fixed" value specified as background-attachment', 'IE 8', ''),
    },
  ],
});
