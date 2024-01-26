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
      browserslist: 'firefox 2',
    },
  ],
  reject: [
    {
      code: stripIndent`
        .class:-moz-window-inactive {
        }
      `,
      line: 1,
      column: 7,
      endLine: 1,
      endColumn: 28,
      message: messages.rejected(
        '":-moz-window-inactive" pseudo-class',
        'Firefox 2',
        'https://developer.mozilla.org/docs/Web/CSS/:-moz-window-inactive',
      ),
    },
  ],
});
