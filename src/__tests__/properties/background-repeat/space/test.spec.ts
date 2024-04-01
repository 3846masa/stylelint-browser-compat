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
      browserslist: 'chrome 29',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-repeat: space;
        }
      `,
      line: 2,
      column: 22,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('"space" value specified as background-repeat', 'Chrome 29', ''),
    },
    {
      code: stripIndent`
        #id {
          background-repeat: repeat space;
        }
      `,
      line: 2,
      column: 29,
      endLine: 2,
      endColumn: 34,
      message: messages.rejected('"space" value specified as background-repeat', 'Chrome 29', ''),
    },
    // background
    {
      code: stripIndent`
        #id {
          background: space;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 20,
      message: messages.rejected('"space" value specified as background-repeat', 'Chrome 29', ''),
    },
    {
      code: stripIndent`
        #id {
          background: repeat space;
        }
      `,
      line: 2,
      column: 22,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('"space" value specified as background-repeat', 'Chrome 29', ''),
    },
  ],
});
