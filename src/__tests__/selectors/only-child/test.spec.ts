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
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        p:only-child {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 13,
      message: messages.rejected(
        '":only-child" pseudo-class',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/:only-child',
      ),
    },
  ],
});
