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
        @scroll-timeline squareTimeline {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 17,
      message: messages.rejected(
        '"@scroll-timeline" at rules',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/@scroll-timeline',
      ),
    },
  ],
});
