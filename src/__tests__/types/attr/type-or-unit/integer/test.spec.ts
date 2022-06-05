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
          flex-grow: attr(data-foo integer);
        }
      `,
      line: 2,
      column: 28,
      endLine: 2,
      endColumn: 35,
      message: messages.rejected('"integer" unit keyword for attr()', 'Chrome 100', ''),
    },
  ],
});
