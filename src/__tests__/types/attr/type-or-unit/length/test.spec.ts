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
      message: messages.rejected(
        'types.attr.type-or-unit.length',
        '"length" unit keyword for attr()',
        'Chrome 100',
        '',
      ),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"cap" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"ch" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"em" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"ex" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"ic" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"lh" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"rlh" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"rem" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"vb" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"vi" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"vw" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"vh" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"vmin" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"vmax" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"mm" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"Q" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"cm" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"in" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"pt" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"pc" unit keyword for attr()', 'Chrome 100', ''),
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
      message: messages.rejected('types.attr.type-or-unit.length', '"px" unit keyword for attr()', 'Chrome 100', ''),
    },
  ],
});
