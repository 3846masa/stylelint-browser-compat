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
          color: attr(data-foo color);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected('"color" unit keyword for attr()', 'Chrome 100', ''),
    },
  ],
});
