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
      browserslist: 'chrome 21',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          box-decoration-break: slice;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 23,
      message: messages.rejected(
        '"box-decoration-break" property',
        'Chrome 21',
        'https://developer.mozilla.org/docs/Web/CSS/box-decoration-break',
      ),
    },
  ],
});
