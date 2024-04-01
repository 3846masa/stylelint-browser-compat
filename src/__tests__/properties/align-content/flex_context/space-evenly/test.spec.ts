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
      browserslist: 'chrome 59',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          align-content: space-evenly;
        }
      `,
      line: 2,
      column: 18,
      endLine: 2,
      endColumn: 30,
      message: messages.rejected('"space-evenly" value specified as align-content', 'Chrome 59', ''),
    },
  ],
});
