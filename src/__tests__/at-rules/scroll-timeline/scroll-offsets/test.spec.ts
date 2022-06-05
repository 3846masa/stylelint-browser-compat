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
          scroll-offsets: 0px, 300px;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 17,
      message: messages.rejected('"scroll-offsets" descriptor of the @scroll-timeline', 'Chrome 100', ''),
    },
  ],
});
