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
          width: 1rem;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected('"rem" unit', 'IE 8', ''),
    },
  ],
});
