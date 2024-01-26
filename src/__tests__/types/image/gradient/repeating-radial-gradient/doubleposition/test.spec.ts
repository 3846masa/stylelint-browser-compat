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
          background-image: repeating-radial-gradient(#e66465 0 25%, #9198e5 50%);
        }
      `,
      line: 2,
      column: 47,
      endLine: 2,
      endColumn: 60,
      message: messages.rejected('Double-position color stops for repeating-radial-gradient()', 'Chrome 70', ''),
    },
  ],
});
