/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, plugin, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [plugin],
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
          animation-direction: alternate-reverse;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 41,
      message: messages.rejected('"alternate-reverse" value specified as animation-direction', 'Chrome 18', ''),
    },
    {
      code: stripIndent`
        #id {
          animation: 3s ease-in 1s infinite alternate-reverse;
        }
      `,
      line: 2,
      column: 37,
      endLine: 2,
      endColumn: 54,
      message: messages.rejected('"alternate-reverse" value specified as animation-direction', 'Chrome 18', ''),
    },
  ],
});
