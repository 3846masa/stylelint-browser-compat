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
          justify-content: safe center;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 24,
      message: messages.rejected('"safe" value specified as justify-content', 'Chrome 114', ''),
    },
    {
      code: stripIndent`
        #id {
          justify-content: unsafe center;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"unsafe" value specified as justify-content', 'Chrome 114', ''),
    },
  ],
});
