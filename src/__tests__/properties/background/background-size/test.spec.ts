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
        features: ['properties.background-size'],
      },
      browserslist: 'chrome 20',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background: center / 100px;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected('Values of background-size specified as background', 'Chrome 20', ''),
    },
    {
      code: stripIndent`
        #id {
          background: center / auto;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('Values of background-size specified as background', 'Chrome 20', ''),
    },
    {
      code: stripIndent`
        #id {
          background: center / cover;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected('Values of background-size specified as background', 'Chrome 20', ''),
    },
    {
      code: stripIndent`
        #id {
          background: center / contain;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected('Values of background-size specified as background', 'Chrome 20', ''),
    },
    {
      code: stripIndent`
        #id {
          background: center / 100px 100px;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 35,
      message: messages.rejected('Values of background-size specified as background', 'Chrome 20', ''),
    },
    {
      code: stripIndent`
        #id {
          background: center / 100px auto;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 34,
      message: messages.rejected('Values of background-size specified as background', 'Chrome 20', ''),
    },
    {
      code: stripIndent`
        #id {
          background: center / auto 100px;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 34,
      message: messages.rejected('Values of background-size specified as background', 'Chrome 20', ''),
    },
    {
      code: stripIndent`
        #id {
          background: center / auto auto;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 33,
      message: messages.rejected('Values of background-size specified as background', 'Chrome 20', ''),
    },
  ],
});
