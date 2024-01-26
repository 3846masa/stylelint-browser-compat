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
          background-image: repeating-linear-gradient(blue 0 20px, red 40px);
        }
      `,
      line: 2,
      column: 47,
      endLine: 2,
      endColumn: 58,
      message: messages.rejected('Double-position color stops for repeating-linear-gradient()', 'Chrome 70', ''),
    },
  ],
});
