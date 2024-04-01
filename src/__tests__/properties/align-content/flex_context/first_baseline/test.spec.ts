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
          align-content: first baseline;
        }
      `,
      line: 2,
      column: 18,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected('"first baseline" value specified as align-content', 'Chrome 58', ''),
    },
  ],
});
