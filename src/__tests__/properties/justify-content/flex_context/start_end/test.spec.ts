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
        features: ['properties.justify-content.flex_context.safe_unsafe'],
      },
      browserslist: 'chrome 92',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          justify-content: start;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected('"start" value specified as justify-content', 'Chrome 92', ''),
    },

    {
      code: stripIndent`
        #id {
          justify-content: safe start;
        }
      `,
      line: 2,
      column: 25,
      endLine: 2,
      endColumn: 30,
      message: messages.rejected('"start" value specified as justify-content', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          justify-content: unsafe start;
        }
      `,
      line: 2,
      column: 27,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected('"start" value specified as justify-content', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          justify-content: end;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 23,
      message: messages.rejected('"end" value specified as justify-content', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          justify-content: safe end;
        }
      `,
      line: 2,
      column: 25,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('"end" value specified as justify-content', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          justify-content: unsafe end;
        }
      `,
      line: 2,
      column: 27,
      endLine: 2,
      endColumn: 30,
      message: messages.rejected('"end" value specified as justify-content', 'Chrome 92', ''),
    },
  ],
});
