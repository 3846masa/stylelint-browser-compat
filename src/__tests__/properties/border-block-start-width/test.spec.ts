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
      browserslist: 'chrome 68',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-block-start-width: medium;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected(
        '"border-block-start-width" property',
        'Chrome 68',
        'https://developer.mozilla.org/docs/Web/CSS/border-block-start-width',
      ),
    },
  ],
});
