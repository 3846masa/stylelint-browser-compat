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
          unknown: attr(data-foo frequency);
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 35,
      message: messages.rejected(
        'types.attr.type-or-unit.frequency',
        '"frequency" unit keyword for attr()',
        'Chrome 100',
        '',
      ),
    },
    {
      code: stripIndent`
        #id {
          unknown: attr(data-foo hz);
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('types.attr.type-or-unit.frequency', '"hz" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          unknown: attr(data-foo khz);
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected(
        'types.attr.type-or-unit.frequency',
        '"khz" unit keyword for attr()',
        'Chrome 100',
        '',
      ),
    },
    {
      code: stripIndent`
        #id {
          unknown: attr(data-foo Hz);
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('types.attr.type-or-unit.frequency', '"Hz" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          unknown: attr(data-foo kHz);
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected(
        'types.attr.type-or-unit.frequency',
        '"kHz" unit keyword for attr()',
        'Chrome 100',
        '',
      ),
    },
  ],
});
