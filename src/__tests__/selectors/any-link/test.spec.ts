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
      browserslist: 'opera 12',
    },
  ],
  reject: [
    {
      code: stripIndent`
        a:any-link {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 11,
      message: messages.rejected(
        '":any-link" pseudo-class',
        'Opera 12',
        'https://developer.mozilla.org/docs/Web/CSS/:any-link',
      ),
    },
  ],
});
