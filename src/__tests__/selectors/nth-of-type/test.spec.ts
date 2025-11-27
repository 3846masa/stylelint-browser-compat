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
        span:nth-of-type(2n+1) {
        }
      `,
      line: 1,
      column: 5,
      endLine: 1,
      endColumn: 23,
      message: messages.rejected(
        'selectors.nth-of-type',
        '":nth-of-type" pseudo-class',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:nth-of-type',
      ),
    },
  ],
});
