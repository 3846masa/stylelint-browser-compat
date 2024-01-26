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
      browserslist: 'firefox 50',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          clip-path: fill-box;
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 22,
      message: messages.rejected('"fill-box" value specified as clip-path', 'Firefox 50', ''),
    },
    {
      code: stripIndent`
        #id {
          clip-path: stroke-box;
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 24,
      message: messages.rejected('"stroke-box" value specified as clip-path', 'Firefox 50', ''),
    },
  ],
});
