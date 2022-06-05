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
      allow: {
        features: ['at-rules.font-face'],
      },
      browserslist: 'chrome 38',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @font-face {
          src: url('./example.svg');
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('SVG fonts', 'Chrome 38', ''),
    },
    {
      code: stripIndent`
        @font-face {
          src: url("./example.svg");
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('SVG fonts', 'Chrome 38', ''),
    },
    {
      code: stripIndent`
        @font-face {
          src: url(./example.svg);
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected('SVG fonts', 'Chrome 38', ''),
    },
    {
      code: stripIndent`
        @font-face {
          src: url('./example.svg?query');
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 33,
      message: messages.rejected('SVG fonts', 'Chrome 38', ''),
    },
    {
      code: stripIndent`
        @font-face {
          src: url('./example.svg#hash');
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected('SVG fonts', 'Chrome 38', ''),
    },
  ],
});
