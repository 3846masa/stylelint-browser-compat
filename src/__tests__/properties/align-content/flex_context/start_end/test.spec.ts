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
        features: ['properties.align-content.flex_context.safe_unsafe'],
      },
      browserslist: 'chrome 92',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          align-content: start;
        }
      `,
      line: 2,
      column: 18,
      endLine: 2,
      endColumn: 23,
      message: messages.rejected('"start" value specified as align-content', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          align-content: safe start;
        }
      `,
      line: 2,
      column: 23,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('"start" value specified as align-content', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          align-content: unsafe start;
        }
      `,
      line: 2,
      column: 25,
      endLine: 2,
      endColumn: 30,
      message: messages.rejected('"start" value specified as align-content', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          align-content: end;
        }
      `,
      line: 2,
      column: 18,
      endLine: 2,
      endColumn: 21,
      message: messages.rejected('"end" value specified as align-content', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          align-content: safe end;
        }
      `,
      line: 2,
      column: 23,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"end" value specified as align-content', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          align-content: unsafe end;
        }
      `,
      line: 2,
      column: 25,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('"end" value specified as align-content', 'Chrome 92', ''),
    },
  ],
});
