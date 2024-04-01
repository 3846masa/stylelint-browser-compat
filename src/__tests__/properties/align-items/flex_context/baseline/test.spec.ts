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
          'properties.align-items',
          'properties.align-items.flex_context.first_baseline',
          'properties.align-items.flex_context.last_baseline',
        ],
      },
      browserslist: 'chrome 20',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          align-items: baseline;
        }
      `,
      line: 2,
      column: 16,
      endLine: 2,
      endColumn: 24,
      message: messages.rejected('"baseline" value specified as align-items', 'Chrome 20', ''),
    },
    {
      code: stripIndent`
        #id {
          align-items: first baseline;
        }
      `,
      line: 2,
      column: 22,
      endLine: 2,
      endColumn: 30,
      message: messages.rejected('"baseline" value specified as align-items', 'Chrome 20', ''),
    },
    {
      code: stripIndent`
        #id {
          align-items: last baseline;
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected('"baseline" value specified as align-items', 'Chrome 20', ''),
    },
  ],
});
