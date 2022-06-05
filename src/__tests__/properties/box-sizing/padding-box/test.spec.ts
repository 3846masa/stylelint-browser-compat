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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          box-sizing: padding-box;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"padding-box" value specified as box-sizing', 'Chrome 100', ''),
    },
  ],
});
