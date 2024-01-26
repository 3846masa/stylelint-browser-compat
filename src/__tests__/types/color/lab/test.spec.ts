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
          color: lab(29.2345% 39.3825 20.0664);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 39,
      message: messages.rejected(
        '"lab()" function',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/color_value/lab',
      ),
    },
    {
      code: stripIndent`
        #id {
          color: lab(52.2345% 40.1645 59.9971 / .5);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 44,
      message: messages.rejected(
        '"lab()" function',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/color_value/lab',
      ),
    },
  ],
});
