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
        textarea:blank {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 15,
      message: messages.rejected(
        '":blank" pseudo-class',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/:blank',
      ),
    },
  ],
});
