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
          background-image: linear-gradient(45deg, blue, 25%, red);
        }
      `,
      line: 2,
      column: 50,
      endLine: 2,
      endColumn: 53,
      message: messages.rejected('Interpolation hints for linear-gradient()', 'Chrome 39', ''),
    },
  ],
});
