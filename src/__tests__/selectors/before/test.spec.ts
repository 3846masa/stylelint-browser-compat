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
        a::before {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 10,
      message: messages.rejected(
        '"::before" pseudo-element',
        'IE 7',
        'https://developer.mozilla.org/docs/Web/CSS/::before',
      ),
    },
    {
      code: stripIndent`
        a:before {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 9,
      message: messages.rejected(
        '":before" pseudo-element',
        'IE 7',
        'https://developer.mozilla.org/docs/Web/CSS/::before',
      ),
    },
  ],
});
