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
      message: messages.rejected('"dvb" unit', 'Firefox 100', ''),
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
      message: messages.rejected('"dvh" unit', 'Firefox 100', ''),
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
      message: messages.rejected('"dvi" unit', 'Firefox 100', ''),
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
      message: messages.rejected('"dvmax" unit', 'Firefox 100', ''),
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
      message: messages.rejected('"dvmin" unit', 'Firefox 100', ''),
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
      message: messages.rejected('"dvw" unit', 'Firefox 100', ''),
    },
  ],
});
