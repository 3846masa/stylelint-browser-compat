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
      browserslist: 'ie 7',
    },
  ],
  reject: [
    {
      code: stripIndent`
        a::after {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 9,
      message: messages.rejected(
        '"::after" pseudo-element',
        'IE 7',
        'https://developer.mozilla.org/docs/Web/CSS/::after',
      ),
    },
    {
      code: stripIndent`
        a:after {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 8,
      message: messages.rejected(
        '":after" pseudo-element',
        'IE 7',
        'https://developer.mozilla.org/docs/Web/CSS/::after',
      ),
    },
  ],
});
