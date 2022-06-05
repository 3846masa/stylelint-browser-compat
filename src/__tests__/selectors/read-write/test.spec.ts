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
      browserslist: 'ie 11',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input:read-write {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 17,
      message: messages.rejected(
        '":read-write" pseudo-class',
        'IE 11',
        'https://developer.mozilla.org/docs/Web/CSS/:read-write',
      ),
    },
  ],
});
