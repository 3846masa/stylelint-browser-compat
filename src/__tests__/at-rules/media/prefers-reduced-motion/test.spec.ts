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
      browserslist: 'chrome 73',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (prefers-reduced-motion) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 31,
      message: messages.rejected(
        '"prefers-reduced-motion" media feature',
        'Chrome 73',
        'https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-motion',
      ),
    },
  ],
});
