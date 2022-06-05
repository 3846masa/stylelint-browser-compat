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
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        p:only-of-type {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 15,
      message: messages.rejected(
        '":only-of-type" pseudo-class',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/:only-of-type',
      ),
    },
  ],
});
