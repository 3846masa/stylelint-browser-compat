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
      browserslist: 'android 3',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-color: green;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 15,
      message: messages.rejected(
        '"border-color" property',
        'Android Webview 3',
        'https://developer.mozilla.org/docs/Web/CSS/border-color',
      ),
    },
  ],
});
