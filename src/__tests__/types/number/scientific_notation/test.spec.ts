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
      browserslist: 'chrome 42',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          width: 2e1px;
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 13,
      message: messages.rejected('Scientific notation for number', 'Chrome 42', ''),
    },
  ],
});
