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
      browserslist: 'chrome 25',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -webkit-mask-attachment: fixed;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected(
        '"-webkit-mask-attachment" property',
        'Chrome 25',
        'https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-attachment',
      ),
    },
  ],
});
