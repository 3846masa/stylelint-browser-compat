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
          width: attr(data-foo length);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 30,
      message: messages.rejected('"length" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo cap);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('"cap" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo ch);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"ch" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo em);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"em" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo ex);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"ex" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo ic);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"ic" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo lh);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"lh" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo rlh);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('"rlh" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo rem);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('"rem" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo vb);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"vb" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo vi);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"vi" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo vw);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"vw" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo vh);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"vh" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo vmin);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('"vmin" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo vmax);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('"vmax" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo mm);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"mm" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo Q);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected('"Q" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo cm);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"cm" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo in);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"in" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo pt);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"pt" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo pc);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"pc" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          width: attr(data-foo px);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"px" unit keyword for attr()', 'Chrome 100', ''),
    },
  ],
});
