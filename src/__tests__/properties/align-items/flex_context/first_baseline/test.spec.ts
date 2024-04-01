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
      browserslist: 'chrome 58',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          align-items: first baseline;
        }
      `,
      line: 2,
      column: 16,
      endLine: 2,
      endColumn: 30,
      message: messages.rejected('"first baseline" value specified as align-items', 'Chrome 58', ''),
    },
  ],
});
