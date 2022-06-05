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
      browserslist: 'chrome 30',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          width: calc(16 / 9);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 22,
      message: messages.rejected('<number> value with calc()', 'Chrome 30', ''),
    },
  ],
});
