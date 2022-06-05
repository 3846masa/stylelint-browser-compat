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
      browserslist: 'ie 5.5',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media print {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 7,
      message: messages.rejected('"@media" at rules', 'IE 5.5', 'https://developer.mozilla.org/docs/Web/CSS/@media'),
    },
  ],
});
