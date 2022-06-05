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
      browserslist: 'chrome 56',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          caret-color: red;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected(
        '"caret-color" property',
        'Chrome 56',
        'https://developer.mozilla.org/docs/Web/CSS/caret-color',
      ),
    },
  ],
});
