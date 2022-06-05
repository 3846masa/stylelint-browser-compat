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
      browserslist: 'ie 6',
    },
  ],
  reject: [
    {
      code: stripIndent`
        div > span {
        }
      `,
      line: 1,
      column: 5,
      endLine: 1,
      endColumn: 6,
      message: messages.rejected(
        'Child combinator',
        'IE 6',
        'https://developer.mozilla.org/docs/Web/CSS/Child_combinator',
      ),
    },
  ],
});
