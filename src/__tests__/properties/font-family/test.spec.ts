/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [require.resolve('~/index')],
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
          font-family: "Gill Sans Extrabold", sans-serif;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 14,
      message: messages.rejected(
        '"font-family" property',
        'Android Webview 2.1',
        'https://developer.mozilla.org/docs/Web/CSS/font-family',
      ),
    },
  ],
});
