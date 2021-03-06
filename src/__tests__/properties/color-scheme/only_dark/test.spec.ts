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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color-scheme: only dark;
        }
      `,
      line: 2,
      column: 17,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"only dark" keyword specified as color-scheme', 'Chrome 100', ''),
    },
  ],
});
