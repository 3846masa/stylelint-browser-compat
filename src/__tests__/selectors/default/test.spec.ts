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
      browserslist: 'chrome 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input:default {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 14,
      message: messages.rejected(
        '":default" pseudo-class',
        'Chrome 9',
        'https://developer.mozilla.org/docs/Web/CSS/:default',
      ),
    },
  ],
});
