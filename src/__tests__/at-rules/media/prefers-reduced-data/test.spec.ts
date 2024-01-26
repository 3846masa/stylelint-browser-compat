/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, plugin, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [plugin],
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
        @media (prefers-reduced-data: no-preference) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 29,
      message: messages.rejected(
        '"prefers-reduced-data" media feature',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-data',
      ),
    },
  ],
});
