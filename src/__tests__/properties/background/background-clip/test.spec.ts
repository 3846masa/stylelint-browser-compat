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
        features: ['properties.background.background-origin'],
      },
      browserslist: 'chrome 20',
    },
  ],
  reject: [
    {
      code: stripIndent`
      #id {
        background: border-box;
      }
    `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected('Values of background-clip specified as background', 'Chrome 20', ''),
    },
    {
      code: stripIndent`
        #id {
          background: border-box padding-box;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 37,
      message: messages.rejected('Values of background-clip specified as background', 'Chrome 20', ''),
    },
  ],
});
