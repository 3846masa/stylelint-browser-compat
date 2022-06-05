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
      browserslist: 'chrome 92',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          accent-color: red;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 15,
      message: messages.rejected(
        '"accent-color" property',
        'Chrome 92',
        'https://developer.mozilla.org/docs/Web/CSS/accent-color',
      ),
    },
  ],
});
