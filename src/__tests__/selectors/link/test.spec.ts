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
      browserslist: 'op_mob 12',
    },
  ],
  reject: [
    {
      code: stripIndent`
        a:link {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 7,
      message: messages.rejected(
        '":link" pseudo-class',
        'Opera Android 12',
        'https://developer.mozilla.org/docs/Web/CSS/:link',
      ),
    },
  ],
});
