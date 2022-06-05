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
      browserslist: 'chrome 13',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          table-layout: auto;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 15,
      message: messages.rejected(
        '"table-layout" property',
        'Chrome 13',
        'https://developer.mozilla.org/docs/Web/CSS/table-layout',
      ),
    },
  ],
});
