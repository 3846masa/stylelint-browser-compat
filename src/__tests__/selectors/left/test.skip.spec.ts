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
      browserslist: 'chrome 17',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @page :left {
        }
      `,
      line: 1,
      column: 7,
      endLine: 1,
      endColumn: 12,
      message: messages.rejected(
        '":left" pseudo-class',
        'Chrome 17',
        'https://developer.mozilla.org/docs/Web/CSS/:left',
      ),
    },
  ],
});
