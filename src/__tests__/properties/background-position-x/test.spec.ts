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
      browserslist: 'firefox 48',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-position-x: center;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 24,
      message: messages.rejected(
        '"background-position-x" property',
        'Firefox 48',
        'https://developer.mozilla.org/docs/Web/CSS/background-position-x',
      ),
    },
  ],
});
