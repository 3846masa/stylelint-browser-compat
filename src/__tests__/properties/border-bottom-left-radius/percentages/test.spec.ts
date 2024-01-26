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
          border-bottom-left-radius: 50%;
        }
      `,
      line: 2,
      column: 30,
      endLine: 2,
      endColumn: 33,
      message: messages.rejected('Percentage value specified as border-bottom-left-radius', 'Opera Android 12', ''),
    },
  ],
});
