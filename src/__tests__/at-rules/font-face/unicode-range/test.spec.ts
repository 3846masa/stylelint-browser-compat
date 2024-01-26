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
      browserslist: 'firefox 35',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @font-face {
          unicode-range: U+0025-00FF;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 16,
      message: messages.rejected(
        '"unicode-range" descriptor of the @font-face',
        'Firefox 35',
        'https://developer.mozilla.org/docs/Web/CSS/@font-face/unicode-range',
      ),
    },
  ],
});
