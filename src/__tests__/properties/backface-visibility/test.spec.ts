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
      browserslist: 'chrome 11',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          backface-visibility: visible;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 22,
      message: messages.rejected(
        '"backface-visibility" property',
        'Chrome 11',
        'https://developer.mozilla.org/docs/Web/CSS/backface-visibility',
      ),
    },
  ],
});
