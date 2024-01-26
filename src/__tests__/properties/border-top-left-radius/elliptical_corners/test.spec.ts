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
      browserslist: 'op_mob 12',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-top-left-radius: 4px 16px;
        }
      `,
      line: 2,
      column: 27,
      endLine: 2,
      endColumn: 35,
      message: messages.rejected('Elliptical corner by border-top-left-radius', 'Opera Android 12', ''),
    },
  ],
});
