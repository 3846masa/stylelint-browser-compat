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
      browserslist: 'chrome 62',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          width: 1Q;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 12,
      message: messages.rejected('"Q" unit', 'Chrome 62', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1q;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 12,
      message: messages.rejected('"q" unit', 'Chrome 62', ''),
    },
  ],
});
