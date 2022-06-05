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
          box-ordinal-group: 1;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 20,
      message: messages.rejected(
        '"box-ordinal-group" property',
        'Opera 12',
        'https://developer.mozilla.org/docs/Web/CSS/box-ordinal-group',
      ),
    },
  ],
});
