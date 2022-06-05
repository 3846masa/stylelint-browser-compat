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
      browserslist: 'edge 18',
    },
  ],
  reject: [
    {
      code: stripIndent`
        .class::-webkit-search-cancel-button {
        }
      `,
      line: 1,
      column: 7,
      endLine: 1,
      endColumn: 37,
      message: messages.rejected(
        '"::-webkit-search-cancel-button" pseudo-element',
        'Edge 18',
        'https://developer.mozilla.org/docs/Web/CSS/::-webkit-search-cancel-button',
      ),
    },
  ],
});
