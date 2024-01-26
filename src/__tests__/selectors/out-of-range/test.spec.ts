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
      browserslist: 'firefox 28',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input:out-of-range {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 19,
      message: messages.rejected(
        '":out-of-range" pseudo-class',
        'Firefox 28',
        'https://developer.mozilla.org/docs/Web/CSS/:out-of-range',
      ),
    },
  ],
});
