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
          color: oklch(40.1% 0.123 21.57);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 34,
      message: messages.rejected(
        '"oklch()" function',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/color_value/oklch',
      ),
    },
    {
      code: stripIndent`
        #id {
          color: oklch(59.69% 0.156 49.77 / .5);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 40,
      message: messages.rejected(
        '"oklch()" function',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/color_value/oklch',
      ),
    },
  ],
});
