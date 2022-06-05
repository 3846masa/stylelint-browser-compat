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
      browserslist: 'firefox 60',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -moz-user-input: enabled;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('"enabled" value specified as -moz-user-input', 'Firefox 60', ''),
    },
  ],
});
