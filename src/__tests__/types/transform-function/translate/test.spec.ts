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
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          transform: translate(200px);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 30,
      message: messages.rejected(
        '"translate()" function',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/transform-function/translate',
      ),
    },
  ],
});
