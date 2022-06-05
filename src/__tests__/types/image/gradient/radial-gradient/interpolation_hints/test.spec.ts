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
      browserslist: 'chrome 39',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: radial-gradient(#e66465, 25%, #9198e5);
        }
      `,
      line: 2,
      column: 46,
      endLine: 2,
      endColumn: 49,
      message: messages.rejected('Interpolation hints for radial-gradient()', 'Chrome 39', ''),
    },
  ],
});
