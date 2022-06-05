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
      browserslist: 'chrome 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: repeating-radial-gradient(#e66465, #9198e5 20%);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 68,
      message: messages.rejected(
        '"repeating-radial-gradient()" function',
        'Chrome 9',
        'https://developer.mozilla.org/docs/Web/CSS/gradient/repeating-radial-gradient',
      ),
    },
  ],
});
