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
      browserslist: 'firefox 16',
    },
  ],
  reject: [
    {
      code: stripIndent`
        :dir(rtl) {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 10,
      message: messages.rejected(
        '":dir" pseudo-class',
        'Firefox 16',
        'https://developer.mozilla.org/docs/Web/CSS/:dir',
      ),
    },
  ],
});
