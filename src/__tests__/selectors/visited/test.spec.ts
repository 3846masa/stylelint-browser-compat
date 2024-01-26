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
      browserslist: 'android 4.1',
    },
  ],
  reject: [
    {
      code: stripIndent`
        a:visited {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 10,
      message: messages.rejected(
        '":visited" pseudo-class',
        'Android Webview 4.1',
        'https://developer.mozilla.org/docs/Web/CSS/:visited',
      ),
    },
  ],
});
