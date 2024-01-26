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
      browserslist: 'chrome 59',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @font-face {
          font-display: auto;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 15,
      message: messages.rejected(
        '"font-display" descriptor of the @font-face',
        'Chrome 59',
        'https://developer.mozilla.org/docs/Web/CSS/@font-face/font-display',
      ),
    },
  ],
});
