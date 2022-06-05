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
      browserslist: 'opera 12',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          box-align: center;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 12,
      message: messages.rejected(
        '"box-align" property',
        'Opera 12',
        'https://developer.mozilla.org/docs/Web/CSS/box-align',
      ),
    },
  ],
});
