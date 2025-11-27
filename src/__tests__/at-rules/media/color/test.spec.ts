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
        @media (color) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 14,
      message: messages.rejected(
        'at-rules.media.color',
        '"color" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@media/color',
      ),
    },
    {
      code: stripIndent`
        @media (min-color: 8) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 18,
      message: messages.rejected(
        'at-rules.media.color',
        '"min-color" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@media/color',
      ),
    },
  ],
});
