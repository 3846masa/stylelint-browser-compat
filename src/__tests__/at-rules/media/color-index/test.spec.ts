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
      browserslist: 'chrome 28',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (color-index) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 20,
      message: messages.rejected(
        '"color-index" media feature',
        'Chrome 28',
        'https://developer.mozilla.org/docs/Web/CSS/@media/color-index',
      ),
    },
    {
      code: stripIndent`
        @media (min-color-index: 15000) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 24,
      message: messages.rejected(
        '"min-color-index" media feature',
        'Chrome 28',
        'https://developer.mozilla.org/docs/Web/CSS/@media/color-index',
      ),
    },
  ],
});
