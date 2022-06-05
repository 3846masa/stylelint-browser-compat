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
        @keyframes slidein {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 11,
      message: messages.rejected(
        '"@keyframes" at rules',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/@keyframes',
      ),
    },
  ],
});
