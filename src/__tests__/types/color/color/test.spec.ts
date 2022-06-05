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
          color: color(display-p3 1 0.5 0);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 35,
      message: messages.rejected(
        '"color()" function',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/color_value/color',
      ),
    },
  ],
});
