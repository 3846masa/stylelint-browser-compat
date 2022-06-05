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
      browserslist: 'chrome 64',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: paint(hollowHighlights, stroke, 2px);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 57,
      message: messages.rejected(
        '"paint()" function',
        'Chrome 64',
        'https://developer.mozilla.org/docs/Web/CSS/image/paint',
      ),
    },
  ],
});
