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
          justify-content: space-evenly;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected('"space-evenly" value specified as justify-content', 'Chrome 59', ''),
    },
  ],
});
