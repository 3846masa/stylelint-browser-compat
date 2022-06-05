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
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          transform: scale3d(1.3, 1.3, 1.3);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 36,
      message: messages.rejected(
        '"scale3d()" function',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/transform-function/scale3d',
      ),
    },
  ],
});
