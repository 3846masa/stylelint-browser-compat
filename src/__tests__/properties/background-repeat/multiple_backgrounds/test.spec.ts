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
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-repeat: repeat, repeat;
        }
      `,
      line: 2,
      column: 22,
      endLine: 2,
      endColumn: 36,
      message: messages.rejected('Multiple backgrounds', 'IE 8', ''),
    },
  ],
});
