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
      browserslist: 'op_mob 10',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-bottom-right-radius: 4px;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected(
        '"border-bottom-right-radius" property',
        'Opera Android 10',
        'https://developer.mozilla.org/docs/Web/CSS/border-bottom-right-radius',
      ),
    },
  ],
});
