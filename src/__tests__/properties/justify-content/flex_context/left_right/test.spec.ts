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
          justify-content: left;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 24,
      message: messages.rejected('"left" value specified as justify-content', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          justify-content: safe left;
        }
      `,
      line: 2,
      column: 25,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected('"left" value specified as justify-content', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          justify-content: unsafe left;
        }
      `,
      line: 2,
      column: 27,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected('"left" value specified as justify-content', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          justify-content: right;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected('"right" value specified as justify-content', 'Chrome 92', ''),
    },

    {
      code: stripIndent`
        #id {
          justify-content: safe right;
        }
      `,
      line: 2,
      column: 25,
      endLine: 2,
      endColumn: 30,
      message: messages.rejected('"right" value specified as justify-content', 'Chrome 92', ''),
    },
    {
      code: stripIndent`
        #id {
          justify-content: unsafe right;
        }
      `,
      line: 2,
      column: 27,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected('"right" value specified as justify-content', 'Chrome 92', ''),
    },
  ],
});
