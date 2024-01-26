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
      browserslist: 'edge 18',
    },
  ],
  reject: [
    {
      code: stripIndent`
        .scrollbar::-webkit-scrollbar-corner {
        }
      `,
      line: 1,
      column: 11,
      endLine: 1,
      endColumn: 37,
      message: messages.rejected(
        '"::-webkit-scrollbar-corner" pseudo-element',
        'Edge 18',
        'https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar',
      ),
    },
  ],
});
