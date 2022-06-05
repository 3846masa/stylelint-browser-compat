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
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          animation-iteration-count: infinite;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected(
        '"animation-iteration-count" property',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/animation-iteration-count',
      ),
    },
  ],
});
