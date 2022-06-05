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
      browserslist: 'firefox 67',
    },
  ],
  reject: [
    {
      code: stripIndent`
        ::marker {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 9,
      message: messages.rejected(
        '"::marker" pseudo-element',
        'Firefox 67',
        'https://developer.mozilla.org/docs/Web/CSS/::marker',
      ),
    },
  ],
});
