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
      browserslist: 'chrome 75',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (prefers-color-scheme: dark) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 29,
      message: messages.rejected(
        '"prefers-color-scheme" media feature',
        'Chrome 75',
        'https://developer.mozilla.org/docs/Web/CSS/@media/prefers-color-scheme',
      ),
    },
  ],
});
