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
      browserslist: 'firefox 39',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -moz-orient: inline;
        }
      `,
      line: 2,
      column: 16,
      endLine: 2,
      endColumn: 22,
      message: messages.rejected('"inline" value specified as -moz-orient', 'Firefox 39', ''),
    },
    {
      code: stripIndent`
        #id {
          -moz-orient: block;
        }
      `,
      line: 2,
      column: 16,
      endLine: 2,
      endColumn: 21,
      message: messages.rejected('"block" value specified as -moz-orient', 'Firefox 39', ''),
    },
  ],
});
