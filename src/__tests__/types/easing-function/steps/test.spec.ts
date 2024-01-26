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
        features: ['properties.transition-timing-function'],
      },
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          transition-timing-function: steps(2, start);
        }
      `,
      line: 2,
      column: 31,
      endLine: 2,
      endColumn: 46,
      message: messages.rejected('"steps()" function', 'IE 9', ''),
    },
    {
      code: stripIndent`
        #id {
          transition-timing-function: step-start;
        }
      `,
      line: 2,
      column: 31,
      endLine: 2,
      endColumn: 41,
      message: messages.rejected('"step-start" value', 'IE 9', ''),
    },
    {
      code: stripIndent`
        #id {
          transition-timing-function: step-end;
        }
      `,
      line: 2,
      column: 31,
      endLine: 2,
      endColumn: 39,
      message: messages.rejected('"step-end" value', 'IE 9', ''),
    },
  ],
});
