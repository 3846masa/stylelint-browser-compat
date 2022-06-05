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
      browserslist: 'chrome 41',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (display-mode: fullscreen) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 21,
      message: messages.rejected(
        '"display-mode" media feature',
        'Chrome 41',
        'https://developer.mozilla.org/docs/Web/CSS/@media/display-mode',
      ),
    },
  ],
});
