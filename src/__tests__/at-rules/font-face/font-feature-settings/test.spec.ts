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
        prefix: false,
      },
      browserslist: 'firefox 33',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @font-face {
          font-feature-settings: normal;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 24,
      message: messages.rejected('"font-feature-settings" descriptor of the @font-face', 'Firefox 33', ''),
    },
    {
      code: stripIndent`
        @font-face {
          -moz-font-feature-settings: normal;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 29,
      message: messages.disallowPrefix('"font-feature-settings" descriptor of the @font-face'),
    },
  ],
});
