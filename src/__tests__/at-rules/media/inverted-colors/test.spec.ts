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
      browserslist: 'safari 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (inverted-colors: inverted) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 24,
      message: messages.rejected(
        '"inverted-colors" media feature',
        'Safari 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/inverted-colors',
      ),
    },
  ],
});
