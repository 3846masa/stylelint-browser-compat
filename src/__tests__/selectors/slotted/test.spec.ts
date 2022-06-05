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
      browserslist: 'firefox 62',
    },
  ],
  reject: [
    {
      code: stripIndent`
        ::slotted(span) {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 16,
      message: messages.rejected(
        '"::slotted" pseudo-element',
        'Firefox 62',
        'https://developer.mozilla.org/docs/Web/CSS/::slotted',
      ),
    },
  ],
});
