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
        '"color" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/color',
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
        '"min-color" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/color',
      ),
    },
  ],
});
