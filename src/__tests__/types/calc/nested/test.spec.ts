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
      browserslist: 'chrome 50',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          width: calc(calc(10px + 100px) + 50px);
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 33,
      message: messages.rejected('Nested calc()', 'Chrome 50', ''),
    },
  ],
});
