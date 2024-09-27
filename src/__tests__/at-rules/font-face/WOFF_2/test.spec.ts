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
      allow: {
        features: ['at-rules.font-face'],
      },
      browserslist: 'chrome 35',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @font-face {
          src: url('./example.woff2');
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected('WOFF2', 'Chrome 35', 'https://developer.mozilla.org/docs/Web/CSS/CSS_fonts/WOFF'),
    },
    {
      code: stripIndent`
        @font-face {
          src: url("./example.woff2");
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected('WOFF2', 'Chrome 35', 'https://developer.mozilla.org/docs/Web/CSS/CSS_fonts/WOFF'),
    },
    {
      code: stripIndent`
        @font-face {
          src: url(./example.woff2);
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('WOFF2', 'Chrome 35', 'https://developer.mozilla.org/docs/Web/CSS/CSS_fonts/WOFF'),
    },
    {
      code: stripIndent`
        @font-face {
          src: url('./example.woff2?query');
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 35,
      message: messages.rejected('WOFF2', 'Chrome 35', 'https://developer.mozilla.org/docs/Web/CSS/CSS_fonts/WOFF'),
    },
    {
      code: stripIndent`
        @font-face {
          src: url('./example.woff2#hash');
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 34,
      message: messages.rejected('WOFF2', 'Chrome 35', 'https://developer.mozilla.org/docs/Web/CSS/CSS_fonts/WOFF'),
    },
  ],
});
