/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [require.resolve('~/index')],
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
          background-image: radial-gradient(#e66465 0 50%, #9198e5);
        }
      `,
      line: 2,
      column: 37,
      endLine: 2,
      endColumn: 50,
      message: messages.rejected('Double-position color stops for radial-gradient()', 'Chrome 70', ''),
    },
  ],
});
