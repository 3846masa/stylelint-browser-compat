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
          color: oklab(40.1% 0.1143 0.045);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 35,
      message: messages.rejected(
        '"oklab()" function',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/color_value/oklab',
      ),
    },
    {
      code: stripIndent`
        #id {
          color: oklab(59.69% 0.1007 0.1191 / .5);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 42,
      message: messages.rejected(
        '"oklab()" function',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/color_value/oklab',
      ),
    },
  ],
});
