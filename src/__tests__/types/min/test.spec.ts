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
      browserslist: 'chrome 78',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          width: min(20vw, 400px);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"min()" function', 'Chrome 78', 'https://developer.mozilla.org/docs/Web/CSS/min'),
    },
  ],
});
