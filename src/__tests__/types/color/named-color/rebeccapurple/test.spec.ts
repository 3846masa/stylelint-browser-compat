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
      browserslist: 'chrome 37',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color: rebeccapurple;
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 23,
      message: messages.rejected('"rebeccapurple" value', 'Chrome 37', ''),
    },
  ],
});
