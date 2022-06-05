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
        features: ['properties.transform'],
      },
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          transform: matrix(1, 2, -1, 1, 80, 80);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 41,
      message: messages.rejected(
        '"matrix()" function',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/transform-function/matrix',
      ),
    },
  ],
});
