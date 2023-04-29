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
      browserslist: 'ie 6',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          overflow-clip-box-inline: padding-box;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('"overflow-clip-box-inline" property', 'IE 6', ''),
    },
  ],
});
