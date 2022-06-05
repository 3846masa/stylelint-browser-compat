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
      browserslist: 'chrome 91',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @font-face {
          size-adjust: 90%;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected(
        '"size-adjust" descriptor of the @font-face',
        'Chrome 91',
        'https://developer.mozilla.org/docs/Web/CSS/@font-face/size-adjust',
      ),
    },
  ],
});
