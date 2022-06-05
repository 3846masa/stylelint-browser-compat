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
        features: ['properties.block-size'],
      },
      browserslist: 'firefox 40',
    },
  ],
  reject: [
    {
      code: stripIndent`
      #id {
        block-size: -moz-max-content;
      }
    `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected('"max-content" value specified as block-size', 'Firefox 40', ''),
    },
    {
      code: stripIndent`
        #id {
          block-size: max-content;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"max-content" value specified as block-size', 'Firefox 40', ''),
    },
  ],
});
