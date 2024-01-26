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
        features: ['properties.transform'],
      },
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          transform: matrix3d(1, 0, 0, 0, 0, 1, 6, 0, 0, 0, 1, 0, 50, 100, 0, 1.1);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 75,
      message: messages.rejected(
        '"matrix3d()" function',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/transform-function/matrix3d',
      ),
    },
  ],
});
