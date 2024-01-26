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
          transform: perspective(800px);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected(
        '"perspective()" function',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/transform-function/perspective',
      ),
    },
  ],
});
