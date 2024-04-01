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
        features: ['properties.align-self.flex_context.safe_unsafe'],
      },
      browserslist: 'chrome 92',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          align-self: start;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 20,
      message: messages.rejected('"start" value specified as align-self', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          align-self: safe start;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected('"start" value specified as align-self', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          align-self: unsafe start;
        }
      `,
      line: 2,
      column: 22,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('"start" value specified as align-self', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          align-self: end;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 18,
      message: messages.rejected('"end" value specified as align-self', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          align-self: safe end;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 23,
      message: messages.rejected('"end" value specified as align-self', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          align-self: unsafe end;
        }
      `,
      line: 2,
      column: 22,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected('"end" value specified as align-self', 'Chrome 92', ''),
    },
  ],
});
