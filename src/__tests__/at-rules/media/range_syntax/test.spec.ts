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
      browserslist: 'firefox 62',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (30em <= width <= 50em) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 30,
      message: messages.rejected('at-rules.media.range_syntax', 'Range syntax for media queries', 'Firefox 62', ''),
    },
  ],
});
