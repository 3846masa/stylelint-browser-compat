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
          clip-path: inset(22% 12% 15px 35px);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 38,
      message: messages.rejected(
        '"inset()" function',
        'Chrome 36',
        'https://developer.mozilla.org/docs/Web/CSS/basic-shape/inset',
      ),
    },
  ],
});
