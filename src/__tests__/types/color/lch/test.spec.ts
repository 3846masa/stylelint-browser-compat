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
          color: lch(29.2345% 44.2 27);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected(
        '"lch()" function',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/color_value/lch',
      ),
    },
    {
      code: stripIndent`
        #id {
          color: lch(52.2345% 72.2 56.2 / .5);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 38,
      message: messages.rejected(
        '"lch()" function',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/color_value/lch',
      ),
    },
  ],
});
