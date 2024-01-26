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
      browserslist: 'chrome 90',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @counter-style thumbs {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 15,
      message: messages.rejected(
        '"@counter-style" at rules',
        'Chrome 90',
        'https://developer.mozilla.org/docs/Web/CSS/@counter-style',
      ),
    },
  ],
});
