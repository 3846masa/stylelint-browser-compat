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
      browserslist: 'chrome 24',
    },
  ],
  accept: [
    {
      code: stripIndent`
        #id {
          background-position: center;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          background-position: left top;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          background-position: left 10%;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          background: 10% top;
        }
      `,
    },
    // background
    {
      code: stripIndent`
        #id {
          background: center;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          background: left top;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          background: left 10%;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          background: 10% top;
        }
      `,
    },
    // background with background-size
    {
      code: stripIndent`
        #id {
          background: center / 50% 50%;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          background: left top / 50% 50%;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          background: left 10% / 50% 50%;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          background: 10% top / 50% 50%;
        }
      `,
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-position: top 50% left;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 36,
      message: messages.rejected('Offset values from any edge specified as background-position', 'Chrome 24', ''),
    },
    {
      code: stripIndent`
        #id {
          background-position: top left 50%;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 36,
      message: messages.rejected('Offset values from any edge specified as background-position', 'Chrome 24', ''),
    },
    {
      code: stripIndent`
        #id {
          background-position: top 50% left 50%;
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 40,
      message: messages.rejected('Offset values from any edge specified as background-position', 'Chrome 24', ''),
    },
    // background
    {
      code: stripIndent`
        #id {
          background: top 50% left;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('Offset values from any edge specified as background-position', 'Chrome 24', ''),
    },
    {
      code: stripIndent`
        #id {
          background: top left 50%;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('Offset values from any edge specified as background-position', 'Chrome 24', ''),
    },
    {
      code: stripIndent`
        #id {
          background: top 50% left 50%;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected('Offset values from any edge specified as background-position', 'Chrome 24', ''),
    },
    // background with background-size
    {
      code: stripIndent`
        #id {
          background: top 50% left / 50% 50%;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('Offset values from any edge specified as background-position', 'Chrome 24', ''),
    },
    {
      code: stripIndent`
        #id {
          background: top left 50% / 50% 50%;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('Offset values from any edge specified as background-position', 'Chrome 24', ''),
    },
    {
      code: stripIndent`
        #id {
          background: top 50% left 50% / 50% 50%;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected('Offset values from any edge specified as background-position', 'Chrome 24', ''),
    },
  ],
});
