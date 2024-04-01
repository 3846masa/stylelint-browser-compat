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
        features: ['properties.background.background-size'],
      },
      browserslist: 'op_mob 12',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-size: contain;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('"contain" value specified as background-size', 'Opera Android 12', ''),
    },
    {
      code: stripIndent`
        #id {
          background: center / contain;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected('"contain" value specified as background-size', 'Opera Android 12', ''),
    },
  ],
});
