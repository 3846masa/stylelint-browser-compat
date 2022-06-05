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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        ::grammar-error {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 16,
      message: messages.rejected(
        '"::grammar-error" pseudo-element',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/::grammar-error',
      ),
    },
  ],
});
