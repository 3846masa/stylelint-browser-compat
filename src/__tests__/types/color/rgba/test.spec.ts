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
          color: rgba(255, 255, 255, 0.5);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 34,
      message: messages.rejected(
        '"rgba()" function',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/color_value/rgba',
      ),
    },
  ],
});
