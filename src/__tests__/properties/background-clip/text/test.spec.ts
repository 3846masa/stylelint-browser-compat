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
          'properties.background.background-origin',
          'properties.background.background-clip',
        ],
      },
      browserslist: 'firefox 48',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-clip: text;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 24,
      message: messages.rejected('"text" value specified as background-clip', 'Firefox 48', ''),
    },
    {
      code: stripIndent`
        #id {
          background: text;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 19,
      message: messages.rejected('"text" value specified as background-clip', 'Firefox 48', ''),
    },
    {
      code: stripIndent`
        #id {
          background: border-box text;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 30,
      message: messages.rejected('"text" value specified as background-clip', 'Firefox 48', ''),
    },
  ],
});
