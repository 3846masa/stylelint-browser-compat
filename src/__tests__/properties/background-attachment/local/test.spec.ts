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
          background-attachment: local;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected('"local" value specified as background-attachment', 'IE 8', ''),
    },
    {
      code: stripIndent`
        #id {
          background: local;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 20,
      message: messages.rejected('"local" value specified as background-attachment', 'IE 8', ''),
    },
  ],
});
