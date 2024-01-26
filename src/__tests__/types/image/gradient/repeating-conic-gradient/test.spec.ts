/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, plugin, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [plugin],
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
          background-image: repeating-conic-gradient(red 0%, yellow 15%, red 33%);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 74,
      message: messages.rejected(
        '"repeating-conic-gradient()" function',
        'Chrome 68',
        'https://developer.mozilla.org/docs/Web/CSS/gradient/repeating-conic-gradient',
      ),
    },
  ],
});
