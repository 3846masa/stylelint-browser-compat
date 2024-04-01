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
      browserslist: 'chrome 20',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          justify-content: normal;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 18,
      message: messages.rejected(
        '"justify-content" property',
        'Chrome 20',
        'https://developer.mozilla.org/docs/Web/CSS/justify-content',
      ),
    },
  ],
});
