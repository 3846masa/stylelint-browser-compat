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
      browserslist: 'opera 12',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          box-orient: horizontal;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 13,
      message: messages.rejected(
        '"box-orient" property',
        'Opera 12',
        'https://developer.mozilla.org/docs/Web/CSS/box-orient',
      ),
    },
  ],
});
