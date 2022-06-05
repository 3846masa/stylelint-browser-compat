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
      browserslist: 'chrome 39',
    },
  ],
  reject: [
    {
      code: stripIndent`
        form:valid {
        }
      `,
      line: 1,
      column: 5,
      endLine: 1,
      endColumn: 11,
      message: messages.rejected('":valid" pseudo-class with the form tag', 'Chrome 39', ''),
    },
  ],
});
