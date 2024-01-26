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
        input:enabled {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 14,
      message: messages.rejected(
        '":enabled" pseudo-class',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/:enabled',
      ),
    },
  ],
});
