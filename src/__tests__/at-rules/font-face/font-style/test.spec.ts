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
      browserslist: 'opera 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @font-face {
          font-style: normal;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 13,
      message: messages.rejected(
        '"font-style" descriptor of the @font-face',
        'Opera 9',
        'https://developer.mozilla.org/docs/Web/CSS/@font-face/font-style',
      ),
    },
  ],
});
