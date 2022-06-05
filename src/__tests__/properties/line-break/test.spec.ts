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
      browserslist: 'firefox 68',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          line-break: auto;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 13,
      message: messages.rejected(
        '"line-break" property',
        'Firefox 68',
        'https://developer.mozilla.org/docs/Web/CSS/line-break',
      ),
    },
  ],
});
