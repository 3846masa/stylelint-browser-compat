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
      browserslist: 'android 4.4',
    },
  ],
  reject: [
    {
      code: stripIndent`
        a:hover {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 8,
      message: messages.rejected('":hover" pseudo-class with the anchor tag', 'Android Webview 4.4', ''),
    },
  ],
});
