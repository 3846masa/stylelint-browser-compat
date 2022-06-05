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
        features: [
          'properties.background-clip',
          'properties.background-origin',
          'properties.background-origin.content-box',
          'properties.background.background-origin',
          'properties.background.background-clip',
        ],
      },
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-clip: content-box;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected('"content-box" value specified as background-clip', 'IE 8', ''),
    },
    {
      code: stripIndent`
        #id {
          background: content-box;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"content-box" value specified as background-clip', 'IE 8', ''),
    },
    {
      code: stripIndent`
        #id {
          background: border-box content-box;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 37,
      message: messages.rejected('"content-box" value specified as background-clip', 'IE 8', ''),
    },
  ],
});
