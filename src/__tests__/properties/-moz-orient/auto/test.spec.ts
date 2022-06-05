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
      browserslist: 'firefox 40',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -moz-orient: auto;
        }
      `,
      line: 2,
      column: 16,
      endLine: 2,
      endColumn: 20,
      message: messages.rejected('"auto" value specified as -moz-orient', 'Firefox 40', ''),
    },
  ],
});
