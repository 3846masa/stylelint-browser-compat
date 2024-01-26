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
      browserslist: 'chrome 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: repeating-linear-gradient(#e66465, #e66465 20px, #9198e5 20px, #9198e5 25px);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 97,
      message: messages.rejected(
        '"repeating-linear-gradient()" function',
        'Chrome 9',
        'https://developer.mozilla.org/docs/Web/CSS/gradient/repeating-linear-gradient',
      ),
    },
  ],
});
