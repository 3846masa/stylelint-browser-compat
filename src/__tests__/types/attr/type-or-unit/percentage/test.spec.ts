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
          width: attr(data-foo %);
        }
      `,
      line: 2,
      column: 24,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected('"%" unit keyword for attr()', 'Chrome 100', ''),
    },
  ],
});
