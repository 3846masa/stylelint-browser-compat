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
      browserslist: 'firefox 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          block-size: fit-content(50px);
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected('"fit-content()" function specified as block-size', 'Firefox 100', ''),
    },
  ],
});
