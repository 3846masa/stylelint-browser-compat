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
        .scrollbar::-webkit-resizer {
        }
      `,
      line: 1,
      column: 11,
      endLine: 1,
      endColumn: 28,
      message: messages.rejected(
        '"::-webkit-resizer" pseudo-element',
        'Edge 18',
        'https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar',
      ),
    },
  ],
});
