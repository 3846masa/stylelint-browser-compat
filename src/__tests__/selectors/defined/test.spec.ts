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
      browserslist: 'chrome 53',
    },
  ],
  reject: [
    {
      code: stripIndent`
        custom-element:not(:defined) {
        }
      `,
      line: 1,
      column: 20,
      endLine: 1,
      endColumn: 28,
      message: messages.rejected(
        '":defined" pseudo-class',
        'Chrome 53',
        'https://developer.mozilla.org/docs/Web/CSS/:defined',
      ),
    },
  ],
});
