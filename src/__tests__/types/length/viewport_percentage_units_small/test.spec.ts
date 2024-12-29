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
          width: 1svb;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected('types.length.viewport_percentage_units_small', '"svb" unit', 'Firefox 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1svh;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected('types.length.viewport_percentage_units_small', '"svh" unit', 'Firefox 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1svi;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected('types.length.viewport_percentage_units_small', '"svi" unit', 'Firefox 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1svmax;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 16,
      message: messages.rejected('types.length.viewport_percentage_units_small', '"svmax" unit', 'Firefox 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1svmin;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 16,
      message: messages.rejected('types.length.viewport_percentage_units_small', '"svmin" unit', 'Firefox 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1svw;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected('types.length.viewport_percentage_units_small', '"svw" unit', 'Firefox 100', ''),
    },
  ],
});
