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
      browserslist: 'chrome 97',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (video-dynamic-range: standard) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 28,
      message: messages.rejected(
        '"video-dynamic-range" media feature',
        'Chrome 97',
        'https://developer.mozilla.org/docs/Web/CSS/@media/video-dynamic-range',
      ),
    },
  ],
});
