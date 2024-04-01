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
      browserslist: 'chrome 114',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          align-items: safe center;
        }
      `,
      line: 2,
      column: 16,
      endLine: 2,
      endColumn: 20,
      message: messages.rejected('"safe" value specified as align-items', 'Chrome 114', ''),
    },
    {
      code: stripIndent`
        #id {
          align-items: unsafe center;
        }
      `,
      line: 2,
      column: 16,
      endLine: 2,
      endColumn: 22,
      message: messages.rejected('"unsafe" value specified as align-items', 'Chrome 114', ''),
    },
  ],
});
