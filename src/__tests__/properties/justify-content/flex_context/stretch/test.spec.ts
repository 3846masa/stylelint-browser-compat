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
      browserslist: 'chrome 56',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          justify-content: stretch;
        }
      `,
      line: 2,
      column: 20,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('"stretch" value specified as justify-content', 'Chrome 56', ''),
    },
  ],
});
