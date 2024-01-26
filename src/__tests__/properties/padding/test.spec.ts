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
          padding: 1em;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 10,
      message: messages.rejected(
        '"padding" property',
        'Opera Android 12',
        'https://developer.mozilla.org/docs/Web/CSS/padding',
      ),
    },
  ],
});
