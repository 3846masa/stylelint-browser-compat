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
          'properties.align-content',
          'properties.align-content.flex_context.first_baseline',
          'properties.align-content.flex_context.last_baseline',
        ],
      },
      browserslist: 'chrome 20',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          align-content: baseline;
        }
      `,
      line: 2,
      column: 18,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"baseline" value specified as align-content', 'Chrome 20', ''),
    },
    {
      code: stripIndent`
        #id {
          align-content: first baseline;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected('"baseline" value specified as align-content', 'Chrome 20', ''),
    },
    {
      code: stripIndent`
        #id {
          align-content: last baseline;
        }
      `,
      line: 2,
      column: 23,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected('"baseline" value specified as align-content', 'Chrome 20', ''),
    },
  ],
});
