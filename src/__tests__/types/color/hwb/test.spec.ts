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
          color: hwb(194 0% 0%);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 24,
      message: messages.rejected(
        '"hwb()" function',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/color_value/hwb',
      ),
    },
    {
      code: stripIndent`
        #id {
          color: hwb(194 0% 0% / .5);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected(
        '"hwb()" function',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/color_value/hwb',
      ),
    },
  ],
});
