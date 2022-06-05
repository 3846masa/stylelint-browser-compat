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
      browserslist: 'chrome 36',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          clip-path: circle(6rem at 12rem 8rem);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 40,
      message: messages.rejected(
        '"circle()" function',
        'Chrome 36',
        'https://developer.mozilla.org/docs/Web/CSS/basic-shape/circle',
      ),
    },
  ],
});
