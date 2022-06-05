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
          background-image: repeating-linear-gradient(45deg, blue, 25px, red 50px);
        }
      `,
      line: 2,
      column: 60,
      endLine: 2,
      endColumn: 64,
      message: messages.rejected('Interpolation hints for repeating-linear-gradient()', 'Chrome 39', ''),
    },
  ],
});
