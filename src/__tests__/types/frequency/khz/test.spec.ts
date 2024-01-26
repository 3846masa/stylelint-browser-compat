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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          unknown: 100khz;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 18,
      message: messages.rejected('"khz" unit', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          unknown: 100kHz;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 18,
      message: messages.rejected('"kHz" unit', 'Chrome 100', ''),
    },
  ],
});
