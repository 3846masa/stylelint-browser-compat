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
      browserslist: 'android 2.1',
    },
  ],
  reject: [
    {
      code: stripIndent`
        :hover {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 7,
      message: messages.rejected(
        '":hover" pseudo-class',
        'Android Webview 2.1',
        'https://developer.mozilla.org/docs/Web/CSS/:hover',
      ),
    },
  ],
});
