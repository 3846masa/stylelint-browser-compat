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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color: color-contrast(wheat vs tan, sienna, #d2691e);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 55,
      message: messages.rejected(
        '"color-contrast()" function',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/color_value/color-contrast',
      ),
    },
  ],
});
