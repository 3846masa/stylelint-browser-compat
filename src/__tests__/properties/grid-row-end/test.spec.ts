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
      browserslist: 'ie 6',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          grid-row-end: auto;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 15,
      message: messages.rejected(
        '"grid-row-end" property',
        'IE 6',
        'https://developer.mozilla.org/docs/Web/CSS/grid-row-end',
      ),
    },
  ],
});
