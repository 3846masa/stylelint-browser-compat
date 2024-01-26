/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, plugin, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [plugin],
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
          'properties.background-clip.content-box',
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
          background-origin: content-box;
        }
      `,
      line: 2,
      column: 22,
      endLine: 2,
      endColumn: 33,
      message: messages.rejected('"content-box" value specified as background-origin', 'IE 8', ''),
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
      message: messages.rejected('"content-box" value specified as background-origin', 'IE 8', ''),
    },
    {
      code: stripIndent`
        #id {
          background: content-box border-box;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"content-box" value specified as background-origin', 'IE 8', ''),
    },
  ],
});
