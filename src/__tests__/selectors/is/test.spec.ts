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
      browserslist: 'chrome 87',
    },
  ],
  reject: [
    {
      code: stripIndent`
        :is(header, main, footer) p {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 26,
      message: messages.rejected('":is" pseudo-class', 'Chrome 87', 'https://developer.mozilla.org/docs/Web/CSS/:is'),
    },
  ],
});
