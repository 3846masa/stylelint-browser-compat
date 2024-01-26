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
      browserslist: 'chrome 54',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @keyframes slidein {
          0% {
            clip-path: inset(0);
          }
        }
      `,
      line: 3,
      column: 5,
      endLine: 3,
      endColumn: 14,
      message: messages.rejected('CSS animation for clip-path', 'Chrome 54', ''),
    },
    {
      code: stripIndent`
        #id {
          transition: clip-path 1s ease-out;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 24,
      message: messages.rejected('CSS transition for clip-path', 'Chrome 54', ''),
    },
    {
      code: stripIndent`
        #id {
          transition-property: clip-path;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 33,
      message: messages.rejected('CSS transition for clip-path', 'Chrome 54', ''),
    },
  ],
});
