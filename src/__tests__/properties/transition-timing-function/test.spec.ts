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
      browserslist: 'ie 6',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          transition-timing-function: ease;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected(
        '"transition-timing-function" property',
        'IE 6',
        'https://developer.mozilla.org/docs/Web/CSS/transition-timing-function',
      ),
    },
  ],
});
