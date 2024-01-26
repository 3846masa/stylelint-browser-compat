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
        #id {
          color: inherit;
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 17,
      message: messages.rejected(
        '"inherit" value',
        'Opera Android 12',
        'https://developer.mozilla.org/docs/Web/CSS/inherit',
      ),
    },
  ],
});
