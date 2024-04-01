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
        features: ['properties.align-items.flex_context.safe_unsafe'],
      },
      browserslist: 'chrome 92',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          align-items: start;
        }
      `,
      line: 2,
      column: 16,
      endLine: 2,
      endColumn: 21,
      message: messages.rejected('"start" value specified as align-items', 'Chrome 92', ''),
    },

    {
      code: stripIndent`
        #id {
          align-items: safe start;
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"start" value specified as align-items', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          align-items: unsafe start;
        }
      `,
      line: 2,
      column: 23,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('"start" value specified as align-items', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          align-items: end;
        }
      `,
      line: 2,
      column: 16,
      endLine: 2,
      endColumn: 19,
      message: messages.rejected('"end" value specified as align-items', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          align-items: safe end;
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 24,
      message: messages.rejected('"end" value specified as align-items', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          align-items: unsafe end;
        }
      `,
      line: 2,
      column: 23,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"end" value specified as align-items', 'Chrome 92', ''),
    },
  ],
});
