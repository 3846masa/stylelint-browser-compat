/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [require.resolve('~/index')],
});

testRule({
  ruleName,
  config: [
    true,
    {
      browserslist: 'firefox 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          width: 1lvb;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected('"lvb" unit', 'Firefox 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1lvh;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected('"lvh" unit', 'Firefox 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1lvi;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected('"lvi" unit', 'Firefox 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1lvmax;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 16,
      message: messages.rejected('"lvmax" unit', 'Firefox 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1lvmin;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 16,
      message: messages.rejected('"lvmin" unit', 'Firefox 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1lvw;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected('"lvw" unit', 'Firefox 100', ''),
    },
  ],
});
