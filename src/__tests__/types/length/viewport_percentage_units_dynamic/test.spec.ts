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
          width: 1dvb;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected('types.length.viewport_percentage_units_dynamic', '"dvb" unit', 'Firefox 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1dvh;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected('types.length.viewport_percentage_units_dynamic', '"dvh" unit', 'Firefox 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1dvi;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected('types.length.viewport_percentage_units_dynamic', '"dvi" unit', 'Firefox 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1dvmax;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 16,
      message: messages.rejected('types.length.viewport_percentage_units_dynamic', '"dvmax" unit', 'Firefox 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1dvmin;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 16,
      message: messages.rejected('types.length.viewport_percentage_units_dynamic', '"dvmin" unit', 'Firefox 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: 1dvw;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected('types.length.viewport_percentage_units_dynamic', '"dvw" unit', 'Firefox 100', ''),
    },
  ],
});
