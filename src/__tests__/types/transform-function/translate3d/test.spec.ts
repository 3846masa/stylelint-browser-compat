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
          transform: translate3d(42px, -62px, -135px);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 46,
      message: messages.rejected(
        '"translate3d()" function',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/transform-function/translate3d',
      ),
    },
  ],
});
