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
          animation-direction: normal;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 22,
      message: messages.rejected(
        '"animation-direction" property',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/animation-direction',
      ),
    },
  ],
});
