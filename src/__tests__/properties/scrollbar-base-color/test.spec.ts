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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -ms-scrollbar-base-color: red;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected(
        '"scrollbar-base-color" property',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/scrollbar-base-color',
      ),
    },
  ],
});
