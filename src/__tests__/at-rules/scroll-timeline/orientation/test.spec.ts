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
      allow: {
        features: ['at-rules.scroll-timeline'],
      },
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @scroll-timeline squareTimeline {
          orientation: "vertical";
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected('"orientation" descriptor of the @scroll-timeline', 'Chrome 100', ''),
    },
  ],
});
