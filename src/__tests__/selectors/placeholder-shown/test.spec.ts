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
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input:placeholder-shown {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 24,
      message: messages.rejected(
        '":placeholder-shown" pseudo-class',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/:placeholder-shown',
      ),
    },
  ],
});
