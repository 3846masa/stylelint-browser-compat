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
          background-repeat: repeat repeat;
        }
      `,
      line: 2,
      column: 22,
      endLine: 2,
      endColumn: 35,
      message: messages.rejected('Different values for x & y directions specified as background-repeat', 'IE 8', ''),
    },
    {
      code: stripIndent`
        #id {
          background: repeat repeat;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('Different values for x & y directions specified as background-repeat', 'IE 8', ''),
    },
  ],
});
