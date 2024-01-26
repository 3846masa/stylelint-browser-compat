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
      browserslist: 'chrome 88',
    },
  ],
  reject: [
    {
      code: stripIndent`
        ::target-text {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 14,
      message: messages.rejected(
        '"::target-text" pseudo-element',
        'Chrome 88',
        'https://developer.mozilla.org/docs/Web/CSS/::target-text',
      ),
    },
  ],
});
