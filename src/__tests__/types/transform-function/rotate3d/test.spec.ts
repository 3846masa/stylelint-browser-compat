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
        features: ['properties.transform', 'types.angle.deg'],
      },
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          transform: rotate3d(1, 1, 1, 45deg);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 38,
      message: messages.rejected(
        '"rotate3d()" function',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/transform-function/rotate3d',
      ),
    },
  ],
});
