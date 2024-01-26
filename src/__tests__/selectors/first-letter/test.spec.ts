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
        p::first-letter {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 16,
      message: messages.rejected(
        '"::first-letter" pseudo-element',
        'Android Webview 4.4',
        'https://developer.mozilla.org/docs/Web/CSS/::first-letter',
      ),
    },
    {
      code: stripIndent`
        p:first-letter {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 15,
      message: messages.rejected(
        '":first-letter" pseudo-element',
        'Android Webview 4.4',
        'https://developer.mozilla.org/docs/Web/CSS/::first-letter',
      ),
    },
  ],
});
