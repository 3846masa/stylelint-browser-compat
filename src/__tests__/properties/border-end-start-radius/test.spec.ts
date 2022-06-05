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
      browserslist: 'chrome 88',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-end-start-radius: 80px 80px;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected(
        '"border-end-start-radius" property',
        'Chrome 88',
        'https://developer.mozilla.org/docs/Web/CSS/border-end-start-radius',
      ),
    },
  ],
});
