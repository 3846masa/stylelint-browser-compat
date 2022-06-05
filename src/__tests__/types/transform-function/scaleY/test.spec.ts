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
          transform: scaleY(0.6);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected(
        '"scaleY()" function',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/transform-function/scaleY',
      ),
    },
  ],
});
