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
      allow: {
        features: ['properties.-moz-user-input'],
      },
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -moz-user-input: none;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 24,
      message: messages.rejected('"none" value specified as -moz-user-input', 'Chrome 100', ''),
    },
  ],
});
