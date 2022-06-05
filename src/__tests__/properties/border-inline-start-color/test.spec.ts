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
      browserslist: 'chrome 68',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-inline-start-color: green;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected(
        '"border-inline-start-color" property',
        'Chrome 68',
        'https://developer.mozilla.org/docs/Web/CSS/border-inline-start-color',
      ),
    },
  ],
});
