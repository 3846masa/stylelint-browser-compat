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
      browserslist: 'firefox 87',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          caption-side: left;
        }
      `,
      line: 2,
      column: 17,
      endLine: 2,
      endColumn: 21,
      message: messages.rejected('"left" value specified as caption-side', 'Firefox 87', ''),
    },
    {
      code: stripIndent`
        #id {
          caption-side: right;
        }
      `,
      line: 2,
      column: 17,
      endLine: 2,
      endColumn: 22,
      message: messages.rejected('"right" value specified as caption-side', 'Firefox 87', ''),
    },
    {
      code: stripIndent`
        #id {
          caption-side: top-outside;
        }
      `,
      line: 2,
      column: 17,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('"top-outside" value specified as caption-side', 'Firefox 87', ''),
    },
    {
      code: stripIndent`
        #id {
          caption-side: bottom-outside;
        }
      `,
      line: 2,
      column: 17,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected('"bottom-outside" value specified as caption-side', 'Firefox 87', ''),
    },
  ],
});
