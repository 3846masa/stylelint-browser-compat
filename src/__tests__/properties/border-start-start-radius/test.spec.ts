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
      browserslist: 'chrome 88',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-start-start-radius: 80px 80px;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected(
        '"border-start-start-radius" property',
        'Chrome 88',
        'https://developer.mozilla.org/docs/Web/CSS/border-start-start-radius',
      ),
    },
  ],
});
