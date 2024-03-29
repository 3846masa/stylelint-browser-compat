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
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        span:nth-last-child(2n+1) {
        }
      `,
      line: 1,
      column: 5,
      endLine: 1,
      endColumn: 26,
      message: messages.rejected(
        '":nth-last-child" pseudo-class',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/:nth-last-child',
      ),
    },
  ],
});
