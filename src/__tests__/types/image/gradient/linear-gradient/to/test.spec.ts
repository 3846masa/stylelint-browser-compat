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
      browserslist: 'chrome 25',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: linear-gradient(to left top, blue, red);
        }
      `,
      line: 2,
      column: 37,
      endLine: 2,
      endColumn: 48,
      message: messages.rejected('"to" keyword for linear-gradient()', 'Chrome 25', ''),
    },
  ],
});
