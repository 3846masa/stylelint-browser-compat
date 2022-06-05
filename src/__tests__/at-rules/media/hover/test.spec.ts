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
      browserslist: 'chrome 37',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (hover: hover) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 14,
      message: messages.rejected(
        '"hover" media feature',
        'Chrome 37',
        'https://developer.mozilla.org/docs/Web/CSS/@media/hover',
      ),
    },
  ],
});
