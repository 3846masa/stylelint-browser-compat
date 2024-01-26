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
          background-position: center, center;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 38,
      message: messages.rejected('Multiple backgrounds', 'IE 8', ''),
    },
  ],
});
