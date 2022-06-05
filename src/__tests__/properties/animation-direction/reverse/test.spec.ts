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
      browserslist: 'chrome 18',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          animation-direction: reverse;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected('"reverse" value specified as animation-direction', 'Chrome 18', ''),
    },
    {
      code: stripIndent`
        #id {
          animation: 3s ease-in 1s infinite reverse;
        }
      `,
      line: 2,
      column: 37,
      endLine: 2,
      endColumn: 44,
      message: messages.rejected('"reverse" value specified as animation-direction', 'Chrome 18', ''),
    },
  ],
});
