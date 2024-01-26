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
      browserslist: 'chrome 59',
    },
  ],
  reject: [
    {
      code: stripIndent`
        div:focus-within {
        }
      `,
      line: 1,
      column: 4,
      endLine: 1,
      endColumn: 17,
      message: messages.rejected(
        '":focus-within" pseudo-class',
        'Chrome 59',
        'https://developer.mozilla.org/docs/Web/CSS/:focus-within',
      ),
    },
  ],
});
