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
      browserslist: 'firefox 87',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          caption-side: bottom-outside;
        }
      `,
      line: 2,
      column: 17,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected('"bottom-outside" value specified as caption-side', 'Firefox 87', ''),
    },
  ],
});
