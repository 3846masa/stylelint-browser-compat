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
      browserslist: 'firefox 61',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @document url("https://www.example.com/") {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 10,
      message: messages.rejected(
        '"@document" at rules',
        'Firefox 61',
        'https://developer.mozilla.org/docs/Web/CSS/@document',
      ),
    },
  ],
});
