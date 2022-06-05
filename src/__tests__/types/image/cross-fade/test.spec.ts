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
      browserslist: 'chrome 16',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: cross-fade(url('./image1.png'), url('./image2.png'), 75%);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 78,
      message: messages.rejected(
        '"cross-fade()" function',
        'Chrome 16',
        'https://developer.mozilla.org/docs/Web/CSS/cross-fade',
      ),
    },
  ],
});
