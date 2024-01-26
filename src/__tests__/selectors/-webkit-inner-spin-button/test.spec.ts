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
      browserslist: 'chrome 5',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input[type=number]::-webkit-inner-spin-button {
        }
      `,
      line: 1,
      column: 19,
      endLine: 1,
      endColumn: 46,
      message: messages.rejected(
        '"::-webkit-inner-spin-button" pseudo-element',
        'Chrome 5',
        'https://developer.mozilla.org/docs/Web/CSS/::-webkit-inner-spin-button',
      ),
    },
  ],
});
