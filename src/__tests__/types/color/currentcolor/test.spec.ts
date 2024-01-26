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
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color: currentcolor;
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 22,
      message: messages.rejected(
        '"currentcolor" value',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/color_value#currentcolor',
      ),
    },
    {
      code: stripIndent`
        #id {
          color: currentColor;
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 22,
      message: messages.rejected(
        '"currentColor" value',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/color_value#currentcolor',
      ),
    },
  ],
});
