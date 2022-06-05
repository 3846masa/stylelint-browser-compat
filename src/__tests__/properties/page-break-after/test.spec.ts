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
      browserslist: 'op_mob 12',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          page-break-after: auto;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 19,
      message: messages.rejected(
        '"page-break-after" property',
        'Opera Android 12',
        'https://developer.mozilla.org/docs/Web/CSS/page-break-after',
      ),
    },
  ],
});
