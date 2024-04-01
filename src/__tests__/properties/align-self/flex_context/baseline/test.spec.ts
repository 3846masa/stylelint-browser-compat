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
          'properties.align-self',
          'properties.align-self.flex_context.first_baseline',
          'properties.align-self.flex_context.last_baseline',
        ],
      },
      browserslist: 'chrome 20',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          align-self: baseline;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 23,
      message: messages.rejected('"baseline" value specified as align-self', 'Chrome 20', ''),
    },
    {
      code: stripIndent`
        #id {
          align-self: first baseline;
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected('"baseline" value specified as align-self', 'Chrome 20', ''),
    },
    {
      code: stripIndent`
        #id {
          align-self: last baseline;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('"baseline" value specified as align-self', 'Chrome 20', ''),
    },
  ],
});
