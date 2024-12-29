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
      message: messages.rejected('types.length.viewport_percentage_units_large', '"lvb" unit', 'Firefox 100', ''),
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
      message: messages.rejected('types.length.viewport_percentage_units_large', '"lvh" unit', 'Firefox 100', ''),
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
      message: messages.rejected('types.length.viewport_percentage_units_large', '"lvi" unit', 'Firefox 100', ''),
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
      message: messages.rejected('types.length.viewport_percentage_units_large', '"lvmax" unit', 'Firefox 100', ''),
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
      message: messages.rejected('types.length.viewport_percentage_units_large', '"lvmin" unit', 'Firefox 100', ''),
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
      message: messages.rejected('types.length.viewport_percentage_units_large', '"lvw" unit', 'Firefox 100', ''),
    },
  ],
});
