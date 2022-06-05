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
        features: ['properties.transition-timing-function', 'properties.transition-timing-function.jump'],
      },
      browserslist: 'chrome 76',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          transition-timing-function: steps(3, jump-none);
        }
      `,
      line: 2,
      column: 40,
      endLine: 2,
      endColumn: 49,
      message: messages.rejected('"jump-none" keyword for steps()', 'Chrome 76', ''),
    },
    {
      code: stripIndent`
        #id {
          transition-timing-function: steps(3, jump-start);
        }
      `,
      line: 2,
      column: 40,
      endLine: 2,
      endColumn: 50,
      message: messages.rejected('"jump-start" keyword for steps()', 'Chrome 76', ''),
    },
    {
      code: stripIndent`
        #id {
          transition-timing-function: steps(3, jump-end);
        }
      `,
      line: 2,
      column: 40,
      endLine: 2,
      endColumn: 48,
      message: messages.rejected('"jump-end" keyword for steps()', 'Chrome 76', ''),
    },
    {
      code: stripIndent`
        #id {
          transition-timing-function: steps(3, jump-both);
        }
      `,
      line: 2,
      column: 40,
      endLine: 2,
      endColumn: 49,
      message: messages.rejected('"jump-both" keyword for steps()', 'Chrome 76', ''),
    },
  ],
});
