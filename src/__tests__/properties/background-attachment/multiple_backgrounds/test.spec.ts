/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [require.resolve('~/index')],
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
          background-attachment: scroll, scroll;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 40,
      message: messages.rejected('Multiple backgrounds', 'IE 8', ''),
    },
  ],
});
