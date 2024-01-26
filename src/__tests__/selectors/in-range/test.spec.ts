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
        input:in-range {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 15,
      message: messages.rejected(
        '":in-range" pseudo-class',
        'Firefox 28',
        'https://developer.mozilla.org/docs/Web/CSS/:in-range',
      ),
    },
  ],
});
