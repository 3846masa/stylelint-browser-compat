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
      browserslist: 'firefox 65',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (overflow-inline: scroll) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 24,
      message: messages.rejected(
        '"overflow-inline" media feature',
        'Firefox 65',
        'https://developer.mozilla.org/docs/Web/CSS/@media/overflow-inline',
      ),
    },
  ],
});
