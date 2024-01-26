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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color: rgba(255, 0, 0, attr(data-foo number));
        }
      `,
      line: 2,
      column: 40,
      endLine: 2,
      endColumn: 46,
      message: messages.rejected('"number" unit keyword for attr()', 'Chrome 100', ''),
    },
  ],
});
