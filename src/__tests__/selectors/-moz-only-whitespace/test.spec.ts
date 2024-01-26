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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        :-moz-only-whitespace {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 22,
      message: messages.rejected(
        '":-moz-only-whitespace" pseudo-class',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/:-moz-only-whitespace',
      ),
    },
  ],
});
