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
      browserslist: 'chrome 18',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          width: calc(10px + 100px);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('"calc()" function', 'Chrome 18', 'https://developer.mozilla.org/docs/Web/CSS/calc'),
    },
  ],
});
