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
          color: color-mix(in lch, peru 40%, lightgoldenrod);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 53,
      message: messages.rejected(
        '"color-mix()" function',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/color_value/color-mix',
      ),
    },
  ],
});
