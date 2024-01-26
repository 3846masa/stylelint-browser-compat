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
      browserslist: 'chrome 19',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          width: 1vw;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 13,
      message: messages.rejected('"vw" unit', 'Chrome 19', ''),
    },
  ],
});
