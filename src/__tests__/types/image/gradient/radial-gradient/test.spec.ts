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
      browserslist: 'chrome 12',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: radial-gradient(#e66465, #9198e5);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 54,
      message: messages.rejected(
        '"radial-gradient()" function',
        'Chrome 12',
        'https://developer.mozilla.org/docs/Web/CSS/gradient/radial-gradient',
      ),
    },
  ],
});
