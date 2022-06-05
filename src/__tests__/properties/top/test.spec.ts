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
          top: 3px;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 6,
      message: messages.rejected(
        '"top" property',
        'Opera Android 12',
        'https://developer.mozilla.org/docs/Web/CSS/top',
      ),
    },
  ],
});
