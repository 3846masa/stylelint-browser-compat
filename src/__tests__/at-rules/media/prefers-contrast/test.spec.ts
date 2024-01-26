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
      browserslist: 'chrome 95',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (prefers-contrast: more) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 25,
      message: messages.rejected(
        '"prefers-contrast" media feature',
        'Chrome 95',
        'https://developer.mozilla.org/docs/Web/CSS/@media/prefers-contrast',
      ),
    },
  ],
});
