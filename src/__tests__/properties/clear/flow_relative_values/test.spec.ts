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
      browserslist: 'firefox 54',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          clear: inline-start;
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 22,
      message: messages.rejected('"inline-start" value specified as clear', 'Firefox 54', ''),
    },
    {
      code: stripIndent`
        #id {
          clear: inline-end;
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 20,
      message: messages.rejected('"inline-end" value specified as clear', 'Firefox 54', ''),
    },
  ],
});
