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
      browserslist: 'chrome 27',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @supports (display: grid) {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 10,
      message: messages.rejected(
        '"@supports" at rules',
        'Chrome 27',
        'https://developer.mozilla.org/docs/Web/CSS/@supports',
      ),
    },
  ],
});
