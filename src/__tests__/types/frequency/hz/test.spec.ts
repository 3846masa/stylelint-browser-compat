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
          unknown: 100hz;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 17,
      message: messages.rejected('"hz" unit', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          unknown: 100Hz;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 17,
      message: messages.rejected('"Hz" unit', 'Chrome 100', ''),
    },
  ],
});
