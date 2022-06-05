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
        features: ['types.easing-function'],
      },
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          animation-timing-function: linear;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected(
        '"animation-timing-function" property',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/animation-timing-function',
      ),
    },
  ],
});
