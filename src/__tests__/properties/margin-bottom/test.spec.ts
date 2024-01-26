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
        #id {
          margin-bottom: 10px;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 16,
      message: messages.rejected(
        '"margin-bottom" property',
        'Android Webview 2.1',
        'https://developer.mozilla.org/docs/Web/CSS/margin-bottom',
      ),
    },
  ],
});
