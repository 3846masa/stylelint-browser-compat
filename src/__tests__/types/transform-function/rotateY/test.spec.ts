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
        features: ['properties.transform', 'types.angle.deg'],
      },
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          transform: rotateY(45deg);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected(
        '"rotateY()" function',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/transform-function/rotateY',
      ),
    },
  ],
});
