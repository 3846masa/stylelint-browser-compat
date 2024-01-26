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
      browserslist: 'firefox 5',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -moz-orient: vertical;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected(
        '"-moz-orient" property',
        'Firefox 5',
        'https://developer.mozilla.org/docs/Web/CSS/-moz-orient',
      ),
    },
  ],
});
