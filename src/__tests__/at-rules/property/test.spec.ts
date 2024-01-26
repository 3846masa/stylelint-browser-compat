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
      browserslist: 'chrome 84',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @property --property-name {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 10,
      message: messages.rejected(
        '"@property" at rules',
        'Chrome 84',
        'https://developer.mozilla.org/docs/Web/CSS/@property',
      ),
    },
  ],
});
