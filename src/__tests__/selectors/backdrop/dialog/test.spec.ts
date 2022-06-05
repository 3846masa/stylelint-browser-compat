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
      browserslist: 'ie 11',
    },
  ],
  reject: [
    {
      code: stripIndent`
        dialog::backdrop {
        }
      `,
      line: 1,
      column: 7,
      endLine: 1,
      endColumn: 17,
      message: messages.rejected('"::backdrop" pseudo-element for the dialog tag', 'IE 11', ''),
    },
    {
      code: stripIndent`
        dialog.class::backdrop {
        }
      `,
      line: 1,
      column: 13,
      endLine: 1,
      endColumn: 23,
      message: messages.rejected('"::backdrop" pseudo-element for the dialog tag', 'IE 11', ''),
    },
  ],
});
