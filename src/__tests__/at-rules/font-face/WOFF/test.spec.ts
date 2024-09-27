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
      browserslist: 'chrome 5',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @font-face {
          src: url('./example.woff');
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('WOFF', 'Chrome 5', 'https://developer.mozilla.org/docs/Web/CSS/CSS_fonts/WOFF'),
    },
    {
      code: stripIndent`
        @font-face {
          src: url("./example.woff");
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('WOFF', 'Chrome 5', 'https://developer.mozilla.org/docs/Web/CSS/CSS_fonts/WOFF'),
    },
    {
      code: stripIndent`
        @font-face {
          src: url(./example.woff);
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('WOFF', 'Chrome 5', 'https://developer.mozilla.org/docs/Web/CSS/CSS_fonts/WOFF'),
    },
    {
      code: stripIndent`
        @font-face {
          src: url('./example.woff?query');
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 34,
      message: messages.rejected('WOFF', 'Chrome 5', 'https://developer.mozilla.org/docs/Web/CSS/CSS_fonts/WOFF'),
    },
    {
      code: stripIndent`
        @font-face {
          src: url('./example.woff#hash');
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 33,
      message: messages.rejected('WOFF', 'Chrome 5', 'https://developer.mozilla.org/docs/Web/CSS/CSS_fonts/WOFF'),
    },
  ],
});
