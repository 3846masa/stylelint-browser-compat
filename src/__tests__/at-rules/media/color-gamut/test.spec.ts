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
      browserslist: 'chrome 57',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (color-gamut: srgb) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 20,
      message: messages.rejected(
        '"color-gamut" media feature',
        'Chrome 57',
        'https://developer.mozilla.org/docs/Web/CSS/@media/color-gamut',
      ),
    },
  ],
});
