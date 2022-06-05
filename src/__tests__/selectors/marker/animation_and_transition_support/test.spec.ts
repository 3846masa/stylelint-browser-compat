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
      browserslist: 'firefox 79',
    },
  ],
  reject: [
    {
      code: stripIndent`
        a::marker {
          transition: none;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 13,
      message: messages.rejected('CSS transition for "::marker" pseudo-element', 'Firefox 79', ''),
    },
    {
      code: stripIndent`
        a::marker {
          animation: none;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 12,
      message: messages.rejected('CSS animation for "::marker" pseudo-element', 'Firefox 79', ''),
    },
  ],
});
