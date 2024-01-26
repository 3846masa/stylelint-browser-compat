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
      browserslist: 'chrome 70',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: linear-gradient(45deg, blue 25% 50%, red);
        }
      `,
      line: 2,
      column: 44,
      endLine: 2,
      endColumn: 56,
      message: messages.rejected('Double-position color stops for linear-gradient()', 'Chrome 70', ''),
    },
  ],
});
