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
      browserslist: 'opera 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          overflow-x: visible;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 13,
      message: messages.rejected(
        '"overflow-x" property',
        'Opera 9',
        'https://developer.mozilla.org/docs/Web/CSS/overflow-x',
      ),
    },
  ],
});
